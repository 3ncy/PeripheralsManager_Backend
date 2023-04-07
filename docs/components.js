module.exports = {
    components: {
        schemas: {
            //TODO: all this lol

            // user model
            User: {
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
                    password_hash: {
                        type: "string",
                        description: "A hash of the user's password stored in the DB. \n**IS NOT** sent out on GET requests"
                    }
                },
            },
            // id model
            //?? not sure why they have it in the example, maybe I'll see down the line
            //btw it's not an object, just straing the stuff

            
        },
    },
}