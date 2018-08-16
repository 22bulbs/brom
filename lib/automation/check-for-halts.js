/* eslint no-console: 0 */
const chalk = require('chalk');

module.exports = function checkForHalts(results) {
  const halts = [];
  results.forEach((result) => {
    if (result instanceof Error) {
      console.error(result); // do we crash on errors?
    } else if (result.halt) {
      result.halt.route = `${result.metadata.method} ${result.metadata.url}`;
      halts.push(result.halt);
    } else {
      console.log(chalk.green(`${result.metadata.method} ${result.metadata.url} ✓`));
    }
  });
  if (halts.length) {
    console.error(chalk.red(`Brom tests failed. Rules failed on ${halts.length} routes.`));
    halts.forEach((route) => {
      console.error(chalk.red(`  ${route.route}`));
      delete route.route;
      for (const id in route) {
        console.error(`  - ${id}: ${route[id]}`);
      }
      console.log();
    });

    setTimeout(process.exit, 50, 1);
  } else {
    console.log(chalk.green('All rules passed.'));

    setTimeout(process.exit, 50, 0);
  }
};
