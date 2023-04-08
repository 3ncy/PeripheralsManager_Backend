module.exports = {
    post: {
        tags: ["auth"],
        description: "login a user",
        parameters: [],
        requestBody: {
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userLoginRequest"
                    }
                }
            }
        },
        responses: {
            200: {
                description: "User successfully logged in"
            },
            400: {
                description: ""
            },
            404: {
                description: "User not found"
            }
        }
    }
}