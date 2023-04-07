const register = require('./register');
const login = require('./login');

module.exports = {
    //TODO: might join those into one file if they don't get too long, might b easier to do stuff then
    '/auth/register': {
        ...register,
    },
    '/auth/login':{
        ...login,
    }
}