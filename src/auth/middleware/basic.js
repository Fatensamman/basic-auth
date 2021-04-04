'use strict';

const base64 = require('base-64');

async function basic(req, res, next) {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    if (!username && !password) {
        next('Invalid login')
    } else {
        req.user = { username, password };
        next();
    }
}
module.exports = basic;