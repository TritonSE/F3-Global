import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

import type { Request, Response } from "express";

export type ContactRequest = {
  fullName: string;
  email: string;
  interestedInBecoming?: string;
  message: string;
};

export const handleContactRequest = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, interestedInBecoming, message } = (await req.body) as ContactRequest;
    console.info("Received contact request:", { fullName, email, interestedInBecoming, message });

    const email_subject = `New Contact Request from ${fullName} ${interestedInBecoming ? `(${interestedInBecoming} interest)` : ""}`;
    const email_body = `Name: ${fullName}\nEmail: ${email}\nInterested in becoming: ${interestedInBecoming || "N/A"}\nMessage: ${message || "N/A"}`;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: process.env.GLOBAL_EMAIL,
        to: process.env.GLOBAL_EMAIL,
        subject: email_subject,
        text: email_body,
      };
      await transporter.sendMail(mailOptions);
      console.info("Contact request email sent successfully.");
      return res.status(200).json({ message: "Contact request sent successfully." });
    } catch (error: unknown) {
      console.error("Error creating email transporter:", error);
      return res.status(500).json({ error: "Failed to create email transporter." });
    }
  } catch (error) {
    console.error("Error handling contact request:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the contact request." });
  }
};
