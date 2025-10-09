import axios from 'axios';

const API_URL = 'https://api.example.com/cricket-players'; // Replace with your actual API endpoint

export const fetchPlayers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw new Error('Could not fetch players. Please try again later.');
    }
};

export const createPlayer = async (playerData) => {
    try {
        const response = await axios.post(API_URL, playerData);
        return response.data;
    } catch (error) {
        console.error('Error creating player:', error);
        throw new Error('Could not create player. Please try again later.');
    }
};

export const updatePlayer = async (playerId, playerData) => {
    try {
        const response = await axios.put(`${API_URL}/${playerId}`, playerData);
        return response.data;
    } catch (error) {
        console.error('Error updating player:', error);
        throw new Error('Could not update player. Please try again later.');
    }
};

export const deletePlayer = async (playerId) => {
    try {
        await axios.delete(`${API_URL}/${playerId}`);
    } catch (error) {
        console.error('Error deleting player:', error);
        throw new Error('Could not delete player. Please try again later.');
    }
};