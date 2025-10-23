// /api/data.js
const CryptoJS = require('crypto-js');

const encryptedCredentials = 'U2FsdGVkX19UxhK59w+bDyIyOinJWsEwyPN6Lxg6w9ea3AgpsaWtug2oG2Hygheg';

const secretKey = 'u8F#2K!oX9w&pB*QzZ7eR^vY';

module.exports = async function handler(req, res) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedCredentials, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const [username, password] = decrypted.split(':');

    const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      headers: { 'Authorization': authHeader }
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Error fetching data', status: response.status });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to decrypt or fetch', message: err.message });
  }
}
