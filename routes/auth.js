const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();


// POST /auth/register
router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });


const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ error: 'Email already registered' });


const passwordHash = await bcrypt.hash(password, 10);
await User.create({ name, email, passwordHash });
return res.status(201).send();
} catch (err) {
console.error('Register error:', err);
return res.status(500).json({ error: 'Server error' });
}
});


// POST /auth/login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Missing fields' });


const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});
return res.json({ token });
} catch (err) {
console.error('Login error:', err);
return res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;