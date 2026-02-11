const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const { body, validationResult } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const userValidator = [
  body('googleId').notEmpty().withMessage('googleId is required'),
  body('name').notEmpty().withMessage('name is required'),
  body('email').isEmail().withMessage('email must be valid')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.post('/', isAuth, userValidator, validate, createUser);
router.put('/:id', isAuth, userValidator, validate, updateUser);

router.delete('/:id', isAuth, deleteUser);

module.exports = router;
