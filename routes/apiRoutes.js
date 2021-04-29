"use strict";

const router = require("express").Router(),
courseController = require("../controllers/courseController");

router.get("/courses/:id/join", courseController.join, courseController.redirect);
router.get("/courses", courseController.index, courseController.fileterUserCourses, courseController.resondJSON);
router.use(courseController.errorJSON);

module.exports = router;