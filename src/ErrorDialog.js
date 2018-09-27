/**
 * Error Dialog
 */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
});

class ErrorDialog extends React.Component {

  render () {
    const {classes} = this.props;

    return(
      <div>
        <Dialog
          open={this.props.errorMessage !== null}
          onClose={this.props.handleSubmit.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Whoops! An Error Occurred</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              {this.props.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.handleSubmit.bind(this)}
              color="primary"
              variant="contained"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ErrorDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ErrorDialog);
