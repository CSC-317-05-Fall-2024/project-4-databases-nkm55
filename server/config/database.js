import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false, 
    }
};

// Create the connection pool
export const pool = new pg.Pool(config);

// Log successful connection
pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

// Handle any errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', res.rows[0]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();




