
import nodemailer from "nodemailer";
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "numl-s22-42445@numls.edu.pk", // Replace with your actual Gmail account
      pass: "vdtr dtaj uaxx mymv", // Replace with your actual Gmail password
    },
  });
};
export { createTransporter };
