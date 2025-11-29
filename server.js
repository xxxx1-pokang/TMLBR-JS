const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body parser to handle JSON data
app.use(bodyParser.json());

// Discord webhook URL (replace with your actual webhook URL)
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;  // Set the webhook URL as an environment variable for security

// Handle POST requests from the frontend (form submission)
app.post('/send-form', async (req, res) => {
    const { issue, email, contact } = req.body;

    // Prepare the data for Discord message
    const message = {
        content: `New Help Request:\nIssue: ${issue}\nEmail: ${email}\nContact: ${contact}`
    };

    try {
        // Send the data to the Discord webhook
        await axios.post(discordWebhookUrl, message);
        res.status(200).send('Form submitted successfully');
    } catch (error) {
        console.error('Error sending webhook:', error);
        res.status(500).send('Error sending the form');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
