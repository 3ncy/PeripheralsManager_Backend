const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const auth = require('./auth');
const profiles = require('./profiles');
const devices = require('./devices');
const misc = require('./misc');

module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    paths: {
        ...auth,
        ...profiles,
        ...devices,
        ...misc,
    },
};



//ngl, leardned how to do all this form here: https://github.com/mwangiKibui/node.js-rest-api-documentation/blob/master/src/docs/index.js