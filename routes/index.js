const routes = require("express").Router();
routes.use('/', require('./swagger'));
routes.use("/address", require("./address"))
module.exports = routes;