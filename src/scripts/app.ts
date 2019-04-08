import * as $ from "jquery";
import "./../styles/style.scss";

class Mondrian {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {
    let canvas = $("#art").get(0) as HTMLCanvasElement;
    let context = canvas.getContext("2d");

    context.strokeStyle = "black";
    context.lineWidth = 1;

    this.canvas = canvas;
    this.context = context;

    this.drawRect();
  }

  private generateRandomNumber(minVal: number, maxVal: number): number {
    return Math.floor(Math.random() * maxVal) + minVal
  }

  private drawRect() {
    console.log(`Width: ${this.canvas.width}`);
    console.log(`Height: ${this.canvas.height}`);

    this.context.fillRect(0, 0, 300, 150);
    this.context.fillStyle = `rgb(${this.generateRandomNumber(0, 255)}, ${this.generateRandomNumber(0, 255)}, ${this.generateRandomNumber(0, 255)})`
    this.context.fillRect(0, 0, this.generateRandomNumber(0, 300), this.generateRandomNumber(0, 150));
  }
}

function main() {
  let mondrian = new Mondrian();
  console.log("Mother Nature !!!!");
}

$(document).ready(main);
