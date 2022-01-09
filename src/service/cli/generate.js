'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const subDays = require(`date-fns/subDays`);

const {Command, ExitCode} = require(`../../constants`);
const Utils = require(`../../utils`);

const DEFAULT_COUNT_PUBLICATIONS = 1;
const MAX_COUNT_PUBLICATIONS = 1000;
const MAX_COUNT_PUBLICATIONS_ERROR = `Не больше ${MAX_COUNT_PUBLICATIONS} публикаций`;
const MAX_SUB_DAYS = 90;

const FILE_NAME = `mocks.json`;

const FilePath = {
  TITLES: `./data/titles.txt`,
  SENTENCES: `./data/sentences.txt`,
  CATEGORIES: `./data/categories.txt`
};

/**
 * Генерация публикаций
 * @param {number} count Количество генерируемых публикаций
 * @param {string[]} titles Заголовки
 * @param {string[]} sentences Предложения
 * @param {string[]} categories Категории
 * @return {*[]}
 */
const generatePublications = (count, titles, sentences, categories) => {
  return new Array(count).fill({
    title: titles[Utils.getRandomInt(0, titles.length - 1)],
    createdDate: subDays(new Date(), Utils.getRandomInt(0, MAX_SUB_DAYS)),
    announce: Utils.shuffle(sentences).slice(0, 5).join(` `),
    fullText: Utils.shuffle(sentences).slice(0, Utils.getRandomInt(0, sentences.length - 1)).join(` `),
    category: [...Utils.shuffle(categories).slice(0, Utils.getRandomInt(0, categories.length - 1))],
  });
};

/**
 * Чтение информации из файла
 * @param {string} path
 * @return {Promise<string[]>}
 */
const readContent = async (path) => {
  try {
    const content = await fs.readFile(path, `utf8`);

    return content.trim().split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

module.exports = {
  name: Command.GENERATE,
  async run(args) {
    const [titles, sentences, categories] = await Promise.all([
      readContent(FilePath.TITLES),
      readContent(FilePath.SENTENCES),
      readContent(FilePath.CATEGORIES),
    ]);

    const [count] = args;
    const countPublications = parseInt(count, 10) || DEFAULT_COUNT_PUBLICATIONS;

    if (countPublications > MAX_COUNT_PUBLICATIONS) {
      console.error(chalk.red(MAX_COUNT_PUBLICATIONS_ERROR));
      process.exit(ExitCode.ERROR);
    }

    const publications = JSON.stringify(generatePublications(countPublications, titles, sentences, categories));

    try {
      await fs.writeFile(FILE_NAME, publications);

      console.log(chalk.green(`Файл успешно создан`));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(`Ошибка создания файла`));
      process.exit(ExitCode.ERROR);
    }
  }
};

