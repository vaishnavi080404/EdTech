const { Resend } = require('resend');

const mailSender = async (email, title, body) => {
    try {
        console.log("RESEND_API_KEY present:", !!process.env.RESEND_API_KEY); // debug line
        
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'Edtech <onboarding@resend.dev>',
            to: [email],
            subject: title,
            html: body,
        });

        if (error) {
            console.error('❌ RESEND ERROR:', error);
            return false;
        }

        console.log('✅ Email sent successfully:', data);
        return data;

    } catch (error) {
        console.error(`❌ Error occurred while sending email: ${error.message}`);
        return false;
    }
};

module.exports = mailSender;