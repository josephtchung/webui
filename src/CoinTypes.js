/**
 * Created by joe on 4/16/18.
 */

/*
 * Utility functions
 */

// TODO - still needs some thinking!

const coinInfo = {
  0: {
    name: 'Bitcoin',
    denomination: 'mBTC',
    factor: 100000,
    decimals: 2,
  },
  1: {
    name: 'Bitcoin Testnet3',
    denomination: 'mBTC-t',
    factor: 100000,
    decimals: 2,
  },
  28: {
    name: 'Vertcoin',
    denomination: 'VTC',
    factor: 100000000,
    decimals: 2,
  },
  257: {
    name: 'Bitcoin Regtest',
    denomination: 'mBTC-r',
    factor: 100000,
    decimals: 2,
  },
};

const coinDenominations = (() => {
  let result = {};
  for (let i in coinInfo) {
    result[coinInfo[i].denomination] = i;
  }
  return result;
})();

const coinTypes = Object.keys(coinInfo).map(key => {
  return parseInt(key, 10);
});

function formatCoin(amount, coinType) {
  let info = coinInfo[coinType];

  if (info === null) {
    return Number(amount).toLocaleString() + " Type " + coinType;
  }

  return Number(amount / info.factor).toFixed(info.decimals).toLocaleString() + " " + info.denomination;
}

export {coinInfo, coinDenominations, coinTypes, formatCoin};

