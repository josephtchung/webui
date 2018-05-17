import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SettingsDialog from './SettingsDialog.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function LitAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color={props.settings.appBarColorPrimary ? "primary" : "secondary"}
      >
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Lit Node {props.address}
          </Typography>
        <SettingsDialog
          settings={props.settings}
          handleSettingsSubmit={props.handleSettingsSubmit}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

LitAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  handleSettingsSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LitAppBar);
