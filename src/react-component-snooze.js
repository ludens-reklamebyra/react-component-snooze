// @flow
import * as React from 'react';

interface SnoozeInterface {
  open: boolean;
  closing: boolean;
}

type Props = {
  children: SnoozeInterface => React.Node,
  open: boolean,
  closing: boolean
};

type State = {
  open: boolean,
  closing: boolean
};

export default class Snooze extends React.Component<Props, State> {
  state = {
    open: this.props.open || false,
    closing: this.props.closing || false
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleHandler = e => {
    const { open } = this.state;

    e.preventDefault();

    if (open) {
      this.setState({ closing: true });
      this.timeout = setTimeout(
        () => this.setState({ open: false, closing: false }),
        120
      );
    } else {
      clearTimeout(this.timeout);
      this.setState({ open: true, closing: false });
    }
  };

  render() {
    const { children } = this.props;
    const { open, closing } = this.state;
    const { toggleHandler } = this;

    return children({ toggleHandler, open, closing });
  }
}
