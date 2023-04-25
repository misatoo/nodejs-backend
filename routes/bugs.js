const express = require("express");
const router = express.Router();

router.post("/queryList", (req, res, next) => {
  const { handlerId, proposerId } = req.body;
  res.json({
    status: true,
    handlerId,
    proposerId,
  });
});

router.post("/save", (req, res, next) => {
  res.json({
    status: true,
  });
});

router.post("/delete", (req, res, next) => {
  res.json({
    status: true,
  });
});

module.exports = router;
