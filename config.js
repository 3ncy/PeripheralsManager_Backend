const dotenv = require('dotenv');
dotenv.config();

const config = {
    PORT: process.env.PORT,
};

if (Object.values(config).some(x => typeof x === "undefined")) {
    console.log("Some .env config values were not defined! Exiting...");
    process.exit();
} else {
    console.log(".env config loaded");
}


module.exports = config;