const { Router } = require("express");
const importModules = require("../../util/import-modules");
module.exports = getRoutes = (options) => {
    const routeModules = importModules(__filename,__dirname)
    const routes = Router()
    routeModules.forEach(module => {
        routes.use(`/${module.name}`,module(options))
    });
    return routes
}

