//TODO: mby move to a separate folder, if we get more Middleware

const config = require('./config');
const db = require('./db');
const { createHash, privateDecrypt } = require('crypto');

module.exports = async (req, res, next) => {

    if (!req.headers["x-username"] || !req.headers["x-password"] || !req.headers["x-encrypted"]) {
        // res.status(401).send("You need to provide the 'x-username', 'x-password' as 'x-encrypted' headers. It is recommended to encrypt them using the server's public key.")
        res.status(401).send("You need to provide the 'x-username', 'x-password' as 'x-encrypted' headers. Currently only the 'true' value is supported for the 'x-encryped' header.");
        return;
    }

    let authHeaders = {
        encrypted: req.headers["x-encrypted"],
        password: req.headers["x-password"], //if they are encrypted, they'll get overwritten later
        username: req.headers["x-username"]
    }

    if (authHeaders.encrypted == 'true') {
        //TODO: decrypt


        // let decryptedPasswordBuffer = privateDecrypt(config.PRIVATE_KEY, Buffer.from(authHeaders.password, 'utf-8'));
        // console.log(decryptedPasswordBuffer);

        // res.send("decrypting..... enc data: " + JSON.stringify(authHeaders));
        // return;

        res.status(401).send("We are sorry, but encrypted headers are not yet supported. They will be supported in the future versions. To keep up with the updates, you can visit https://github.com/3ncy/PeripheralsManager_Backend.");
        return;
    }


    if ((authHeaders.encrypted !== 'true' && authHeaders.encrypted !== 'false') || !authHeaders.username || !authHeaders.password) {
        res.status(401).send("Please make sure you the headers contain valid data. The 'x-encrypted' header only allows the values 'true' or 'false'. If encrypted is set to true, the header must be encrypted using the server's public key.\nreceived headers: " + JSON.stringify(authHeaders));
        return;
    }


    let hashedPassword = createHash('sha256').update(authHeaders.password).digest('hex');
    
    let user = (await db.query("SELECT * FROM users WHERE users.name = $1 AND password_hash = $2", [authHeaders.username, hashedPassword])).rows[0];
    if (!user) {
        // not correct login (not gonna tell the user what is wrong - whether it's the name or the password)
        res.status(401).send("Invalid credentials.")
        return;
    }
    
    req.id_user = user.id_user;


    next();
}