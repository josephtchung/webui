/**
 * Created by joe on 4/16/18.
 */

/*
 * Utility functions
 */

// TODO - still needs some thinking!

const coinInfo = {
  /*
  0: {
    name: 'Bitcoin',
    denomination: 'mBTC',
    exchangeSymbol: 'BTC',
    factor: 100000,
    decimals: 2,
  },
  1: {
    name: 'Bitcoin Testnet3',
    denomination: 'mBTC-t',
    exchangeSymbol: 'BTC',
    factor: 100000,
    decimals: 2,
  },
  28: {
    name: 'Vertcoin',
    denomination: 'VTC',
    exchangeSymbol: 'VTC',
    factor: 100000000,
    decimals: 2,
  },
  */
  257: {
    name: 'Bitcoin Regtest',
    denomination: 'mBTC',
    exchangeSymbol: 'BTC',
    factor: 100000,
    decimals: 2,
  },
  258: {
    name: 'Litecoin Regtest',
    denomination: 'mLTC',
    exchangeSymbol: 'LTC',
    factor: 100000,
    decimals: 2,
  },
  /*
  261: {
    name: 'Vertcoin Regtest',
    denomination: 'VTC',
    exchangeSymbol: 'VTC',
    factor: 100000000,
    decimals: 4,
  },
  */
  262: {
    name: 'US Dollars',
    denomination: 'USD',
    exchangeSymbol: 'USD',
    factor: 100000000,
    decimals: 2,
  },
};

/*
 * coinDenominations is a an object that maps the textual denomination (e.g. "BTC") to is numerical coinType (0)
 */
const coinDenominations = (() => {
  let result = {};
  for (let i in coinInfo) {
    result[coinInfo[i].denomination] = parseInt(i, 10);
  }
  return result;
})();

const coinTypes = Object.keys(coinInfo).map(key => {
  return parseInt(key, 10);
});

function formatCoin(amount, coinType, showDenomination = true) {
  let info = coinInfo[coinType];
  let denomination = "";

  if (info === null || info === undefined) {
    if (showDenomination) {
      denomination = " Type " + coinType;
    }

    return Number(amount).toLocaleString() + denomination;
  }

  if  (showDenomination) {
    denomination = " " + info.denomination;
  }

  return Number(amount / info.factor).toLocaleString(undefined, {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals
  }) + denomination;
}

function formatUSD(coinAmount, coinType, exchangeRates) {
  let info = coinInfo[coinType];

  return Number(coinAmount / info.factor * exchangeRates[coinType]).toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  });
}

export {coinInfo, coinDenominations, coinTypes, formatCoin, formatUSD};

