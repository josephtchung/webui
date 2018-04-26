/**
 * Created by joe on 4/16/18.
 */

/*
 * Utility functions
 */

// TODO - this isn't the right idea... have to figure out a good solution to coin types and denominations

function formatCoin(amount, coinType, denomination) {
  switch (coinType) {
    case 1:
      switch (denomination) {
        case "sat":
          return (Number(amount).toLocaleString());
        case "btc":
          return (Number(amount / 100000000).toFixed(8).toLocaleString() + " BTC-t");
        default:
          return (Number(amount / 100000).toFixed(2).toLocaleString() + " mBTC-t");
      }
    case 257: // regtest
      switch (denomination) {
        case "sat":
          return (Number(amount).toLocaleString());
        case "btc":
          return (Number(amount / 100000000).toFixed(8).toLocaleString() + " BTC-r");
        default:
          return (Number(amount / 100000).toFixed(2).toLocaleString() + " mBTC-r");
      }
    default:
      return (Number(amount).toLocaleString()) + " Type " + coinType;
  }
}

function coinTypeString(coinType) {
  switch (coinType) {
    case 0:
      return("BTC");
    case 1:
      return("BTC-t");
    case 257:
      return("BTC-r");
    default:
      return("Type " + coinType);
  }
}

export {formatCoin, coinTypeString};
