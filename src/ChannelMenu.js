/**
 * Created by joe on 4/29/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

class ChannelMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  handleMenu = (command) => {
    this.handleClose();
    this.props.handleChannelMenu(command);
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          disabled={this.props.disabled}
          color="inherit"
          aria-label="Menu"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={event => {this.handleMenu('close')}}>Close</MenuItem>
          <MenuItem onClick={event => {this.handleMenu('break')}}>Break</MenuItem>
          <MenuItem onClick={event => {this.handleMenu('advanced')}}>Advanced...</MenuItem>
        </Menu>
      </div>
    );
  }
}

ChannelMenu.propTypes = {
  disabled: PropTypes.bool,
  handleChannelMenu: PropTypes.func.isRequired,
};

export default ChannelMenu;