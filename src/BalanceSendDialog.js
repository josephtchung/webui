/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/ArrowUpward';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'
import CoinMenu from './CoinMenu.js'
import QrSendReader from './QrSendReader.js'

const styles = theme => ({
  dialog: {},
  card: {
    margin: theme.spacing.unit,
    // padding: theme.spacing.unit * 2,
  },
  amount: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  qr: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  buttons: {
    marginTop: theme.spacing.unit,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'space-around',
  },
});


class BalanceSendDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        amount: "",
        coinType: -1,
        address: "",
      });
  }

  resetState() {
    this.setState({
      amount: "",
      coinType: -1,
      address: "",
    });
    super.resetState();
  }

  handleQrScan(data) {
    if (data !== null) {
      this.setState({
        address: data,
      });
    }
  }

  handleSubmit() {
    this.props.handleSendSubmit(this.state.address, this.state.coinType, this.state.coinType,
      Math.round(parseFloat(this.state.amount) * coinInfo[this.state.coinType].factor));
    super.handleSubmit();
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Send"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <SendIcon className={classes.extendedIcon}/>
          Send
        </Button>
        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
        <Card raised className={classes.card}>
          <DialogContent>
          <Grid container alignContent="flex-end">
            <Grid item xs={12}>
              <Typography variant="title">
                Send to Lightning Address
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.type}>
                <CoinMenu
                  onChange={this.handleChange('coinType').bind(this)}
                />
            </Grid>
            <Grid item xs={6} className={classes.amount}>
              <TextField
                className={classes.amount}
                id="amount"
                label="Amount"
                type="number"
                onChange={this.handleChange('amount').bind(this)}
              />
            </Grid>
            <Grid item xs={12} className={classes.address}>

            <TextField
              id="address"
              label="Address to Send to"
              type="text"
              fullWidth
              value={this.state.address}
              onChange={this.handleChange('address').bind(this)}
            />
            </Grid>

            <Grid item xs={12} className={classes.qr}>
              <QrSendReader
                delay={200}
                handleScan={this.handleQrScan.bind(this)}
              />
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              variant="contained"
              color="default"
              onClick={this.handleClose.bind(this)}
            >
              Cancel
            </Button>
            <Button
              disabled={this.state.amount === "" || this.state.address === "" || this.state.coinType === -1}
              variant="contained"
              color="primary"
              onClick={this.handleSubmit.bind(this)}
            >
              Send
            </Button>
          </DialogActions>
        </Card>
        </Dialog>
      </div>
    );
  }
}

BalanceSendDialog.propTypes = {
  handleSendSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceSendDialog);
