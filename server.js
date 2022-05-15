/*
 * Github Repository: https://github.com/abdooo9/chatApp
 * This code was written by Abdooo9 - Abdulrahman Mohammed
 * Discord Account: Abdooo9#0968
 * GitHub: https://github.com/abdooo9
 * Email: abdooo9.dev@gmail.com
 * Profile on Developers List: https://dlist.me/a
 * PayPal: https://paypal.me/abd0009
 * © All rights reserved for Abdooo9 <abdooo9.dev@gmail.com>
*/

// Web server
const express = require('express');
const app = express();

// env
require("dotenv").config();

// Set the port
const port = process.env.PORT

// Set bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }))

// disable x-powered-by
app.disable("x-powered-by")
app.disable("etag")

// others
const path = require("path")

// ejs
const ejs = require("ejs")
app.engine("html", ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

// cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// fileUpload
const fileUpload = require("express-fileupload")
app.use(fileUpload());


app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400) {
        res.status(400).json({ code: 400, message: "Bad request, SyntaxError in request body" })
    }
});

const user = function (req, res, next) {
    let user = require("./backend/auth").user(req.cookies.token)
    req.user = user
    next()
}
app.use(user)

app.use("/", require("./routers/index").router);

// access uploads folder
app.use("/download", express.static(path.join(__dirname, "/uploads")))

app.listen(port, function () {
    console.log("Server started on port " + port);
})

/*
 * Github Repository: https://github.com/abdooo9/chatApp
 * This code was written by Abdooo9 - Abdulrahman Mohammed
 * Discord Account: Abdooo9#0968
 * GitHub: https://github.com/abdooo9
 * Email: abdooo9.dev@gmail.com
 * Profile on Developers List: https://dlist.me/a
 * PayPal: https://paypal.me/abd0009
 * © All rights reserved for Abdooo9 <abdooo9.dev@gmail.com>
*/