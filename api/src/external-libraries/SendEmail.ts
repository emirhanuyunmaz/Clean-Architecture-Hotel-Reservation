import { ISendEmail } from '../interfaces/ISendEmail';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export class SendEmail implements ISendEmail {
  createCode(): String {
    return crypto.randomUUID();
  }

  htmlDesign(key: string): String {
    const link = `${process.env.BASE_URL}/resetPassword?key=${key}`;

    const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        background-color: #f4f4f4;
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: #4CAF50;
                        color: white;
                        text-align: center;
                        padding: 20px 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 30px;
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        color: #333333;
                        margin-bottom: 30px;
                    }
                    .button {
                        display: inline-block;
                        background: #4CAF50;
                        color: white;
                        padding: 12px 25px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-weight: bold;
                        transition: background 0.3s;
                    }
                    .button:hover {
                        background: #45a049;
                    }
                    .footer {
                        background: #eeeeee;
                        text-align: center;
                        padding: 15px;
                        font-size: 12px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        Password Reset Request
                    </div>
                    <div class="content">
                        <p>To reset your password, please click the button below. If you did not request this, you can safely ignore this email.</p>
                        <a href="${link}" class="button">Reset My Password</a>
                    </div>
                    <div class="footer">
                        © 2025 All Rights Reserved. | Lunavera
                    </div>
                </div>
            </body>
            </html>
            `;

    return html;
  }

  async sendEmailResetPassword(email: string, code: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      // secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS, // sender address
        to: email, // list of receivers
        subject: 'Lunavera | Reset Password', // Subject line
        // text: "Hello world?", // plain text body
        html: this.htmlDesign(code) as string, // html body
      });
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  async sendEmailCheck(email: string): Promise<boolean> {
    try {
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
