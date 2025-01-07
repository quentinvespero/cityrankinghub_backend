FROM mongo:8

# copying the init.js file into the folder below that is the default folder inside the docker image.
# its role is to initialise the database, with authentification and stuff
COPY init.js /docker-entrypoint-initdb.d/