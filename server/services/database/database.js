const sqlite3 = require("sqlite3").verbose();

const databasePath = __dirname + "/database.db";

const createDatabaseConnection = () => {
    const db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.log(err);
            return null;
        };
    });
    return db;
}

module.exports = createDatabaseConnection();