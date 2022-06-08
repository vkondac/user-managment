const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/add-user', userController.form);
router.post('/add-user', userController.create);
router.get('/:id', userController.delete);

module.exports = router;