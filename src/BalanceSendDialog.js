/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {ArrowUpBoldOutline} from 'mdi-material-ui';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'
import CoinMenu from './CoinMenu.js'
import QrSendReader from './QrSendReader.js'
import {QrcodeScan} from 'mdi-material-ui'
import {formatCoin, parseCoin, exchangeRates, channelFee, minimumOutput} from './CoinTypes.js';

const styles = theme => ({
  dialog: {},
  card: {
    margin: theme.spacing.unit,
  },
  content: {
  },
  avail: {
    marginTop: theme.spacing.unit,
  },
  amount: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  qrIcon: {
    marginRight: theme.spacing.unit,
  },
  qr: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
  },
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  buttons: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
});

class BalanceSendDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, this.initialState());
  }

  // override to return the initial state for construction and resetting
  initialState () {
    return {
      amount: "",
      coinType: -1,
      address: "",
      qrOpen: false,
    }
  }

  handleOpenQr() {
    this.setState({
      qrOpen: true,
    });
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

    let balance = 0;
    let minPayment = 0;
    let maxPayment = 0;


    if (this.state.coinType !== -1) {
      this.props.balances.forEach(
        b => {
          if (b.CoinType === this.state.coinType) {
            balance = b.ChanTotal;
            minPayment = channelFee + minimumOutput;
            maxPayment = balance - (channelFee + minimumOutput);
          }
        });
    }

    var qrx = Math.abs((window.innerWidth - 250) / 2);


    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Send"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <ArrowUpBoldOutline className={classes.extendedIcon}/>
          Send
        </Button>
        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container alignContent="flex-end">
                <Grid item xs={12}>
                  <Typography variant="title">
                    Send to Lightning Address
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.type}>
                  <CoinMenu
                    onChange={this.handleChange('coinType').bind(this)}
                  />
                </Grid>
                <Grid item xs={6} className={classes.amount}>
                  <TextField
                    id="amount"
                    label="Amount"
                    type="number"
                    onChange={this.handleChange('amount').bind(this)}
                  />
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={3} className={classes.avail}>
                  <Typography variant="caption">
                    Min: {minPayment > 0 && formatCoin(minPayment, this.state.coinType, false)}
                  </Typography>
                </Grid>
                <Grid item xs={3} className={classes.avail}>
                  <Typography variant="caption">
                    Max: {maxPayment > 0 && formatCoin(maxPayment, this.state.coinType, false)}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.address}>

                  <TextField
                    id="address"
                    label="Address to Send to"
                    type="text"
                    fullWidth
                    value={this.state.address}
                    onChange={this.handleChange('address').bind(this)}
                  />
                </Grid>

                <Grid item xs={12} className={classes.qr}>
                  {!this.state.qrOpen &&
                  <Button
                    variant="contained"
                    color="default"
                    size="large"
                    onClick={this.handleOpenQr.bind(this)}
                  >
                    <QrcodeScan className={classes.qrIcon}/>
                    Scan QR Code
                  </Button>
                  }
                  {this.state.qrOpen &&
                  <QrSendReader
                    delay={200}
                    handleScan={this.handleQrScan.bind(this)}
                    nativeRect={qrx + ',260,250,250'}
                  />
                  }
                </Grid>
              </Grid>
            </CardContent>

          </Card>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="default"
                onClick={this.handleClose.bind(this)}
              >
                Cancel
              </Button>
              <Button
                disabled={
                  this.state.coinType === -1 || parseCoin(this.state.amount, this.state.coinType) < minPayment ||
                  parseCoin(this.state.amount, this.state.coinType) > maxPayment ||
                  (typeof(this.state.address) === "string" && !this.state.address.startsWith("ln1"))}
                variant="contained"
                color="primary"
                onClick={this.handleSubmit.bind(this)}
              >
                Send
              </Button>
            </div>
        </Dialog>
      </div>
    );
  }
}

BalanceSendDialog.propTypes = {
  handleSendSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceSendDialog);
