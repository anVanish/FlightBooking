const homeRouter = require("./routers/HomeRouter")

function route(app){
    app.use('/home', homeRouter)

    app.use('/', homeRouter)
}

module.exports = route