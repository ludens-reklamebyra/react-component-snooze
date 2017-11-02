// @flow
import * as React from 'react';

interface SnoozeInterface {
  open: boolean;
  closing: boolean;
}

type Props = {
  children: SnoozeInterface => React.Node,
  open: boolean,
  closing: boolean,
  snooze: number
};

type State = {
  open: boolean,
  closing: boolean,
  snooze: number
};

export default class Snooze extends React.Component<Props, State> {
  state = {
    open: this.props.open || false,
    closing: this.props.closing || false,
    snooze: this.props.snooze || 120
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  snoozeHandler = e => {
    const { open, snooze } = this.state;

    e.preventDefault();

    if (open) {
      this.setState({ closing: true });
      this.timeout = setTimeout(
        () => this.setState({ open: false, closing: false }),
        snooze
      );
    } else {
      clearTimeout(this.timeout);
      this.setState({ open: true, closing: false });
    }
  };

  render() {
    const { children } = this.props;
    const { open, closing } = this.state;
    const { snoozeHandler } = this;

    return children({ snoozeHandler, open, closing });
  }
}
