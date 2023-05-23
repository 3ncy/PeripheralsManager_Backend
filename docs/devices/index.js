module.exports = { //TODO: fill out the real strings and values
    //TODO: add 401 and 403 to all endpoints that need it
    '/devices/{id}': {
        get: {
            tags: ["devices"],
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
                    description: "Ok.",
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/device"
                            }
                        }
                    },
                },
                404: {
                    description: "A device with the supplied ID wasn't found."
                }
            }
        },
        put: {
            tags: ["devices"],
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
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/device"
                        },
                    },
                },
            },
            responses: {
                200: {  // I've read somewhere that 204 "No content" is maybe better for this, but idk
                    description: "Successfuly edited the device."
                },
                201: {
                    description: "created"
                    //TODO: somehow note that the Location header contains the URL on how to GET the created thing
                },
                400: {
                    description: "Some fields have invalid values. See response body for more details."
                }
            }
        },
        delete: {
            tags: ["devices"],
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
                405: {
                    description: "Deleting devices isn't supported. They will get deleted with the user account."
                }
                // 200: { description: "ok" },
                // 400: { description: "bad request" },
                // 404: { description: "not found" },
            }
        },
    },
}