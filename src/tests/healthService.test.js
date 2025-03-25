const HealthService = require('../services/healthService');
const db = require('../config/test-database');

describe('HealthService', () => {
    let testBirdId;

    beforeEach(async () => {
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO birds (name) VALUES (?)', ['TestBird'], function(err) {
                if (err) reject(err);
                testBirdId = this.lastID;
                resolve();
            });
        });
    });

    it('should record a health check', async () => {
        const healthData = {
            condition: 'Healthy',
            treatment: 'None',
            medication: 'None'
        };

        const result = await HealthService.recordHealthCheck(testBirdId, healthData);
        expect(result).toHaveProperty('id');
        expect(result.bird_id).toBe(testBirdId);
        expect(result.condition).toBe(healthData.condition);
    });

    it('should get health history', async () => {
        const healthData = {
            condition: 'Healthy',
            treatment: 'None',
            medication: 'None'
        };

        await HealthService.recordHealthCheck(testBirdId, healthData);
        const history = await HealthService.getHealthHistory(testBirdId);
        
        expect(Array.isArray(history)).toBe(true);
        expect(history.length).toBeGreaterThan(0);
        expect(history[0].bird_id).toBe(testBirdId);
    });
});