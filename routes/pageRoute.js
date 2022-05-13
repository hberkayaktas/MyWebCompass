const express = require('express');
const pageController= require('../controllers/pageControllers');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/project').get(pageController.getProjectPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/register').post(pageController.postRegisterPage);
router.route("/main-detail/:id").get(pageController.getMainDetail);
router.route("/post-detail/:id").get(pageController.getPostDetailById);



module.exports=router;