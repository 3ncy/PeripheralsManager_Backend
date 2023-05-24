module.exports = { //TODO: fill out the real strings and shit
    //TODO: add 401 and 403 to all endpoints that need it
    '/profiles/' : {
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
                401: {
                    description: "not logged in"
                }
            }
        }
    },
    '/profiles/{id}': {
        get: {
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
                    description: "not found"
                }
            }
        },
        put: {
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
                    description: "GUID" //TODO: add description to all other places too
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
                200: { description: "ok" },
                201: {
                    description: "created"
                    //TODO: somehow note that the Location header contains the URL on how to GET the created thing
                },
                400: { description: "bad reques" }
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
                }
            ],
            responses: {
                200: { description: "ok" },
                400: { description: "bad request" },
                404: { description: "not found" },
            }
        },
    }
}