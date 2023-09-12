const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");

app.get("/api", (req, res) => {
  try {
    console.log("API route hit"); // Log when route is hit

    const slack_name = req.query.slack_name;
    const track = req.query.track;

    // Check if slack_name and track are provided
    if (!slack_name || !track) {
      return res.status(400).json({ error: "slack_name and track are required" });
    }

    const current_date = new Date();

    // The 'utc_time' is in ISO format, represented as strings in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
    const utc_time = current_date.toISOString();

    const response = {
      slack_name: slack_name,
      current_day: current_date.toLocaleString("default", { weekday: "long" }), // Get the full day of the week
      utc_time: utc_time,
      track: track,
      github_file_url: "https://github.com/Willis-254/Sammy/blob/master/Hello.js",
      github_repo_url: "https//github.com/Willy-254/repo",
      status_code: 200,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
