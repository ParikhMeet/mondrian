import * as $ from "jquery";
import "./../styles/style.scss";

class Mondrian {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {
    let canvas = $("#art").get(0) as HTMLCanvasElement;
    let context = canvas.getContext("2d");

    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;

    this.canvas = canvas;
    this.context = context;

    this.drawRect();
  }

  private drawRect() {
    this.context.fillRect(0, 0, 400, 400);
    this.context.fillStyle = "#FF0000";
    this.context.fillRect(0, 0, 200, 400);
  }
}

function main() {
  let mondrian = new Mondrian();
  console.log("Mother Nature !!!!");
}

$(document).ready(main);
