import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant } from './data/restaurants.js';
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the attractions page
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// Route for the restaurants page
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants(); // Use await for async function
        res.render('restaurants', { restaurantData: restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Error fetching restaurant data');
    }
});

// Route for individual restaurant details
app.get('/restaurants/:id', async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10); // Extract the ID from the request params
    try {
        const restaurant = await getRestaurant(restaurantId); // Use await for async function
        const reviews = await getReviewsForRestaurant(restaurantId); // Fetch reviews for the restaurant

        if (restaurant) {
            // Render the restaurant-details.ejs with restaurant and reviews data
            res.render('restaurant-details', {
                restaurant: restaurant,
                reviews: reviews
            });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).send('Error fetching restaurant details');
    }
});

// Route for the new restaurant form page
app.get('/new-restaurant', (req, res) => {
    res.render('new-restaurant'); // Render the EJS form
});

// Mount the router for API routes
app.use('/api', backendRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});























