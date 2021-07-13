const { Router } = require("express")

module.exports = (controller) => {
    const router = Router()
    if(controller.get) router.get("/:id?", controller.get.bind(controller))
    if(controller.post) router.post("/", controller.post.bind(controller))
    if(controller.put) router.put("/:id", controller.put.bind(controller))
    if(controller.delete) router.delete("/:id", controller.delete.bind(controller))
    return router
}