import * as $ from "jquery";
import "./../styles/style.scss";

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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

    const baseRect: Rectangle = { x: 0, y: 0, width: 300, height: 150 };

    this.drawRect(baseRect);
    this.drawRect({
      x: 0,
      y: 0,
      width: this.generateRandomNumber(0, 300),
      height: this.generateRandomNumber(0, 150)
    });
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
    rect: Rectangle,
    styleRGB: string = this.generateRandomRGBStyle()
  ) {
    this.context.fillStyle = styleRGB;
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }
}

function main() {
  let mondrian = new Mondrian();
  console.log("Mother Nature !!!!");
}

$(document).ready(main);
