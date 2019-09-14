import { GetColorType, GetColorOptions } from './interfaces';
import { HandleGetHex } from './HandleGet';
import { HandleConvertString } from './HandleSet';
import { RGBColor } from './ColorTypes';
import { RGBToHSV } from './ColorConverters';

export * from './ColorTypes';
export * from './ColorConverters';
export * from './Regex';

export default class Color {
  private color: RGBColor;
  constructor(input?: string | RGBColor) {
    this.Set(input);
  }

  Get(type?: GetColorType, options?: GetColorOptions) {
    if (type !== undefined) {
      if (type.startsWith('hex')) {
        return HandleGetHex(type, this.color, options);
      } else {
        switch (type) {
          case 'rgb':
            return `rgb(${Math.round(this.color.r * 255)}, ${Math.round(this.color.g * 255)}, ${Math.round(this.color.b * 255)})`;
          case 'rgba':
            return `rgba(${Math.round(this.color.r * 255)}, ${Math.round(this.color.g * 255)}, ${Math.round(
              this.color.b * 255
            )}, ${this.color.a.toFixed(2).toString()})`;
          case 'object':
            return this.color;
          case 'hsv':
            return RGBToHSV(this.color);
        }
      }
    } else {
      return this.color;
    }
  }

  Set(input: string | RGBColor) {
    if (typeof input === 'object') {
      this.color = new RGBColor(
        input.r === undefined ? 1 : input.r > 1 ? 1 : input.r,
        input.g === undefined ? 1 : input.g > 1 ? 1 : input.g,
        input.b === undefined ? 1 : input.b > 1 ? 1 : input.b,
        input.a === undefined ? 1 : input.a > 1 ? 1 : input.a
      );
    } else if (typeof input === 'string') {
      const tempColor = HandleConvertString(input);
      this.color = tempColor === null ? this.color : tempColor;
    } else {
      this.color = new RGBColor(0, 0, 0, 0);
    }
  }

  // Mutate(type: 'lighten', amount: number) {}
}
