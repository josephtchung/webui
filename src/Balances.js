/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import {formatCoin} from './util.js'


const styles = theme => ({
  root: {
    margin: 8,
  },
});

function Balances(props) {
  const {classes} = props;
  let balances = props.balances.map(balance => {
    return (
      <Grid item xs={3}>
        <Card raised={true} c>
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
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subheading">
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
};


export default withStyles(styles)(Balances);
