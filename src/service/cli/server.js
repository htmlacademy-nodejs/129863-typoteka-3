'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {Command, ExitCode, HttpCode, FILE_MOCKS} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const sendResponse = (res, statusCode, content) => {
  const template = `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Title</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_MOCKS);
        const mocks = JSON.parse(fileContent);
        const content = mocks.map(({title}) => `<li>${title}</li>`).join(``);

        sendResponse(res, HttpCode.OK, `<ul>${content}</ul>`);
      } catch (error) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      break;
  }
};

const server = http.createServer(onClientConnect);

module.exports = {
  name: Command.SERVER,
  run(args) {
    const [customPort] = args;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    server
      .listen(port)
      .on(`listening`, () => {
        console.log(chalk.green(`Сервер запущен на порту ${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка ${message}`));
        process.exit(ExitCode.ERROR);
      });
  }
};
