const db = process.env.NODE_ENV === 'test' ? require('../config/test-database') : require('../config/database');

class FeedService {
    // Get all feed records
    static getAllRecords() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM feed ORDER BY feeding_time DESC', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    // Get feed records by date range
    static getRecordsByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM feed WHERE feeding_time BETWEEN ? AND ? ORDER BY feeding_time DESC',
                [startDate, endDate],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }

    // Add new feed record
    static addRecord(data) {
        const { feed_type, quantity, cost } = data;
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO feed (feed_type, quantity, cost) VALUES (?, ?, ?)',
                [feed_type, quantity, cost],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...data });
                }
            );
        });
    }

    // Get feed consumption summary
    static getFeedSummary() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT feed_type, SUM(quantity) as total_quantity, SUM(cost) as total_cost FROM feed GROUP BY feed_type',
                [],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = FeedService;