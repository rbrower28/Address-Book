const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');

const validation = require('../middleware/validate');

router.get('/', addressController.getAll);
router.get('/:id', addressController.getSingle);
router.post('/', validation.newAddress, addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;