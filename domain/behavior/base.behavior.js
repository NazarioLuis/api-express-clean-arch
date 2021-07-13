const { NON_IMPLEMENTED } = require("../helper")

class BaseBehavior{
    /**  
     * @param {number} id 
     */
    getAll = () => NON_IMPLEMENTED()
    /**  
     * @param {number} id 
     * @returns result 
     */
    get = id => NON_IMPLEMENTED()
    /**
     * @param entity     
     */
    create = entity => NON_IMPLEMENTED()
    /**
     * @param entity   
     * @param {number} id  
     * @returns result 
     */
    update = (entity,id) => NON_IMPLEMENTED()
    /**  
     * @param {number} id  
     * @returns deletedId 
     */
    delete = id => NON_IMPLEMENTED()
}

module.exports = BaseBehavior