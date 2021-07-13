class BaseInteractor{
    constructor({repository,dModel}){
        this._repository = repository
        this._dModel = dModel
    }
    getAll = async ()=> {
        const result = await this._repository.getAll()
        return result.map(r => new this._dModel(r))
    }
    get = async id => {
        const result = await this._repository.get(id)
        return result ? new this._dModel(result) : null
    }
    create = async entity => {
        const result = await this._repository.create(new this._dModel(entity))
        return new this._dModel(result)
    }
    update = async (entity,id) => {
        const result = await this._repository.update(new this._dModel(entity),id)
        return new this._dModel(result)
    }
    delete = id => this._repository.delete(id)
    
}

module.exports = BaseInteractor