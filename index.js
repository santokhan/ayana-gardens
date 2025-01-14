import { configDotenv } from 'dotenv';
import express, { json } from 'express';
import sendEmail from './src/sender.js';
import cors from 'cors'

configDotenv();

const app = express();

app.use(cors());

// Set up middleware to parse JSON bodies
app.use(json());

app.get('/', (req, res) => {
    res.json('Welcome the Ayana Mailer!');
})

// Define a route to send emails
app.post('/send-email', async (req, res) => {
    try {
        const { first_name, last_name, email, phone, nationality, message } = req.body;
        // console.log('Email sent:', req.body);

        if (email || phone) {
            // Your Nodemailer code to send the email goes here
            await sendEmail({ first_name, last_name, email, phone, nationality, message }, () => {
                res.status(200).json({ message: 'Thank you for your interest. We will connect with you shortly.' });
            });
        } else {
            return res.status(400).json({ error: 'Missing required data. Please provide email, phone.' });
        }

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
