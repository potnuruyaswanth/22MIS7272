const express = require("express");

const {
  optimizeMaintenance,
} = require("../controllers/schedulerController");

const router = express.Router();

router.get("/optimize/:depotId", optimizeMaintenance);

module.exports = router;