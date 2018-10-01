/**
 * Created by joe on 4/21/18.
 * Refactored into separate file by gertjaap on 5/1/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {coinDenominations} from './CoinTypes.js'


const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: 60,
    alignItems: 'flex-end',
  },
  formControl: {
    width: 120,
  },
  denomination: {
   // marginLeft: theme.spacing.unit,
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
    this.setState({[event.target.name]: event.target.value});
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
                <img
                  src={'/coinicons/' + coinDenominations[denomination] + '.png'}
                  width="24"
                  height="24"
                />
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