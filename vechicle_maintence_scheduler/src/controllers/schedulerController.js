const axios = require("axios");

const Log = require("../../../logging_middleware/logger");

exports.optimizeMaintenance = async (req, res) => {

  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Optimization started"
    );

    const depotId = parseInt(req.params.depotId);

    await Log(
      "backend",
      "debug",
      "service",
      `Fetching depot data for depot ID ${depotId}`
    );

    const depotResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    await Log(
      "backend",
      "debug",
      "service",
      "Fetching vehicle maintenance tasks"
    );

    const vehicleResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const depot = depotResponse.data.depots.find(
      (d) => d.ID === depotId
    );

    if (!depot) {

      await Log(
        "backend",
        "error",
        "handler",
        `Depot with ID ${depotId} not found`
      );

      return res.status(404).json({
        success: false,
        message: "Depot not found",
      });
    }

    await Log(
      "backend",
      "info",
      "service",
      `Mechanic hours available: ${depot.MechanicHours}`
    );

    const tasks = vehicleResponse.data.vehicles;

    await Log(
      "backend",
      "debug",
      "service",
      `Total tasks fetched: ${tasks.length}`
    );

    const result = knapsack(
      tasks,
      depot.MechanicHours
    );

    await Log(
      "backend",
      "info",
      "service",
      "Knapsack optimization completed successfully"
    );

    return res.status(200).json({
      success: true,
      depotId: depot.ID,
      mechanicHours: depot.MechanicHours,
      maxImpact: result.maxImpact,
      totalSelectedTasks: result.selectedTasks.length,
      selectedTasks: result.selectedTasks,
    });

  } catch (error) {

    await Log(
      "backend",
      "fatal",
      "controller",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

function knapsack(tasks, capacity) {

  const n = tasks.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {

    const duration = tasks[i - 1].Duration;

    const impact = tasks[i - 1].Impact;

    for (let w = 0; w <= capacity; w++) {

      if (duration <= w) {

        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );

      } else {

        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let w = capacity;

  const selectedTasks = [];

  for (let i = n; i > 0; i--) {

    if (dp[i][w] !== dp[i - 1][w]) {

      selectedTasks.push(tasks[i - 1]);

      w -= tasks[i - 1].Duration;
    }
  }

  selectedTasks.reverse();

  return {
    maxImpact: dp[n][capacity],
    selectedTasks,
  };
}