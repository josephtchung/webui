/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import PopUpDialog from './PopUpDialog.js'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    // display: 'flex',
    // flexDirection: 'column',

  },
  formControl: {
  },
});


class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        settings: Object.assign({}, props.settings),
      };
  };

  handleCancel() {
    let settings = Object.assign({}, this.props.settings);
    this.setState({settings: settings});
  };

  handleSubmit() {
    this.props.handleSettingsSubmit(this.state.settings);
  };

  handleChange(name) {
    return (event => {
      let settings = Object.assign({}, this.state.settings);
      settings[name] = event.target.value;
      this.setState({settings: settings});
    });
  }

  handleCheckboxChange(name) {
    return (event => {
      let settings = Object.assign({}, this.state.settings);
      settings[name] = event.target.checked;
      this.setState({settings: settings});
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <form className={classes.root}>

        <FormControl className={classes.formControl}>

          <InputLabel htmlFor="rpcAddress">RPC Address</InputLabel>
          <Input
            id="rpcAddress"
            value={this.state.settings.rpcAddress}
            onChange={this.handleChange('rpcAddress').bind(this)}/>

          <InputLabel htmlFor="rpcPort">RPC Port</InputLabel>
          <Input
            id="rpcPort"
            value={this.state.settings.rpcPort}
            onChange={this.handleChange('rpcPort').bind(this)}/>

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.settings.rpcRefresh}
                onChange={this.handleCheckboxChange('rpcRefresh')}
                value="rpcRefresh"
              />
            }
            label="Automatically Refresh"
          />


          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.settings.appBarColorPrimary}
                onChange={this.handleCheckboxChange('appBarColorPrimary')}
                value="appBarColorPrimary"
              />
            }
            label="Primary App Bar Color"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.settings.hideClosedChannels}
                onChange={this.handleCheckboxChange('hideClosedChannels')}
                value="hideClosedChannels"
              />
            }
            label="Hide Closed Channels"
          />

        </FormControl>

        <div>
        <Button onClick={this.handleCancel.bind(this)} color="secondary">
          Cancel
        </Button>
        <Button onClick={this.handleSubmit.bind(this)} color="primary">
          Apply
        </Button>
        </div>
      </form>
    );
  }
}

Settings.propTypes = {
  handleSettingsSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
