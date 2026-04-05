const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        // create a transporter object
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,           
            secure: false,        
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
          
            tls: {
                rejectUnauthorized: false 
            }
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
        console.error(`❌ Error occurred while sending email: ${error.message}`);
        
        return null; 
    }
}

module.exports = mailSender;