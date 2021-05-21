const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '123',
    database: 'todo_db',
    host: 'localhost',
    port: 5432
});

module.exports = pool;