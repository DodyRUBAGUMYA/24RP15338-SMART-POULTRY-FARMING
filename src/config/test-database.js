const sqlite3 = require('sqlite3').verbose();

// Create an in-memory database for testing
const db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

// Function to close database connection
db.closeConnection = function() {
    return new Promise((resolve, reject) => {
        this.close((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

// Configure database settings
db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON')
      .run('PRAGMA journal_mode = DELETE')
      .run('PRAGMA synchronous = FULL')
      .run('BEGIN TRANSACTION;', function(err) {
        if (err) throw err;
        initializeTables();
    });
});

// Initialize database tables
function initializeTables() {
    db.serialize(() => {
        // Birds table
        db.run(`CREATE TABLE IF NOT EXISTS birds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_number TEXT UNIQUE,
        breed TEXT,
        age INTEGER,
        weight REAL,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Environment records table
    db.run(`CREATE TABLE IF NOT EXISTS environment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        humidity REAL,
        ammonia_level REAL,
        light_intensity REAL,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Feed records table
    db.run(`CREATE TABLE IF NOT EXISTS feed (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        feed_type TEXT,
        quantity REAL,
        cost REAL,
        feeding_time DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Health records table
    db.run(`CREATE TABLE IF NOT EXISTS health (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bird_id INTEGER,
        condition TEXT,
        treatment TEXT,
        medication TEXT,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (bird_id) REFERENCES birds (id)
    )`);
    });
}

module.exports = db;