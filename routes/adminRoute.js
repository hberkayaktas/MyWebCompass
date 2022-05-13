const express = require('express');
const adminController= require('../controllers/adminControllers');
const postController= require('../controllers/postControllers');

const router = express.Router();

router.route('/login').get(adminController.getLoginPage);
router.route('/login').post(adminController.postLoginPage);
router.route('/logout').get(adminController.getLogout);
router.route('/add-category').get(adminController.getAddCategory);
router.route('/add-category').post(adminController.postAddCategory);




module.exports=router;