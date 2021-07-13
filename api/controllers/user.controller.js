class UserController {
    constructor({UserInteractor}){
        this._interactor = UserInteractor
    }

    get = async (req, res, next) => {
        const { id } = req.params
        try {
            let result
            if (id) result = await this._interactor.get(id)
            else result = await this._interactor.getAll()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    post = async (req, res, next) => {
        try {
            const result = await this._interactor.create(req.body)
            res.json(result)
        } catch (error) {next(error)}
    }

    put = async (req, res, next) => {
        const { id } = req.params
        try {
            const result = await this._interactor.update(req.body,id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        const { id } = req.params
        try {
            const deleted = await this._interactor.delete(id)
            res.json(deleted)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController