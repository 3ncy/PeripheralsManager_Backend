const express = require('express');
const router = express.Router();
module.exports = router;

const db = require('../db');

//TODO: add the /profiles endpoint that returns all the user's profiles.
// this requires euthentication - only works when the user is logged in

// let profile = {
//     id_profile: GUID,
//     name: "Profil 1",
//     id_user: GUID,
//     devices: [
//         DEVICE, DEVICE //NOTE: see ./devices.js for syntax
//     ]
// }

//[auth]
/// get a profile by it's id
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let profile = await db.getProfile(id);

    // console.log(typeof profile);

    if (typeof profile === 'undefined') {
        res.sendStatus(404);
        return;
    }

    profile.devices = await db.getProfileDevices(profile.id_profile);
    res.send(profile);
});


/// create or update an existing profile
// requires authentication
router.put('/:id', async (req, res) => {

    let profile = req.body;

    const id = req.params.id; //todo: check together this id and the id from the object... I guess the one in url should be authoritative, or just return 400 and fuck off

    let isNew = false;
    //I should prolly overwrite the profile.id_user with the current logged user's guid
    try {


        let oldProfile = await db.getProfile(id)
        if (typeof oldProfile === 'undefined') {
            let result = db.addProfile(profile);
            isNew = true;
        } else {

            //TODO: check if req.userID = oldProfile.userId
            //if no, kick the user with 403 and exit the function.

            let result = db.updateProfile(profile);
        }


        for (let device of profile.devices) {

            //I should check all the devices' device.id_user if they belong to the user trying to add the profile

            //TODO: verify and parse all the devices. Should prolly make a method in ./devices.js
            let oldDevice = await db.getDevice(device.id_configuration);
            
            if (typeof oldDevice === 'undefined') {
                let result = await db.addDevice(device); //TODO: figure out returning errors
            } else {
                let result = await db.updateDevice(device); //TODO: figure out returning errors
            }

        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send("Some errors have occured!"); //TODO: prolly should b more descriptive
        return;
    }


    if (isNew) { //a new profile has been created
        res.status(201).send(profile);
    } else {
        res.status(200).send(profile);
    }

    // if the devices listed in the profile don't exist, create them
});

/// delete the specified profile
// requires authentication
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    //TODO: check if req.userID = oldProfile.userId
    //if no, kick the user with 403.
    //for this, I'll have to first fetch the profile from db :/


    let result = db.deleteProfile(id); //TODO: error handling
    res.send("ok");
});
