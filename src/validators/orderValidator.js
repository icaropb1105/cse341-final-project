const { body } = require('express-validator');

exports.orderValidation = [
  body('productId').notEmpty(),
  body('quantity').isInt({ min: 1 }),
  body('total').isFloat({ min: 0 }),
  body('customerName').notEmpty()
];
