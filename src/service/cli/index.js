'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const version = require(`./version`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};

module.exports = {
  Cli
};
