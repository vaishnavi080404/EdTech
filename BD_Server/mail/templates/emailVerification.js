exports.emailVerificationTemplate = (otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your One-Time Password (OTP)</title>
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
            text-align: center; /* Center-align the content for focus */
            color: #4A3F35; /* espresso-brown */
            font-size: 16px;
            line-height: 1.6;
        }
        .content h1 {
            font-size: 24px;
            color: #4A3F35;
            margin-top: 0;
        }
        /* --- OTP Display Box --- */
        .otp-box {
            background-color: #FFF1F0; /* soft-terracotta */
            border: 2px dashed #D95D39; /* burnt-sienna */
            color: #D95D39; /* burnt-sienna */
            font-size: 36px;
            font-weight: bold;
            padding: 15px 25px;
            margin: 20px auto;
            border-radius: 8px;
            display: inline-block;
            letter-spacing: 5px; /* Adds space between numbers */
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
                        <a href="https://localhost:5173/">
                            <img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s" alt="EdTech Logo">
                        </a>
                    </div>
                    <!-- Content -->
                    <div class="content">
                        <h1>Verify Your Email Address</h1>
                        <p>Thank you for registering with EdTech. Please use the following One-Time Password (OTP) to complete your sign-up process.</p>
                        <div class="otp-box">
                            ${otp}
                        </div>
                        <p>This OTP is valid for 10 minutes. If you did not request this, please disregard this email.</p>
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