const db = require('./database');

// Insert sample birds
const sampleBirds = [
    { tag_number: 'B001', breed: 'Rhode Island Red', age: 24, weight: 2.5, status: 'healthy' },
    { tag_number: 'B002', breed: 'Plymouth Rock', age: 18, weight: 2.3, status: 'healthy' },
    { tag_number: 'B003', breed: 'Leghorn', age: 30, weight: 1.8, status: 'sick' },
    { tag_number: 'B004', breed: 'Australorp', age: 15, weight: 2.1, status: 'healthy' },
    { tag_number: 'B005', breed: 'Wyandotte', age: 20, weight: 2.4, status: 'healthy' }
];

// Insert sample environment records
const sampleEnvironment = [
    { temperature: 25.5, humidity: 65, ammonia_level: 15, light_intensity: 50 },
    { temperature: 26.2, humidity: 62, ammonia_level: 12, light_intensity: 55 },
    { temperature: 24.8, humidity: 68, ammonia_level: 18, light_intensity: 45 },
    { temperature: 25.0, humidity: 63, ammonia_level: 14, light_intensity: 52 },
    { temperature: 26.5, humidity: 60, ammonia_level: 16, light_intensity: 48 }
];

// Insert sample feed records
const sampleFeed = [
    { feed_type: 'Starter Feed', quantity: 50.5, cost: 75.25 },
    { feed_type: 'Grower Feed', quantity: 75.0, cost: 95.50 },
    { feed_type: 'Layer Feed', quantity: 60.5, cost: 82.75 },
    { feed_type: 'Finisher Feed', quantity: 45.0, cost: 65.25 },
    { feed_type: 'Supplement Feed', quantity: 25.5, cost: 45.50 }
];

// Function to insert sample data
async function seedDatabase() {
    try {
        // Insert birds
        for (const bird of sampleBirds) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO birds (tag_number, breed, age, weight, status) VALUES (?, ?, ?, ?, ?)',
                    [bird.tag_number, bird.breed, bird.age, bird.weight, bird.status],
                    (err) => {
                        if (err) reject(err);
                        resolve();
                    }
                );
            });
        }

        // Insert environment records
        for (const env of sampleEnvironment) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO environment (temperature, humidity, ammonia_level, light_intensity) VALUES (?, ?, ?, ?)',
                    [env.temperature, env.humidity, env.ammonia_level, env.light_intensity],
                    (err) => {
                        if (err) reject(err);
                        resolve();
                    }
                );
            });
        }

        // Insert feed records
        for (const feed of sampleFeed) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO feed (feed_type, quantity, cost) VALUES (?, ?, ?)',
                    [feed.feed_type, feed.quantity, feed.cost],
                    (err) => {
                        if (err) reject(err);
                        resolve();
                    }
                );
            });
        }

        // Insert health records (after birds are inserted)
        const healthRecords = [
            { bird_id: 1, condition: 'Healthy', treatment: 'Regular checkup', medication: 'None' },
            { bird_id: 2, condition: 'Healthy', treatment: 'Vaccination', medication: 'Vaccine A' },
            { bird_id: 3, condition: 'Respiratory infection', treatment: 'Antibiotics', medication: 'Amoxicillin' },
            { bird_id: 4, condition: 'Healthy', treatment: 'Deworming', medication: 'Dewormer X' },
            { bird_id: 5, condition: 'Healthy', treatment: 'Vitamin supplement', medication: 'Multivitamin' }
        ];

        for (const health of healthRecords) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO health (bird_id, condition, treatment, medication) VALUES (?, ?, ?, ?)',
                    [health.bird_id, health.condition, health.treatment, health.medication],
                    (err) => {
                        if (err) reject(err);
                        resolve();
                    }
                );
            });
        }

        console.log('Sample data inserted successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Run the seeding function
seedDatabase();