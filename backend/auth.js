/*
 * This code was written by Abdooo9 - Abdulrahman Mohammed
 * Discord Account: Abdooo9#0968
 * GitHub: https://github.com/abdooo9
 * Email: abdooo9.dev@gmail.com
 * Profile on Developers List: https://dlist.me/a
 * PayPal: https://paypal.me/abd0009
 * © All rights reserved for Abdooo9 <abdooo9.dev@gmail.com>
*/

const usersCache = require("../routers/index").usersCache

function login(token, user) {
    usersCache.set(token, user)
}

function logout(token) {
    usersCache.del(token)
}

function user(token) {
    if (!token) return null
    if (usersCache.get(token)) {
        return usersCache.get(token)
    } else {
        return null
    }
}

module.exports = {
    login, user
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