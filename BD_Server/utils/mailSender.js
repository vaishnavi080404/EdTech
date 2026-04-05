const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            // Use 'service' instead of 'host' for higher reliability on Render
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            // Add specific pool and timeout settings
            pool: true,
            maxConnections: 1,
            maxMessages: Infinity,
            connectionTimeout: 20000, // Increase to 20 seconds
        });

        let info = await transporter.sendMail({
            from: `"SkillNest" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: body,
        });

        console.log('✅ Email sent successfully:', info.messageId);
        return info;

    } catch (error) {
        // This log is vital for your interview troubleshooting
        console.error(`❌ NODEMAILER ERROR: ${error.message}`);
        return null; 
    }
}

module.exports = mailSender;