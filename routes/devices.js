const express = require('express');
const router = express.Router();
module.exports = router;


// let device = {
//     id_device: GUID,
//     name: "device name",
//     type: "audio", // "audio"/"pointer" //NOTE: if this were in a normal language, I'd use an enum, but it's JS...
//     attribute: null, // whatever, it depends on the type
//     id_user: GUID
// }
//                          and for DB it's:
//let audioDevice = {
//     id_device: GUID,
//     name: "HyperX headphones",
//     volume: 16,
//     id_user: GUDI
// }
// let pointerRevice = {
//     id_device: GUID,
//     name: "Laser Mouse 2",
//     windowsSpeed: 10,
//     id_user: GUID
// }

/// get one device by it's id 
router.get('/:id', (req, res) => {

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