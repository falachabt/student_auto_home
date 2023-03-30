import React from "react";
import { Car } from "./Object/Car";
import { Road } from "./Object/Road";
import { getRGBA } from "./Object/utils";
import { Visualizer } from "./Object/Visualise";

const Main = () => {
  let carCanvas = document.querySelector("#carCanvas");
  let networkCanvas = document.querySelector("#networkCanvas");
  let element = {};

  function worldplay() {
    const carCtx = carCanvas.getContext("2d");
    const networkCtx = networkCanvas.getContext("2d");

    carCanvas.width = 500;
    const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
    const car = new Car(road.getLaneCenter(2), 500, 30, 50, "KEYS", "blue");

    const traffic = [
      new Car(road.getLaneCenter(1), 300, 30, 50, "PNG", "orange"),
      new Car(road.getLaneCenter(3), 200, 30, 50, "PNG", "orange"),
      new Car(road.getLaneCenter(0) + 20, -300, 30, 50, "PNG", getRGBA()),
      new Car(road.getLaneCenter(2) - 10, -300, 30, 50, "PNG", getRGBA()),
      new Car(road.getLaneCenter(0) + 10, -500, 30, 50, "PNG", getRGBA()),
      new Car(road.getLaneCenter(1) + 25, -500, 30, 50, "PNG", getRGBA()),
      new Car(road.getLaneCenter(1) + 5, -700, 30, 50, "PNG", getRGBA()),
      new Car(road.getLaneCenter(2) - 10, -700, 30, 50, "PNG", getRGBA()),
    ];

    function generateCars(N) {
      const cars = [];
      for (let i = 0; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 500, 30, 50, "PNG", "blue"));
      }
    }

    animate();

    function animate() {
      car.update(road.borders, traffic);

      let speed_container = document.querySelector(".speed_container");
      // console.log(speed_container)
      if (speed_container) {
        speed_container.textContent = car.speed.toString().slice(0,3)
      }
      traffic.forEach((png) => png.update(road.borders, []));

      carCanvas.height = window.innerHeight - 100;
      networkCanvas.height = window.innerHeight - 100;

      carCtx.save();
      carCtx.translate(0, -car.y + carCanvas.height * 0.8);

      road.draw(carCtx);
      car.draw(carCtx);
      traffic.forEach((png) => png.draw(carCtx));
      carCtx.restore();

      networkCtx.lineDashOffset = 50;

      Visualizer.drawNetwork(networkCtx, car.brain);

      requestAnimationFrame(animate);
    }
  }

  (function init() {
    if (carCanvas && networkCanvas) {
      worldplay();
    } else {
      setTimeout(function () {
        carCanvas = document.querySelector("#carCanvas");
        networkCanvas = document.querySelector("#networkCanvas");
        init();
      }, 500);
    }
  })();
  return (
    <div id="carCanvas_container " className="h-full flex gap-2 ">
      <div className="w-[100px]">
        <h1>Display</h1>
        <div>
          <span>speed :</span>
          <spen className="speed_container">0</spen>
          <span>km/h</span>
        </div>
      </div>
      <canvas id="carCanvas" className=" bg-gray-400 h-full "></canvas>
      <canvas
        id="networkCanvas"
        className=" bg-gray-800 max-w-md h-full "
      ></canvas>
    </div>
  );
};

export default Main;
