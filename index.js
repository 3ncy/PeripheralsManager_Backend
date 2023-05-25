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
let v = 'v1/';

//TODO: ratelimits, I've heard there is some handy lib for that...?




// get all the routes and publish them on the server
const miscRouter = require('./routes/misc');
const authRouter = require('./routes/auth');
const profilesRouter = require('./routes/profiles')
const devicesRouter = require('./routes/devices')


app.use('/' + v, miscRouter);
app.use('/auth' + v, authRouter);
app.use('/profiles' + v, profilesRouter); //TODO: add the middleware for authentication
app.use('/devices' + v, devicesRouter); //TODO: add the middleware for authentication

//basic 404 error handle
app.use((req, res, next) => {
    //I *think* here it should go only on 404 cause all the pages above weren't found    
    res.status(404).send("Page not found (◞‸◟；)");
});

app.listen(config.PORT, () => {
    console.log("Server loaded and (hopefully) ready to go!");
});