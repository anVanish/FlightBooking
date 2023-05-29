const homeRouter = require("./routers/HomeRouter")
const aboutRouter = require("./routers/AboutRouter")
const blogRouter = require("./routers/BlogRouter")
const userRouter = require("./routers/UserRouter")
const loginRouter = require('./routers/LoginRouter')
const registerRouter = require('./routers/RegisterRouter')

function route(app){
    app.use('/home', homeRouter)
    app.use('/about', aboutRouter)
    app.use('/blog', blogRouter)
    app.use('/user', userRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)

    app.use('/', homeRouter)
}

module.exports = route