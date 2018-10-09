/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core//Grid'
import Divider from '@material-ui/core/Divider';
import BalanceCard from './BalanceCard';
import PaymentHistoryCard from './PaymentHistoryCard';
import BalanceReceiveDialog from './BalanceReceiveDialog';
import BalanceSendDialog from './BalanceSendDialog';
import ExchangeDialog from './ExchangeDialog';

const styles = theme => ({
  root: {},
  balances: {},
  payments: {
    marginTop: theme.spacing.unit,
    paddingBottom: 80,
  },
  buttons: {
    position: 'fixed',
    width: '100vw',
    bottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-around',
  },
  divider: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

function Balances(props) {
  const {classes} = props;

  let balances = props.balances.map((balance, index) => {
    return (
      <Grid item xs={12} key={index} className={classes.cardBox}>
        <BalanceCard
          balance={balance}
          handleSendSubmit={props.handleSendSubmit}
        />
      </Grid>
    );
  });

  let payments = [];
  props.payments.map((payment, index) => {
    if (payment.Succeeded) {
      payments.push(
        <Grid item xs={12} key={index}>
          {payments.length > 0 &&
            <Divider light className={classes.divider}/>
          }
          <PaymentHistoryCard
            payment={payment}
          />
        </Grid>
      );
    }
    return null; //return value is unused
  });

  return (
    <div className={classes.root}>
      <Grid container className={classes.balances}>
        {balances}
      </Grid>
      <Grid container className={classes.payments}>
        {payments}
      </Grid>
      <div className={classes.buttons}>
        <BalanceSendDialog
          balances={props.balances}
          handleSendSubmit={props.handleSendSubmit}
        />
        <BalanceReceiveDialog
          address={props.receiveAddress}
        />
        <ExchangeDialog
          address={props.receiveAddress}
          balances={props.balances}
          handleSendSubmit={props.handleSendSubmit}
        />
      </div>
    </div>
  );
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
  receiveAddress: PropTypes.string.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
};


export default withStyles(styles)(Balances);
