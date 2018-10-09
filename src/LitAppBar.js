import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core//Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies';
import AboutDialog from './AboutDialog.js'

const styles = theme => ({
  root: {
  },
  grid: {
    padding: theme.spacing.unit,
  },
  logo: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'flex-end',
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
      <div className={classes.root}>
        <AppBar
          position="static"
          color= "primary"
        >
          <Grid container alignItems="center" className={classes.grid}>

            <Grid item xs={3} className={classes.logo}>
              <AboutDialog>
                <img
                  src="/images/litlogo145.png"
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

            <Grid item xs={3} className={classes.avatar}>
              <Avatar>
                <Blockies
                  seed={this.props.address}
                  size={10}
                  scale={3}
                  color="#FF5733"
                  bgColor="#FFC300"
                />
              </Avatar>
            </Grid>

          </Grid>
        </AppBar>
      </div>
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
