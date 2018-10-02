import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core//Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Blockies from 'react-blockies';

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
  },
  avatar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

function LitAppBar(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color={props.appBarColorPrimary ? "primary" : "secondary"}
      >
        <Grid container alignItems="center" className={classes.grid}>

          <Grid item xs={4} className={classes.logo}>
            <img
              src="litlogo145.png"
              height="40"
              width="40"
              />
          </Grid>

          <Grid item xs={4} className={classes.title}>
            <Typography variant="title" color="inherit">
              {props.title}
            </Typography>
          </Grid>

          <Grid item xs={4} className={classes.avatar}>
            <Avatar>
              <Blockies
                seed={props.address}
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

LitAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  appBarColorPrimary: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LitAppBar);
