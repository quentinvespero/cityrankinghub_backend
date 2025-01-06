// this code and the db object comes from the initialisation mongoDB shell used in docker-entrypoint-initdb.d
// (the code here is executed synchronously ; line by line)

// authentication with the root user in order to have the permissions to create the user and database below
// (we have to do that because the root user has been created in the compose.yml already so any operation require authentication)
db = db.getSiblingDB('admin')
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD)

print("Connecting to database: " + process.env.MONGO_INITDB_DATABASE)

// changing for the database of the app
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)

print("Connected to database: " + db.getName())

// appuser creation, the user that will perform the actions through nodejs
try {
    db.createUser({
        user: process.env.MONGO_APPUSER_USERNAME,
        pwd: process.env.MONGO_APPUSER_PASSWORD,
        roles: [{role: "readWrite",db: process.env.MONGO_INITDB_DATABASE}]
    })
    print('user created successfully 🙃')
}
catch (error) {
    print('--------------------------error when trying to create the mongo app user----------- : ', error)
}

// Create a "users" collection with an optional initial document, just so it's not empty
try {
    db.createCollection("users")
    db.users.insertOne({ initialized: true }) // Add a dummy document to ensure persistence
    print('collection created successfully 🙃')
}
catch (error) {
    print('--------------------------error when trying to create the collection----------- : ', error)
}