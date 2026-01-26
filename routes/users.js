const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const {
  createStore,
  getStoresByUser
} = require('../controllers/storeController');

router.post('/users/:userId/stores', validateObjectId('userId'), createStore);
router.get('/users/:userId/stores', validateObjectId('userId'), getStoresByUser);

module.exports = router;
