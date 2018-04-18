/**
 * Created by joe on 4/4/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import ChannelCard from './ChannelCard.js'

const styles = theme => ({
  root: {
    margin: 12
  },
});

function ChannelGroup(props) {
  return (Object.keys(props.channels).map(key => {
    return (
      <Grid item xs={3}>
        <ChannelCard channel={props.channels[key]}/>
      </Grid>
    );
  }));
}

function Channels(props) {
  const {classes} = props;

  let channelsByPeer = sortChannels(props.channels, props.connections);

  console.log(channelsByPeer);
  let peerChannels = Object.keys(channelsByPeer).map(key => {
      return (
        <div className={classes.root}>
        <Grid container>
          <Grid item xs={1}>
            <Typography variant="subheading">
              Peer:{key}
            </Typography>
            {channelsByPeer[key].connected &&
            <Chip
              label="Connected"
              className={classes.chip}
            />
            }
          </Grid>
         <ChannelGroup channels={channelsByPeer[key].channels}/>

        </Grid>
        </div>
      );
    }
  );

  return (
    <div>
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