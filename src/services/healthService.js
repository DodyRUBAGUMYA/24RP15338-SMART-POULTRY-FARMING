const db = require('../config/database');

class HealthService {
    // Get all health records
    static getAllRecords() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM health ORDER BY recorded_at DESC', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    // Get health records for a specific bird
    static getBirdHealthRecords(birdId) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM health WHERE bird_id = ? ORDER BY recorded_at DESC',
                [birdId],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }

    // Add new health record
    static addRecord(data) {
        const { bird_id, condition, treatment, medication } = data;
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO health (bird_id, condition, treatment, medication) VALUES (?, ?, ?, ?)',
                [bird_id, condition, treatment, medication],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...data });
                }
            );
        });
    }

    // Get health records by date range
    static getRecordsByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM health WHERE recorded_at BETWEEN ? AND ? ORDER BY recorded_at DESC',
                [startDate, endDate],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }

    // Get health summary for all birds
    static getHealthSummary() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT condition, COUNT(*) as count FROM health GROUP BY condition',
                [],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = HealthService;