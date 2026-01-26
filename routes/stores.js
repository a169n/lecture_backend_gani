const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const { getStoreById } = require('../controllers/storeController');

router.get('/stores/:id', validateObjectId('id'), getStoreById);

module.exports = router;
