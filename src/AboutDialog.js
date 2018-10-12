import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import PopUpDialog from './PopUpDialog.js'

const styles = theme => ({
  about: {
    fontSize: '.75em',
  },
  credits: {
    marginTop: theme.spacing.unit,
    fontSize: '.75em',
    color: '#606060',
  },
  buttons: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
});

class AboutDialog extends PopUpDialog {

  render() {
    const {classes} = this.props;

    return (
      <span>
        <span
          onClick={this.handleClickOpen.bind(this)}
        >
          {this.props.children}
        </span>
         <Dialog
           className={classes.dialog}
           open={this.state.open}
           onClose={this.handleClose.bind(this)}
           aria-labelledby="form-dialog-title"
         >
           <Card>
             <CardContent>
               <div className={classes.about}>
                 <strong>About LIT Mobile app: </strong>
                 The lightweight Lightning Network software developed at MIT’s Media Lab (called lit) initially focuses on Bitcoin-like blockchains.
                 <br/>
                 <strong>About LIT: </strong>
                 For more details, check https://dci.mit.edu/lightning-network/
                 <br/>
                 <strong>Installed version: </strong>
                 0.01
                 <br/>
                 <strong>Software limitations: </strong>
                 This is experimental software developed for illustration purposes. Do not use with real money.
                 <br/>
                 <strong>More information: </strong>
                 If you would like to learn more about this technology, reach out to the Digital Currency Initiative (DCI) at dci@media.mit.edu.
               </div>

               <div className={classes.credits}>
                 From thenounproject.com:
                 Bitcoin icon by Alina Oleynik,
                 Litecoin icon by Randomhero,
                 Dollar icon by Nikita Kozin
               </div>
               <div className={classes.buttons}>
                <Button
                onClick={this.handleClose.bind(this)}
                variant="contained"
                color="primary"
                >
                Done
                </Button>
               </div>
             </CardContent>
           </Card>
         </Dialog>
      </span>
    );
  }
}

AboutDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutDialog);
