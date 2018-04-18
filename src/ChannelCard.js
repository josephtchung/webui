/**
 * Created by joe on 4/11/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';


import {formatCoin} from './util.js'

const styles = theme => ({
  card: {
    minWidth: 240,
  },
  title: {
    marginBottom: 12,
    fontSize: 16,
  },
  balance: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  actions: {
    display: 'flex',
  },
  button: {
    marginLeft: 'auto',
  },
});

function ChannelCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card raised={true} className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>
            Chan {props.channel.CIdx}, Capacity: {formatCoin(props.channel.Capacity, props.channel.CoinType)}
          </Typography>
          <Divider/>
          <Typography className={classes.balance}>
            Your Balance: {formatCoin(props.channel.MyBalance, props.channel.CoinType)}
          </Typography>
          <Typography className={classes.balance} color="textSecondary">
            Their Balance: {formatCoin(props.channel.Capacity - props.channel.MyBalance, props.channel.CoinType)}
          </Typography>
        </CardContent>
        <CardActions className={classes.action} disableActionSpacing>
            <Button className={classes.button}>Pay</Button>
        </CardActions>
      </Card>
    </div>
  );
}

ChannelCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelCard);
