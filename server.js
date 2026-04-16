const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON bodies

// Initialize Resend with the active API key provided
const resend = new Resend('re_AHE2VENq_GFgG9ZbM37pfTyjY7nZuzs5g');

app.post('/api/contact', async (req, res) => {
  // Extract custom fields from the frontend request
  const { name, email, message } = req.body || {};

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend testing sandbox email
      to: 'daniellakyusa836@gmail.com', // Your target email
      subject: `L-Earn Contact Page: Message from ${name || 'User'}`,
      html: `<p>You received a new message from the contact form:</p>
             <p><strong>Name:</strong> ${name || 'N/A'}</p>
             <p><strong>Email:</strong> ${email || 'N/A'}</p>
             <p><strong>Message:</strong><br/>${message || 'N/A'}</p>`
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
