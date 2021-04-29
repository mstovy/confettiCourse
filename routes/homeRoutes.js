"use strict";

const { get } = require("mongoose");
const homeController = require("../controllers/homeController");

const router = require("express").Router(), homeController = require("../controllers/homeController");

router.get("/", homeController.index);