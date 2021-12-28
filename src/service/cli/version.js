'use strict';

const chalk = require(`chalk`);

const packageJson = require(`../../../package.json`);
const {COMMANDS} = require(`../../constants`);

module.exports = {
  name: COMMANDS.version,
  run() {
    const version = packageJson.version;

    console.info(chalk.blue(version));
  }
};
