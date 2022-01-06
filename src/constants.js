'use strict';

const Command = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
};

const DEFAULT_COMMAND = Command.HELP;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  Command,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
};
