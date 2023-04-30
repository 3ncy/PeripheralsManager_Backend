module.exports = {
    components: {
        schemas: {
            //TODO: all this lol



            // id model
            id: {
                type: "string",
                description: "An uniquie GUID of an object",
                example: "95ec98d8-d1ba-4a05-9c0a-a090680f521d"
            },

            // device model
            device: {
                type: "object",
                properties: {
                    id_device: {
                        type: "GUID",
                        description: "",
                        example: ""
                    },
                    name: {
                        type: "string",
                        description: "",
                    },
                    type: {
                        type: "string",
                        description: "The type of the device. **MUST BE EITHER** \"audio\" or \"pointer\""
                    },
                    attribute: {
                        type: "integer" //for now, when I add more device types, this will likely expand/change
                    },
                    id_user: {
                        type: "GUID",
                        description: "",
                        example: ""
                    },
                    id_profile: {
                        type: "GUID",
                        description: "",
                        example: ""
                    }
                },
            },

            // profile model
            // let profile = {
            //     id: GUID,
            //     name: "Profil 1",
            //     id_user: GUID,
            //     devices: [
            //         DEVICE, DEVICE
            //     ]
            // }
            profile: {
                type: "object",
                properties: {
                    id_profile: {
                        type: "GUID",
                        description: "",
                        example: ""
                    },
                    name: {
                        type: "string",
                        description: ""
                    },
                    id_user: {
                        type: "GUID",
                        description: "",
                        example: ""
                    },
                    devices: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/device"
                        }
                    },
                }
            },

            userRegisterResponse: {
                type: "object",
                properties: {
                    id_user: {
                        type: "GUID",
                        description: "The unique GUID of the user",
                        example: "95ec98d8-d1ba-4a05-9c0a-a090680f521d"
                    },
                    name: {
                        type: "string",
                        description: "The users's username",
                        example: "B.O.B"
                    },
                },
            },

            // user register request
            userRegisterRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The users's username",
                    },
                    password: {
                        type: "string",
                        description: "The user's password"
                    },
                }
            },
            // user login request
            userLoginRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The users's username",
                    },
                    password: {
                        type: "string",
                        description: "The user's password"
                    },
                },
            },
        },
        responses: {
            unauthenticated: {
                description: "The user needs to be logged in to perform this operation. Plase attach "
            },
        },
    },
}