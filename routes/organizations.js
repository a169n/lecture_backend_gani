const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} = require('../controllers/organizationController');
const { createUser } = require('../controllers/userController');

router.post('/', createOrganization);
router.get('/', getOrganizations);
router.get('/:id', validateObjectId('id'), getOrganizationById);
router.delete('/:id', validateObjectId('id'), deleteOrganization);
router.put('/:id', validateObjectId('id'), updateOrganization);
router.post('/:orgId/users', validateObjectId('orgId'), createUser);

module.exports = router;
