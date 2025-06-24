// Aquí defines los endpoints (URLs) y conectas con el controlador que maneja la lógica.

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;