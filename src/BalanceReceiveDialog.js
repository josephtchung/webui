/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ReceiveIcon from '@material-ui/icons/ArrowDownward';
import CopyIcon from '@material-ui/icons/Input';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import PopUpDialog from './PopUpDialog.js'

const styles = theme => ({
  dialog: {},
  card: {
    margin: theme.spacing.unit,
  },
  content: {
  },
  title: {
  },
  addressTitle: {
    marginTop: theme.spacing.unit,
  },
  address: {},
  copy: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  qr: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {},
  buttons: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class BalanceReceiveDialog extends PopUpDialog {

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Receive"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <ReceiveIcon className={classes.extendedIcon}/>
          Recv
        </Button>
        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container alignContent="flex-end">
                <Grid item xs={12} className={classes.title}>
                  <Typography variant="title">
                    Receive Funds
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.addressTitle}>
                  <Typography variant="subheading">
                    Your Lighting Address
                  </Typography>
                </Grid>
                <Grid item xs={4} className={classes.copy}>
                  <CopyToClipboard text={this.props.address}>
                    <Button
                      size="small"
                      className={classes.button}
                    >
                      <CopyIcon className={classes.extendedIcon}/>
                      Copy
                    </Button>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={12} className={classes.address}>
                  <Typography variant="body1">
                    {this.props.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.qr}>
                  <QRCode
                    value={this.props.address}
                    size={250}
                  />
                </Grid>
              </Grid>
            </CardContent>

          </Card>
            <div className={classes.buttons}>
              <Button
                onClick={this.handleClose.bind(this)}
                variant="contained"
                color="primary"
              >
                Done
              </Button>
            </div>
        </Dialog>
      </div>
    );
  }
}

BalanceReceiveDialog.propTypes = {
  address: PropTypes.string.isRequired,
};

export default withStyles(styles)(BalanceReceiveDialog);
