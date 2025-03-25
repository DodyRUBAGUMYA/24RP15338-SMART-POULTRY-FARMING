const db = require('../config/test-database');

beforeAll(async () => {
    await new Promise((resolve, reject) => {
        db.run('CREATE TABLE IF NOT EXISTS birds (id INTEGER PRIMARY KEY, name TEXT)', (err) => {
            if (err) reject(err);
            db.run('CREATE TABLE IF NOT EXISTS health (id INTEGER PRIMARY KEY, bird_id INTEGER, condition TEXT, treatment TEXT, medication TEXT, recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
});

beforeEach(async () => {
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM health', (err) => {
            if (err) reject(err);
            db.run('DELETE FROM birds', (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
});

afterAll(async () => {
    await new Promise((resolve) => {
        db.close(() => resolve());
    });
});