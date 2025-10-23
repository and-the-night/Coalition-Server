// server.js
const express = require('express');
require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001; // use env PORT or default to 3001

// Hard-coded credentials (for demo purposes only)
const USERNAME = 'coalition'; // change these
const PASSWORD = 'skills-test';

app.get('/api/data', async (req, res) => {
  try {
    // Create Basic Auth header
    const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

    // Make request to actual API (replace URL with the real API URL)
    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      // Log status and response text for troubleshooting
      console.error('API responded with status:', response.status);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return res.status(500).json({ error: 'Error fetching data', status: response.status, detail: errorText });
    }

    // Parse the response data
    const data = await response.json();

    // Send the data back to your React app
    res.json(data);

  } catch (err) {
    // Log error
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Error fetching data', message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
