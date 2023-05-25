const express = require('express');
const router = express.Router();
module.exports = router;

const { createHash, randomUUID } = require('crypto');
const config = require('../config');
const db = require('../db');


// let user = {
//     id_user: GUID,
//     name: "Jmeno",
//     password_hash: "asdjfhaksdjhfkh"
// }



router.post('/register', async (req, res) => {

    let username = req.body.name;
    let password = req.body.password;

    if(!username || !password){
        res.status(400).send("You need to provide both the username and the password!");
        return;
    }

    if (((await db.query("SELECT count(*) FROM users WHERE users.name=$1::text", [username])).rows[0].count) > 0){
        res.status(400).send("This username is already taken! Please select a different one.");
        return;
    }
    
    // no requirements on passwords, cause I hate that and if yousers set the password to "a", they're dumb and it's not my fault.
    let hashedPassword = createHash('sha256').update(password).digest('hex');
    let id_user = randomUUID();
    let result = await db.query("INSERT INTO users VALUES ($1::uuid, $2::text, $3::text)", [id_user, username, hashedPassword]);
    //TODO: handle the result
    
    res.status(201).send({id_user: id_user, name: username});
});

/// there is no more need for login, as the user is logged in each time they send a request. "Loggin in" will only occur on the client and it mean that the client will rememver the reds to use them
// router.post('/login', (req, res) => {
//     // find user by name in db
//     // check password and password hash
//     // reply 200/400/404
// });

//NOTE: logout? 🤔

//NOTE: maybe allow return guid to a login name? for example to allow simple sharing of profiles by the user's name

router.get('/public-key', (req, res) => {
    res.send(config.PUBLIC_KEY);
});
