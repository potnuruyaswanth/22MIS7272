const express = require("express");
const {
  getNotifications,
  createNotification,
  getNotificationsByCategory,
  markAsRead,
  getPriorityInbox,
  getSchemaInfo,
  getQueryOptimization,
  sendBulkNotifications,
  getNotificationStats,
} = require("../controllers/notificationController");

const router = express.Router();

// ============= More specific routes first =============

// STAGE 2 & 3: Database & Optimization Info
router.get("/info/schema", getSchemaInfo);
router.get("/info/optimization", getQueryOptimization);

// STAGE 6: Priority Inbox
router.get("/inbox/priority", getPriorityInbox);

// Statistics
router.get("/stats/all", getNotificationStats);

// STAGE 5: Bulk Notifications
router.post("/send/bulk", sendBulkNotifications);

// STAGE 1: Basic CRUD
router.get("/category/:category", getNotificationsByCategory);
router.patch("/:notificationId/read", markAsRead);
router.post("/", createNotification);
router.get("/", getNotifications);

module.exports = router;


