const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {
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

// re_ZV8taF5b_6QSYGW5Ah5Lpv2icSiFdA1LZ