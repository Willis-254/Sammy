// Import all requisite packages
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
    res.status(500).json({ error: `An error occurred while fetching GitHub data: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
