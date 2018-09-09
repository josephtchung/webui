import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ExchangeIcon from '@material-ui/icons/CompareArrows';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100vw',
  },
};

class BottomNav extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation
        className={classes.root}
        value={this.props.selected}
        onChange={this.props.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Exchange" icon={<ExchangeIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
  }
}


BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,

};

export default withStyles(styles)(BottomNav);
