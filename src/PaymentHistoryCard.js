import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import {ArrowDownBoldOutline} from 'mdi-material-ui';
import {ArrowUpBoldOutline} from 'mdi-material-ui';
import {ArrowUpDownBoldOutline} from 'mdi-material-ui';
import Blockies from 'react-blockies';
import {formatCoin, coinInfo} from './CoinTypes.js';


const styles = theme => ({
  card: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  content: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: '#606060',
  },
  message: {
    paddingLeft: theme.spacing.unit,
  },
  address: {
    fontSize: '.75em',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  divider: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

function pathAddress(path) {
  return path.split(":")[0];
}

function pathCoinType(path) {
  return parseInt(path.split(":")[1]);
}

class PaymentHistoryCard extends React.Component {


  render() {

    const {classes} = this.props;

    let payment = this.props.payment;
    let lastPath = payment.Path[payment.Path.length - 1];;
    let icon = null;
    let message = null;
    let address = null;

    if (payment.Amt === 0) { // 0 amount means receive for some reason
      icon = <ArrowDownBoldOutline/>;
      message =
        <span>
          Received {coinInfo[pathCoinType(lastPath)].denomination}
        </span>;
      address = pathAddress(lastPath);
    }
    else {
      icon = <ArrowUpBoldOutline/>;
      message =
        <span>
          Sent {formatCoin(payment.Amt, pathCoinType(lastPath))}
        </span>;
      address = pathAddress(lastPath);
    }

    return (
      <Fade in={true} timeout={750}>
        <div>
          {this.props.divider &&
          <Divider light />
          }
          <Grid container className={classes.content}>
            <Grid item xs={1} className={classes.icon}>
              {icon}
            </Grid>

            <Grid item xs={10} className={classes.message}>
              {message}
              <br/>
              <span className={classes.address}>
                {address}
              </span>
            </Grid>

            <Grid item xs={1} className={classes.avatar}>
              <Avatar>
                <Blockies
                  seed={address}
                  size={10}
                  scale={3}
                  color="#FF5733"
                  bgColor="#FFC300"
                />
              </Avatar>
            </Grid>
          </Grid>
        </div>
      </Fade>

    );
  }
}

PaymentHistoryCard.propTypes = {
  payment: PropTypes.object.isRequired,
  divider: PropTypes.bool.isRequired,
};


export default withStyles(styles)(PaymentHistoryCard);
