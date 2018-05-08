/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";
import IconButton from 'material-ui/IconButton';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import Checkbox from 'material-ui/Checkbox';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import SettingsIcon from 'material-ui-icons/Settings';
import PopUpDialog from './PopUpDialog.js'

const styles = theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});


class SettingsDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        rpcAddress: props.rpcAddress,
        rpcPort: props.rpcPort,
        rpcRefresh: props.rpcRefresh,
      });
  }



  handleSubmit() {
    this.props.handleSettingsSubmit(this.state.rpcAddress, this.state.rpcPort, this.state.rpcRefresh);
    super.handleSubmit();
  };

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.handleClickOpen.bind(this)}
        >
          <SettingsIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Settings</DialogTitle>
          <DialogContent className={classes.content}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="rpcAddress">RPC Address</InputLabel>
                <Input
                  id="rpcAddress"
                  value={this.state.rpcAddress}
                  onChange={this.handleChange('rpcAddress').bind(this)} />
              </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="rpcPort">RPC Port</InputLabel>
              <Input
                id="rpcPort"
                value={this.state.rpcPort}
                onChange={this.handleChange('rpcPort').bind(this)} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.rpcRefresh}
                    onChange={this.handleCheckboxChange('rpcRefresh')}
                    value="rpcRefresh"
                  />
                }
                label="Automatically Refresh"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SettingsDialog.propTypes = {
  handleSettingsSubmit: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  rpcAddress: PropTypes.string.isRequired,
  rpcPort: PropTypes.number.isRequired,
  rpcRefresh: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SettingsDialog);
