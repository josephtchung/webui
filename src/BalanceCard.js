import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {formatCoin, formatUSD} from './CoinTypes.js';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    marginBottom: 0,
  },
  content: {
  },
  balances: {},
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {},
});

class BalanceCard extends React.Component {

  render() {

    const {classes} = this.props;
    let balance = this.props.balance;

    return (

      <Card raised={false} className={classes.card}>

        <CardContent className={classes.content}>

          <Typography variant="title">
            {formatCoin(balance.ChanTotal + balance.TxoTotal, balance.CoinType)}
          </Typography>

          <Typography>
            Channel: {formatCoin(balance.ChanTotal, balance.CoinType, false)}
          </Typography>

          <Typography>
            Txo: {formatCoin(balance.TxoTotal, balance.CoinType, false)}
          </Typography>

        </CardContent>

      </Card>
    );
  }
}

BalanceCard.propTypes = {
  balance: PropTypes.object.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
  coinRates: PropTypes.object.isRequired,
};


export default withStyles(styles)(BalanceCard);
