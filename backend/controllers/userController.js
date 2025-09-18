const bcrypt = require('bcrypt');
const { getUserByEmail, createHOD, getAllHODs } = require('../models/userModel');

const fetchUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchHODs = async (req, res) => {
  try {
    // Only DM should be able to fetch HODs
    if (req.user.role !== 'DM') {
      return res.status(403).json({ error: 'Only DM can view all HODs.' });
    }

    const hods = await getAllHODs();
    res.json(hods);
  } catch (err) {
    console.error("Error fetching HODs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // checking if creator is DM or not
    if (req.user.role !== 'DM') {
      return res.status(403).json({ error: 'Only DM can create HOD accounts.' });
    }
    // Only allow HOD creation via API
    if (role !== 'HOD') {
      return res.status(403).json({ error: 'Only HODs can be created via this endpoint.' });
    }

    if (!department) {
      return res.status(400).json({ error: 'HOD must have a department' });
    }

    const newUser = await createHOD({ name, email, hashedPassword, department });

    res.status(201).json({
      message: 'HOD created successfully.',
      user: newUser
    });

  } catch (err) {
    console.error('Error creating HOD:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { fetchUser, createUser, fetchHODs };
