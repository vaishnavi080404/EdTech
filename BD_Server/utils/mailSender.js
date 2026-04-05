const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, 
            secure: true, 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
            
            tls: {
                rejectUnauthorized: false,
            },
            connectionTimeout: 10000, // 10 seconds
            socketTimeout: 10000,
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
      
        console.error(`❌ NODEMAILER ERROR: ${error.message}`);
        return null; 
    }
}

module.exports = mailSender;