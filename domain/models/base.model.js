const { REQUIRED } = require("../helper");

class BaseModel{
    constructor({
        id=0,
        createdAt,
        updatedAt
    }){
        this.id=id
        this.createdAt=createdAt
        this.updatedAt=updatedAt
    }
}

module.exports = BaseModel