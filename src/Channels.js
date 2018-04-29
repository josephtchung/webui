/**
 * Created by joe on 4/4/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Zoom from 'material-ui/transitions/Zoom';

import ChannelCard from './ChannelCard.js'
import ChannelAddDialog from './ChannelAddDialog.js'
import PeerAddDialog from './PeerAddDialog.js'

const channelGroupStyles = theme => ({
  cardBox: {
    minWidth: 300,
    minHeight: 200,
  },
  addButtonBox: {
    minWidth: 300,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

/*
 * A group of Channel Cards that share the same peer
 */
const ChannelGroup = withStyles(channelGroupStyles)((props) => {

  const {classes} = props;

  let channels = [];
  let disabledChannels = [];

  // render enabled channels first (though the entire channel group may be disabled)
  Object.keys(props.channels).forEach(key => {
    let channel = props.channels[key];
    if (!props.disabled && !channel.Closed) {
      channels.push(
        <Zoom in key={channel.CIdx}>
          <Grid item xs={3} className={classes.cardBox}>
            <ChannelCard channel={channel} handleChannelCommand={props.handleChannelCommand}/>
          </Grid>
        </Zoom>
      );
    } else {
      disabledChannels.push(
        <Zoom in key={channel.CIdx}>
          <Grid item xs={3} className={classes.cardBox}>
            <ChannelCard disabled channel={channel}/>
          </Grid>
        </Zoom>
      )
    }
  });
  // add the + button for adding an additional channel to this Peer
  disabledChannels.push(
    <Zoom in key="AddDialog">
      <Grid item xs={3} className={classes.addButtonBox}>
        <ChannelAddDialog
          peerIndex={props.peerIndex}
          handleAddSubmit={props.handleChannelAddSubmit}
        />
      </Grid>
    </Zoom>
  );

  return (channels.concat(disabledChannels));
});


const styles = theme => ({
  root: {
    marginTop: 8,
  },
  peerGroup: {
    marginTop: 8,
    padding: 10,
    backgroundColor: 'lightBlue',
  },
  peerInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  chip: {
    marginLeft: theme.spacing.unit
  },
  addButtonBox: {
    minWidth: 300,
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*
 * All the Channels, grouped by Peer
 */
function Channels(props) {
  const {classes} = props;

  let channelsByPeer = sortChannels(props.channels, props.connections);

  let peerChannels = Object.keys(channelsByPeer).map(key => {
      return (
        <div className={classes.peerGroup} key={key}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} className={classes.peerInfo}>
                  <Typography variant="title">
                    Peer:{key}
                  </Typography>
                  {channelsByPeer[key].connected &&
                  <Chip label="Connected" className={classes.chip}/>}
                </Grid>
                <ChannelGroup
                  disabled={!channelsByPeer[key].connected}
                  channels={channelsByPeer[key].channels}
                  handleChannelCommand={props.handleChannelCommand}
                  peerIndex={key}
                  handleChannelAddSubmit={props.handleChannelAddSubmit}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
  );

  return (
    <div className={classes.root}>
      {peerChannels}
      <div className={classes.peerGroup}>
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.addButtonBox}>
              <PeerAddDialog
                handleAddSubmit={props.handlePeerAddSubmit}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Channels.propTypes = {
  channels: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  handleChannelCommand: PropTypes.func.isRequired,
  handleChannelAddSubmit: PropTypes.func.isRequired,
  handlePeerAddSubmit: PropTypes.func.isRequired,
};

/*
 * Takes the channels and connections from returns an object in the following format:
 * {<Peer Index>: {connected: <true|false>, channels: {<Channel Index>: <Channel Info from Lit>}}...}
 */
function sortChannels(channels, connections) {
  // assign each connected peer into a map with the peer Idx as the key (peer numbers are 1 based)
  let peers = {};
  connections.forEach(conn => {
    peers[conn.PeerNumber] = conn;
  });

  /*
   this will be an array map keyed by PeerIdx where each element is a map as follows:
   channels: map of channel data keyed by ChannelIdx
   connected: true or false indicated whether peer is currently connected
   */
  let channelsByPeer = {};
  channels.forEach(channel => {
    let entry = (channel.PeerIdx in channelsByPeer ? channelsByPeer[channel.PeerIdx] : {});
    entry['connected'] = channel.PeerIdx in peers;
    let item = ('channels' in entry ? entry.channels : {});
    item[channel.CIdx] = channel;
    entry.channels = item;
    channelsByPeer[channel.PeerIdx] = entry;
  });
  return channelsByPeer;
}

export default withStyles(styles)(Channels);
