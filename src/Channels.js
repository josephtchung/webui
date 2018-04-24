/**
 * Created by joe on 4/4/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';

import ChannelCard from './ChannelCard.js'

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
});

/*
 * A group of Channel Cards that share the same peer
 */
function ChannelGroup(props) {
  let channels = [];
  let disabledChannels = [];

  // render enabled channels first (though the entire channel group may be disabled
  Object.keys(props.channels).map(key => {
    if (!props.disabled && !props.channels[key].Closed) {
      channels.push(
        <Grid item xs={3} key={key}>
          <ChannelCard channel={props.channels[key]} handleSubmit={props.handleSubmit}/>
        </Grid>
      );
    } else {
      disabledChannels.push(
        <Grid item xs={3} key={key}>
          <ChannelCard disabled channel={props.channels[key]}/>
        </Grid>
      )
    }
  });

  return (channels.concat(disabledChannels));
}

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
                  <Typography variant="subheading">
                    Peer:{key}
                  </Typography>
                  {channelsByPeer[key].connected &&
                  <Chip label="Connected" className={classes.chip}/>}
                </Grid>
                <ChannelGroup
                  disabled={!channelsByPeer[key].connected}
                  channels={channelsByPeer[key].channels}
                  handleSubmit={props.handleSubmit}
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
    </div>
  );
}

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
};


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
    let entry = (channelsByPeer[channel.PeerIdx] != null ? channelsByPeer[channel.PeerIdx] : {});
    entry['connected'] = peers[channel.PeerIdx] != null;
    let item = (entry.channels != null ? entry.channels : {});
    item[channel.CIdx] = channel;
    entry.channels = item;
    channelsByPeer[channel.PeerIdx] = entry;
  });

  return channelsByPeer;
}

export default withStyles(styles)(Channels);
