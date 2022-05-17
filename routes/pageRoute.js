const express = require("express");
const validationMiddleware = require('../middlewares/validationMiddleware');
const pageController = require("../controllers/pageControllers");

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/project").get(pageController.getProjectPage);
router.route("/search").get(pageController.getSearch);
router.route("/register").get(pageController.getRegisterPage);
router.route("/register").post(validationMiddleware.registerValidator, pageController.postRegisterPage);
router.route("/:slug").get(pageController.getMainDetail);
router.route("/:cslug/:pslug").get(pageController.getPostDetailById);

module.exports = router;
