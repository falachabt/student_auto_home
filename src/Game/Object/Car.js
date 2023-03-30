import { Controls } from "./Controls";
import { NeuralNetwork } from "./Netword";
import { Sensor } from "./Sensor";
import { polysIntersect } from "./utils";
import carImg from "./car.png";

export class Car {
  constructor(x, y, width, height, controlsType, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.img = new Image(carImg);
    this.img.src = carImg;

    this.mask = document.createElement("canvas");
    this.mask.width = width;
    this.mask.height = height;

    const maskCtx = this.mask.getContext("2d");
    this.img.onload = () => {
      maskCtx.fillStyle = color;
      maskCtx.rect(0, 0, this.width, this.height);
      maskCtx.fill();

      maskCtx.globalCompositeOperation = "destination-atop";
      maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
    };

    this.polygon = [];

    this.speed = 0;
    this.acceleration = 0.225;
    this.maxSpeed = controlsType === "PNG" ? 3 : 50;
    this.friction = 0.05;
    this.angle = 0;
    this.damage = false;

    this.controlsType = controlsType;
    this.useBrain = controlsType === "AI";

    if (controlsType !== "PNG") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }
    this.controls = new Controls(controlsType);
  }

  update(roadBorders, traffic) {
    if (!this.damage) {
      this.move();
      this.polygon = this.createPolygon();
      this.damage = this.assessDamages(roadBorders, traffic);
    }

    if (this.controlsType !== "PNG") {
      this.sensor?.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map((s) =>
        s == null ? 0 : 1 - s.offset
      );

      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.forWard = outputs[0];
        this.controls.left = outputs[1];
        this.controls.right = outputs[2];
        this.controls.reverse = outputs[3];
      }
    }
  }

  assessDamages(roadBorders, traffic) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }

    for (let i = 0; i < traffic.length; i++) {
      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }

    return false;
  }

  // to have the exact point of the car border at each move
  createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    points.push(
      // for the top right corner
      {
        x: this.x - Math.sin(-this.angle - alpha) * rad,
        y: this.y - Math.cos(-this.angle - alpha) * rad,
      }
    );

    // for the top left corner
    points.push({
      x: this.x - Math.sin(-this.angle + alpha) * rad,
      y: this.y - Math.cos(-this.angle + alpha) * rad,
    });

    // for the bottom left corner
    points.push({
      x: this.x - Math.sin(Math.PI - this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI - this.angle - alpha) * rad,
    });

    // for the bottom right corner
    points.push({
      x: this.x - Math.sin(Math.PI - this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI - this.angle + alpha) * rad,
    });

    return points;
  }

  move() {
    if (this.controls.forWard) {
      this.speed += this.acceleration;
    }

    if (this.controls.reverse) {
      this.speed -= this.acceleration*6;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle -= 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle += 0.03 * flip;
      }
    }

    // ajust the position of the current car according to value of the speed
    this.x += Math.sin(this.angle) * this.speed*0.8;
    this.y -= Math.cos(this.angle) * this.speed*0.5;
  }

  draw(ctx) {
    // ctx.beginPath();

    if (this.damage) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = this.color;
    }

    this.controlsType !== "PNG" && this.sensor.draw(ctx);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (!this.damaged) {
      ctx.drawImage(
        this.mask,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      ctx.globalCompositeOperation = "multiply";
    }
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
    
    // ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    // for (let i = 1; i <= this.polygon.length; i++) {
    //   ctx.lineTo(
    //     this.polygon[i == this.polygon.length ? 0 : i].x,
    //     this.polygon[i == this.polygon.length ? 0 : i].y
    //   );
    // }

    // ctx.fill();

    // this.sensor.update();
  }
}
