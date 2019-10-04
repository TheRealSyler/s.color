import { RGBColor, HSVColor } from './ColorTypes';
import { HandleConvertString } from './HandleSet';
import { isValidStringColor } from './validators';
import { HandleGetHex } from './HandleGet';
import { GetColorType } from './interfaces';

/**
 * Takes an `RGBColor` and converts it to `HSVColor`
 */
export function RGBToHSV(color: RGBColor, is255?: boolean): HSVColor {
  const isLong = is255 ? true : color.b > 1 || color.g > 1 || color.r > 1;
  if (isLong) {
    color = { a: color.a, b: color.b / 255, g: color.g / 255, r: color.r / 255 };
  }
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
  return new HSVColor(hue ? hue : 0, saturation, cMax * 100, color.a);
}
/**
 * Takes an `HSVColor` and converts it to `RGBColor`
 */
export function HSVToRGB(hsv: HSVColor, is255?: boolean): RGBColor {
  const isLong = is255 ? true : hsv.s > 1 || hsv.v > 1;
  if (isLong) {
    hsv = { a: hsv.a, h: hsv.h, s: hsv.s / 100, v: hsv.v / 100 };
  }
  const f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);

  if (isLong) {
    return new RGBColor(f(5) * 255, f(3) * 255, f(1) * 255, hsv.a);
  } else {
    return new RGBColor(f(5), f(3), f(1), hsv.a);
  }
}
/**
 * Takes an `StringColor` and converts it to `RGBColor`,
 * If input string is invalid `null` will be returned.
 */
export function StringToRGB(input: string, return255?: boolean): RGBColor {
  if (isValidStringColor(input)) {
    return HandleConvertString(input, return255);
  }
  return null;
}
/**
 * Takes an `StringColor` and converts it to `HSVColor`,
 * If input string is invalid `null` will be returned.
 */
export function StringToHVS(input: string, return255?: boolean): HSVColor {
  if (isValidStringColor(input)) {
    return RGBToHSV(HandleConvertString(input, return255));
  }
  return null;
}
/**
 * Takes an `HSVColor` and converts it to `String` (HEX Format)
 */
export function HSVToHEX(hsv: HSVColor, options?: { type?: GetColorType; isLong?: boolean }): string {
  if (hsv.s > 1 || hsv.v > 1 || (options && options.isLong)) {
    hsv.s = hsv.s / 100;
    hsv.v = hsv.v / 100;
  }
  const f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
  return HandleGetHex(options && options.type ? options.type : 'hex', { r: f(5), g: f(3), b: f(1), a: hsv.a });
}

/**
 * Takes an `RGBColor` and converts it to `String` (HEX Format)
 */
export function RGBToHEX(color: RGBColor, type?: GetColorType): string {
  return HandleGetHex(type ? type : 'hex', {
    r: color.r,
    g: color.g,
    b: color.b,
    a: color.a
  });
}
