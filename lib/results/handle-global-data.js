/* eslint no-param-reassign: 0 */
function handleGlobalData(transactions) {
  // define globalData with all the information we can get without reducing the array
  const globalData = {
    'application-port': process.env.BROM_USER_PORT,
    'proxy-port': process.env.BROM_PROXY_PORT,
    'results-port': process.env.BROM_RESULTS_PORT,
    title: process.env.BROM_TITLE,
    protocol: '',
    methods: {},
    totals: {
      transactions: transactions.length,
      severe: 0,
      deprecated: 0,
      conflicting: 0,
      redundant: 0,
      internal: 0,
      external: 0
    },
  };

  // set protocol based on the mode being used
  if (process.env.BROM_USE_HTTPS) {
    globalData.protocol = 'https';
  } else {
    globalData.protocol = 'http';
  }

  // reduce transactions using the transactionToData function and globalData as an initial value
  transactions.reduce(transactionToData, globalData);
  return globalData;
}

function transactionToData(data, transaction) {
  const { method, external, flags } = transaction.metadata;

  // if the method of the transaction is already present in the
  // methods object, increment its value, otherwise make it equal to 1
  if (data.methods[method]) {
    data.methods[method]++;
  } else {
    data.methods[method] = 1;
  }

  // increment external or internal property depending on the transaction's type
  if (external) {
    data.totals.external++;
  } else {
    data.totals.internal++;
  }

  // iterate through flags and increment that category accordingly
  for (let i = 0; i < flags.length; i++) {
    switch (flags[i]) {
      case 'severe':
        data.totals.severe++;
        break;

      case 'deprecated':
        data.totals.deprecated++;
        break;

      case 'redundant':
        data.totals.redundant++;
        break;

      case 'conflicting':
        data.totals.conflicting++;
        break;

      default:
        break;
    }
  }

  // return the updated data
  return data;
}

module.exports = handleGlobalData;
