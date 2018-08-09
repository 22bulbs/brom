const fs = require('fs');


function handleResults(req, res) {
  let transactions = req.app.locals.transactions;
  let io = req.app.locals.io;

  const newTransactions = [].concat(req.body);
  transactions.push(...newTransactions);

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