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
import { Typography } from '@material-ui/core';

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
    height: 300,
  },
  qrExplainer: {
    padding: '0px 20px',
    textAlign: 'justify',
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
        localStorage.setItem('pairedNode', data);
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

    var x = Math.abs((window.innerWidth - 250) / 2);

    var message = (
      <Typography style={{fontSize:'12pt'}}>
      In order to connect you to the Lightning Network, please pair this app
      with a running lit node by scanning its pairing QR-code with the viewfinder above.
      </Typography>
    );

    if(this.props.connectFailed === true) {
      message = (
        <Typography style={{fontSize:'12pt'}}>
        The connection to lit failed. Check the lit node or use the viewfinder to
        pair again.
        </Typography>
      );
    }

    return (
      <div>
            <div className={classes.qr}>
              <QrSendReader
                delay={200}
                handleScan={this.handleQrScan.bind(this)}
                nativeRect={x.toString() + ',90,250,250'}
              />
            </div>
            <div className={classes.qrExplainer}>
              {message}
            </div>
      </div>
    );
  }
}

ConnectPage.propTypes = {
  handleConnectSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConnectPage);
