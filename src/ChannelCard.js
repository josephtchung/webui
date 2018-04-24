/**
 * Created by joe on 4/11/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {formatCoin} from './util.js'
import ChannelPayDialog from './ChannelPayDialog';
import './ChannelCard.css'

const styles = theme => ({
  tool: {
    display: 'flex',
  },
  card: {
    minWidth: 240,
  },
  cardDisabled: {
    minWidth: 240,
    backgroundColor: 'lightGrey',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  balance: {
    fontSize: 14,
  },
  actions: {
    display: 'flex',
  },
  pay: {
    marginLeft: 'auto',
  },
  divider: {
  }
});

/*
 * Component for displaying the actual channel balances. Text right now, but will be graphical at some point!
 */
const ChannelBalance = withStyles(styles)((props) => {
  const {classes} = props;
  return (
    <div className={props.highlight ? "Highlight" : ""}>
      <Typography variant="body2" className={classes.balance}>
        Your Balance: {formatCoin(props.myBalance, props.coinType)}
      </Typography>
      <Typography className={classes.balance} color="textSecondary">
        Capacity: {formatCoin(props.capacity, props.coinType)}
      </Typography>
      <Typography className={classes.balance}>
        Their Balance: {formatCoin(props.capacity - props.myBalance, props.coinType)}
      </Typography>
    </div>
  );
});

ChannelBalance.propTypes = {
  myBalance: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
};


/*
 * Main ChannelCard component
 */
class ChannelCard extends React.Component {

  state = {
    myBalance: 0,
    highlight: false,
  };

  handleChannelPaySubmit(amount) {
    this.props.handleSubmit(this.props.channel, amount);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.state);
    if (nextProps.channel.MyBalance !== this.state.myBalance) {
      this.setState ({
        myBalance: nextProps.channel.MyBalance,
        highlight: true
      });
      setTimeout(()=>{this.setState({highlight: false})}, 500); // bit kludgey!
    }
  }

 render () {

   const {classes} = this.props;

   // conditional rendering if channel is closed
   let menuButton;
   let payButton;
   if (this.props.disabled) {
     menuButton =
       <IconButton disabled className={classes.menuButton} color="inherit" aria-label="Menu">
         <MenuIcon />
       </IconButton>

     payButton =
       <Button disabled className={classes.pay}>Pay</Button>

   } else {
     menuButton =
       <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
         <MenuIcon />
       </IconButton>

     payButton =
       <div className={classes.pay}>
         <ChannelPayDialog handleSubmit={this.handleChannelPaySubmit.bind(this)}/>
       </div>
   }

   return (
     <div>
       <Card raised={true} className={(this.props.disabled ? classes.cardDisabled : classes.card)}>
         <CardHeader title={"Channel " + this.props.channel.CIdx}
                     action={menuButton} />
         <CardContent>
           <ChannelBalance
             highlight={this.state.highlight}
             capacity={this.props.channel.Capacity}
             coinType={this.props.channel.CoinType}
             myBalance={this.props.channel.MyBalance}
           />
         </CardContent>
         <CardActions className={classes.action} disableActionSpacing>
           {payButton}
         </CardActions>
       </Card>
     </div>
   );
 }
}

ChannelCard.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
};

export default withStyles(styles)(ChannelCard);
