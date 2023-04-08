module.exports = { //TODO: fill out the real strings and shit
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