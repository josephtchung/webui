import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies';
import SettingsDialog from './Settings.js';

const styles = theme => ({
  root: {
  },
  avatar: {
    marginRight: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
   // marginRight: theme.spacing.unit,
  },
});

function LitAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color={props.appBarColorPrimary ? "primary" : "secondary"}
      >
        <Toolbar>
          <Avatar className={classes.avatar}>
            <Blockies
              seed={props.address}
              size={10}
              scale={3}
              color="#FF5733"
              bgColor="#FFC300"
            />
          </Avatar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LitAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  appBarColorPrimary: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LitAppBar);
