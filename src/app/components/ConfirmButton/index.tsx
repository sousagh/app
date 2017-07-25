import * as React from 'react';
import {Button, Confirm, ButtonProps} from 'semantic-ui-react';

interface IProps {
  promptText: string;
  confirmText?: string;
  cancelText?: string;
  buttonProps?: ButtonProps;
  onConfirm: ()=>void;
  onCancel?: ()=>void;
  tooltip?: string;
}

interface IState {
  show: boolean;
}

class ConfirmButton extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.show = this.show.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  private show() {
    this.setState({
      show: true,
    });
  };

  private handleCancel() {
    this.setState({
      show: false,
    });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  public render() {
    let buttonProps = this.props.buttonProps || {};
    if (this.props.tooltip) {
      buttonProps = Object.assign({}, buttonProps, {
        'data-balloon': this.props.tooltip,
        'data-balloon-pos': 'up',
      });
    }
    return (
      <div>
        <Button onClick={this.show} {...buttonProps}>
          {this.props.children}
        </Button>
        <Confirm
          open={this.state.show}
          onCancel={this.handleCancel}
          onConfirm={this.props.onConfirm}
          content={this.props.promptText}
          confirmButton={this.props.confirmText}
          cancelButton={this.props.cancelText}
        />
      </div>
    );
  }
}

export {ConfirmButton};
