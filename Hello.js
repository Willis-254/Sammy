const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");

app.get("/github-repo", async (req, res) => {
  try {
    const username = "Willy-T9"; // Replace with the actual GitHub username
    const repoName = "miz"; // Replace with the actual repository name

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

    const repoInfo = {
      name: response.data.name,
      description: response.data.description,
      url: response.data.html_url,
    };

    res.json(repoInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

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
