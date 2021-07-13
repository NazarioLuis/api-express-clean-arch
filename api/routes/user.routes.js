const defaultRouter = require("../util/default-router")

users = ({UserController}) => {
    const router = defaultRouter(UserController)

    return router
}
module.exports = users