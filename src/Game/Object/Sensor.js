import { getIntersection, lerp } from "./utils";

export class Sensor {
  constructor(Car) {
    this.car = Car;
    this.rayCount = 5;
    this.rayLength = 100;
    this.raySpread = Math.PI/2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders, traffic) {
    this.castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.getReading(this.rays[i], roadBorders, traffic));
    }
  }

  getReading(ray, roadBorders, traffic) {
    let touches = [];

    // verify if the sensor meet any road border
    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );

      if (touch) {
        touches.push(touch);
      }
    }

    // verify if the sensor meet any other car on the traffic
    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j++) {
        const value = getIntersection(
          ray[0],
          ray[1],
          poly[j],
          poly[(j + 1) % poly.length]
        );

        if (value) {
          touches.push(value);
        }
      }
    }

    if (touches.length == 0) {
      return null;
    } else {
      const offsets = touches.map((e) => e.offset);
      const minOffest = Math.min(...offsets);
      return touches.find((e) => e.offset === minOffest);
    }
  }

  castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      // add the car angle to make the sensor rotate with the car
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) - this.car.angle;

      // the starting point of each ray is the car center
      const start = { x: this.car.x, y: this.car.y };

      // end point is defining according to the ray angle and the ray lenght
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push([start, end]);
    }
  }

  draw(ctx) {
    for (let index = 0; index < this.rayCount; index++) {
      let end = this.rays[index][1];
      if (this.readings[index]) {
        end = this.readings[index];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "transparent";
      ctx.moveTo(this.rays[index][0].x, this.rays[index][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.moveTo(this.rays[index][1].x, this.rays[index][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
