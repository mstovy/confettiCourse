"use strict";

const { get } = require("mongoose");
const errorController = require("../controllers/errorController");

const router = require("express").Router(), errorController = require("../controllers/errorController");

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);