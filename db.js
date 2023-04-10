const pg = require('pg')
const pool = new pg.Pool();

pool.on('connect', (client) => {
    client.query("SET search_path TO peripherals_manager;")
    console.log("Conected to db");
});

module.exports = {
    query: (text, params) => {
        //TODO: maybe I could bake in here error handling? for example parsing types (uuid)
        return pool.query(text, params);
    },
}