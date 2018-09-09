/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import BalanceCard from './BalanceCard';
import BalanceReceiveDialog from './BalanceReceiveDialog';
import BalanceSendDialog from './BalanceSendDialog';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  cards: {
  },
  buttons: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-around',
    position: 'sticky',
    bottom: 64, // FIXME -- needed to show above the bottom nav, but obviously kind of gross
  },
});

function Balances(props) {
  const {classes} = props;
  let balances = props.balances.map((balance, index) => {
    return (
      <Grid item xs={12} key={index} className={classes.cardBox}>
        <BalanceCard
          balance={balance}
          coinRates={props.coinRates}
          handleSendSubmit={props.handleSendSubmit}
          newAddress={props.newAddress}
        />
      </Grid>
    );
  });
  return (
    <div className={classes.root}>
      <Grid container className={classes.cards}>
        {balances}
      </Grid>
      <div className={classes.buttons}>
        <BalanceReceiveDialog
          coinType="257"
          newAddress={props.newAddress}
        />
        <BalanceSendDialog
          coinType="257"
          handleSendSubmit={props.handleSendSubmit}
        />
      </div>
    </div>
  );
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
  coinRates: PropTypes.object.isRequired,
  newAddress: PropTypes.func.isRequired,
};



export default withStyles(styles)(Balances);
