'use strict';

const chalk = require(`chalk`);

const {Command} = require(`../../constants`);

module.exports = {
  name: Command.HELP,
  run() {
    const text = `
     Программа запускает http-сервер и формирует файл с данными для API.

     Гайд:
     service.js <command>
     Команды:
      ${Command.VERSION}: выводит номер версии
      ${Command.HELP}: печатает этот текст
      ${Command.GENERATE}: <count> формирует файл mocks.json
    `;

    console.info(chalk.gray(text));
  }
};
