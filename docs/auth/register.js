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
                        $ref: "#/components/schemas/userRegisterRequest"
                    },
                },
            },
        },
        responses: {
            201: {
                description: "User created successfully"
            },
            400: {
                description: "One or more values were invalid."
            },
        },
    },
}