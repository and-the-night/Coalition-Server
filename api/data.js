// /api/data.js
const CryptoJS = require('crypto-js');

// Paste the encrypted string you got from the encrypt script below
const encryptedCredentials = 'U2FsdGVkX19UxhK59w+bDyIyOinJWsEwyPN6Lxg6w9ea3AgpsaWtug2oG2Hygheg';

// Use the same secret key from your encrypt script
const secretKey = 'u8F#2K!oX9w&pB*QzZ7eR^vY';

export default async function handler(req, res) {
  try {
    // Decrypt credentials
    const bytes = CryptoJS.AES.decrypt(encryptedCredentials, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8); // "username:password"
    
    // Split into username and password
    const [username, password] = decrypted.split(':');

    // Create Authorization header
    const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    // Make the external API call
    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      headers: { 'Authorization': authHeader }
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Error fetching data', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error decrypting or fetching:', err);
    res.status(500).json({ error: 'Failed to decrypt credentials or fetch data' });
  }
}
