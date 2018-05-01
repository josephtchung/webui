/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';
import {coinInfo, coinTypes} from './CoinTypes.js'
import CoinMenu from './CoinMenu.js';


const styles = theme => ({
  buttonBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  caption: {
    margin: 8,
  },
  content: {
    minWidth: 400,
  },
  amountBox: {
    display: 'flex',
  },
});

class ContractAddDialog extends React.Component {
  state = {
    open: false,
    amountours: 0,
    amounttheirs: 0,
    valueallours:0,
    valuealltheirs:0,
    settlementtime: 0,
    datafeedid: 0,
    coinselect: 1,
    oracleselect: 0
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    let coinType = coinTypes[this.state.coinselect - 1];
    this.props.handleAddSubmit(this.state.oracleselect, this.state.settlementtime, this.state.datafeedid, Math.round(coinInfo[coinType].factor * this.state.amountours), Math.round(coinInfo[coinType].factor *this.state.amounttheirs), this.state.valueallours,this.state.valuealltheirs, coinType);
    this.setState({open: false});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCoinSelect(index) {
    this.setState({
      coinselect: index,
    });
  }


  render() {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.buttonBox}>
          <Button variant="fab" onClick={this.handleClickOpen}>
            <AddIcon />
          </Button>
          <Typography variant="caption" className={classes.caption}>
            Contract
          </Typography>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Contract</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Select coin type
            </DialogContentText>
            <CoinMenu onSelect={this.handleCoinSelect.bind(this)}/>
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Oracle ID
            </DialogContentText>
            <Input
                autoFocus
                id="oracleid"
                label="Oracle ID"
                type="text"
                fullWidth
                onChange={this.handleChange('oracleselect')}
              />
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Settlement Time
            </DialogContentText>
            <Input
                autoFocus
                id="settlementtime"
                label="Settlement time"
                type="text"
                fullWidth
                onChange={this.handleChange('settlementtime')}
              />
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Data Feed ID
            </DialogContentText>
            <Input
                autoFocus
                id="datafeedid"
                label="Data feed ID"
                type="text"
                fullWidth
                onChange={this.handleChange('datafeedid')}
              />
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Amount we fund
            </DialogContentText>
            <Input
                autoFocus
                id="amountours"
                label="Amount we fund"
                type="text"
                fullWidth
                onChange={this.handleChange('amountours')}
              />
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Amount they fund
            </DialogContentText>
            <div className={classes.amountBox}>
              <Input
                autoFocus
                id="amounttheirs"
                label="Amount they fund"
                type="text"
                fullWidth
                onChange={this.handleChange('amounttheirs')}
              />
            </div>
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Value all ours
            </DialogContentText>
            <Input
                autoFocus
                id="valueallours"
                label="Value all ours"
                type="text"
                fullWidth
                onChange={this.handleChange('valueallours')}
              />
          </DialogContent>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Value all theirs
            </DialogContentText>
            <div className={classes.amountBox}>
              <Input
                autoFocus
                id="valuealltheirs"
                label="Value all theirs"
                type="text"
                fullWidth
                onChange={this.handleChange('valuealltheirs')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


ContractAddDialog.propTypes = {
  handleAddSubmit: PropTypes.func.isRequired,
};


export default withStyles(styles)(ContractAddDialog);
