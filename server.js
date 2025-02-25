// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_db_user',
    host: 'your_db_host',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

app.use(bodyParser.json());

// Get all workers with optional filtering by tags
app.get('/workers', async (req, res) => {
    const { race, corporation } = req.query;
    let query = `
        SELECT workers.*, races.name AS race_name, corporations.name AS corporation_name
        FROM workers
        JOIN races ON workers.race_id = races.id
        JOIN corporations ON workers.corporation_id = corporations.id
    `;
    let conditions = [];
    if (race) {
        conditions.push(`workers.race_id = ${race}`);
    }
    if (corporation) {
        conditions.push(`workers.corporation_id = ${corporation}`);
    }
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    const { rows } = await pool.query(query);
    res.json(rows);
});

// Get all races
app.get('/races', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM races');
    res.json(rows);
});

// Get all corporations
app.get('/corporations', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM corporations');
    res.json(rows);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
