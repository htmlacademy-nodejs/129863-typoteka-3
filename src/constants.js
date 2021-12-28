'use strict';

const COMMANDS = {
  help: `--help`,
  version: `--version`,
  generate: `--generate`,
};

const DEFAULT_COMMAND = COMMANDS.help;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  success: 0,
  error: 1,
};

module.exports = {
  COMMANDS,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
};
