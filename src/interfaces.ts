export type GetColorType =
  | 'rgb'
  | 'rgba'
  | 'hex'
  | 'hex-short'
  | 'hex-without-alpha'
  | 'hex-without-alpha-short'
  | 'object'
  | 'object-long'
  | 'hsv';
export interface GetColorOptions {
  /**
   * if true `#fff` will be output as `#FFF`
   */
  UpperCaseHex: boolean;
}
