'use strict';

/**
 * Перемешивает (переупорядочивает случайным образом) элементы массива (Тасование Фишера — Йетса)
 * @param {*} array
 * @return {*}
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);

    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

module.exports = {
  shuffle,
};
