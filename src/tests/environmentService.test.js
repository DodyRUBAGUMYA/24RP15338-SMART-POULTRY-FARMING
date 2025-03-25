const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

beforeAll((done) => {
  db = new sqlite3.Database(':memory:');
  db.run(`CREATE TABLE environment_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    humidity REAL,
    air_quality TEXT,
    timestamp TEXT
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

describe('Environment Service Tests', () => {
  beforeEach((done) => {
    db.run('DELETE FROM environment_records', done);
  });

  test('should record environment data', (done) => {
    const envData = {
      temperature: 25.5,
      humidity: 65.0,
      air_quality: 'Good',
      timestamp: new Date().toISOString()
    };

    db.run(
      'INSERT INTO environment_records (temperature, humidity, air_quality, timestamp) VALUES (?, ?, ?, ?)',
      [envData.temperature, envData.humidity, envData.air_quality, envData.timestamp],
      function(err) {
        if (err) return done(err);
        expect(this.lastID).toBeTruthy();
        done();
      }
    );
  });

  test('should retrieve latest environment data', (done) => {
    const envData = {
      temperature: 25.5,
      humidity: 65.0,
      air_quality: 'Good',
      timestamp: new Date().toISOString()
    };

    db.run(
      'INSERT INTO environment_records (temperature, humidity, air_quality, timestamp) VALUES (?, ?, ?, ?)',
      [envData.temperature, envData.humidity, envData.air_quality, envData.timestamp],
      function(err) {
        if (err) return done(err);
        
        db.get('SELECT * FROM environment_records ORDER BY timestamp DESC LIMIT 1', [], (err, row) => {
          if (err) return done(err);
          expect(row).toBeTruthy();
          expect(row.temperature).toBe(envData.temperature);
          expect(row.humidity).toBe(envData.humidity);
          done();
        });
      }
    );
  });
});