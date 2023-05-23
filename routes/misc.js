const express = require('express');
const router = express.Router();
module.exports = router;

const db = require('../db');

router.get('/', (req, res) => {
    res.send("(◕‿◕)"); //TODO: maybe show some notice that this is only an api and where to see the actual project (and where the docs are, I guess)
});


router.get('/health', (req, res) => {
    res.send("Yup, the API seems to be live. ✽-(^▽^)/✽");
});


const auth = require('../authMW')
router.post('/authtest', auth, (req, res) => {
    if (req.validated) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});