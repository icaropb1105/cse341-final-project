const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { body, validationResult } = require('express-validator');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const orderValidator = [
  body('productId').notEmpty().withMessage('productId is required'),
  body('quantity').isInt({ min: 1 }).withMessage('quantity must be >= 1'),
  body('total').isNumeric().withMessage('total must be a number'),
  body('customerName').notEmpty().withMessage('customerName is required'),
  body('status').optional().isString()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getAllOrders);
router.get('/:id', getOrderById);

router.post('/', isAuth, orderValidator, validate, createOrder);
router.put('/:id', isAuth, orderValidator, validate, updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;
