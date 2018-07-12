import React from 'react';

export default class PieTimer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initState();
  }

  initState = () => {
    // This part might be confusing:
    // If n==0, do infinite loops
    // In other cases where n is set, do n loops
    // If n is not set, do 1 loop
    // Do it this way to prevent mixing n==0 and !n
    const { props } = this;
    let duration = props.duration || 1000;
    let loops = props.loops === 0 ? 0 : props.loops ? props.loops : 1;
    let end = Date.now() + duration * loops;
    let totalDuration = duration * loops;
    return {
      duration,
      loops,
      end,
      totalDuration,
      showDuration: false
    };
  };

  // Animate frame by frame
  frame() {
    let current = Date.now(),
      remaining = this.state.end - current,
      // Now set rotation rate
      // E.g. 50% of first loop returns 1.5
      // E.g. 75% of sixth loop returns 6.75
      // Has to return >0 for SVG to be drawn correctly
      // If you need the current loop, use Math.floor(rate)

      rate = this.state.loops + 1 - remaining / this.state.duration;

    // As requestAnimationFrame will draw whenever capable,
    // the animation might end before it reaches 100%.
    // Let's simulate completeness on the last visual
    // frame of the loop, regardless of actual progress
    if (remaining < 60) {
      // 1.0 might break, set to slightly lower than 1
      // Update: Set to slightly lower than n instead
      this.draw(this.state.loops - 0.0001);

      // Stop animating when we reach the total number loops
      if (remaining < this.state.totalDuration && this.state.loops) return;
    }

    if (this.props.reverse && this.props.reverse === true) {
      rate = 360 - rate;
    }

    this.draw(rate);

    // Draw after requesting the next frame
    requestAnimationFrame(this.frame.bind(this));
  }

  draw(rate) {
    let angle = 360 * rate;

    angle %= 360;

    let rad = (angle * Math.PI) / 180,
      x = Math.sin(rad) * (this.props.width / 2),
      y = Math.cos(rad) * -(this.props.height / 2),
      mid = angle > 180 ? 1 : 0,
      sweepDirection = 1;

    if (this.props.inverse && this.props.inverse === true) {
      mid = Math.abs(mid - 1);
      sweepDirection = 0;
    }

    let shape =
      'M 0 0 v ' +
      -(this.props.height / 2) +
      ' A ' +
      this.props.width / 2 +
      ' ' +
      this.props.width / 2 +
      ' 1 ' +
      mid +
      ' ' +
      sweepDirection +
      ' ' +
      x +
      ' ' +
      y +
      ' z';

    this.refs.border.setAttribute('d', shape);
    this.refs.loader.setAttribute('d', shape);
  }

  fmtMSS = s => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
  };

  reflash = () => {
    const { clickRestart } = this.props;
    if (clickRestart) {
      this.setState(this.initState(), () => {
        this.frame();
        this.setTimer();
      });
    }
    if (this.props.onChange) {
      this.props.onChange('restart');
    }
  };

  timer = null;

  setTimer = () => {
    const { duration } = this.state;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange('timeout');
      }
    }, duration);
  };

  componentDidMount() {
    this.frame();
    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    const { restartKey } = this.props;
    if (restartKey !== prevProps.restartKey) {
      this.reflash();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { color, width, height } = this.props;
    return (
      <div
        onClick={this.reflash}
        style={{ width, height, borderRadius: '50%' }}
      >
        <svg
          style={{ cursor: 'pointer' }}
          width={width}
          height={height}
          viewBox={'0 0 ' + this.props.width + ' ' + this.props.height}
        >
          <path
            className="svg-border"
            ref="border"
            transform={
              'translate(' +
              this.props.width / 2 +
              ' ' +
              this.props.height / 2 +
              ')'
            }
            fill={color}
          />
          <path
            className="svg-loader"
            ref="loader"
            transform={
              'translate(' +
              this.props.width / 2 +
              ' ' +
              this.props.height / 2 +
              ')  scale(.84)'
            }
            fill={color}
          />
        </svg>
      </div>
    );
  }
}
