var assert = require('assert');
const interactor = require('../ ').cradle.UserInteractor;

describe("User",function () {
    const getFirst = async () => {
        const result = await interactor.getAll()
        return result[0].id
    }
    let ref = null
    describe("crud",function () {
        it("create", async function () {
            const result = await interactor.create({
                firstname:"John",
                lastname:"Snow",
                nick:"snow",
                pass:"123",
            })
            ref = result.id
            assert.strictEqual(result.id>0,true)    
        })
        it("getall", async function () {
            const result = await interactor.getAll()
            assert.strictEqual(result.length>0,true)    
        })
        it("get", async function () {
            const result = await interactor.get(ref?ref:await getFirst())
            assert.strictEqual(result==null,false)
        })
        it("update", async function () {
            ref = ref?ref:await getFirst()
            const result = await interactor.update({
                firstname:"Sansa",
                lastname:"Stark",
                nick:"stark",
                pass:"123",
            },ref)
            const aux = await interactor.get(ref)
            assert.strictEqual(result.firstname,aux.firstname)
        })
        it("delete", async function () {
            const deletedId = await interactor.delete(ref?ref:await getFirst())
            const result = await interactor.get(deletedId)
            assert.strictEqual(result==null,true)
        })
    })
})
