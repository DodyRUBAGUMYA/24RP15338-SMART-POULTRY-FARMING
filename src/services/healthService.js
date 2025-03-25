const db = require('../config/database');

class HealthService {
    static async recordHealthCheck(birdId, data) {
        return new Promise((resolve, reject) => {
            db.get('SELECT id FROM birds WHERE id = ?', [birdId], (err, bird) => {
                if (err) reject(err);
                if (!bird) reject(new Error('Bird not found'));
                
                db.run(
                    'INSERT INTO health (bird_id, condition, treatment, medication) VALUES (?, ?, ?, ?)',
                    [birdId, data.condition, data.treatment, data.medication],
                    function(err) {
                        if (err) reject(err);
                        resolve({ id: this.lastID, bird_id: birdId, ...data });
                    }
                );
            });
        });
    }

    static async getHealthHistory(birdId) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM health WHERE bird_id = ? ORDER BY recorded_at DESC',
                [birdId],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows || []);
                }
            );
        });
    }

    static async updateHealthRecord(recordId, updates) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM health WHERE id = ?', [recordId], (err, record) => {
                if (err) reject(err);
                if (!record) reject(new Error('Health record not found'));

                const updateFields = [];
                const updateValues = [];
                for (const [key, value] of Object.entries(updates)) {
                    if (value !== undefined) {
                        updateFields.push(`${key} = ?`);
                        updateValues.push(value);
                    }
                }

                if (updateFields.length === 0) {
                    resolve(record);
                    return;
                }

                updateValues.push(recordId);
                db.run(
                    `UPDATE health SET ${updateFields.join(', ')} WHERE id = ?`,
                    updateValues,
                    (err) => {
                        if (err) reject(err);
                        db.get('SELECT * FROM health WHERE id = ?', [recordId], (err, updatedRecord) => {
                            if (err) reject(err);
                            resolve(updatedRecord);
                        });
                    }
                );
            });
        });
    }

    static async deleteHealthRecord(recordId) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM health WHERE id = ?', [recordId], (err) => {
                if (err) reject(err);
                resolve();
            });
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