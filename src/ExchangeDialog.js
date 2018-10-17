/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {ArrowUpDownBoldOutline} from 'mdi-material-ui';

import PopUpDialog from './PopUpDialog.js'
import CoinMenu from './CoinMenu';
import {coinInfo} from './CoinTypes.js'
import {formatCoin, parseCoin, exchangeRates, channelFee, minimumOutput} from './CoinTypes.js';


const styles = theme => ({
  root: {},
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  card: {
    margin: theme.spacing.unit,
    marginBottom: 0,
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
  buttons: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'space-around',
    // position: 'sticky',
    // bottom: 64, // FIXME -- needed to show above the bottom nav, but obviously kind of gross
  },
});


class ExchangeDialog extends PopUpDialog {


  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  // override to return the initial state for construction and resetting
  initialState () {
    return {
      fromCoinType: -1,
      fromAmount: 0,
      toCoinType: -1,
    }
  }

  handleChange(name) {
    return (event => {
      this.setState({
        [name]: event.target.value,
      });
    });
  }

  handleSubmit() {
    this.props.handleSendSubmit(this.props.address, this.state.toCoinType, this.state.fromCoinType,
      Math.round(parseFloat(this.state.fromAmount) * coinInfo[this.state.fromCoinType].factor));
    super.handleSubmit();
  };

  // returns true if the paramaters to the exchange are valid
  exchangeDisabled(avail, quantity) {

    if (this.state.fromCoinType === -1 || this.state.toCoinType === -1 ||
      this.state.fromAmount === "" || this.state.fromCoinType === this.state.toCoinType) {
      return true;
    }

    let fromSatoshis = parseCoin(this.state.fromAmount, this.state.fromCoinType);
    let availSatoshis = parseCoin(avail, this.state.fromCoinType);
    let toSatoshis = parseCoin(quantity, this.state.toCoinType);

    if (fromSatoshis < channelFee + minimumOutput) {
      console.log("below minimum payment");
      return true; // below minimum payment (11k)
    }

    if (availSatoshis - fromSatoshis < channelFee + minimumOutput) {
      console.log("balance cannot go below minimum");
      return true; // balance cannot go below minimum
    }

    if (toSatoshis < channelFee + minimumOutput) {
      console.log("exchange would result in a too low amount of target currency");
      return true; // exchange would result in a too low amount of target currency
    }
    return false;
  }

  render() {
    const {classes} = this.props;

    // all these are in satoshis
    let balance = 0;
    let exchange = 0;
    let minPayment = 0;
    let maxPayment = 0;

    if (this.state.open) {
      if (this.state.fromCoinType !== -1) {
        this.props.balances.forEach(
          b => {
            if (b.CoinType === this.state.fromCoinType) {
              balance = b.ChanTotal;
            }
          });
      }

      if (this.state.fromCoinType !== -1 && this.state.toCoinType !== -1) {
        let rate = exchangeRates[this.state.fromCoinType][this.state.toCoinType];
        exchange = Math.round(parseFloat(this.state.fromAmount) * coinInfo[this.state.fromCoinType].factor * rate);
        minPayment = Math.max(channelFee + minimumOutput, (channelFee + minimumOutput) / rate);
        maxPayment = balance - (channelFee + minimumOutput);
      }

    }

    return (
      <div className={classes.root}>
        <Button
          variant="extendedFab"
          aria-label="Send"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <ArrowUpDownBoldOutline className={classes.extendedIcon}/>
          XCHG
        </Button>
        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent className={classes.content}>
                  <Grid container alignContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="title">
                        Exchange
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.type}>
                      <CoinMenu
                        onChange={this.handleChange('fromCoinType').bind(this)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.amount}>
                      <TextField
                        id="amount"
                        label="Amount"
                        type="number"
                        onChange={this.handleChange('fromAmount').bind(this)}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={3} className={classes.avail}>
                      <Typography variant="caption">
                        Min: {minPayment > 0 && formatCoin(minPayment, this.state.fromCoinType, false)}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.avail}>
                      <Typography variant="caption">
                        Max: {maxPayment > 0 && formatCoin(maxPayment, this.state.fromCoinType, false)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card raised={false} className={classes.card}>
                <CardContent className={classes.content}>
                  <Grid container alignContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="title">
                        For
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.type}>
                      <CoinMenu
                        onChange={this.handleChange('toCoinType').bind(this)}
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.amount}>
                      <Typography variant="subheading">
                        Qty: {exchange > 0 && formatCoin(exchange, this.state.toCoinType, false)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="default"
              onClick={this.handleClose.bind(this)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={
                this.state.fromCoinType === -1 || this.state.toCoinType === -1 ||
                this.state.fromAmount === "" || this.state.fromCoinType === this.state.toCoinType ||
                parseCoin(this.state.fromAmount, this.state.fromCoinType) < minPayment ||
                parseCoin(this.state.fromAmount, this.state.fromCoinType) > maxPayment
              }
              onClick={this.handleSubmit.bind(this)}
            >
              Exchange
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

ExchangeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
};

export default withStyles(styles)(ExchangeDialog);
