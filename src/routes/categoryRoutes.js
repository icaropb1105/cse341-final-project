const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/:id', isAuth, controller.createCategory);
router.put('/:id', isAuth, controller.updateCategory);
router.delete('/:id', isAuth, controller.deleteCategory);

module.exports = router;
