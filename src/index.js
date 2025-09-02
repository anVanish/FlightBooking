const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongodb = require("./config/db");
const dotenv = require("dotenv");
const { errorHandling } = require("./middlewares/errorHandling");

const route = require("./routes");

dotenv.config();

const port = process.env.PORT;
const app = express();

//connect to db
mongodb.connect();

//use morgan to log the request
app.use(morgan("tiny"));

//public
app.use(express.static(path.join(__dirname, "public")));

//session
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

//cookie
app.use(cookieParser());

//template engine
app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        helpers: {
            formatDate(date) {
                return new Date(date).toLocaleDateString("vi-VN");
            },
            formatTime(date) {
                return new Date(date).toLocaleTimeString("vi-VN");
            },
            formatDateTime(date) {
                return new Date(date).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
            },
            formatPrice(price) {
                if (!price) return "0";
                return new Number(price).toLocaleString("en-US");
            },
        },
    })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//apply body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
route(app);

app.use(errorHandling);

app.listen(port, () =>
    console.log(`Web app listening at http://localhost:${port}/home`)
);
