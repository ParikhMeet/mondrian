import * as $ from "jquery";
import "./../styles/style.scss";

class Mondrian {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {
    let canvas = $("#art").get(0) as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    console.log(`Width: ${canvas.width}`);
    console.log(`Height: ${canvas.height}`);

    context.strokeStyle = "black";
    context.lineWidth = 1;

    this.canvas = canvas;
    this.context = context;

    this.drawRect();
    this.drawRect(
      0,
      0,
      this.generateRandomNumber(0, 300),
      this.generateRandomNumber(0, 150)
    );
  }

  private generateRandomNumber(minVal: number, maxVal: number): number {
    return Math.floor(Math.random() * maxVal) + minVal;
  }

  private generateRandomRGBStyle(): string {
    return `rgb(${this.generateRandomNumber(
      0,
      255
    )}, ${this.generateRandomNumber(0, 255)}, ${this.generateRandomNumber(
      0,
      255
    )})`;
  }

  private drawRect(
    x: number = 0,
    y: number = 0,
    width: number = 300,
    height: number = 150,
    styleRGB: string = this.generateRandomRGBStyle()
  ) {
    this.context.fillStyle = styleRGB;
    this.context.fillRect(x, y, width, height);
  }
}

function main() {
  let mondrian = new Mondrian();
  console.log("Mother Nature !!!!");
}

$(document).ready(main);
