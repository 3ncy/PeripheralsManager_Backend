const express = require('express');
const router = express.Router();
module.exports = router;

const db = require('../db');

const auth = require('../authMW');

// let device = {
//     id_configuration: GUID,
//     name: "device name",
//     type: "audio",
//     attribute: null, // whatever, it depends on the type
//     id_user: GUID,
//     id_profile: GUID
// }
//
//  //NOTE: if this were in a normal language, I'd use an enum, but it's JS...
//  type: [audio | mouse]
//  attribute: can either mean "Mouse Windows speed" or "volume", in which case it's *10 to preserve a decimal place

/// get one device by it's id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let device = await db.getDevice(id);
    // console.log(device);

    if (typeof device === "undefined") {
        res.sendStatus(404);
    } else {
        res.send(device);
    }
});

/// add or modify a device
// requires authentication
router.put('/:id', auth, async (req, res) => {
    let device = req.body;

    const id = req.params.id; //TODO: check together this id and the id from the object... I guess the one in url should be authoritative, or just return 400 and f- off

    let oldDevice = await db.getDevice(id);

    if (typeof oldDevice === "undefined") { //device not found -> create new        

        let result = db.addDevice(device);//TODO: set status using the result variable
        res.status(201).send(device);
        return;

    } else { //device found -> modify it

        if (req.id_user !== oldDevice.id_user) {
            res.status(403).send("You are not authorized to edit this device.");
            return;
        }

        if (id != device.id_configuration) {
            res.status(400).send("IDs don't match!");
            return;
        }

        //TODO: check if data is valid, (no nulls), Maybe I could extract the checking into middleware?
        if (device.type !== 'audio' && device.type !== 'pointer') {
            res.status(400).send("Invalid device type");
            return;
        }

        let result = db.updateDevice(device)//TODO: set status using the result variable
        res.status(200).send(device);
        return;
    }

    //TODO: error handling

    //I should prolly overwrite the device.id_user with the current logged user's guid
});

/// delete a device
// requires authentication
router.delete('/:id', (req, res) => {
    //not sure how needed, maybe once a user is deleted...?
    //but that should be handled by cascading in the db.
    //will probably leave this out, unless it's *really* needed to be 'crud'
    res.setHeader('Allow', 'GET, PUT');
    res.sendStatus(405); //405 - Method not allowed 
});