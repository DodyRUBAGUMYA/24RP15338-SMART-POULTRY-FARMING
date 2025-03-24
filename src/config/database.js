const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.resolve(__dirname, '../../data/poultry.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeTables();
    }
});

// Initialize database tables
function initializeTables() {
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
}

module.exports = db;