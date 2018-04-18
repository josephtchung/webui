import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import LitAfClient from './LitClient'
import LitAppBar from './AppBar'
import Channels from './Channels'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Connections: [],
      MyPKH: "",

      Channels: [],
      LisPorts: {},
    };
  }

  update () {
    this.updateListConnections();
    this.updateChannelList();
    this.updateListeningPorts();
  }

  updateListConnections() {
    lc.send('LitRPC.ListConnections').then(reply => {

      this.setState({foo: reply});
      let connections = reply.Connections !== null ? reply.Connections : [];
      this.setState(
        {
          Connections: connections,
          MyPKH: reply.MyPKH,
        });
    })
      .catch(err => {
        console.error(err);
      });
  }

  updateChannelList() {
    lc.send('LitRPC.ChannelList').then(reply => {
      let channels = reply.Channels !== null ? reply.Channels : [];
      // channels = channels.filter(chan => chan.PeerIdx == this.state.selectedPeerIdx);
      this.setState({Channels: channels});
    })
      .catch(err => {
        console.error(err);
      });
  }

  updateListeningPorts() {
    lc.send('LitRPC.GetListeningPorts').then(reply => {
      this.setState({LisPorts: reply});
    })
      .catch(err => {
        console.error(err);
      });
  }

  listen() {
    lc.send('LitRPC.Listen').then(reply => {
      this.updateListeningPorts()
    })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * Connect to a previously connected peer by giving its index, e.g. con 2 in lit-af
   */
  connectByIndex(index) {
    lc.send('LitRPC.Connect', index).then(reply => {
      this.updateListConnections()
    })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * attempt to reconnect any disconnected peers associated with an open channel
   */
  openChannelConnections(channels, connections) {
    channels.forEach(channel => {
        if (!channel.Closed) {
          let connection = connections.find(e => {
            e.PeerNumber == channel.PeerIdx;
          });
          // if we can't find the connection then it's not open so we can try to reopen
          if (connection == null) {
            this.connectByIndex(channel.PeerIdx);
          }
        }
      }
    );
  }


  render() {
    return (
      <div className="App">
        <CssBaseline />
        <LitAppBar address={this.state.LisPorts.Adr}/>
        <Channels channels={this.state.Channels} connections={this.state.Connections}/>
      </div>
    );
  }


  componentDidMount () {
    this.listen();
    this.update();
  }
}



export let lc = new LitAfClient("localhost", 8001); // TODO - make this configureable in a useful place

export default App;
