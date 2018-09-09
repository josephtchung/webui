/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import Button from '@material-ui/core/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'
import SendIcon from '@material-ui/icons/ArrowUpward';

const styles = theme => ({
  content: {
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class BalanceSendDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        amount: 0,
        address: "",
      });
  }

  resetState() {
    this.setState({
      amount: 0,
      address: "",
    });
    super.resetState();
  }

  handleSubmit () {
    this.props.handleSendSubmit(this.state.address, Math.round(parseFloat(this.state.amount) * coinInfo[this.props.coinType].factor));
    super.handleSubmit();
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Send"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <SendIcon className={classes.extendedIcon} />
          Send
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send to Address</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Enter the amount to send in {coinInfo[this.props.coinType].denomination}
            </DialogContentText>
            <Input
              autoFocus
              id="amount"
              label="Amount"
              type="text"
              onChange={this.handleChange('amount').bind(this)}
            />
            <p/>
            <DialogContentText>
              Enter the Address to send to
            </DialogContentText>
            <Input
              id="address"
              label="Address"
              type="text"
              fullWidth
              onChange={this.handleChange('address').bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BalanceSendDialog.propTypes = {
  handleSendSubmit: PropTypes.func.isRequired,
  coinType: PropTypes.number.isRequired,
};

export default withStyles(styles)(BalanceSendDialog);
