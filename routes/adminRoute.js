const express = require('express');
const adminController= require('../controllers/adminControllers');
const postController= require('../controllers/postControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/dashboard').get(roleMiddleware(["Moderator","Admin"]),adminController.getDashboard);
router.route('/login').get(adminController.getLoginPage);
router.route('/login').post(adminController.postLoginPage);
router.route('/logout').get(adminController.getLogout);
router.route('/all-user').get(adminController.getAllUser);
router.route('/add-user').get(adminController.getAddUser);
router.route('/add-user').post(adminController.postAddUser);
router.route('/delete-user/:id').get(adminController.deleteUser);
router.route('/update-user/:id').get(adminController.getUpdateUser);
router.route('/update-user/:id').post(adminController.postUpdateUser);
router.route('/add-category').get(adminController.getAddCategory);
router.route('/add-category').post(adminController.postAddCategory);
router.route('/all-category').get(adminController.getAllCategory);
router.route('/update-category/:id').get(adminController.getUpdateByCategory);
router.route('/update-category/:id').post(adminController.postUpdateByCategory);
router.route('/delete-category/:id').get(adminController.getDeleteCategory);
router.route('/add-post').get(postController.getAddPost);
router.route('/add-post').post(postController.postAddPost);
router.route('/all-post').get(postController.getAllPost);
router.route('/update-post/:id').get(postController.getUpdatePostById);
router.route('/update-post/:id').post(postController.postUpdatePostById);
router.route('/delete-post/:id').get(postController.deletePostById);




module.exports=router;