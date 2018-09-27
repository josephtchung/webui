/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/ArrowUpward';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'
import CoinMenu from './CoinMenu.js'
import QrSendReader from './QrSendReader.js'

const styles = theme => ({
  dialog: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  typeAndAmount: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  type: {},
  amount: {
    width: 120,
  },
  qr: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  buttons: {
    marginTop: theme.spacing.unit,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'space-around',
  },
});


class BalanceSendDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        amount: "",
        coinType: -1,
        address: "",
      });
  }

  resetState() {
    this.setState({
      amount: "",
      coinType: -1,
      address: "",
    });
    super.resetState();
  }

  handleQrScan(data) {
    if (data !== null) {
      this.setState({
        address: data,
      });
    }
  }

  handleSubmit() {
    this.props.handleSendSubmit(this.state.address, this.state.coinType, this.state.coinType,
      Math.round(parseFloat(this.state.amount) * coinInfo[this.state.coinType].factor));
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
          <SendIcon className={classes.extendedIcon}/>
          Send
        </Button>
        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send to Address</DialogTitle>
          <DialogContent className={classes.content}>
            <div className={classes.typeAndAmount}>
              <div className={classes.type}>
                <CoinMenu
                  onChange={this.handleChange('coinType').bind(this)}
                />
              </div>
              <TextField
                className={classes.amount}
                id="amount"
                label="Amount"
                type="number"
                onChange={this.handleChange('amount').bind(this)}
              />
            </div>

            <TextField
              id="address"
              label="Address to Send to"
              type="text"
              fullWidth
              value={this.state.address}
              onChange={this.handleChange('address').bind(this)}
            />
            <div className={classes.qr}>
              <QrSendReader
                delay={200}
                handleScan={this.handleQrScan.bind(this)}
              />
            </div>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              variant="contained"
              color="default"
              onClick={this.handleClose.bind(this)}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.amount === "" || this.state.address === "" || this.state.coinType === -1}
              variant="contained"
              color="primary"
              onClick={this.handleSubmit.bind(this)}
            >
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
};

export default withStyles(styles)(BalanceSendDialog);
