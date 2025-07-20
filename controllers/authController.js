const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("Incoming login data:", { email, password });

        const user = await getUserByEmail(email);
        console.log("Fetched user from DB:", user);

        if (!user) {
            return res.status(401).json({error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.status(401).json({ error: 'Wrong Password' });
        }

        delete user.password;

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { login };