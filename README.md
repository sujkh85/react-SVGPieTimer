react-SVGPieTimer
================

React component for an animated SVG Pie Timer.

Recommended use
---------------

```javascript
<SVGPieTimer
	height={250}
	width={250}
	duration={2000}
	loops={2}
/>
```

Properties
---------------
As seen above, you will need the following properties:

`width` (mandatory) Set the width of the svg. 

`height` (mandatory) Set the height of the svg. 

`duration` (optional) Set duration in milliseconds. Defaults to 1000.

`loops` (optional) Set amount of spins. Set to 0 for infinite spins. Defaults to 1.

Pie colors
---------------
You can set the color for the inner circle and the outer circle by setting the values in these classes:

```css
.svg-loader { 
  fill: #0088cc;
}

.svg-border { 
  fill: #00517a;
}
```

requestAnimationFrame
---------------
To optimize for performance, I've decided to use requestAnimationFrame. Browser support is good, but could have been better. I recommend using a polyfill for older browsers like IE9. Personally I prefer [this one](https://github.com/darius/requestAnimationFrame) by Darius Bacon, based on the polyfill by Erik Möller.


Authors and credits
---------------
React component created by [Fabian Enos](http://fabianenos.com/).

Animation code created by [Anders Grimsrud](http://grint.no). 

Inspired by the [Color Wheel](http://itpastorn.github.io/webbteknik/future-stuff/svg/color-wheel.html) by [Lars Gunther](https://github.com/itpastorn).

History
---------------
[React version](https://github.com/fabianTMC/react-SVGPieTimer) 

[Refined SVG Pie Timer](https://github.com/agrimsrud/svgPieTimer.js)

[Initial SVG Pie Timer](http://codepen.io/agrimsrud/pen/EmCoa) experiment.


License
---------------
Released under the [MIT License](http://opensource.org/licenses/mit-license.php).
