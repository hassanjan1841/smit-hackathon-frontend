// emailTemplate.js

export const registrationEmailTemplate = (name) => {
  return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              text-align: center;
            }
            p {
              color: #555;
              line-height: 1.6;
              font-size: 16px;
            }
            .highlight {
              color: #0066cc;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #0066cc;
              color: #fff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 5px;
              text-align: center;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #888;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Registration Confirmation</h1>
            <p>Hello <strong class="highlight">${name}</strong>,</p>
            <p>Thank you for registering with us! We are excited to have you onboard.</p>
            <p>If you have any concerns or need assistance, don't hesitate to reach out to us at any time. We are here to help you!</p>
            <a href="http://localhost:5173/" class="cta-button">Visit Our Website</a>
            <div class="footer">
              <p>Best regards,</p>
              <p><strong>Your Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `;
};
