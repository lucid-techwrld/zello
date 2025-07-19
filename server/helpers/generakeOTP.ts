import db from "../database/database";
import bcrypt from "bcryptjs";

const generateOTP = async (email: string) => {
  // console.log("Generating OTP for email:", email);
  const otpCode: string = Math.floor(1000 + Math.random() * 9000).toString();
  const encryptedOTP = await bcrypt.hash(otpCode, 10);

  try {
    const existing = await db("otps").where({ email, isUsed: false }).first();

    if (existing) {
      await db("otps")
        .where({ email, isUsed: false })
        .update({
          otp_code: encryptedOTP,
          expired_at: db.raw("NOW() + INTERVAL '5 minutes'"),
          created_at: db.fn.now(),
        });
    } else {
      await db("otps").insert({
        otp_code: encryptedOTP,
        email,
        expired_at: db.raw("NOW() + INTERVAL '5 minutes'"),
      });
    }

    // console.log("OTP generated and stored in database:", otpCode);
    return otpCode;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw error;
  }
};

export default generateOTP;
