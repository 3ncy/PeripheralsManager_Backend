module.exports = { //TODO: fill out the real strings and stuff
    //TODO: add 401 and 403 to all endpoints that need it
    '/profiles/': {
        get: {
            tags: ["profiles"],
            description: "Get all the user's profiles",
            responses: {
                200: {
                    description: "ok",
                    content: {
                        'application/json': {
                            schema: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/profile"
                                }
                            }
                        }
                    }
                },
                400: {
                    description: "Bad request. See response body for details.",
                },
                401: {
                    description: "Not logged in. Refer to the response body for more info."
                }
            }
        }
    },
    '/profiles/{id}': {
        get: {
            tags: ["profiles"],
            description: "Get a configuration profile by it's ID.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The profile's GUID"
                }
            ],
            responses: {
                200: {
                    description: "ok",
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/profile"
                            }
                        }
                    },
                },
                404: {
                    description: "The profile with this ID wasn't found."
                }
            }
        },
        put: {
            tags: ["profiles"],
            description: "Create or update a profile.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The profile's GUID" //TODO: add description to all other places too
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/profile"
                        },
                    },
                },
            },
            responses: {
                200: { description: "The profile was updated" },
                201: {
                    description: "A new profile was created."
                    //TODO: somehow note that the Location header contains the URL on how to GET the created thing
                },
                400: { description: "Incorrect data format/values" },
                401: { description: "Invalid login credentials." },
                403: { description: "You are not authorized to update this resource." },
            }
        },
        delete: {
            tags: ["profiles"],
            description: "",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The profile's GUID"
                }
            ],
            responses: {
                200: { description: "Ok, deleted." },
                400: { description: "Bad request." },
                404: { description: "The profile was not found." },
            }
        },
    }
}