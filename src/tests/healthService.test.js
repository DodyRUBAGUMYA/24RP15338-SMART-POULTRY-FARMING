const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

beforeAll((done) => {
  db = new sqlite3.Database(':memory:');
  db.run(`CREATE TABLE health (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bird_id INTEGER,
    condition TEXT,
    treatment TEXT,
    medication TEXT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bird_id) REFERENCES birds (id)
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

describe('Health Service Tests', () => {
  beforeEach((done) => {
    db.run('DELETE FROM health', done);
  });

  test('should add a health record', (done) => {
    const healthRecord = {
      bird_id: 1,
      condition: 'Healthy',
      treatment: 'None',
      date: new Date().toISOString()
    };

    db.run(
      'INSERT INTO health (bird_id, condition, treatment, recorded_at) VALUES (?, ?, ?, ?)',
      [healthRecord.bird_id, healthRecord.condition, healthRecord.treatment, healthRecord.date],
      function(err) {
        if (err) return done(err);
        expect(this.lastID).toBeTruthy();
        done();
      }
    );
  });

  test('should retrieve health records', (done) => {
    const healthRecord = {
      bird_id: 1,
      condition: 'Healthy',
      treatment: 'None',
      date: new Date().toISOString()
    };

    db.run(
      'INSERT INTO health (bird_id, condition, treatment, recorded_at) VALUES (?, ?, ?, ?)',
      [healthRecord.bird_id, healthRecord.condition, healthRecord.treatment, healthRecord.date],
      function(err) {
        if (err) return done(err);
        
        db.all('SELECT * FROM health', [], (err, rows) => {
          if (err) return done(err);
          expect(Array.isArray(rows)).toBeTruthy();
          expect(rows.length).toBe(1);
          expect(rows[0].condition).toBe(healthRecord.condition);
          done();
        });
      }
    );
  });
});