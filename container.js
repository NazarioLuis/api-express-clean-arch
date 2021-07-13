const awilix = require("awilix");
const server = require("./api/server");
const applicationModules = require("./application");
const infrastructureModules = require("./infrastructure/repositories");
const routeModules = require("./api/routes");
const { asValue } = require("awilix");
const controllerModules = require("./api/controllers");

const modules = [
    ...applicationModules, 
    ...infrastructureModules,
    ...controllerModules,
    routeModules,
    server,
]

const container = awilix.createContainer()

const resolvers = {}
modules.forEach(module => {
    if(module.toString().substring(0, 5) === 'class') {
        resolvers[module.name] = awilix.asClass(module).singleton()
    }else if (typeof module === "function"){
        resolvers[module.name] = awilix.asFunction(module).singleton()
    }
});

container.register(resolvers)
module.exports = container