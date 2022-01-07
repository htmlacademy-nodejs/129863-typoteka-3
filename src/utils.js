'use strict';

class Utils {
  /**
   * Получение случайного целого числа от min до max
   * @param {number} min Минимальное число
   * @param {number} max Максимальное число
   * @return {number}
   */
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Перемешивает (переупорядочивает случайным образом) элементы массива (Тасование Фишера — Йетса)
   * @param {*} array
   * @return {*}
   */
  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomPosition = Math.floor(Math.random() * i);

      [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
    }

    return array;
  }
}

module.exports = Utils;
