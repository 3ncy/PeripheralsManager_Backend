//TODO: mby move to a separate folder, if we get more Middleware

const config = require('./config');
const db = require('./db');
const { createHash } = require('crypto');

module.exports = async (req, res, next) => {

    if (!req.headers["x-username"] || !req.headers["x-password"] || !req.headers["x-encrypted"]) {
        res.status(401).send("You need to provide the 'x-username' and 'x-password' headers. It is recommended to encrypt them using the server's public key.")
        return;
    }

    // curl.exe -X 'POST' 'http://localhost:54321/authtest' -H 'x-auth: {"encrypted":false, "username":"jmeno", "password":"heslo"}' -d 'asdf'
    // do it either in wsl or insomnia.
    // Also. split the headers into 3 separate ones, encrypt only name and pass (obv)

    // let authHeader = {};
    // try {
    //     authHeader = JSON.parse(req.headers["x-auth"]);
    // } catch (e) {
    //     console.log(req.headers["x-auth"])
    //     console.log(e);

    //     console.log(req.headers["x-auth"].encrypted);
    //     // res.status(400).send("Please follow this format for the 'x-auth' header: {encrypted: true|false, username: users_name, password: users_password}. If encrypted is set to true, the header must be encrypted using the server's public key.");
    //     res.status(400).send(e.toString());
    //     return;
    // }    


    let authHeaders = {
        encrypted: req.headers["x-encrypted"],
        password: req.headers["x-password"], //if they are encrypted, they'll get overwritten later
        username: req.headers["x-username"]
    }

    if (authHeaders.encrypted == 'true') {
        //TODO: decrypt
        res.send("decrypting..... enc data: " + JSON.stringify(authHeaders));
        return;
    }


    if ((authHeaders.encrypted !== 'true' && authHeaders.encrypted !== 'false') || !authHeaders.username || !authHeaders.password) {
        res.status(400).send("Please make sure you the headers contain valid data. The 'x-encrypted' header only allows the values 'true' or 'false'. If encrypted is set to true, the header must be encrypted using the server's public key.\nreceived header: " + JSON.stringify(authHeaders));
        return;
    }

    // check user w the DB
    //  if not found, return 400
    //  if found
    //      if corect creds
    //          set req.userID = uid
    //      else
    //          return 401

    let hashedPassword = createHash('sha256').update(authHeaders.password).digest('hex');
    
    let user = (await db.query("SELECT * FROM users WHERE users.name = $1 AND password_hash = $2", [authHeaders.username, hashedPassword])).rows[0];
    if (!user) {
        // not correct login
        res.status(401).send("Invalid credentials.")
        return;
    }
    
    req.id_user = user.id_user;

    // res.send("koneec\n" + JSON.stringify(authHeaders));
    // return;
    next();
}