import { RGBColor, GetColorType, GetColorOptions, HSVColor } from './interfaces';
import { isValidHex, isValidRGB } from './regex';

export default class Color {
  private r: number;
  private g: number;
  private b: number;
  private a: number;
  constructor(input: string | RGBColor) {
    this.Set(input);
  }

  Get(type?: GetColorType, options?: GetColorOptions) {
    if (type !== undefined) {
      if (type.startsWith('hex')) {
        return this.HandleGetHex(type, options);
      } else {
        switch (type) {
          case 'rgb':
            return `rgb(${Math.round(this.r * 255)}, ${Math.round(this.g * 255)}, ${Math.round(this.b * 255)})`;
          case 'rgba':
            return `rgba(${Math.round(this.r * 255)}, ${Math.round(this.g * 255)}, ${Math.round(this.b * 255)}, ${this.a
              .toFixed(2)
              .toString()})`;
          case 'object':
            return new RGBColor(this.r, this.g, this.b, this.a);
          case 'hsv':
            return Color.RGBToHSV(new RGBColor(this.r, this.g, this.b, this.a));
        }
      }
    } else {
      return new RGBColor(this.r, this.g, this.b, this.a);
    }
  }
  Set(input: string | RGBColor) {
    if (typeof input === 'object') {
      this.r = input.r === undefined ? 1 : input.r > 1 ? 1 : input.r;
      this.g = input.g === undefined ? 1 : input.g > 1 ? 1 : input.g;
      this.b = input.b === undefined ? 1 : input.b > 1 ? 1 : input.b;
      this.a = input.a === undefined ? 1 : input.a > 1 ? 1 : input.a;
    } else if (typeof input === 'string') {
      this.HandleSetString(input);
    } else {
      this.r = 1;
      this.g = 1;
      this.b = 1;
      this.a = 1;
    }
  }
  // Mutate(type: 'lighten', amount: number) {}
  private HandleGetHex(type: GetColorType, options?: GetColorOptions) {
    let alpha = Math.round(this.a * 255).toString(16);
    let red = Math.round(this.r * 255).toString(16);
    let green = Math.round(this.g * 255).toString(16);
    let blue = Math.round(this.b * 255).toString(16);
    if (options && options.UpperCaseHex) {
      alpha = alpha.toUpperCase();
      red = red.toUpperCase();
      green = green.toUpperCase();
      blue = blue.toUpperCase();
    }
    switch (type) {
      case 'hex':
        return `#${(red.length === 1 ? red.concat(red) : red)
          .concat(green.length === 1 ? green.concat(green) : green)
          .concat(blue.length === 1 ? blue.concat(blue) : blue)
          .concat(alpha.length === 1 ? alpha.concat(alpha) : alpha)}`;
      case 'hex-short':
        return `#${red
          .substring(0, 1)
          .concat(green.substring(0, 1))
          .concat(blue.substring(0, 1))
          .concat(alpha.substring(0, 1))}`;
      case 'hex-without-alpha':
        return `#${(red.length === 1 ? red.concat(red) : red)
          .concat(green.length === 1 ? green.concat(green) : green)
          .concat(blue.length === 1 ? blue.concat(blue) : blue)}`;
      case 'hex-without-alpha-short':
        return `#${red
          .substring(0, 1)
          .concat(green.substring(0, 1))
          .concat(blue.substring(0, 1))}`;
    }
  }
  private HandleSetString(input: string): void {
    if (input.startsWith('#')) {
      if (isValidHex(input)) {
        this.SetBasedOnHexString(input);
        return;
      }
    } else {
      if (input.startsWith('rgb')) {
        if (isValidRGB(input)) {
          this.SetBasedOnRgbString(input);
          return;
        }
      }
    }
    console.warn('[S.Color] Invalid Input:', input);
  }
  /**
   * **assumes that the input is valid**
   */
  private SetBasedOnHexString(text: string): void {
    let color = { red: 0, green: 0, blue: 0, alpha: 0 };
    const raw = text.replace('#', '');
    const length = raw.length;
    const modulo = length % 3;
    color.red = length > 4 ? parseInt(raw.substring(0, 2), 16) : parseInt(raw.substring(0, 1).concat(raw.substring(0, 1)), 16);
    color.green = length > 4 ? parseInt(raw.substring(2, 4), 16) : parseInt(raw.substring(1, 2).concat(raw.substring(1, 2)), 16);
    color.blue = length > 4 ? parseInt(raw.substring(4, 6), 16) : parseInt(raw.substring(2, 3).concat(raw.substring(2, 3)), 16);

    if (modulo) {
      color.alpha =
        length > 4
          ? parseInt(raw.substring(length - modulo, length), 16)
          : parseInt(raw.substring(length - modulo, length).concat(raw.substring(length - modulo, length)), 16);
      color.alpha = color.alpha / 255;
    } else {
      color.alpha = 1;
    }
    this.r = color.red / 255;
    this.g = color.green / 255;
    this.b = color.blue / 255;
    this.a = color.alpha;
  }
  /**
   * **assumes that the input is valid**
   */
  private SetBasedOnRgbString(text: string) {
    const split = text.split(/,|\b /g);
    this.r = parseInt(split[0].replace(/\D/g, '')) / 255;
    this.g = parseInt(split[1].replace(/\D/g, '')) / 255;
    this.b = parseInt(split[2].replace(/\D/g, '')) / 255;
    this.a = split[3] ? parseFloat(split[3].replace(/[^\.\d]/g, '')) : 1;
  }
  static RGBToHSV(color: RGBColor) {
    const cMax = Math.max(color.r, color.g, color.b);
    const cMin = Math.min(color.r, color.g, color.b);
    const diff = cMax - cMin;
    // Hue
    const hue =
      cMax === 1 && cMin === 1
        ? 0
        : cMax === 0 && cMin === 0
        ? 0
        : cMax === color.r
        ? (60 * ((color.g - color.b) / diff) + 360) % 360
        : cMax === color.g
        ? (60 * ((color.b - color.r) / diff) + 120) % 360
        : cMax === color.b
        ? (60 * ((color.r - color.g) / diff) + 240) % 360
        : 0;

    // Saturation
    let saturation: number;
    //
    if (cMax === 0) {
      saturation = 0;
    } else {
      saturation = (diff / cMax) * 100;
    }

    return new HSVColor(hue, saturation / 100, cMax, color.a);
  }
  static HSVToRGB(hsv: HSVColor) {
    let f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
    return new RGBColor(f(5), f(3), f(1), hsv.a);
  }
}
