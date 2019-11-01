const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hecho!!");
});

router.get("/signup", (req, res, next) => {});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
});

router.get("/signin", (req, res, next) => {});

router.post("/signin", (req, res, next) => {});

module.exports = router;
