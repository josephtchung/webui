import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core//Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies';
import AboutDialog from './AboutDialog.js'
import SettingsDialog from './SettingsDialog.js'

const styles = theme => ({
  appBar: {
    backgroundColor: '#c2c0bf',
  },
  grid: {
    padding: theme.spacing.unit,
  },
  logo: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing.unit,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: '#8a8b8c',
  },
});

class LitAppBar extends React.Component {

  handleLogoClick() {
    // force an update when you click on the logo
    this.props.handleUpdate();
  }

  render() {
    const {classes} = this.props;
    return (
        <AppBar
          position="static"
          color= "inherit"
          className={classes.appBar}
        >
          <Grid container alignItems="center" className={classes.grid}>

            <Grid item xs={3} className={classes.logo}>
              <AboutDialog>
                <img
                  src="images/litlogo.png"
                  alt="lit logo"
                  height="40"
                  width="40"
                  onClick={this.handleLogoClick.bind(this)}
                />
              </AboutDialog>
            </Grid>

            <Grid item xs={6} className={classes.title}>
              <Typography variant="title" color="inherit">
                {this.props.title}
              </Typography>
            </Grid>

            <Grid item xs={3} className={classes.avatarBox}>
              <SettingsDialog
                settings={this.props.settings}
                handleSubmit = {this.props.handleSettingsSubmit}
              >
              <Avatar className={classes.avatar}>
                <Blockies
                  seed={this.props.address}
                  size={10}
                  scale={3}
                  color="#FF5733"
                  bgColor="#FFC300"
                />
              </Avatar>
              </SettingsDialog>
            </Grid>

          </Grid>
        </AppBar>
    );
  }
}

LitAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSettingsSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LitAppBar);
