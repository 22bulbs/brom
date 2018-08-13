const fs = require('fs');
const handleGlobalData = require('./handle-global-data');

function handleResults(req, res) {
  const { transactions } = req.app.locals;
  const { io } = req.app.locals;

  const newTransactions = [].concat(req.body);
  transactions.push(...newTransactions);

  req.app.locals.globalData = handleGlobalData(transactions);

  io.emit('globaldata', req.app.locals.globalData);
  io.emit('transaction', newTransactions);

  const destination = process.env.WEBHEAD_WRITE_DESTINATION;
  if (destination) {
    fs.writeFile(destination, JSON.stringify(transactions, null, 2), (err) => {
      if (err) {
        console.error(`Failed to write results to ${destination}`);
        console.error(err);
        return;
      }
      console.log(`Wrote results to ${destination}`);
    });
  }

  res.end();
}

module.exports = handleResults;
