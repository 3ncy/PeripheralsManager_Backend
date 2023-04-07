const express = require('express');
const app = express();
// app.use(express.json()); //idk, may be needed, I just remembered this


const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
// source of some (most, lol) stuff: https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/
//TODO: versionning!!! looks like there is a lib to help, or just slap "/v1/" in the url

// get all the routes and publish them on the server
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profilesRouter = require('./routes/profiles')
const devicesRouter = require('./routes/devices')

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profiles', profilesRouter); //TODO: add the middleware for authentization
app.use('/devices', devicesRouter); //TODO: add the middleware for authentization

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
    res.send("Page not found (◞‸◟；)");
});

app.listen(54321, () => { //TODO: specify port in ".env" and read it like: `const PORT = process.env.PORT || 4111;`
    console.log("Server loaded and (hopefully) ready to go!");
});