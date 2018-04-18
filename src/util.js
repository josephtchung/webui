/**
 * Created by joe on 4/16/18.
 */

/*
 * Utility functions
 */

function formatCoin(amount, coinType, denomination) {
  switch (coinType) {
    case 1: //bitcoin - we'll display as mBTC
      switch (denomination) {
        case "sat":
          return (Number(amount).toLocaleString());
        case "btc":
          return (Number(amount / 100000000).toFixed(8).toLocaleString() + " BTC");
        default:
          return (Number(amount / 100000).toFixed(2).toLocaleString() + " mBTC");
      }
    default:
      return (Number(amount).toLocaleString()) + " Type " + coinType;
  }
}

export {formatCoin};
