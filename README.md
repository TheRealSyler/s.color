# _Simple Library for color conversion_
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![CircleCI](https://img.shields.io/circleci/build/github/TheRealSyler/s.color)](https://circleci.com/gh/TheRealSyler/s.color)
## **Usage**

``` ts
import Color from 'simple-color';

// The constructor just calls color.Set() (look below)
const colorA = new Color('#614f');

// Get Color
colorA.Get(); // { r: 0.4, g: 0.06666666666666667, b: 0.26666666666666666, a: 1 }
colorA.Get('hex'); // '#661144ff'
colorA.Get('hex-short'); // '#614f'
colorA.Get('hex-without-alpha'); // '#661144'
colorA.Get('hex-without-alpha-short'); // '#614'
colorA.Get('object'); // { r: 0.4, g: 0.06666666666666667, b: 0.26666666666666666, a: 1 }
colorA.Get('rgb'); // 'rgb(102, 17, 68)'
colorA.Get('rgba'); // 'rgba(102, 17, 68, 1.00)'

// Set Color
colorA.Set({ r: 0.3, g: 0.44, b: 0.5, a: 0.5 });
colorA.Set('rgb(23, 21, 243)');
colorA.Set('rgba(23 21 243 0.5)');
colorA.Set('#3412350a');
colorA.Set('#a4a');

// Converters
import {RGBToHSV, HSVToRGB, StringToRGB, StringToHVS, HSVToHEX, RGBToHEX} from 'simple-color';

StringToRGB('#f00') // {r: 1, g: 0, b: 0, a: 1}
RGBToHEX({ r: 148 / 255, g: 53 / 255, b: 34 / 255, a: 111 / 255 }) // '#9435226f'
// Same for all the other converters

// Color Types
import {RGBColor, HSVColor, StringColor} from 'simple-color';

const rgb = new RGBColor(1, 0, 0) // {r: 1, g: 0, b: 0, a: 1}
const hsv = new HSVColor(180, 0.6, 1, 0.5) // {r: 180, s: 0.6, v: 1, a: 0.5}
// Valid strings are #000 | #0000 | #000000 | #00000000
// Or rgb(0, 0, 0, 0) | rgba(0, 0, 0, 0, 0) Range [rgb 0-255, a: 0-1]
const string = new StringColor('#043') // string.color: '#043'


```


## **Contributing**

The source for this library is available on [github](https://github.com/TheRealSyler/s.color). If anyone feels that there is something missing or would like to suggest improvements please [open a new issue](https://github.com/TheRealSyler/s.color/issues/new?assignees=TheRealSyler&labels=enhancement&title=)