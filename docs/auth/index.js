const register = require('./register');
const login = require('./login');

module.exports = {
    //TODO: might join those into one file if they don't get too long, might b easier to do stuff then
    '/auth/register': {
        ...register,
    },
    '/auth/login':{
        ...login,
    },
    '/auth/public-key': {
        //TODO: document this endpoint. It simply returns the current public key used by the server.
        //this isn't used by the official client, that one has the pub key hardcoded, cause it's more secure. I don't care.
    }
}