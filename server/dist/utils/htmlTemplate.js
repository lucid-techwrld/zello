"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const htmlTemplate = (otp) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        padding: 32px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
      }
      h2 {
        margin-bottom: 16px;
        color: #1a202c;
      }
      p {
        margin: 12px 0;
        font-size: 16px;
      }
      .otp-box {
        margin: 24px 0;
        font-size: 32px;
        letter-spacing: 10px;
        font-weight: bold;
        color: #1a73e8;
        text-align: center;
      }
      .footer {
        margin-top: 24px;
        font-size: 13px;
        color: #888;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>OTP Verification</h2>
      <p>Use the following OTP to complete your verification. This code is valid for the next <strong>5 minutes</strong>.</p>
      <div class="otp-box">${otp}</div>
      <p>If you did not request this, you can safely ignore this email.</p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Zello Service Team
      </div>
    </div>
  </body>
  </html>
`;
};
exports.default = htmlTemplate;
