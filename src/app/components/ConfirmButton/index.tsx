import * as React from 'react';
import {Button, Confirm, ButtonProps, Popup} from 'semantic-ui-react';

interface IProps {
  promptText: string;
  confirmText?: string;
  cancelText?: string;
  buttonProps?: ButtonProps;
  onConfirm: ()=>Promise<any>;
  onCancel?: ()=>void;
  tooltip?: string;
}

interface IState {
  show: boolean;
  doing: boolean;
  error?: string;
}

class ConfirmButton extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      doing: false,
      error: null,
    };
    this.show = this.show.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  private show() {
    this.setState({
      show: true,
      doing: this.state.doing,
      error: this.state.error,
    });
  };

  private handleCancel() {
    this.setState({
      show: false,
      doing: this.state.doing,
      error: this.state.error,
    });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  private handleConfirm() {
    this.setState({
      show: false,
      doing: true,
      error: null,
    });
    this.props.onConfirm()
    .then(() => {
      this.setState({
        show: this.state.show,
        doing: false,
        error: null,
      });
    })
    .catch((e: Error) => {
      this.setState({
        show: this.state.show,
        doing: false,
        error: e.message,
      });
    });
  }

  public render() {
    let tooltip: string|null = null;
    let buttonProps = this.props.buttonProps || {};
    if (this.props.tooltip) {
      tooltip = this.props.tooltip;
    }
    if (this.state.doing) {
      buttonProps = Object.assign({}, buttonProps, {
        loading: true,
        disabled: true,
      });
    }
    if (this.state.error) {
      buttonProps = Object.assign({}, buttonProps, {
        negative: true,
      });
      tooltip = this.state.error;
    }
    const inner = (
      <span>
        <Button onClick={this.show} {...buttonProps}>
          {this.props.children}
        </Button>
        <Confirm
          open={this.state.show}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content={this.props.promptText}
          confirmButton={this.props.confirmText}
          cancelButton={this.props.cancelText}
        />
      </span>
    );

    if (tooltip !== null) {
      return (
        <Popup
          trigger={inner}
          content={tooltip}
        />
      );
    } else {
      return inner;
    }
  }
}

export {ConfirmButton};
