'use strict';

const chalk = require(`chalk`);

const {COMMANDS} = require(`../../constants`);

module.exports = {
  name: COMMANDS.help,
  run() {
    const text = `
     Программа запускает http-сервер и формирует файл с данными для API.

     Гайд:
     service.js <command>
     Команды:
      ${COMMANDS.version}: выводит номер версии
      ${COMMANDS.help}: печатает этот текст
      ${COMMANDS.generate} <count> формирует файл mocks.json
    `;

    console.info(chalk.gray(text));
  }
};
