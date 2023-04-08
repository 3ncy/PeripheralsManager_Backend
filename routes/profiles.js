const express = require('express');
const router = express.Router();
module.exports = router;


// let profile = {
//     id: GUID,
//     name: "Profil 1",
//     id_user: GUID,
//     devices: [
//         DEVICE, DEVICE //NOTE: see ./devices.js for syntax
//     ]
// }

/// get a profile by it's id
router.get('/:id', (req, res) => {

});

/// create or update an existing profile
// requires authentication
router.put('/:id', (req, res) => { 

    //I should prolly overwrite the profile.id_user with the current logged user's guid

    //I should check all the devices' device.id_user if they belong to the user trying to add the profile
});

/// delete the specified profile
// requires authentication
router.delete('/:id', (req, res) => {
});
