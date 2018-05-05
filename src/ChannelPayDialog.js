/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'

class ChannelPayDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        amount: 0,
      });
  }

  resetState() {
    this.setState({
      amount: 0,
    });
    super.resetState();
  }

  handleSubmit () {
    this.props.handlePaySubmit(Math.round(parseFloat(this.state.amount) * coinInfo[this.props.coinType].factor));
    super.handleSubmit();
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen.bind(this)}>Pay</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Pay to Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the amount to pay in {coinInfo[this.props.coinType].denomination}
            </DialogContentText>
            <Input
              autoFocus
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              onChange={this.handleChange('amount').bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Pay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ChannelPayDialog.propTypes = {
  handlePaySubmit: PropTypes.func.isRequired,
  coinType: PropTypes.number.isRequired,
};

export default ChannelPayDialog;
