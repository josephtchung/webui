import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {formatCoin, formatUSD} from './CoinTypes.js';
import BalanceSendDialog from './BalanceSendDialog.js'
import BalanceReceiveDialog from './BalanceReceiveDialog.js'

const styles = theme => ({
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

      <Card raised={false}>

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
  newAddress: PropTypes.func.isRequired,
};


export default withStyles(styles)(BalanceCard);
