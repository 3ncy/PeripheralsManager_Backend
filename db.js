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
    async getDevice(id) {
        return (await this.query('SELECT * FROM devices WHERE id_configuration = $1::uuid;', [id])).rows[0]; //TODO: handle errors lol
    },
    async getProfile(id) {
        return (await this.query('SELECT * FROM profiles WHERE id_profile = $1::uuid;', [id])).rows[0]; //TODO: handle errors lol        
    },
    async getProfiles(id_user){
        return (await this.query('SELECT * FROM profiles WHERE id_user = $1::uuid;', [id_user])).rows; //TODO: handle errors lol        
    },
    async getProfileDevices(profileId) {
        return (await this.query(`SELECT * FROM devices WHERE id_profile = $1::uuid`, [profileId])).rows;
    },

    async addProfile(profile) {
        return await this.query(
            "INSERT INTO profiles VALUES ($1::uuid, $2::text, $3::uuid);",
            [profile.id_profile, profile.name, profile.id_user]
        );
    },
    async updateProfile(profile){
        return await this.query(
            "UPDATE profiles SET name=$2::text WHERE profiles.id_profile=$1::uuid", //NOTE: only the name can be edited, cause y would u edit the rest
            [profile.id_profile, profile.name]
        );
    },
    async addDevice(device) {
        
        return await this.query(
            "INSERT INTO devices VALUES ($1::uuid, $2::text, $3::text, $4::integer, $5::uuid, $6::uuid);",
            [device.id_configuration, device.name, device.type, device.attribute, device.id_user, device.id_profile]
        );
    },
    async updateDevice(device) {
        return await this.query(
            "UPDATE devices SET name=$2::text, type=$3::text, attribute=$4::integer, id_user=$5::uuid, id_profile=$6::uuid WHERE devices.id_configuration=$1::uuid",
            [device.id_configuration, device.name, device.type, device.attribute, device.id_user, device.id_profile]
        );
    },

    async deleteProfile(id){
        return await this.query(
            "DELETE FROM profiles WHERE profiles.id_profile=$1::uuid",
            [id]
        );
    }

}