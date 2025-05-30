import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                userId, {
                $set: 
                { verifyToken: hashedToken, verifyTokenExpiry: new Date(Date.now() + 3600000) } // 1 hour expiry
                }
            );
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000) // 1 hour expiry
                }
            });
        }


        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: "wqspprdkfxzaxedr@ethereal.email",
        //         pass: "v52tBnDE8jAwGN6EwS"
        //     },
        // });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'alifaizanch3101@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            // text: "Hello world?", // plain‑text body
            html: `<p>
                Hello,<br>
                Please click the link below to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}:<br>
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click here</a><br>
                or copy and paste the following link into your browser:<br>
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </a><br>
                This link will expire in 1 hour.<br>
                If you did not request this, please ignore this email.
            </p>`
        }

        const response = await transporter.sendMail(mailOptions);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(response));
        console.log("Email sent successfully:", response);
        return response;
    } catch (error) {
        log.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}