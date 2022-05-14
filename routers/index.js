/*
 * This code was written by Abdooo9 - Abdulrahman Mohammed
 * Discord Account: Abdooo9#0968
 * GitHub: https://github.com/abdooo9
 * Email: abdooo9.dev@gmail.com
 * Profile on Developers List: https://dlist.me/a
 * PayPal: https://paypal.me/abd0009
 * © All rights reserved for Abdooo9 <abdooo9.dev@gmail.com>
*/

const router = require("express").Router();
const nodeCache = require("node-cache")
const usersCache = new nodeCache({ stdTTL: 60 * 60 * 24 })
const messagesCache = []
const generator = require('generate-password')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({
    port: 40510
})

const renderToLogin = (req, res, next) => {
    if (!req.user) {
        if (req.url.startsWith("/login")) {
            next()
        } else {
            let url = req.url
            return res.redirect(`/login?redirect=${url}`)
        }
    }
    next()
}
router.use(renderToLogin)

router.get("/", (req, res) => {
    res.render("index", {
        user: req.user || null,
        messages: messagesCache || []
    })
});

router.get("/login", (req, res) => {
    res.render("login", {
        user: req.user || null,
        redirect: req.query.redirect || "/"
    })
});

router.get("/logout", async (req, res) => {
    usersCache.del(req.cookies.token)
    res.redirect("/login?redirect=/")
})

router.post("/login", async (req, res) => {
    const { username } = req.body
    if (!username) return res.redirect("/login")
    const token = generator.generate({ length: 32, uppercase: true, lowercase: true, symbols: false })
    const id = generator.generate({ length: 18, uppercase: true, lowercase: true, symbols: false })
    usersCache.set(token, { username, id })
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 })
    res.redirect(req.query.redirect || "/")
})

router.post("/send", async (req, res) => {
    // return console.log(req.body)
    const { value, time, username } = req.body
    // console.log(req.files)
    if (req.files) {
        req.files.file.mv(`./uploads/${req.files.file.name}`)
    }

    delete req.body.file
    messagesCache.push(req.body)

    wss.clients.forEach(client => {
        client.send(JSON.stringify(req.body));
    });

    res.status(200).json(200)
})

module.exports = {
    router, usersCache
}


/*
 * This code was written by Abdooo9 - Abdulrahman Mohammed
 * Discord Account: Abdooo9#0968
 * GitHub: https://github.com/abdooo9
 * Email: abdooo9.dev@gmail.com
 * Profile on Developers List: https://dlist.me/a
 * PayPal: https://paypal.me/abd0009
 * © All rights reserved for Abdooo9 <abdooo9.dev@gmail.com>
*/