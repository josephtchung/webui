// Slightly modified copy from litbamf - unsure of original author!
// refactored to use native Promises

let callbacks = {};
let requestNonce = 0;

class LitAfClient {
  constructor (rpchost, rpcport, onUnauthorized, onUnconnected, onConnected) {
    this.host = rpchost;
    this.port = rpcport;

    this.onUnauthorized = onUnauthorized;
    this.onUnconnected = onUnconnected;
    this.onConnected = onConnected;
    this.authorizationRequested = false;
    this.reconnectInterval = null;
    this.firstRpc = true; // flag to see if the very first rpc worked

    // open the connection by setting wait for connection to be a promise that is resolved when open
    this.waitForConnection = new Promise (resolve => {
      this.rpccon = new WebSocket('ws://' + this.host + ':' + this.port + '/ws');
      this.rpccon.onopen = () => {
        resolve();
      }
    });

    // set up the received message callback to resolve or reject the sending promise
    this.rpccon.onmessage = (message) => {
      let data = JSON.parse(message.data);
      if (data.error) {
        this.firstRpc = false;
        console.log("Error:", data.error)
        if(data.error.code === -32001) {
          console.log("Received unconnected error");
          this.onUnconnected();
          delete callbacks[data.id];
          return;
        }
        if(data.error.code === -32003) {
          this.firstRpc = false;
          console.log("Received unauthorized error");
          this.onUnauthorized();
          if(!this.authorizationRequested) {
            console.log("Requesting authorization");
            this.send("LitRPC.RequestRemoteControlAuthorization");
            // issue RCReq
            this.authorizationRequested = true;
            // Keep pinging to see if we're connected
            if(this.reconnectInterval !== null) {
              clearInterval(this.reconnectInterval);
            }

            this.reconnectInterval = setInterval(() => {
              this.send("LitRPC.Balance").then((result) => {
                this.onConnected();
                clearInterval(this.reconnectInterval);
              });
            }, 4000);
          }
          delete callbacks[data.id];
          return;    
        }
        callbacks[data.id].reject(data.error);
        delete callbacks[data.id];
      } else if(data.id === null) {
        this.firstRpc = false;
        //go to the special chat message handler, but don't delete the callback
        callbacks[data.id].resolve(data.result);
      } else {
        if (this.firstRpc) { // if the very first RPC was successful then we're connected
          this.onConnected();
          this.firstRpc = false;
        }
        callbacks[data.id].resolve(data.result);
        delete callbacks[data.id];
      }

    };
  }

  // send by creating a new promise and storing the resolve and reject f's for use by the receiving callback
  send (method, ...args) {
    let id = requestNonce++;
    let promise = new Promise((resolve, reject) => {
      this.waitForConnection.then(() => {
        let json = JSON.stringify({'method': method, 'params': args, 'id': id});
        // console.log("RPC Send: " + json);
        this.rpccon.send(json);
      });
      callbacks[id] = {resolve: resolve, reject: reject};
    });
    return promise;
  }

}

export default LitAfClient;
