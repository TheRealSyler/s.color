import { RGBColor, HSVColor } from './ColorTypes';
import { HandleConvertString } from './HandleSet';
import { isValidStringColor } from './validators';
import { HandleGetHex } from './HandleGet';
/**
 * Takes an `RGBColor` and converts it to `HSVColor`
 */
export function RGBToHSV(color: RGBColor): HSVColor {
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
/**
 * Takes an `HSVColor` and converts it to `RGBColor`
 */
export function HSVToRGB(hsv: HSVColor): RGBColor {
  const f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
  return new RGBColor(f(5), f(3), f(1), hsv.a);
}
/**
 * Takes an `StringColor` and converts it to `RGBColor`,
 * If input string is invalid `null` will be returned.
 */
export function StringToRGB(hex: string): RGBColor {
  if (isValidStringColor(hex)) {
    return HandleConvertString(hex);
  }
}
/**
 * Takes an `StringColor` and converts it to `HSVColor`,
 * If input string is invalid `null` will be returned.
 */
export function StringToHVS(hex: string): HSVColor {
  if (isValidStringColor(hex)) {
    return RGBToHSV(HandleConvertString(hex));
  }
}
/**
 * Takes an `HSVColor` and converts it to `String` (HEX Format)
 */
export function HSVToHEX(hsv: HSVColor): string {
  const f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
  return HandleGetHex('hex', { r: f(5), g: f(3), b: f(1), a: hsv.a });
}
/**
 * Takes an `RGBColor` and converts it to `String` (HEX Format)
 */
export function RGBToHEX(color: RGBColor): string {
  return HandleGetHex('hex', { r: color.r, g: color.g, b: color.b, a: color.a });
}
