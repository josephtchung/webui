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
import Dialog from "@material-ui/core/Dialog/Dialog";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CoinMenu from "./CoinMenu";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
  card: {
  },
  buttons: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
});


class SettingsDialog extends PopUpDialog {


  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, this.initialState());
  }

  // override to return the initial state for construction and resetting
  initialState() {
    return {
      settings: Object.assign({}, this.props.settings),
    }
  }

  handleCancel() {
    let settings = Object.assign({}, this.props.settings);
    this.setState({settings: settings});
    this.handleClose();
  };

  handleSubmit() {
    this.props.handleSubmit(this.state.settings);
    super.handleSubmit();
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

      <span>
        <span
          onClick={this.handleClickOpen.bind(this)}
        >
          {this.props.children}
        </span>
         <Dialog
           className={classes.dialog}
           open={this.state.open}
           onClose={this.handleClose.bind(this)}
           aria-labelledby="form-dialog-title"
         >

          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="title">
                    Settings
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.checkbox}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.settings.resetPairing}
                        onChange={this.handleCheckboxChange('resetPairing')}
                        value="resetPairing"
                      />
                    }
                    label="Reset Pairing"
                  />
                </Grid>
              </Grid>

              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.handleCancel.bind(this)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
         </Dialog>
      </span>
    );
  }
}

SettingsDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsDialog);
