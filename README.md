# mywork delete loops add clickRestart color restartKey onChange

## react-SVGPieTimer

React component for an animated SVG Pie Timer.
When you click on the timer, it will show you the remaining time left. Click on it again, to hide the reminaing time.

## Recommended use

```javascript
<PieTimer
  height={100}
  width={100}
  duration={5 * 1000}
  loops={1}
  reverse={false}
  inverse={true}
  //mywork

  //pie color
  color={'blue'}
  //Click to restart.
  clickRestart={true}
  restartKey={'Change the word. Start again.'}
  //Executed when restarted.
  onChange={type => {
    console.log('restart or timeout', type);
  }}
/>
```

## Properties

As seen above, you will need the following properties:

`width` (mandatory) Set the width of the svg.

`height` (mandatory) Set the height of the svg.

`duration` (optional) Set duration in milliseconds. Defaults to 1000.

`loops` (optional) Set amount of spins. Set to 0 for infinite spins. Defaults to 1.

`reverse` (optional) Empty the circle from the reverse direction rather than fill it.

`inverse` (optional) Empty the circle from the same direction rather than fill it.

## Pie colors

You can set the color for the inner circle and the outer circle by setting the values in these classes:

```css
.svg-loader {
  fill: #0088cc;
}

.svg-border {
  fill: #00517a;
}
```

## requestAnimationFrame

To optimize for performance, I've decided to use requestAnimationFrame. Browser support is good, but could have been better. I recommend using a polyfill for older browsers like IE9. Personally I prefer [this one](https://github.com/darius/requestAnimationFrame) by Darius Bacon, based on the polyfill by Erik Möller.

## Authors and credits

React component created by [Fabian Enos](http://fabianenos.com/).

Animation code created by [Anders Grimsrud](http://grint.no).

Inspired by the [Color Wheel](http://itpastorn.github.io/webbteknik/future-stuff/svg/color-wheel.html) by [Lars Gunther](https://github.com/itpastorn).

## History

[React version](https://github.com/fabianTMC/react-SVGPieTimer)

[Refined SVG Pie Timer](https://github.com/agrimsrud/svgPieTimer.js)

[Initial SVG Pie Timer](http://codepen.io/agrimsrud/pen/EmCoa) experiment.

## License

Released under the [MIT License](https://github.com/fabianTMC/react-SVGPieTimer/blob/master/LICENSE.txt).
