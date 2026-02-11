const { body } = require('express-validator');

exports.productValidation = [
  body('name').notEmpty(),
  body('brand').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').notEmpty(),
  body('stock').isInt({ min: 0 }),
  body('description').notEmpty()
];
