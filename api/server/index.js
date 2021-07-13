const errorHandler = require("../util/errorHandler")
var methodOverride = require('method-override')

module.exports = startServer = ({getRoutes}) => {
    const express = require("express");
    const app = express();

    app.use(express.json()) 
    app.use(express.urlencoded({ extended: true })) 
    
    app.set('port', process.env.PORT || 3000);
    app.use("/api",getRoutes)
    
    app.use(methodOverride())
    app.use(errorHandler)


    return () => app.listen(app.get('port'),()=>{
        console.log(`App listening at port:${app.get('port')}`)
    })
    
}