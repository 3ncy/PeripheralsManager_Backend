module.exports = { //TODO: fill out the real strings and values

    '/devices/{id}': {
        get: {
            tags: ["devices"],
            description: "Get a device details by it's ID.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The device's GUID" 
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
            description: "Create or update a device object.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The device's GUID" 
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
                    description: "The device has been created."
                    //TODO: somehow note that the Location header contains the URL on how to GET the created thing
                },
                400: {
                    description: "Some fields have invalid values. See response body for more details."
                },
                401: { description: "Invalid login credentials."},
                403: { description: "You are not authorized to update this resource."},
            }
        },
        delete: {
            tags: ["devices"],
            description: "Delete a specific device.",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    schema: {
                        $ref: "#/components/schemas/id"
                    },
                    required: true,
                    description: "The device's GUID" 
                }
            ],
            responses: {
                405: {
                    description: "Deleting devices isn't supported. They will get deleted with the user account."
                }
            }
        },
    },
}