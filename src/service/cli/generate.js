'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const subDays = require(`date-fns/subDays`);

const {Command, ExitCode} = require(`../../constants`);
const {Utils} = require(`../../utils`);

const DEFAULT_COUNT_PUBLICATIONS = 1;
const MAX_COUNT_PUBLICATIONS = 1000;
const MAX_COUNT_PUBLICATIONS_ERROR = `Не больше ${MAX_COUNT_PUBLICATIONS} публикаций`;
const MAX_SUB_DAYS = 90;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const {shuffle, getRandomInt} = Utils;

const generatePublications = (count) => {
  return new Array(count).fill({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: subDays(new Date(), getRandomInt(0, MAX_SUB_DAYS)),
    announce: shuffle(SENTENCES).slice(0, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(0, SENTENCES.length - 1)).join(` `),
    category: [...shuffle(CATEGORIES).slice(0, getRandomInt(0, CATEGORIES.length - 1))],
  });
};

module.exports = {
  name: Command.GENERATE,
  async run(args) {
    const [count] = args;
    const countPublications = parseInt(count, 10) || DEFAULT_COUNT_PUBLICATIONS;

    if (countPublications > MAX_COUNT_PUBLICATIONS) {
      console.info(chalk.red(MAX_COUNT_PUBLICATIONS_ERROR));
      process.exit(ExitCode.ERROR);
    }

    const publications = JSON.stringify(generatePublications(countPublications));

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

