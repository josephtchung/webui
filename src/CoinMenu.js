/**
 * Created by joe on 4/21/18.
 * Refactored into separate file by gertjaap on 5/1/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {coinDenominations} from './CoinTypes.js'


const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    width: 100,
  },
});

console.log(coinDenominations);

class CoinMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      denomination: "",
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event);
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="coin">Type</InputLabel>
        <Select
          value={this.state.denomination}
          onChange={this.handleChange}
          inputProps={{
            name: 'denomination',
            id: 'coin',
          }}
        >
          {Object.keys(coinDenominations).map(denomination => (
            <MenuItem
              key={denomination}
              value={coinDenominations[denomination]}
            >
              {denomination}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
    );
  }
}

CoinMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
};


export default withStyles(styles)(CoinMenu);