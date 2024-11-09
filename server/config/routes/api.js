import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js'; 

const router = express.Router();

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants(); 
        res.json(restaurants); 
    } catch (error) {
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
});

router.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); 
    try {
        const restaurant = await getRestaurant(id); 

        if (restaurant) {
            res.json(restaurant); 
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the restaurant' });
    }
});

router.post('/restaurants', async (req, res) => {
    const newRestaurant = req.body; 
    try {
        const createdRestaurant = await createRestaurant(newRestaurant); 
        res.status(201).json(createdRestaurant); 
    } catch (error) {
        res.status(500).json({ error: 'Error creating restaurant' });
    }
});

router.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); 
    try {
        const deleted = await deleteRestaurant(id); 

        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Restaurant not found' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting restaurant' });
    }
});

export { router as backendRouter };

