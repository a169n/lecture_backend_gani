const Organization = require('../models/Organization');

const createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).populate('users');
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
};
