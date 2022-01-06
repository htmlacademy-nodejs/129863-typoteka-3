'use strict';

const chalk = require(`chalk`);

const packageJson = require(`../../../package.json`);
const {Command} = require(`../../constants`);

module.exports = {
  name: Command.VERSION,
  run() {
    const version = packageJson.version;

    console.info(chalk.blue(version));
  }
};
