/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/ArrowUpward';
import {coinInfo} from './CoinTypes.js'
import PopUpDialog from './PopUpDialog.js'
import CoinMenu from './CoinMenu.js'
import QrSendReader from './QrSendReader.js'

const styles = theme => ({
  dialog: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  typeAndAmount: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  type: {},
  amount: {
    width: 120,
  },
  qr: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  buttons: {
    marginTop: theme.spacing.unit,
    marginBottom: 32,
    display: 'flex',
    justifyContent: 'space-around',
  },
});


class ConnectPage extends React.Component {

  constructor(props) {
    super(props);
    this.submitted = false;
    this.state = 
      {
        address: "",
        submitted : false,
      };
  }

  resetState() {
    this.setState({
      address: "",
    });
    super.resetState();
  }

  handleQrScan(data) {
    if (data !== null) {
      if(data.substring(0,3) === "ln1" && !this.submitted)
      {
        this.submitted = true;
        this.props.handleConnectSubmit(data);
      }
    }
  }

  handleSubmit() {
    this.props.handleConnectSubmit(this.state.address);
    super.handleSubmit();
  };

  handleChange(name) {
    return (event => {
      this.setState({
        [name]: event.target.value,
      });
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
            <div className={classes.qr}>
              <QrSendReader
                delay={200}
                handleScan={this.handleQrScan.bind(this)}
              />
            </div>

      </div>
    );
  }
}

ConnectPage.propTypes = {
  handleConnectSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConnectPage);
