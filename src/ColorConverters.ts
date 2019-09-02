import { RGBColor, HSVColor } from './ColorTypes';
/**
 * Takes an `RGBColor` and converts it into a `HSVColor`
 */
export function RGBToHSV(color: RGBColor) {
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
 * Takes an `HSVColor` and converts it into a `RGBColor`
 */
export function HSVToRGB(hsv: HSVColor) {
  const f = (n: number, k = (n + hsv.h / 60) % 6) => hsv.v - hsv.v * hsv.s * Math.max(Math.min(k, 4 - k, 1), 0);
  return new RGBColor(f(5), f(3), f(1), hsv.a);
}
