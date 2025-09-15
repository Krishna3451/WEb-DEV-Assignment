const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// GET /tasks?category=work
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { category } = req.query;
    const filter = { userId };
    if (category) filter.category = category;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    console.error('List tasks error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, category } = req.body;
    if (!title || !category) return res.status(400).json({ error: 'Missing fields' });
    const task = await Task.create({ userId, title, description, category });
    return res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const update = {};
    const allowed = ['title', 'description', 'category', 'isDone'];
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }
    const task = await Task.findOneAndUpdate({ _id: id, userId }, update, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.json(task);
  } catch (err) {
    console.error('Update task error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const result = await Task.findOneAndDelete({ _id: id, userId });
    if (!result) return res.status(404).json({ error: 'Task not found' });
    return res.status(204).send();
  } catch (err) {
    console.error('Delete task error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;