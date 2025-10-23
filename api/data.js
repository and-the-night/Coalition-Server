// /api/data.js

const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // Replace these with your actual credentials
  const USERNAME = 'coalition'; // <-- your username
  const PASSWORD = 'skills-test'; // <-- your password

  // Create Basic Auth header
  const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

  try {
    // Replace the URL below with your real external API URL
    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      headers: {
        'Authorization': authHeader
      }
    });

    // Check if request was successful
    if (!response.ok) {
      console.error('API responded with status:', response.status);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return res.status(500).json({ error: 'Error fetching data', status: response.status, detail: errorText });
    }

    // Parse JSON data
    const data = await response.json();

    // Send the data back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching data', message: error.message });
  }
};
