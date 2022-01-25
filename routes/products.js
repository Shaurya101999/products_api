const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products_controller');

router.get('/', productsController.home);

router.delete('/:id', productsController.delete);

router.post('/create',productsController.create);

router.post('/:id/update_quantity/',productsController.update);

module.exports = router; 

