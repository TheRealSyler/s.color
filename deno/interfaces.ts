export type GetColorTypeHex = 'hex' | 'hex-short' | 'hex-without-alpha' | 'hex-without-alpha-short';
export type GetColorType = 'rgb' | GetColorTypeHex | 'rgba' | 'object' | 'hsv';
export interface GetColorOptions {
  /**
   * if true `#fff` will be output as `#FFF`
   */
  UpperCaseHex: boolean;
}
