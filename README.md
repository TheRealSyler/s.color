# _Simple Library for color conversion_

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
colorA.Get('object-long'); // { red: 0.4, green: 0.06666666666666667, blue: 0.26666666666666666, alpha: 1 }
colorA.Get('rgb'); // 'rgb(102, 17, 68)'
colorA.Get('rgba'); // 'rgba(102, 17, 68, 1.00)'

// Set Color
colorA.Set({ r: 0.3, g: 0.44, b: 0.5, a: 0.5 });
colorA.Set('rgb(23, 21, 243)');
colorA.Set('rgba(23 21 243 0.5)');
colorA.Set('#3412350a');
colorA.Set('#a4a');

```


## **Contributing**

The source for this library is available on [github](https://github.com/TheRealSyler/s.color). If anyone feels that there is something missing or would like to suggest improvements please [open a new issue](https://github.com/TheRealSyler/s.color/issues/new?assignees=TheRealSyler&labels=enhancement&title=)