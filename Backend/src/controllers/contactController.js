import { createTransporter } from "../config/nodemailerConfig.js";
import ErrorHandler from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    throw new ErrorHandler("All fields are required", 400);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ErrorHandler("Invalid email format", 400);
  }
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"${name}" <user@gmail.com>`, // Replace with your actual Gmail account
      to: "user@gmail.com", // Replace with your  email address
      replyTo: email, // user's email for easy reply
      subject: `Contact Form - Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #333; margin-top: 0;">Message</h2>
              <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
              <p style="margin: 0; color: #1976d2; font-size: 14px;">
                💡 <strong>Tip:</strong> Click "Reply" to respond directly to ${name} at ${email}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Contact Form Submission
Name: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}
Message:
${message}
---
Reply directly to this email to respond to ${name}
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      data: {
        messageId: info.messageId,
      },
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw new ErrorHandler(
      "Failed to send message. Please try again later.",
      500,
    );
  }
});
export { sendContactEmail };
