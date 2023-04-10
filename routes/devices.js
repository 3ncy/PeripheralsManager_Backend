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

    let device = await getDevice(id);
    console.log(device);

    if (typeof device === "undefined") {
        res.sendStatus(404);
    } else {
        res.send(device);
    }
});

async function getDevice(id) {
    let row = (await db.query('SELECT * FROM devices WHERE id_device = $1::uuid;', [id])).rows[0]; //TODO: handle errors lol
    return row;
}

/// add or modify a device
// requires authentication
router.put('/:id', async (req, res) => {


    let device = req.body;
    // console.log(req);
    // console.log(req.body);
    // console.log("received device:")
    // console.log(device);

    const id = req.params.id; //todo: check together this id and the id from the object... I guess the one in url should be authoritative, or just return 400 and fuck off


    let oldDevice = await getDevice(id);
    if (typeof oldDevice === "undefined") { //device not found -> create new        
        let result = await db.query(
            "INSERT INTO devices VALUES ($1::uuid, $2::text, $3::text, $4::integer, $5::uuid);",
            [device.id_device, device.name, device.type, device.attribute, device.id_user]
        );
        res.status(201).send(device);
    } else { //device found -> modify it
        // device.id_device ??= oldDevice.id_device; //hmm, not sure abt this one, prolly it shouldn't be possible to change since it's the index in the db? idk, may ask during the lesson
        device.id_device = id; // ???? idk
        device.name ??= oldDevice.name;
        device.type ??= oldDevice.type; //TODO: should check if the type is valid
        device.attribute ??= oldDevice.attribute;
        device.id_user ??= oldDevice.id_user;

        let result = await db.query(
            "UPDATE devices SET name=$2::text, type=$3::text, attribute=$4::integer, id_user=$5::uuid WHERE devices.id_device=$1::uuid",
            [device.id_device, device.name, device.type, device.attribute, device.id_user]
        );//TODO: set status using the result variable
        res.status(200).send(device);
    }


    //TODO: error handling

    //I should prolly overwrite the device.id_user with the current logged user's guid
});

/// delete a device
// requires authentication
router.delete('/:id', (req, res) => {
    //not sure how needed, maybe once a user is deleted...?
});