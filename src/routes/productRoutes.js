const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const isAuth = require('../middlewares/isAuth');
const { body, validationResult } = require('express-validator');

const productValidator = [
  body('name').notEmpty().withMessage('name is required'),
  body('price').isNumeric().withMessage('price must be a number'),
  body('category').notEmpty().withMessage('category is required'),
  body('brand').notEmpty().withMessage('brand is required'),
  body('stock').isInt({ min: 0 }).withMessage('stock must be an integer >= 0'),
  body('description').notEmpty().withMessage('description is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);

router.post('/', isAuth, productValidator, validate, controller.createProduct);
router.put('/:id', isAuth, productValidator, validate, controller.updateProduct);

router.delete('/:id', isAuth, controller.deleteProduct);

module.exports = router;
