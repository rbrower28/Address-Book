const routes = require("express").Router();
routes.use('/', require('./swagger'));
routes.use("/address", require("./address"))
routes.use("/client", require("./client"))
module.exports = routes;