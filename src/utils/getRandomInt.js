'use strict';

/**
 * Получение случайного целого числа от min до max
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number}
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
  getRandomInt,
};
