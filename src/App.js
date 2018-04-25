import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import LitAfClient from './LitClient'
import LitAppBar from './AppBar'
import Balances from './Balances'
import Channels from './Channels'

var triedReconnect = false;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Connections: [],
      MyPKH: "",
      Channels: [],
      Adr: "",
      LisIpPorts: null,
      Txos: [],
      Balances: [],
    };
  }

  /*
   * Update all the UI states by calling individual async updates
   * Note that we unpack the replies into their individual keyword items
   */
  update () {
    this.updateListConnections();
    this.updateChannelList();
    this.updateListeningPorts();
    this.updateTxoList();
    this.updateBalances();
  }

  updateListConnections() {
    lc.send('LitRPC.ListConnections').then(reply => {
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

      // TODO -- just testing this here!
      if (!triedReconnect) {
        triedReconnect = true;
        this.openChannelConnections(this.state.Channels, this.state.Connections);
      }
    })
      .catch(err => {
        console.error(err);
      });
  }

  updateListeningPorts() {
    lc.send('LitRPC.GetListeningPorts').then(reply => {
      let adr = reply.Adr !== null ? reply.Adr : "";
      this.setState({Adr: adr, LisIpPorts: reply.LisIpPorts});
    })
      .catch(err => {
        console.error(err);
      });
  }

  updateTxoList() {
    lc.send('LitRPC.TxoList').then(reply => {
      let txos = reply.Txos !== null ? reply.Txos : [];
      this.setState({Txos: txos});
    })
      .catch(err => {
        console.error(err);
      });
  }

  updateBalances() {
    lc.send('LitRPC.Balance').then(reply => {
      let balances = reply.Balances !== null ? reply.Balances : [];
      this.setState({Balances: balances});
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
    lc.send('LitRPC.Connect', {'LNAddr': index.toString()}).then(reply => {
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
            return(e.PeerNumber === channel.PeerIdx);
          });
          // if we can't find the connection then it's not open so we can try to reopen
          if (connection == null) {
            this.connectByIndex(channel.PeerIdx);
          }
        }
      }
    );
  }

  /*
   * click handler for submitting a channel Payment
   */
  handleChannelPaySubmit(channel, amount) {
    lc.send('LitRPC.Push', {'ChanIdx': channel.CIdx, 'Amt': Math.round(parseFloat(amount) * 100000)}).then(reply => {
      this.updateBalances();
      this.updateChannelList();
    })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * click handler for funding a new channel
   */
  handleChannelAddSubmit(peerIdx, amount) {
    lc.send('LitRPC.FundChannel', {
      'Peer': parseInt(peerIdx),
      'CoinType': 1,
      'Capacity': Math.round(parseFloat(amount) * 100000)
    })
      .then(reply => {
        this.updateChannelList();
    })
      .catch(err => {
        console.error(err);
      });
  }



  render() {
    return (
      <div className="App">
        <CssBaseline />
        <LitAppBar address={this.state.Adr}/>
        <Balances balances={this.state.Balances} />
        <Channels
          channels={this.state.Channels}
          connections={this.state.Connections}
          handlePaySubmit={this.handleChannelPaySubmit.bind(this)}
          handleAddSubmit={this.handleChannelAddSubmit.bind(this)}
        />
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
