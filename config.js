const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const config = {
    PORT: process.env.PORT,
    PRIVATE_KEY: undefined,
    PUBLIC_KEY: undefined,
};

if (process.env.PRIVATE_KEY_PATH) {
    config.PRIVATE_KEY = fs.readFileSync(process.env.PRIVATE_KEY_PATH).toString();
}

if (process.env.PUBLIC_KEY_PATH) {
    config.PUBLIC_KEY = fs.readFileSync(process.env.PUBLIC_KEY_PATH).toString();
}

if (Object.values(config).some(x => typeof x === "undefined")) {
    console.log("Some .env config values were not defined! Exiting...");
    process.exit();
} else {
    console.log(".env config loaded");
}


module.exports = config;