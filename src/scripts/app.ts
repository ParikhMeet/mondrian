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
  private smallRectProbability = 0.995;

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
    const baseRect = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.processRect(baseRect);
  }

  private processRect(rect: Rectangle) {
    this.drawRect(rect);

    if (_.random(0, 1, true) <= this.smallRectProbability) {
      const breakByWidth = _.sample([true, false]);
      let rects: [Rectangle, Rectangle];
      if (breakByWidth && rect.width >= 2 * this.minimumSpacing) {
        //Break by width and appropriate width available
        rects = this.breakRect(rect, true);
      } else if (rect.height >= 2 * this.minimumSpacing) {
        //appropriate height available
        rects = this.breakRect(rect, false);
      } else if (!breakByWidth && rect.width >= 2 * this.minimumSpacing) {
        //if break by height and apprpriate height is not available but width is available
        rects = this.breakRect(rect, true);
      } // else rectangle is already processed.
      if (rects) {
        rects.forEach(it => this.processRect(it));
      }
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

$(document).ready(() => new Mondrian().generate());
