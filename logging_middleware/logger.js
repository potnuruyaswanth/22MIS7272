const axios = require("axios");

require("dotenv").config();

async function Log(stack, level, packageName, message) {

  try {

    await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    return {
      success: true,
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = Log;