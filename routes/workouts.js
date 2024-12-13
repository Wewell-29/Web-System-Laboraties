const express = require('express');
const Workout = require('../models/workout.model'); 
const router = express.Router();

// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(400).json({ error: 'Unable to fetch workouts' });
    }
});

// Add a new workout
router.post('/', async (req, res) => {
    const { title, reps, load } = req.body;

    const workout = new Workout({ title, reps, load });

    try {
        const savedWorkout = await workout.save();
        res.json(savedWorkout);
    } catch (err) {
        res.status(400).json({ error: 'Unable to add workout' });
    }
});

// Update a workout
router.patch('/:id', async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id, { title, reps, load }, { new: true }
        );
        res.json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ error: 'Unable to update workout' });
    }
});

// Delete a workout
router.delete('/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Unable to delete workout' });
    }
});

module.exports = router;
