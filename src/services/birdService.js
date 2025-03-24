const db = require('../config/database');

class BirdService {
    // Get all birds
    static getAllBirds() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM birds', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    // Get a single bird by ID
    static getBirdById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM birds WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    // Add a new bird
    static addBird(birdData) {
        const { tag_number, breed, age, weight, status } = birdData;
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO birds (tag_number, breed, age, weight, status) VALUES (?, ?, ?, ?, ?)',
                [tag_number, breed, age, weight, status],
                function(err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...birdData });
                }
            );
        });
    }

    // Update a bird
    static updateBird(id, birdData) {
        const { tag_number, breed, age, weight, status } = birdData;
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE birds SET tag_number = ?, breed = ?, age = ?, weight = ?, status = ? WHERE id = ?',
                [tag_number, breed, age, weight, status, id],
                (err) => {
                    if (err) reject(err);
                    resolve({ id, ...birdData });
                }
            );
        });
    }

    // Delete a bird
    static deleteBird(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM birds WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve({ id });
            });
        });
    }
}

module.exports = BirdService;