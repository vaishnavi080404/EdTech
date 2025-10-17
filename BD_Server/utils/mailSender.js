const nodemailer = require('nodemailer');


const mailSender=async(email,title,body)=>{

    try{
        // Create a transporter object
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }

           
        });
         let info = await transporter.sendMail({
                from: ' Edtech ',
                to:`${email}`,
                subject: `${title}`,
                // text:`${body}`,
                html:body,
                
            })
            console.log('Message sent: %s', info);
            return info;

    }catch(error){
        console.error(`Error occurred while sending email: ${error.message}`);
        return false;
    }
}


module.exports=mailSender;