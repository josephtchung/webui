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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Lit Node {props.address}
          </Typography>
        <SettingsDialog
          rpcAddress={props.rpcAddress}
          rpcPort={props.rpcPort}
          rpcRefresh={props.rpcRefresh}
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
  rpcAddress: PropTypes.string.isRequired,
  rpcPort: PropTypes.number.isRequired,
  rpcRefresh: PropTypes.bool.isRequired,
  handleSettingsSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LitAppBar);
