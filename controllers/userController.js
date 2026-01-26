const User = require('../models/User');
const Organization = require('../models/Organization');

const createUser = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.orgId);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const user = await User.create({
      ...req.body,
      organization: req.params.orgId
    });

    organization.users.push(user._id);
    await organization.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser
};
