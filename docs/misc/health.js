module.exports = {
    '/health': {
        get: {
            tags: ["misc"],
            description: "Shows whether the API is alive or not",
            responses: {
                200: {
                    description: "The API is running"
                },
                404: {
                    description: "The API is not running ok"
                },
                500: {
                    description: "The API is not running ok"
                },
            }
        }
    }
}