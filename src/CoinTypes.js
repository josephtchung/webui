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

/* hardcoded values for exchange rates, fees, and min output  FIXME -- for demo purposes only! */

const exchangeRates = {
  257: {
    257: 1,
    258: 112,
    262: 6295,
  },
  258: {
    257: 1 / 118,
    258: 1,
    262: 52,
  },
  262: {
    257: 1 / 6495,
    258: 1 / 58,
    262: 1,
  },
};
const channelFee = 1000;
const minimumOutput = 10000;


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

// formats satoshis into a given coin's denomination
function formatCoin(satoshis, coinType, showDenomination = true) {
  let info = coinInfo[coinType];
  let denomination = "";

  if (info === null || info === undefined) {
    if (showDenomination) {
      denomination = " Type " + coinType;
    }
    return Number(satoshis).toLocaleString() + denomination;
  }

  if  (showDenomination) {
    denomination = " " + info.denomination;
  }

  return Number(satoshis / info.factor).toLocaleString(undefined, {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals
  }) + denomination;
}

// returns the number of satoshis from the output of formatCoin (with no denomination!)
function parseCoin(amount, coinType) {
  return Math.round(parseFloat(amount) * coinInfo[coinType].factor);
}

function formatUSD(coinAmount, coinType, exchangeRates) {
  let info = coinInfo[coinType];

  return Number(coinAmount / info.factor * exchangeRates[coinType]).toLocaleString(undefined, {
    style: "currency",
    currency: "USD"
  });
}

export {coinInfo, coinDenominations, coinTypes, formatCoin, parseCoin, formatUSD,
  exchangeRates, channelFee, minimumOutput};

