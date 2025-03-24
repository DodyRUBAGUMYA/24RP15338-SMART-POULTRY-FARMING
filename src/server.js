const express = require('express');
const app = express();
const BirdService = require('./services/birdService');
const EnvironmentService = require('./services/environmentService');
const FeedService = require('./services/feedService');
const HealthService = require('./services/healthService');

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Smart Poultry Farming API' });
});

// Birds Management Routes
app.get('/api/birds', async (req, res) => {
    try {
        const birds = await BirdService.getAllBirds();
        res.json(birds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/birds', async (req, res) => {
    try {
        const bird = await BirdService.addBird(req.body);
        res.status(201).json(bird);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/birds/:id', async (req, res) => {
    try {
        const bird = await BirdService.getBirdById(req.params.id);
        if (!bird) return res.status(404).json({ error: 'Bird not found' });
        res.json(bird);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/birds/:id', async (req, res) => {
    try {
        const bird = await BirdService.updateBird(req.params.id, req.body);
        res.json(bird);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/birds/:id', async (req, res) => {
    try {
        await BirdService.deleteBird(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Environment Monitoring Routes
app.get('/api/environment', async (req, res) => {
    try {
        const records = await EnvironmentService.getAllRecords();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/environment', async (req, res) => {
    try {
        const record = await EnvironmentService.addRecord(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Feed Management Routes
app.get('/api/feed', async (req, res) => {
    try {
        const records = await FeedService.getAllRecords();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/feed', async (req, res) => {
    try {
        const record = await FeedService.addRecord(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Health Records Routes
app.get('/api/health', async (req, res) => {
    try {
        const records = await HealthService.getAllRecords();
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/health', async (req, res) => {
    try {
        const record = await HealthService.addRecord(req.body);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});