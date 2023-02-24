// recieve router and connect to controller
const router = require('express').Router();
const clientController = require('../controllers/client');

// match controller options
router.get('/', clientController.getAll);
router.get('/:id', clientController.getSingle);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
