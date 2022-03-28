// NOTE: This uuid matches the one requested on the client side
// Do not change until user functionality is complete
const uuid = 'cabc437a-4ba0-4086-9d74-8b975febb936'

db.list.drop();
db.list.insertOne({
    id: uuid,
    items: [
        {
            id: '30834b7c-bbba-49e8-8356-af4b4736bd97',
            completed: true,
            description: 'Review Coding Challenge'
        },
        {
            id: '8e9fcc61-9e8f-451d-b7ee-f8445268b3ff',
            completed: false,
            description: 'Hire Michael Paccione'
        },
        {
            id: '8ca3449a-3f81-4d2e-8b27-89e9f2b2a7cc',
            completed: false,
            description: 'Live Long and Prosper'
        }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
})