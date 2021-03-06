import { GetColorType, GetColorOptions } from './interfaces.ts';
import { HandleGetHex } from './HandleGet.ts';
import { ConvertString } from './HandleSet.ts';
import { RGBColor } from './ColorTypes.ts';
import { RGBToHSV } from './ColorConverters.ts';

export * from './ColorTypes.ts';
export * from './ColorConverters.ts';
export * from './regex.ts';
export * from './validators.ts';
export * from './utils.ts';

export default class Color {
  private color!: RGBColor;
  constructor(input?: string | RGBColor) {
    this.Set(input!);
  }

  Get(type?: GetColorType, options?: GetColorOptions) {
    if (type !== undefined) {
      if (type.startsWith('hex')) {
        return HandleGetHex(type, this.color, options);
      } else {
        switch (type) {
          case 'rgb':
            return `rgb(${Math.round(this.color.r * 255)}, ${Math.round(
              this.color.g * 255
            )}, ${Math.round(this.color.b * 255)})`;
          case 'rgba':
            return `rgba(${Math.round(this.color.r * 255)}, ${Math.round(
              this.color.g * 255
            )}, ${Math.round(this.color.b * 255)}, ${this.color.a.toFixed(2).toString()})`;
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
        input.r === undefined ? 1 : input.r > 1 ? input.r / 255 : input.r,
        input.g === undefined ? 1 : input.g > 1 ? input.g / 255 : input.g,
        input.b === undefined ? 1 : input.b > 1 ? input.b / 255 : input.b,
        input.a === undefined ? 1 : input.a > 1 ? input.a / 255 : input.a
      );
    } else if (typeof input === 'string') {
      const tempColor = ConvertString(input);

      this.color = (tempColor === null ? this.color : tempColor)!;
    } else {
      this.color = new RGBColor(0, 0, 0, 0);
    }
  }

  // Mutate(type: 'lighten', amount: number) {}
}
