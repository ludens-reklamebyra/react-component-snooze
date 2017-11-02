// @flow
import * as React from 'react';

interface SnoozeInterface {
  triggerClose: Function;
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
  timeout = null;
  state = {
    open: this.props.open || false,
    closing: this.props.closing || false,
    snooze: this.props.snooze || 120
  };

  triggerClose = (e: Event): void => {
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
    const { triggerClose } = this;

    return open ? children({ triggerClose, closing }) : null;
  }
}
