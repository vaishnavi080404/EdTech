
exports.courseCompletionEmail = (name, courseName, certificateUrl) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Congratulations on Completing Your Course!</title>
    <style>
        /* ... Use the same professional styles from your other email templates ... */
        body { margin: 0; padding: 0; background-color: #FFF1F0; font-family: 'Poppins', Arial, sans-serif; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; }
        .header { background-color: #4A3F35; padding: 20px; text-align: center; }
        .logo { max-width: 150px; }
        .content { padding: 30px; text-align: left; color: #4A3F35; font-size: 16px; line-height: 1.6; }
        .content h1 { font-size: 24px; color: #4A3F35; margin-top: 0; }
        .highlight { color: #D95D39; font-weight: bold; }
        .cta-button { display: inline-block; padding: 12px 24px; background-color: #D95D39; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin-top: 20px; }
        .button-wrapper { text-align: center; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #8D837C; }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="20">
        <tr>
            <td>
                <div class="container">
                    <div class="header">
                        <a href="https://edtech-skillnest.onrender.com"><img class="logo" src="../FRONTEND/src/assets/edtechLogo.png" alt="EdTech Logo"></a>
                    </div>
                    <div class="content">
                        <h1>Congratulations, ${name}!</h1>
                        <p>
                            We are thrilled to announce that you have successfully completed the course: 
                            <span class="highlight">"${courseName}"</span>.
                        </p>
                        <p>
                            Your hard work and dedication have paid off. You've earned a certificate to showcase your new skills!
                        </p>
                        <div class="button-wrapper">
                            <a class="cta-button" href="${certificateUrl}">View Your Certificate</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} EdTech. All rights reserved.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
};