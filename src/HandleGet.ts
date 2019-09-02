import { GetColorType, GetColorOptions } from './interfaces';
import { RGBColor } from './ColorTypes';

export function HandleGetHex(type: GetColorType, color: RGBColor, options?: GetColorOptions) {
  let alpha = Math.round(color.a * 255).toString(16);
  let red = Math.round(color.r * 255).toString(16);
  let green = Math.round(color.g * 255).toString(16);
  let blue = Math.round(color.b * 255).toString(16);
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
