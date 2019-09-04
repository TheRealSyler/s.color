export function isValidHex(text: string) {
  return /^#[a-fA-F\d]{3,4}$|^#[a-fA-F\d]{6}$|^#[a-fA-F\d]{8}$/.test(text);
}
export function isValidRGB(text: string) {
  return /rgba?\([\d. ]+[, ][\d. ]+[, ][\d. ]+([, ][\d. ]+)?\)/.test(text);
}
export function isValidStringColor(input: string) {
  if (isValidHex(input) || isValidRGB(input)) {
    return input;
  } else {
    console.warn('[S.Color] Invalid String Input:', input);
    return null;
  }
}
