const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const controller = require('../controllers/categoryController');

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', isAuth, controller.createCategory);
router.put('/:id', isAuth, controller.updateCategory);
router.delete('/:id', isAuth, controller.deleteCategory);

module.exports = router;
