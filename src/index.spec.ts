import Color from './index';

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
  expect(a.Get('object')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
  expect(a.Get('object-long')).toStrictEqual({ red: 0, green: 0, blue: 0, alpha: 0 });
  const b = new Color({ r: 1, g: 1, b: 1, a: 1 });
  expect(b.Get('object')).toStrictEqual({ r: 1, g: 1, b: 1, a: 1 });
  expect(b.Get('object-long')).toStrictEqual({ red: 1, green: 1, blue: 1, alpha: 1 });
  const c = new Color({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 });
  expect(c.Get('object')).toStrictEqual({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 });
  expect(c.Get('object-long')).toStrictEqual({ red: 148 / 255, green: 53 / 255, blue: 34 / 255, alpha: 111 / 255 });
});
test('Set', () => {
  expect(new Color('#000').Get('object')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
  expect(new Color('rgb(0, 0, 0)').Get('object')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
  expect(new Color('rgba(0 0 0 0)').Get('object')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
  expect(new Color('#00000000').Get('object')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
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
  expect(spy).toBeCalledWith('[Simple Color] Invalid Input:', expect.anything());
  spy.mockRestore();
});
