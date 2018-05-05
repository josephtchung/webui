import React, {Component} from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import LitAfClient from './LitClient'
import LitAppBar from './LitAppBar'
import Balances from './Balances'
import Channels from './Channels'
import Contracts from './Contracts'
import {coinInfo} from './CoinTypes'

let triedReconnect = false;

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
      Contracts: [],
      Oracles: [],
      Assets: [],
      CoinRates: {}
    };
  }

  /*
   * Update all the UI states by calling individual async updates
   * Note that we unpack the replies into their individual keyword items
   */
  update() {
    this.updateListConnections();
    this.updateChannelList();
    this.updateListeningPorts();
    this.updateTxoList();
    this.updateBalances();
    this.updateContractList();
    this.updateOraclesAndAssets();
    this.updateCoinRates();
  }

  updateCoinRates() {
    var list = '';
    for (let i in coinInfo) {
      if(list.indexOf(coinInfo[i].exchangeSymbol) > -1) continue;
      if(list !== '') list += ',';
      list += coinInfo[i].exchangeSymbol;
    }

    fetch("https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=" + list)
      .then(res => res.json())
      .then((result) => {
        var coinRates = {};
        for (let i in coinInfo) {
          coinRates[i] = (1 / result[coinInfo[i].exchangeSymbol]) / 100000000 * coinInfo[i].factor;
        }
        this.setState({ CoinRates : coinRates });
      });
  }

  updateListConnections() {
    lc.send('LitRPC.ListConnections')
      .then(reply => {
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
    lc.send('LitRPC.ChannelList')
      .then(reply => {
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

  updateContractList() {
    lc.send('LitRPC.ListContracts')
      .then(reply => {
        let contracts = reply.Contracts !== null ? reply.Contracts : [];
        this.setState({Contracts: contracts});
      })
      .catch(err => {
        console.error(err);
      });
  }

  fetchAssetValue(asset) {
    var oracle = this.state.Oracles.find(o => o.Idx === asset.oracleId);
    if(oracle === null || oracle === undefined) return null;

    return fetch(oracle.Url + "api/datasource/" + asset.datafeedId + "/value")
    .then(res => res.json())
    .then(res => {
      if(res.valueError !== null && res.valueError !== undefined) {
        throw new Error("Error fetching value: " + res.valueError);
      }
      return res.currentValue
    });
  }

  // Every data feed of every oracle is considered an asset rn.
  // Might need a more elegant solution for other types of oracle
  // values later
  refreshAssets() {
    const oracles = this.state.Oracles;
    var assets = [];
    for(var o of oracles) {
      if(o.Url !== null) {
        // fetch data feeds for this oracle
        fetch(o.Url + "api/datasources")
        .then(res => res.json())
        .then((result) => {
          console.log(result);
          for(var f of result) {
            assets.push( {
              name : f.name,
              oracleId : o.Idx,
              datafeedId : f.id
            });
            
          }
          console.log(assets);
          this.setState({Assets: assets});
        });
      }
    }
    
  }

  updateOraclesAndAssets() {
    lc.send('LitRPC.ListOracles')
      .then(reply => {
        let oracles = reply.Oracles !== null ? reply.Oracles : [];
        this.setState({Oracles: oracles});
        this.refreshAssets();
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateListeningPorts() {
    lc.send('LitRPC.GetListeningPorts')
      .then(reply => {
        let adr = reply.Adr !== null ? reply.Adr : "";
        this.setState({Adr: adr, LisIpPorts: reply.LisIpPorts});
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateTxoList() {
    lc.send('LitRPC.TxoList')
      .then(reply => {
        let txos = reply.Txos !== null ? reply.Txos : [];
        this.setState({Txos: txos});
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateBalances() {
    lc.send('LitRPC.Balance')
      .then(reply => {
        let balances = reply.Balances !== null ? reply.Balances : [];
        this.setState({Balances: balances});
      })
      .catch(err => {
        console.error(err);
      });
  }


  listen() {
    lc.send('LitRPC.Listen')
      .then(reply => {
        this.updateListeningPorts()
      })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * Create 1 or more new addresses of a given coinType. Returns a Promise
   */
  address(numToMake, coinType) {
    return new Promise((resolve, reject) => {
      lc.send('LitRPC.Address', {
        'NumToMake': numToMake,
        'CoinType': coinType,
      }).then(reply => {
          resolve(reply);
        }
      )
        .catch(err => {
          console.error(err);
        });
    });
  }

  /*
   * Connect to a previously connected peer by giving its index, e.g. con 2 in lit-af
   */
  connectByIndex(index) {
    lc.send('LitRPC.Connect', {
      'LNAddr': index.toString()
    })
      .then(reply => {
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
            return (e.PeerNumber === channel.PeerIdx);
          });
          // if we can't find the connection then it's not open so we can try to reopen
          if (connection === null) {
            this.connectByIndex(channel.PeerIdx);
          }
        }
      }
    );
  }


  /*
   * click handler for funding a new channel
   */
  handleChannelAddSubmit(peerIdx, coinType, amount) {
    lc.send('LitRPC.FundChannel', {
      'Peer': parseInt(peerIdx, 10),
      'CoinType': coinType,
      'Capacity': parseInt(amount, 10),
    })
      .then(reply => {
        this.updateChannelList();
      })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * click handler for adding new peer
   */
  handlePeerAddSubmit(address) {
    lc.send('LitRPC.Connect', {
      'LNAddr': address,
    })
      .then(reply => {
        this.updateListConnections();
      })
      .catch(err => {
        console.error(err);
      });
  }

  /*
 * click handler for traditional send to address
 */
  handleSendSubmit(address, amount) {
    console.log("Send " + address + " " + amount);
    lc.send('LitRPC.Send', {
      'DestAddrs': [address],
      'Amts': [amount],
    })
      .then(reply => {
        this.updateBalances();
      })
      .catch(err => {
        console.error(err);
      });
  }

  /*
   * click handler for new future contract
   */
  handleCreateContract(selling, assetIdx, amount, price, settleTime) {
    // Fetch R-point

    let promise = this.fetchOracleKeysForAsset(this.state.Assets[assetIdx], settleTime);
    if(promise === null) throw new Error("Cannot determine R-Point");

    var dlcFwdOffer = {};
    promise.then(res => {
      dlcFwdOffer.OracleA = res[0];
      dlcFwdOffer.OracleR = res[1];
      dlcFwdOffer.SettlementTime = settleTime;
      dlcFwdOffer.ImBuyer = !selling;
      dlcFwdOffer.AssetQuantity = amount;
      dlcFwdOffer.FundAmt = amount * price;

      console.log(dlcFwdOffer);
    });
  }
   
  fetchOracleKeysForAsset(asset, timeUnix) {
    let oracle = this.state.Oracles.find(o => o.Idx === asset.oracleId);
    if(oracle === null || oracle === undefined) return null;

    return fetch(oracle.Url + "api/rpoint/" + asset.datafeedId + "/" + timeUnix.toString()) 
    .then(res => res.json())
    .then(res => {
      var buf = Buffer.from(res.R,'hex');
      var rPoint = [];
      for (var i = 0; i < buf.length; i++) rPoint[i] = buf[i];

      return [oracle.A, rPoint];
    });
  }

  /*
   * click handler for new contract (old)
   */
  handleContractAddSubmit(oracleIdx, settlementTime, dataFeedId, fundingOurs, fundingTheirs, valueAllOurs, valueAllTheirs, coinType) {
    lc.send('LitRPC.NewContract', {})
    .then(c => {
      lc.send('LitRPC.SetContractOracle', { 
        'CIdx' : c.Contract.Idx, 
        'OIdx' : parseInt(oracleIdx, 10) 
      })
      .then(reply => {
        lc.send('LitRPC.SetContractSettlementTime', { 
          'CIdx' : c.Contract.Idx, 
          'Time' : parseInt(settlementTime, 10)
        })
        .then(reply => {
          lc.send('LitRPC.SetContractDatafeed', { 
            'CIdx' : c.Contract.Idx, 
            'Feed' : parseInt(dataFeedId, 10)
          })
          .then(reply => {
            lc.send('LitRPC.SetContractFunding', { 
              'CIdx' : c.Contract.Idx, 
              'OurAmount' : fundingOurs,
              'TheirAmount' : fundingTheirs
            })
            .then(reply => {
              lc.send('LitRPC.SetContractDivision', { 
                'CIdx' : c.Contract.Idx, 
                'ValueFullyOurs' : parseInt(valueAllOurs, 10),
                'ValueFullyTheirs' : parseInt(valueAllTheirs, 10)
              })
              .then(reply => {
                lc.send('LitRPC.SetContractCoinType', { 
                  'CIdx' : c.Contract.Idx, 
                  'CoinType' : parseInt(coinType, 10)
                })
                .then(reply => {
                  this.updateContractList();
                })
                .catch(err => {
                  console.error(err);
                });
              })
              .catch(err => {
                console.error(err);
              });
            })
            .catch(err => {
              console.error(err);
            });
          })
          .catch(err => {
            console.error(err);
          });
        })
        .catch(err => {
          console.error(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  /*
   * click handler for offering a contract
   */
  handleContractCommand(contract, command, arg1, arg2) {
    switch(command) {
      case 'settle':
        var buf = Buffer.from(arg2,'hex');
        var sig = [];
        for (var i = 0; i < buf.length; i++) sig[i] = buf[i];
        lc.send('LitRPC.SettleContract', {
          'CIdx' : contract.Idx,
          'OracleValue' : parseInt(arg1, 10),
          'OracleSig' : sig
        })
        .then(reply => {
          this.updateContractList();
          // The peers need some time to exchange signatures. Refresh it again in a while
          setTimeout(this.updateContractList.bind(this), 3000);
          setTimeout(this.updateContractList.bind(this), 6000);
          // Also update the balances in a while since whatever came out of the contract
          // is now in our balance again
          setTimeout(this.updateBalances.bind(this), 6000);
        })
        .catch(err => {
          console.error(err);
        });
        break;
      case 'offer': 
        lc.send('LitRPC.OfferContract', {
          'CIdx' : contract.Idx,
          'PeerIdx' : parseInt(arg1, 10)
        })
        .then(reply => {
          this.updateContractList();
        })
        .catch(err => {
          console.error(err);
        });
        break;
      case 'decline':
        lc.send('LitRPC.DeclineContract', {
          'CIdx' : contract.Idx
        })
        .then(reply => {
          this.updateContractList();
        })
        .catch(err => {
          console.error(err);
        });
        break;
      case 'accept':
        lc.send('LitRPC.AcceptContract', {
          'CIdx' : contract.Idx
        })
        .then(reply => {
          this.updateContractList();
          // The peers need some time to exchange signatures. Refresh it again in a while,
          // together with the balances since part of our balance will be moved into the
          // contract
          setTimeout(this.updateContractList.bind(this), 4000);
          setTimeout(this.updateBalances.bind(this), 4000);
        })
        .catch(err => {
          console.error(err);
        });
        break;
      default:
        console.log("Unrecognized contract command " + command);
    }
  }

  /*
   * click handler for channel commands: push, close, break
   * amount is optional and only used for push
   */
  handleChannelCommand(channel, command, amount) {
    switch (command) {
      case 'push':
        lc.send('LitRPC.Push', {
          'ChanIdx': channel.CIdx,
          'Amt': amount,
        })
          .then(reply => {
            this.updateBalances();
            this.updateChannelList();
          })
          .catch(err => {
            console.error(err);
          });
        break;
      case 'close':
        // console.log("channel close command!");
        lc.send('LitRPC.CloseChannel', {
          'ChanIdx': channel.CIdx,
        })
          .then(reply => {
            this.updateChannelList();
          })
          .catch(err => {
            console.error(err);
          });
        break;
      case 'break':
        // console.log("channel break command!");
        lc.send('LitRPC.BreakChannel', {
          'ChanIdx': channel.CIdx,
        })
          .then(reply => {
            this.updateChannelList();
          })
          .catch(err => {
            console.error(err);
          });
        break;
      default:
        console.log("Unrecognized channel command " + command);
    }
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <LitAppBar address={this.state.Adr}/>
        <Balances
          balances={this.state.Balances}
          handleSendSubmit={this.handleSendSubmit.bind(this)}
          coinRates={this.state.CoinRates}
          newAddress={this.address.bind(this)}
        />
        <Channels
          channels={this.state.Channels}
          connections={this.state.Connections}
          handleChannelCommand={this.handleChannelCommand.bind(this)}
          handleChannelAddSubmit={this.handleChannelAddSubmit.bind(this)}
          handlePeerAddSubmit={this.handlePeerAddSubmit.bind(this)}
        />
        <Contracts 
          contracts={this.state.Contracts} 
          assets={this.state.Assets}
          fetchAssetValue={this.fetchAssetValue.bind(this)}
          handleContractCommand={this.handleContractCommand.bind(this)} 
          handleCreateContract={this.handleCreateContract.bind(this)} 
        />
      </div>
    );
  }

  componentDidMount() {
    this.listen();
    this.update();
  }
}


export let lc = new LitAfClient("172.17.0.3", 8001); // TODO - make this configurable in a useful place

export default App;
