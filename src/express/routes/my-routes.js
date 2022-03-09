'use strict';

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => res.render(`pages/my`));
myRoutes.get(`/comments`, (req, res) => res.render(`pages/my-comments`));

module.exports = myRoutes;
