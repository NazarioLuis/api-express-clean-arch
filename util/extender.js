const extender = (...classes) => {
    class Base {
        constructor(args){
            classes.forEach(c => {
                Object.assign(this,new c(args))
            });
        }
    }
    return Base
}
module.exports = extender