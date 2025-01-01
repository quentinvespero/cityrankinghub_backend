// this code and the db object come from the initialisation mongoDB shell used in docker-entrypoint-initdb.d

db.createCollection('user')

db.user.insertOne(
    {
        username:'quentin',
        password:'test123',
        mail:'quentin@gmail.com',
        subscribedAt: new Date()
    }
)