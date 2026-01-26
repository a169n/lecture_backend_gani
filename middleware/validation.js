const { isValidObjectId } = require('../utils/helpers');

const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: `Invalid ${paramName}` });
    }
    next();
  };
};

module.exports = {
  validateObjectId
};
