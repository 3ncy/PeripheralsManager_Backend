const health = require('./health')

module.exports = {

    ...health,
    '/authtest': {
        post: {
            tags: ["misc"],
            description: "testing the auth stuff",
            responses: {
                200: {
                    description: "good"
                },
                401: {
                    description: "bad"
                },
            }
        }
    }

}