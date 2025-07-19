// @ts-nocheck

const transporter = require("../utils/nodemailer");

import htmlTemplate from "../utils/htmlTemplate";

const sendOTP = async (email: string, otp: string) => {
  // console.log(`Sending OTP to ${email}`);
  const mailOptions = {
    from: `"Zello Service Team" <lucidtechwrld9@gmail.com>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: htmlTemplate(otp),
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    // console.log("OTP sent successfully:", result);
    // console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP");
  }
};

export default sendOTP;
