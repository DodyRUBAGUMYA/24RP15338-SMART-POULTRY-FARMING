const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

beforeAll((done) => {
  db = new sqlite3.Database(':memory:');
  db.run(`CREATE TABLE birds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_number TEXT UNIQUE,
    breed TEXT,
    age INTEGER,
    weight REAL,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) return done(err);
    done();
  });
});

afterAll((done) => {
  db.close(() => {
    done();
  });
});

describe('Bird Service Tests', () => {
  beforeEach((done) => {
    db.run('DELETE FROM birds', done);
  });

  test('should add a new bird', (done) => {
    const birdData = {
      breed: 'Broiler',
      age: 10,
      weight: 2.5,
      status: 'Healthy'
    };

    db.run(
      'INSERT INTO birds (breed, age, weight, status) VALUES (?, ?, ?, ?)',
      [birdData.breed, birdData.age, birdData.weight, birdData.status],
      function(err) {
        if (err) return done(err);
        expect(this.lastID).toBeTruthy();
        done();
      }
    );
  });

  test('should retrieve bird details', (done) => {
    const birdData = {
      breed: 'Broiler',
      age: 10,
      weight: 2.5,
      status: 'Healthy'
    };

    db.run(
      'INSERT INTO birds (breed, age, weight, status) VALUES (?, ?, ?, ?)',
      [birdData.breed, birdData.age, birdData.weight, birdData.status],
      function(err) {
        if (err) return done(err);
        const id = this.lastID;
        
        db.get('SELECT * FROM birds WHERE id = ?', [id], (err, row) => {
          if (err) return done(err);
          expect(row).toBeTruthy();
          expect(row.breed).toBe(birdData.breed);
          expect(row.status).toBe(birdData.status);
          done();
        });
      }
    );
  });
});