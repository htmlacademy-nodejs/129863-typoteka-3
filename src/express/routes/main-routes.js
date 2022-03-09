'use strict';

const {Router} = require(`express`);

const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => res.render(`pages/main`));
mainRoutes.get(`/register`, (req, res) => res.render(`pages/register`));
mainRoutes.get(`/login`, (req, res) => res.render(`pages/login`));
mainRoutes.get(`/search`, (req, res) => res.render(`pages/search`));
mainRoutes.get(`/categories`, (req, res) => res.send(`/categories`));

module.exports = mainRoutes;
