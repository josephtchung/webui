import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {formatCoin} from './CoinTypes.js';
import './BalanceCard.css' // highlight css style (@keyframes can't be done in MUI styles)

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    marginBottom: 0,
  },
  content: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balances: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  numbers: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {},
});

class BalanceCard extends React.Component {

  state = {
    myBalance: 0,
    highlight: false,
  };

  // Notice when a new balance is coming in so we can trigger the highlight animation
  componentWillReceiveProps(nextProps) {
    if (this.state.myBalance === 0) { // don't highlight if it's the first real balance
      this.setState({myBalance: nextProps.balance.ChanTotal + nextProps.balance.TxoTotal});
    } else if (this.state.myBalance !==  nextProps.balance.ChanTotal + nextProps.balance.TxoTotal) {
      this.setState({
        myBalance: nextProps.balance.ChanTotal + nextProps.balance.TxoTotal,
        highlight: true
      });
      setTimeout(() => {
        this.setState({highlight: false})
      }, 1000); // bit icky, but reset the highlight state
    }
  }


  render() {

    const {classes} = this.props;
    let balance = this.props.balance;

    return (

      <Card raised={false} className={classes.card + (this.state.highlight ? " BackHighlight" : "")}>

        <div className={classes.content}>

          <div>
            <img height="40" width="40" alt="Coin Icon" src={'coinicons/' + balance.CoinType + '.png'}/>
          </div>
          <div className={classes.balances}>

            <div className={classes.numbers + (this.state.highlight ? " BalHighlight" : "")}>
              <Typography variant="headline">
                {formatCoin(balance.ChanTotal + balance.TxoTotal, balance.CoinType)}
              </Typography>
            </div>
            { /*
            <div className={classes.numbers}>
              <Typography>
                Channel: {formatCoin(balance.ChanTotal, balance.CoinType, false)}
              </Typography>
            </div>

            <div className={classes.numbers}>
              <Typography>
                On Chain: {formatCoin(balance.TxoTotal, balance.CoinType, false)}
              </Typography>
            </div>
            */ }
          </div>

        </div>

      </Card>
    );
  }
}

BalanceCard.propTypes = {
  balance: PropTypes.object.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
};


export default withStyles(styles)(BalanceCard);
