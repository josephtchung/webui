/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  caption: {
    margin: 4,
  },
  content: {
    minWidth: 500,
  },
});


class PeerAddDialog extends React.Component {
  state = {
    open: false,
    address: "",
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    this.props.handleAddSubmit(this.state.address);
    this.setState({open: false});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.buttonBox}>
          <Button variant="fab" color="primary" onClick={this.handleClickOpen}>
            <AddIcon />
          </Button>
          <Typography variant="caption" className={classes.caption}>
            Add Peer Connection
          </Typography>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Connect to New Peer</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Enter peer address
            </DialogContentText>
            <Input
              autoFocus
              id="address"
              label="Address"
              type="text"
              fullWidth
              onChange={this.handleChange('address')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Connect
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PeerAddDialog.propTypes = {
  handleAddSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(PeerAddDialog);

