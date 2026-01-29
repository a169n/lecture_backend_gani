const Store = require('../models/Store');
const User = require('../models/User');

const createStore = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const store = await Store.create({
      ...req.body,
      user: req.params.userId
    });

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStoresByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stores = await Store.find({ user: req.params.userId });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate('user');
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStorePutRequest = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createStore,
  getStoresByUser,
  getStoreById,
  getAllStores,
  deleteStore,
  updateStore,
  updateStorePutRequest
};
