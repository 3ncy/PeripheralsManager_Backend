const express = require('express');
const router = express.Router();
module.exports = router;

const config = require('../config');

// let user = {
//     id_user: GUID,
//     name: "Jmeno",
//     password_hash: "asdjfhaksdjhfkh"
// }



router.post('/register', (req, res) => {
    // check if all fields are filled in
    // check if name is unique
    // hash password
    // store everything in db
    // reply 201/400    
    //  on 201 return the object, but only {name, id}
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
