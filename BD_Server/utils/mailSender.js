const sgMail = require('@sendgrid/mail');

// This key goes in your Render Environment Variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const mailSender = async (email, title, body) => {
    const msg = {
        to: email, 
        from: 'vaishnaviverse@gmail.com', // MUST match your verified Single Sender exactly
        subject: title,
        html: body,
    };

    try {
        await sgMail.send(msg);
        console.log("✅ Email sent successfully via SendGrid API");
        return true;
    } catch (error) {
        console.error("❌ SendGrid Error:", error.response ? error.response.body : error.message);
        return false;
    }
};

module.exports = mailSender;

