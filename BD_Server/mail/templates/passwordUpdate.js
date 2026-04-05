exports.passwordUpdatedTemplate = (name = "") => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Update Confirmation</title>
    <style>
        /* --- Base Styles --- */
        body {
            margin: 0;
            padding: 0;
            background-color: #FFF1F0; /* soft-terracotta */
            font-family: 'Poppins', Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #F8E8E6; /* muted-terracotta */
        }
        /* --- Header --- */
        .header {
            background-color: #4A3F35; /* espresso-brown */
            padding: 20px;
            text-align: center;
        }
        .logo {
            max-width: 150px;
        }
        /* --- Body Content --- */
        .content {
            padding: 30px;
            text-align: left;
            color: #4A3F35; /* espresso-brown */
            font-size: 16px;
            line-height: 1.6;
        }
        .content h1 {
            font-size: 24px;
            color: #4A3F35;
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .icon {
            color: #047857; /* rich-teal for success */
        }
        .security-note {
            background-color: #FFF1F0; /* soft-terracotta */
            border-left: 4px solid #D95D39; /* burnt-sienna */
            padding: 15px;
            margin-top: 20px;
            font-size: 14px;
            border-radius: 0 4px 4px 0;
        }
        /* --- Footer --- */
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #8D837C; /* warm-stone */
        }
        .footer a {
            color: #8D837C;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="20">
        <tr>
            <td>
                <div class="container">
                    <!-- Header -->
                    <div class="header">
                        <a href="https://edtech-skillnest.onrender.com">
                            <img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s" alt="EdTech Logo">
                        </a>
                    </div>
                    <!-- Content -->
                    <div class="content">
                        <h1>
                            <span class="icon">✔</span>
                            Password Updated Successfully
                        </h1>
                        <p>Hi ${name},</p>
                        <p>
                            This is a confirmation that the password for your EdTech account has been successfully changed.
                        </p>
                        <div class="security-note">
                            <strong>Security Tip:</strong> If you did not make this change, please secure your account immediately by resetting your password and contacting our support team.
                        </div>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        <p>
                            If you have any questions, contact our support team at 
                            <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
};