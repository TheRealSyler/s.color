import { HSVToRGB, StringToRGB } from './ColorConverters';
import { RGBColor, HSVColor, StringColor } from './ColorTypes';

export function GetReadableTextColor(color: RGBColor | HSVColor | StringColor | string) {
  if (typeof color === 'string') {
    const rgb = StringToRGB(color);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 0.5 ? '#000' : '#fff';
  } else if (color instanceof StringColor) {
    const rgb = StringToRGB(color.color);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 0.5 ? '#000' : '#fff';
  } else if (color instanceof RGBColor) {
    const isLong = color.b > 1 || color.g > 1 || color.r > 1;
    const v = isLong ? 255 : 1;
    return (color.r * 299 + color.g * 587 + color.b * 114) / 1000 > 0.5 ? new RGBColor(0, 0, 0) : new RGBColor(v, v, v);
  } else if (color instanceof HSVColor) {
    const rgb = HSVToRGB(color);
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 0.5
      ? new HSVColor(0, 0, 0)
      : new HSVColor(0, 0, color.s > 1 || color.v > 1 ? 100 : 1);
  }
}

/**
 * Shifts the hue of the `HSVColor` by the Value
 */
export function ShiftHue(hsv: HSVColor, value: number) {
  if (value > 360) value = value % 360;
  else if (value < 0) value = -(Math.abs(value) % 360);
  hsv.h = hsv.h + value <= 360 ? hsv.h + value : hsv.h + value - 360;

  return hsv;
}
