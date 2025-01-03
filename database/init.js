// this code and the db object come from the initialisation mongoDB shell used in docker-entrypoint-initdb.d

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)

db.createUser({
    user: process.env.MONGO_APPUSER_USERNAME,
    pwd: process.env.MONGO_APPUSER_PASSWORD,
    roles: [
        {
            role: "readWrite",
            db: process.env.MONGO_INITDB_DATABASE
        }
    ]
})