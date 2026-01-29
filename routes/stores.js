const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const { getAllStores, getStoreById, deleteStore, updateStore, updateStorePutRequest } = require('../controllers/storeController');

router.get('/stores', getAllStores);
router.get('/stores/:id', validateObjectId('id'), getStoreById);
router.put('/stores/:id', validateObjectId('id'), updateStorePutRequest);
router.patch('/stores/:id', validateObjectId('id'), updateStore);
router.delete('/stores/:id', validateObjectId('id'), deleteStore);

module.exports = router;
