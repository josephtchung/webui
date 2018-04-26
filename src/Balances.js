/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import {formatCoin} from './util.js'


const styles = theme => ({
  balancesGroup: {
    marginTop: 8,
    padding: 10,
  },
  cardBox: {
    minWidth: 240,
  },
});

function Balances(props) {
  const {classes} = props;
  let balances = props.balances.map((balance, index) => {
    return (
      <Grid item xs={3} key={index} className={classes.cardBox}>
        <Card raised={true}>
          <CardHeader title={formatCoin(balance.ChanTotal + balance.TxoTotal, balance.CoinType)} />
          <CardContent>
            <Typography className={classes.balance}>
              Channel: {formatCoin(balance.ChanTotal, balance.CoinType)}
            </Typography>
            <Typography className={classes.balance}>
              Txo: {formatCoin(balance.TxoTotal, balance.CoinType)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  });
  return (
    <div className={classes.balancesGroup}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="title">
            Balances
          </Typography>
        </Grid>
        {balances}
      </Grid>
    </div>
  );
}

Balances.propTypes = {
  classes: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
};



export default withStyles(styles)(Balances);
