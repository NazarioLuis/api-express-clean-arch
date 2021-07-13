const defaultRouter = require("../util/default-router")

const customers = ({CustomerController}) => {
    const router = defaultRouter(CustomerController);
    
    return router
}
module.exports = customers