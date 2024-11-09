import { pool } from './database.js'; 

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log('Tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables:', error);
    }
};

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(500) NOT NULL,
                phone VARCHAR(50),
                address VARCHAR(500),
                photo TEXT
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                rating INTEGER NOT NULL,
                content TEXT,
                restaurant_id INTEGER,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createTablesQuery);
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

const insertData = async () => {
    try {
        const insertRestaurantsQuery = `
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES
                ('Pappadeaux Seafood Kitchen', '(713) 860-4001', '12109 Westheimer Rd, Houston, TX 77077', '/images/restaurant_1.jpeg'),
                ('Hugo''s', '(713) 524-7744', '1600 Westheimer Rd, Houston, TX 77006', '/images/restaurant_2.jpeg'),
                ('BB''s Tex-Orleans', '(713) 524-4499', '6154 Westheimer Rd, Houston, TX 77057', '/images/restaurant_3.jpeg'),
                ('The Pit Room', '(281) 888-1929', '1201 Richmond Ave, Houston, TX 77006', '/images/restaurant_4.jpg'),
                ('Gatlin''s BBQ', '(713) 869-4227', '3510 Ella Blvd, Houston, TX 77018', '/images/restaurant_5.jpeg'),
                ('Underbelly', '(713) 528-9800', '1100 Westheimer Rd, Houston, TX 77006', '/images/restaurant_6.jpeg');
        `;

        const insertReviewsQuery = `
            INSERT INTO reviews (rating, content, restaurant_id)
            VALUES
                (5, 'Great food and service!', 1),
                (4, 'Very good, but a bit pricey.', 1),
                (3, 'Nice ambiance, but average food.', 2),
                (5, 'Exceptional experience and flavors.', 2),
                (4, 'Authentic flavors and friendly staff.', 3),
                (5, 'Best BBQ I have had in a while!', 5);
        `;

        await pool.query(insertRestaurantsQuery);
        await pool.query(insertReviewsQuery);
        console.log('Initial data inserted successfully.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

const setup = async () => {
    try {
        await dropTables();
        await createTables();
        await insertData();
        console.log('Database setup complete.');
    } catch (error) {
        console.error('Error during setup:', error);
    } finally {
        pool.end(); 
    }
};

setup();









