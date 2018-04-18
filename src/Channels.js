/**
 * Created by joe on 4/4/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function Channels(props) {
  let channelElements = props.channels.map(c => {
    return (
      <Card>
        <CardContent>
          {c.PeerIdx}
        </CardContent>
      </Card>
    )

  });



  const { classes } = props;
  return (
    <Card>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Channels
        </Typography>
      </Toolbar>
      <CardContent>
        {channelElements}
      </CardContent>

    </Card>
  )
}

export default withStyles(styles)(ChannelCard);
