const db = require('../config/database');

class EnvironmentService {
    static async init() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('PRAGMA foreign_keys = ON');
                db.run(`CREATE TABLE IF NOT EXISTS environment (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    temperature REAL,
                    humidity REAL,
                    ammonia_level REAL,
                    light_intensity REAL,
                    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }
    // Get all environment records
    static getAllRecords() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM environment ORDER BY recorded_at DESC', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    // Get latest environment record
    static getLatestRecord() {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM environment ORDER BY recorded_at DESC LIMIT 1', [], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    // Add new environment record
    static addRecord(data) {
        const { temperature, humidity, ammonia_level, light_intensity } = data;
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO environment (temperature, humidity, ammonia_level, light_intensity) VALUES (?, ?, ?, ?)',
                [temperature, humidity, ammonia_level, light_intensity],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...data });
                }
            );
        });
    }

    // Get environment records within a date range
    static getRecordsByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM environment WHERE recorded_at BETWEEN ? AND ? ORDER BY recorded_at DESC',
                [startDate, endDate],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = EnvironmentService;