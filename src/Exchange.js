/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import CoinMenu from './CoinMenu';
import {coinInfo} from './CoinTypes.js'
import {formatCoin, formatUSD} from './CoinTypes.js';


const styles = theme => ({
  root: {},
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    margin: theme.spacing.unit,
    marginBottom: 0,
  },
  avail: {
    marginTop: theme.spacing.unit,
  },
  amount: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  buttons: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-around',
    // position: 'sticky',
    // bottom: 64, // FIXME -- needed to show above the bottom nav, but obviously kind of gross
  },
});

class Exchange extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        fromCoinType: -1,
        fromAmount: 0,
        toCoinType: -1,
      };
  }

  handleChange(name) {
    return (event => {
      this.setState({
        [name]: event.target.value,
      });
    });
  }

  render() {
    const {classes} = this.props;

    let avail = 0;
    if (this.state.fromCoinType !== -1) {
      this.props.balances.forEach(
        b => {
          if (b.CoinType == this.state.fromCoinType) {
            avail = formatCoin(b.ChanTotal, b.CoinType, false);
          }
        });
    }


    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Card raised={false} className={classes.card}>
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
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6} className={classes.avail}>
                    <Typography variant="caption">
                      Avail: {avail}
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
                      Qty: 0.000
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="extendedFab"
            color="primary"
            disabled={this.state.fromCoinType === -1 || this.state.toCoinType === -1 ||
                      this.state.amount === 0  || this.state.fromCoinType === this.state.toCoinType}
          >
            Exchange
          </Button>
        </div>
      </div>
    );
  }
}

Exchange.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
};

export default withStyles(styles)(Exchange);
