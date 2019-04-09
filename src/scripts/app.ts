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
  private lineWidth = 1;
  private minimumSpacing = 5;

  constructor() {
    let canvas = $("#art").get(0) as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    console.log(`Width: ${canvas.width}`);
    console.log(`Height: ${canvas.height}`);

    context.lineWidth = this.lineWidth;

    this.canvas = canvas;
    this.context = context;
  }

  generate() {
    const baseRect = this.drawBaseRect();
    this.processRect(baseRect);
  }

  private processRect(rect: Rectangle) {
    const breakByWidth = _.sample([true, false]);
    if (breakByWidth && rect.width >= 2 * this.minimumSpacing) {
      //break by width
      const rects: [Rectangle, Rectangle] = this.breakRect(rect, true);
      rects.forEach(it => this.processRect(it));
    } else if (rect.height >= 2 * this.minimumSpacing) {
      //break by height
      const rects: [Rectangle, Rectangle] = this.breakRect(rect, false);
      rects.forEach(it => this.processRect(it));
    } else {
      //Rect Already processed
    }
  }

  private breakRect(
    rect: Rectangle,
    breakByWidth: boolean
  ): [Rectangle, Rectangle] {
    const breakRatio = breakByWidth
      ? this.prepareBreakRatio(rect.width)
      : this.prepareBreakRatio(rect.height);

    if (breakByWidth) {
      const rect1 = {
        x: rect.x,
        y: rect.y,
        width: Math.floor(rect.width * breakRatio),
        height: rect.height
      };
      const rect2 = {
        x: rect.x + Math.floor(rect.width * breakRatio),
        y: rect.y,
        width: rect.width - Math.floor(rect.width * breakRatio),
        height: rect.height
      };
      this.drawRect(rect1);
      this.drawRect(rect2);
      return [rect1, rect2];
    } else {
      const rect1 = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: Math.floor(rect.height * breakRatio)
      };
      const rect2 = {
        x: rect.x,
        y: rect.y + Math.floor(rect.height * breakRatio),
        width: rect.width,
        height: rect.height - Math.floor(rect.height * breakRatio)
      };
      this.drawRect(rect1);
      this.drawRect(rect2);
      return [rect1, rect2];
    }
  }

  private prepareBreakRatio(distance: number): number {
    if (distance == 2 * this.minimumSpacing) {
      return 0.5;
    } else {
      return _.random(0, 1, true);
    }
  }

  private drawBaseRect(): Rectangle {
    //Width: 300, Height: 150
    const baseRect: Rectangle = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.drawRect(baseRect);
    return baseRect;
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
  mondrian.generate();
  console.log("Mother Nature !!!!");
}

$(document).ready(main);
