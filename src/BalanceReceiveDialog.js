/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PopUpDialog from './PopUpDialog.js'
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({
  content: {
    minWidth: 500,
  },
});


class BalanceReceiveDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        address: "",
      });
  }

  handleClickOpen() {
    super.handleClickOpen();
    this.props.newAddress(1, this.props.coinType)
      .then(result => {
        this.setState({
          address: result.WitAddresses[0]
        });
      });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen.bind(this)}>Receive</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Receive Funds</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Ask sender to send to this address:
            </DialogContentText>
            <DialogContentText>
              {this.state.address}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BalanceReceiveDialog.propTypes = {
  coinType: PropTypes.number.isRequired,
  newAddress: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceReceiveDialog);
