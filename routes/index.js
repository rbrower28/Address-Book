const routes = require("express").Router();
routes.use("/address", require("./address"))
module.exports = routes;