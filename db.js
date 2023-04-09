const pg = require('pg')
const pool = new pg.Pool();

pool.on('connect', (client) => {
    client.query("SET search_path TO peripherals_manager;")
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
}