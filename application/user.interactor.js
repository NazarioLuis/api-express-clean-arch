const UserBehavior = require("../domain/behavior/user.behavior")
const User = require("../domain/models/user.model")
const extender = require("../util/extender")
//Common use cases
const BaseInteractor = require("./base.interactor")

class UserInteractor extends extender(UserBehavior, BaseInteractor){
    constructor({UserRepository}){
        super({repository: UserRepository,dModel: User})
    }
}
module.exports = UserInteractor