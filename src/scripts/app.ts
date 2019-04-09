import * as $ from "jquery";
import "./../styles/style.scss";
import * as _ from "lodash";

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

class Mondrian {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private strokeStyle = "black";
  private lineWidth = 1;

  constructor() {
    let canvas = $("#art").get(0) as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    console.log(`Width: ${canvas.width}`);
    console.log(`Height: ${canvas.height}`);

    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.lineWidth;

    this.canvas = canvas;
    this.context = context;

    this.drawBaseRect();
    this.drawRect({
      x: 0,
      y: 0,
      width: _.random(300),
      height: _.random(150)
    });
  }

  private drawBaseRect() {
    //Width: 300, Height: 150
    const baseRect: Rectangle = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.drawRect(baseRect);
  }

  private generateRandomRGBStyle(): string {
    return `rgb(${_.random(255)}, ${_.random(255)}, ${_.random(255)})`;
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
