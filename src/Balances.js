/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {formatCoin, coinTypeString} from './util.js'


const styles = theme => ({
  root: {
    margin: 8,
  },
});

function Balances(props) {
  const {classes} = props;
  let balances = props.balances.map((balance, index) => {
    return (
      <Grid item xs={3} key={index}>
        <Card raised={true}>
          <CardHeader title={coinTypeString(balance.CoinType)} />
          <CardContent>
            <Typography className={classes.balance}>
              Channel: {formatCoin(balance.ChanTotal, balance.CoinType)}
            </Typography>
            <Typography className={classes.balance}>
              Txo: {formatCoin(balance.TxoTotal, balance.CoinType)}
            </Typography>
            <Typography variant="body2" className={classes.balance}>
              Total: {formatCoin(balance.ChanTotal + balance.TxoTotal, balance.CoinType)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  });
  return (
    <div className={classes.root}>
      <Grid container>
        {balances}
      </Grid>
    </div>
  );
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Balances);
