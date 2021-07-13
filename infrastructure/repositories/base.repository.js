class BaseRepository {
    constructor({model}){
        this._model = model
    }
    create = async entity => {
        const result = await this._model.create(entity)
        return result.get({plain:true})
    }
    update = async (entity,id) => {
        let result = await this._model.findByPk(id)
        if (!result) throw new Error("NOT_FOUND_EXCEPTION")
        result = await result.update(entity)
        return result.get({plain:true})
    }
    getAll = () => this._model.findAll({
        raw:true,
        order: [
            ['id', 'DESC'],
        ]
    })
    get = id => this._model.findByPk(id,{raw:true})
    delete = async id => {
        let result = await this._model.findByPk(id)
        if (!result) throw new Error("NOT_FOUND_EXCEPTION")
        await result.destroy()
        return id
    }
}

module.exports = BaseRepository