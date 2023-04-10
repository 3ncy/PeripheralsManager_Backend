const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const config = require('./config');


const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
// source of some (most, lol) stuff: https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/
//TODO: versionning!!! looks like there is a lib to help, or just slap "/v1/" in the url

//TODO: ratelimits, I've heard there is some handy lib for that...?




// get all the routes and publish them on the server
const miscRouter = require('./routes/misc');
const authRouter = require('./routes/auth');
const profilesRouter = require('./routes/profiles')
const devicesRouter = require('./routes/devices')

//TODO: add the middleware for decryption of requests
//  it will be indicated by a custom header that the content is encrypted by the server's public key.
//  the middleware will decypher the request, if neccessary,

// the authenticatin middleware will prolly sit somewhere in here, will inject the current user's GUID into the request
//TODO: add all the 400s to all the endpoints' responses requiring authentication


app.use('/', miscRouter);
app.use('/auth', authRouter);
app.use('/profiles', profilesRouter); //TODO: add the middleware for authentication
app.use('/devices', devicesRouter); //TODO: add the middleware for authentication

//#region object signatures
const GUID = "guid"; const DEVICE = "device";
let profile = {
    id: GUID,
    name: "Profil 1",
    id_user: GUID,
    devices: [
        DEVICE, DEVICE
    ]
}
let user = {
    id_user: GUID,
    name: "Jmeno",
    password_hash: "asdjfhaksdjhfkh"
}
let audioDevice = {
    id_device: GUID,
    name: "HyperX headphones",
    volume: 16,
    id_user: GUID
}
let pointerRevice = {
    id_device: GUID,
    name: "Laser Mouse 2",
    windowsSpeed: 10,
    id_user: GUID
}
let device = {
    id_device: GUID,
    name: "device name",
    type: "audio", // "audio"/"pointer" //NOTE: if this were in a normal language, I'd use an enum, but it's JS...
    attribute: null, // whatever, it depends on the type
    id_user: GUID
}
//#endregion

//basic 404 error handle
app.use((req, res, next) => {
    //I *think* here it should go only on 404 cause all the pages above weren't found    
    res.status(404).send("Page not found (◞‸◟；)");
});

app.listen(config.PORT, () => {
    console.log("Server loaded and (hopefully) ready to go!");
});