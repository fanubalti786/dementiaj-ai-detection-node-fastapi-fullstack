import nodemailer from "nodemailer";
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "user@gmail.com", // Replace with your actual Gmail account
      pass: "password", // Replace with your actual Gmail password
    },
  });
};
export { createTransporter };
