module.exports = {

    post: {
        tags: ["auth"],
        description: "Add a user",
        parameters: [],
        requestBody: {
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/User"
                    },
                },
            },
        },
        responses: {
            201: {
                description: "User created successfully"
            }
        }
    },

}