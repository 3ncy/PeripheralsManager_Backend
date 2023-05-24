module.exports = {    
    '/auth/register': {
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
    },
    '/auth/public-key': {
        //this isn't used by the official client, that one has the pub key hardcoded, cause it's more secure. I don't care.
        get: {
            tags: ["auth"],
            description: "Returns the server's public key that can be used for encrypting the auth headers.",
            parameters: [],
            responses: {
                200: {
                    description: "The server's public key in the OpenSSH format"
                }
            }
        }
    }
}