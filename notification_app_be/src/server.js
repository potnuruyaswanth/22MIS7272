const app = require("./app");
require("dotenv").config();

const PORT = process.env.NOTIFICATION_PORT || 5001;

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
