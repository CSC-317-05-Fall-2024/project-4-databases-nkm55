import { pool } from '../database.js';

// Function to get all restaurants
export const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants;');
        return result.rows;
    } catch (error) {
        console.error('Error getting restaurants:', error);
        throw error;
    }
};

// Function to get a specific restaurant by ID
export const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1;', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error getting restaurant:', error);
        throw error;
    }
};

// Function to create a new restaurant entry
export const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    try {
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

// Function to delete a restaurant by ID
export const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *;', [id]);
        return result.rowCount > 0; 
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

// Function to get reviews for a specific restaurant
export const getReviewsForRestaurant = async (restaurantId) => {
    try {
        const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1;', [restaurantId]);
        return result.rows;
    } catch (error) {
        console.error('Error getting reviews for restaurant:', error);
        throw error;
    }
};







