const fs = require('fs');
const handleGlobalData = require('./handle-global-data');
const path = require('path')


function handleResults(req, res) {
  const { transactions } = req.app.locals;
  const { io } = req.app.locals;

  const newTransactions = [].concat(req.body);
  transactions.push(...newTransactions);

  req.app.locals.globalData = handleGlobalData(transactions);

  io.emit('globaldata', req.app.locals.globalData);
  io.emit('transaction', newTransactions);

  const destination = process.env.BROM_WRITE_DESTINATION;
  if (destination) {
    const data = {
      globalData: req.app.locals.globalData,
      transactions: transactions
    }
      const fullPath = path.resolve(
      destination,
      `${req.app.locals.runtime}_brom_results.json`
    );
     fs.writeFile(fullPath, JSON.stringify(data, null, 2), (err) => {
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


