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

router.get('/:id', (req, res) => {

});