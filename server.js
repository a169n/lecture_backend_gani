const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectToDatabase = require('./database');
const Organization = require('./models/Organization');
const User = require('./models/User');
const Store = require('./models/Store');

// Load dotenv only for local development.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies.
app.use(bodyParser.json());

// Simple health check.
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Helper to validate Mongo ObjectId format.
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create an organization.
app.post('/organizations', async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// List organizations and populate users.
app.get('/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find().populate('users');
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get organization details by ID and populate users.
app.get('/organizations/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid organization id' });
  }

  try {
    const organization = await Organization.findById(id).populate('users');
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an organization.
app.put('/organizations/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid organization id' });
  }

  try {
    const organization = await Organization.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a user inside an organization and push the user into organization.users.
app.post('/organizations/:orgId/users', async (req, res) => {
  const { orgId } = req.params;

  if (!isValidObjectId(orgId)) {
    return res.status(400).json({ error: 'Invalid organization id' });
  }

  try {
    const organization = await Organization.findById(orgId);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const user = await User.create({
      ...req.body,
      organization: orgId
    });

    organization.users.push(user._id);
    await organization.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a store owned by a user.
app.post('/users/:userId/stores', async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const store = await Store.create({
      ...req.body,
      user: userId
    });

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// List stores by user.
app.get('/users/:userId/stores', async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: 'Invalid user id' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const stores = await Store.find({ user: userId });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get store detail and populate user.
app.get('/stores/:id', async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid store id' });
  }

  try {
    const store = await Store.findById(id).populate('user');
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server after connecting to MongoDB.
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
