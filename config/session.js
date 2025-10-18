const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBstore = mongoDbStore(expressSession);

    const store = new MongoDBstore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret-key 11133211133',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    };
}


module.exports = createSessionConfig;