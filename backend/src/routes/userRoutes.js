const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, deleteUser } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get single user
router.get('/:id', getUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router; 