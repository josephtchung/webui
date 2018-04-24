/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class ChannelPayDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state.amount);
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Pay</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Pay to Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the amount to pay (in mBTC)
            </DialogContentText>
            <Input
              autoFocus
              id="amount"
              label="Amount"
              type="text"
              fullWidth
              onChange={this.handleChange('amount')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Pay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}