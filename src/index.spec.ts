import Color, { RGBColor, HSVColor, ShiftHue } from './index';
import { HSVToRGB, StringToRGB, RGBToHEX, RGBToHSV, StringToHVS } from './ColorConverters';

test('Get Hex', () => {
  const a = new Color({ r: 0, g: 0, b: 0, a: 0 });
  expect(a.Get('hex')).toBe('#00000000');
  expect(a.Get('hex-short')).toBe('#0000');
  expect(a.Get('hex-without-alpha')).toBe('#000000');
  expect(a.Get('hex-without-alpha-short')).toBe('#000');
  const b = new Color({ r: 1, g: 1, b: 1, a: 1 });
  expect(b.Get('hex')).toBe('#ffffffff');
  expect(b.Get('hex', { UpperCaseHex: true })).toBe('#FFFFFFFF');
  expect(b.Get('hex-short')).toBe('#ffff');
  expect(b.Get('hex-without-alpha')).toBe('#ffffff');
  expect(b.Get('hex-without-alpha-short')).toBe('#fff');
  const c = new Color({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 });
  expect(c.Get('hex')).toBe('#9435226f');
  expect(c.Get('hex', { UpperCaseHex: true })).toBe('#9435226F');
  expect(c.Get('hex-short')).toBe('#9326');
  expect(c.Get('hex-without-alpha')).toBe('#943522');
  expect(c.Get('hex-without-alpha-short')).toBe('#932');
});

test('Get RGB(A)', () => {
  const a = new Color({ r: 0, g: 0, b: 0, a: 0 });
  expect(a.Get('rgb')).toBe('rgb(0, 0, 0)');
  expect(a.Get('rgba')).toBe('rgba(0, 0, 0, 0.00)');
  const b = new Color({ r: 1, g: 1, b: 1, a: 1 });
  expect(b.Get('rgb')).toBe('rgb(255, 255, 255)');
  expect(b.Get('rgba')).toBe('rgba(255, 255, 255, 1.00)');
  const c = new Color({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 });
  expect(c.Get('rgb')).toBe('rgb(148, 53, 34)');
  expect(c.Get('rgba')).toBe('rgba(148, 53, 34, 0.44)');
});

test('Get Object', () => {
  const a = new Color({ r: 0, g: 0, b: 0, a: 0 });
  expect(a.Get('object')).toStrictEqual(new RGBColor(0, 0, 0, 0));
  const b = new Color({ r: 1, g: 1, b: 1, a: 1 });
  expect(b.Get('object')).toStrictEqual(new RGBColor(1, 1, 1, 1));
  const c = new Color({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 });
  expect(c.Get('object')).toStrictEqual(new RGBColor(148 / 255, 53 / 255, 34 / 255, 111 / 255));
});

test('Get HSV', () => {
  const a = new Color({ r: 45, g: 215, b: 0, a: 0 });
  expect(a.Get('hsv')).toStrictEqual(new HSVColor(107.44186046511628, 100, 84.31372549019608, 0));
  const b = new Color({ r: 255, g: 25, b: 29, a: 0 });
  expect(b.Get('hsv')).toStrictEqual(new HSVColor(358.95652173913044, 90.19607843137256, 100, 0));
  const c = new Color({ r: 0, g: 0, b: 0, a: 0 });
  expect(c.Get('hsv')).toStrictEqual(new HSVColor(0, 0, 0, 0));
  const d = new Color({ r: 1, g: 1, b: 1, a: 0 });
  expect(d.Get('hsv')).toStrictEqual(new HSVColor(0, 0, 100, 0));
  const e = new Color({ r: 129, g: 88, b: 47, a: 0 });
  expect(e.Get('hsv')).toStrictEqual(new HSVColor(30, 63.56589147286821, 50.588235294117645, 0));
});

test('RGB to HVS', () => {
  expect(RGBToHSV({ r: 1, g: 1, b: 1, a: 1 })).toStrictEqual(new HSVColor(0, 0, 100));
  expect(RGBToHSV({ r: 255, g: 255, b: 255, a: 1 })).toStrictEqual(new HSVColor(0, 0, 100));
  expect(RGBToHSV({ r: 255, g: 255, b: 255, a: 1 })).toStrictEqual(new HSVColor(0, 0, 100));

  expect(RGBToHSV({ r: 123, g: 56, b: 34, a: 1 })).toStrictEqual(new HSVColor(14.831460674157313, 72.35772357723576, 48.23529411764706));

  expect(RGBToHSV({ r: 255 / 255, g: 25 / 255, b: 29 / 255, a: 0 })).toStrictEqual(
    new HSVColor(358.95652173913044, 90.19607843137256, 100, 0)
  );
  expect(RGBToHSV({ r: 255, g: 25, b: 29, a: 0 })).toStrictEqual(new HSVColor(358.95652173913044, 90.19607843137256, 100, 0));
});

test('RGB to HSV to RGB', () => {
  expect(HSVToRGB(RGBToHSV(HSVToRGB(RGBToHSV(new RGBColor(255, 255, 255)))))).toStrictEqual(new RGBColor(255, 255, 255));
  expect(HSVToRGB(RGBToHSV(HSVToRGB(RGBToHSV(HSVToRGB(RGBToHSV(new RGBColor(213, 213, 76)))))))).toStrictEqual(
    new RGBColor(213, 213, 75.99999999999999)
  );
  expect(HSVToRGB(RGBToHSV(HSVToRGB(RGBToHSV(HSVToRGB(RGBToHSV(new RGBColor(54, 0, 34)))))))).toStrictEqual(
    new RGBColor(54, 0, 34.00000000000001)
  );
});

test('Shift Hue', () => {
  expect(ShiftHue(new HSVColor(0, 0, 100), 180)).toStrictEqual(new HSVColor(180, 0, 100));
  expect(ShiftHue(new HSVColor(0, 0, 100), 180 * 5)).toStrictEqual(new HSVColor(180, 0, 100));
  expect(ShiftHue(new HSVColor(313, 0, 0), 35)).toStrictEqual(new HSVColor(348, 0, 0));
  expect(ShiftHue(new HSVColor(240, 0, 0), 180)).toStrictEqual(new HSVColor(60, 0, 0));
  expect(ShiftHue(new HSVColor(240, 0, 0), -180)).toStrictEqual(new HSVColor(60, 0, 0));
  expect(ShiftHue(new HSVColor(240, 0, 0), -180 * 5)).toStrictEqual(new HSVColor(60, 0, 0));
});

test('Set', () => {
  expect(new Color('#000').Get('object')).toStrictEqual(new RGBColor(0, 0, 0, 1));
  expect(new Color('rgb(0, 0, 0)').Get('object')).toStrictEqual(new RGBColor(0, 0, 0, 1));
  expect(new Color('rgba(255 0 0 0)').Get('object')).toStrictEqual(new RGBColor(1, 0, 0, 0));
  expect(new Color('#00000000').Get('object')).toStrictEqual(new RGBColor(0, 0, 0, 0));
  expect(new Color('#00000000').Get('rgba')).toStrictEqual('rgba(0, 0, 0, 0.00)');
  expect(new Color('#fff').Get('rgba')).toStrictEqual('rgba(255, 255, 255, 1.00)');
});

test('Set Warning', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();
  new Color('#00');
  new Color('#00113');
  new Color('#0011345');
  new Color('rb(0, 0, 0)');
  new Color('rgba 0 0 0 0)');
  new Color('[1, 1, 1, 1]');
  expect(spy).toBeCalledWith('[S.Color] Invalid String Input:', expect.anything());
  spy.mockRestore();
});

test('HVS to RGB', () => {
  expect(HSVToRGB(new HSVColor(0, 1, 1))).toStrictEqual(new RGBColor(1, 0, 0));
  expect(HSVToRGB(new HSVColor(120, 1, 1))).toStrictEqual(new RGBColor(0, 1, 0));
  expect(HSVToRGB(new HSVColor(240, 1, 1))).toStrictEqual(new RGBColor(0, 0, 1));
});
test('String to RGB', () => {
  expect(StringToRGB('#f00')).toStrictEqual(new RGBColor(1, 0, 0));
  expect(StringToRGB('#00ff00')).toStrictEqual(new RGBColor(0, 1, 0));
  expect(StringToRGB('#afdfdaff')).toStrictEqual(new RGBColor(0.6862745098039216, 0.8745098039215686, 0.8549019607843137));
});
test('String to RGB Warning', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();
  StringToRGB('#f0');
  StringToRGB('ff0');
  StringToRGB('#f00000000');
  expect(spy).toBeCalledWith('[S.Color] Invalid String Input:', expect.anything());
  spy.mockRestore();
});
test('RGB to HEX', () => {
  expect(RGBToHEX({ r: 0, g: 0, b: 0, a: 1 })).toStrictEqual('#000000ff');
  expect(RGBToHEX({ r: 1, g: 0, b: 0, a: 1 })).toStrictEqual('#ff0000ff');
  expect(RGBToHEX({ r: 1, g: 1, b: 0, a: 1 })).toStrictEqual('#ffff00ff');
  expect(RGBToHEX({ r: 0, g: 0, b: 166, a: 1 })).toStrictEqual('#0000a6ff');
  expect(RGBToHEX({ r: 148, g: 53, b: 34, a: 111 / 255 })).toStrictEqual('#9435226f');
  expect(RGBToHEX({ r: 148, g: 53, b: 34, a: 111 })).toStrictEqual('#9435226f');
  expect(RGBToHEX({ r: 227, g: 135, b: 13, a: 1 })).toStrictEqual('#e3870dff');
  expect(RGBToHEX({ r: 13, g: 13, b: 13, a: 1 })).toStrictEqual('#0d0d0dff');
  expect(RGBToHEX({ r: 167, g: 0.7307692307692264, b: 0, a: 1 })).toStrictEqual('#a70100ff');
});

test('String to HSV', () => {
  expect(StringToHVS('#ff0000')).toStrictEqual(new HSVColor(0, 100, 100));
});
