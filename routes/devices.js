const express = require('express');
const router = express.Router();
module.exports = router;

const db = require('../db')

// let device = {
//     id_device: GUID,
//     name: "device name",
//     type: "audio",
//     attribute: null, // whatever, it depends on the type
//     id_user: GUID
// }
//
//  //NOTE: if this were in a normal language, I'd use an enum, but it's JS...
//  type: [audio | mouse]
//  attribute: can either mean "Mouse Windows speed" or "volume", in which case it's *10 to preserve a decimal place

/// get one device by it's id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    let row = (await db.query('SELECT * FROM devices WHERE id_device = $1', [id])).rows[0]; //TODO: handle errors lol

    if (typeof row === "undefined") {
        res.sendStatus(404);
    } else {
        res.send(row);
    }
});

/// add or modify a device
// requires authentication
router.put('/:id', (req, res) => {
    //TODO: maybe convert this to a post, cause I don't think it's needed to update devices as they are hardware and shouldn't change.

    //I should prolly overwrite the device.id_user with the current logged user's guid
});

/// delete a device
// requires authentication
router.delete('/:id', (req, res) => {
    //not sure how needed, maybe once a user is deleted...?
});