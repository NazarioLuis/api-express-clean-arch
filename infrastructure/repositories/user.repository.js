const UserBehavior = require("../../domain/behavior/user.behavior");
const extender = require("../../util/extender");
const {User} = require("../db/models");
//Common repository operations
const BaseRepository = require("./base.repository");

class UserRepository extends extender(UserBehavior,BaseRepository){
   constructor(){
        super({model: User})
   }
}

module.exports = UserRepository