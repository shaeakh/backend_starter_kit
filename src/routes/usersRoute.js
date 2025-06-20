
const express = require('express');
const { getUserById, createUser, updateUser, deleteUser,getAllUsers } = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
