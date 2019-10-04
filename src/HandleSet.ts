import { isValidStringColor } from './validators';
import { RGBColor } from './ColorTypes';

export function HandleConvertString(input: string, return255?: boolean) {
  if (isValidStringColor(input)) {
    if (input.startsWith('#')) {
      return HandleConvertHexString(input, return255);
    } else if (input.startsWith('rgb')) {
      return HandleConvertRgbString(input, return255);
    }
  }
}
/**
 * **assumes that the input is valid**
 */
export function HandleConvertHexString(text: string, return255?: boolean) {
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

  return new RGBColor(
    return255 ? color.red : color.red / 255,
    return255 ? color.green : color.green / 255,
    return255 ? color.blue : color.blue / 255,
    color.alpha
  );
}
/**
 * **assumes that the input is valid**
 */
function HandleConvertRgbString(text: string, return255?: boolean) {
  const split = text.split(/,|\b /g);
  return new RGBColor(
    parseInt(split[0].replace(/\D/g, '')) / (return255 ? 0 : 255),
    parseInt(split[1].replace(/\D/g, '')) / (return255 ? 0 : 255),
    parseInt(split[2].replace(/\D/g, '')) / (return255 ? 0 : 255),
    split[3] ? parseFloat(split[3].replace(/[^\.\d]/g, '')) : 1
  );
}
