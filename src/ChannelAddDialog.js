/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import AddIcon from '@material-ui/icons/Add';



const coinStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const coinOptions = [
  'Coin Type',
  'mBTC',
  'mBTC-t ',
  'mBTC-r',
];

class CoinMenuBase extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
    this.props.onSelect(index);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={coinOptions[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {coinOptions.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const CoinMenu = withStyles(coinStyles)(CoinMenuBase);

const styles = theme => ({
  content: {
    minWidth: 400,
  },
  amountBox: {
    display: 'flex',
  }
});

const coinTypes = [0, 0, 1, 257]; // BTC, BTC, Testnet, Regtest TODO - figure out a better coin / denom feature

class ChannelAddDialog extends React.Component {
  state = {
    open: false,
    amount: 0,
    coinselect: 1,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.handleAddSubmit(this.props.peerIndex, coinTypes[this.state.coinselect], this.state.amount);
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCoinSelect(index) {
    this.setState({
      coinselect: index,
    });
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="fab" color="secondary" onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Channel</DialogTitle>
          <DialogContent className={classes.content}>
              <DialogContentText>
                Enter amount to fund
              </DialogContentText>
            <div className={classes.amountBox}>
              <CoinMenu onSelect={this.handleCoinSelect.bind(this)}/>
              <Input
                autoFocus
                id="amount"
                label="Amount"
                type="text"
                fullWidth
                onChange={this.handleChange('amount')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Fund
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


ChannelAddDialog.propTypes = {
  handleAddSubmit: PropTypes.func.isRequired,
  peerIndex: PropTypes.string.isRequired,
};


export default withStyles(styles)(ChannelAddDialog);
