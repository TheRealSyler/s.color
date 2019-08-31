export interface Color {
  /**
   * Range [0-1]
   */
  r: number;
  /**
   * Range [0-1]
   */
  g: number;
  /**
   * Range [0-1]
   */
  b: number;
  /**
   * Range [0-1]
   */
  a: number;
}
export type GetColorType =
  | 'rgb'
  | 'rgba'
  | 'hex'
  | 'hex-short'
  | 'hex-without-alpha'
  | 'hex-without-alpha-short'
  | 'object'
  | 'object-long';
export interface GetColorOptions {
  /**
   * if true `#fff` will be output as `#FFF`
   */
  UpperCaseHex: boolean;
}
