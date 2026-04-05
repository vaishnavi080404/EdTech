exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Payment Successful - EdTech</title>
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
        /* --- Receipt Details Box --- */
        .receipt-details {
            background-color: #F8E8E6; /* muted-terracotta */
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .receipt-details p {
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
        }
        .receipt-details .total {
            font-size: 18px;
            font-weight: bold;
            color: #D95D39; /* burnt-sienna */
            border-top: 1px solid rgba(141, 131, 124, 0.2);
            padding-top: 10px;
            margin-top: 10px;
        }
        /* --- Call-to-Action Button --- */
        .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #D95D39; /* burnt-sienna */
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
        }
        .button-wrapper {
            text-align: center;
            margin-top: 20px;
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
                            Payment Successful!
                        </h1>
                        <p>Dear ${name},</p>
                        <p>Thank you for your purchase. We've received your payment and your course is now available on your dashboard. Here are your order details:</p>
                        
                        <div class="receipt-details">
                            <p><span>Order ID:</span> <strong>${orderId}</strong></p>
                            <p><span>Payment ID:</span> <strong>${paymentId}</strong></p>
                            <p class="total"><span>Amount Paid:</span> <span>₹${amount}</span></p>
                        </div>

                        <p>We're excited to see you start your learning journey!</p>

                        <div class="button-wrapper">
                            <a class="cta-button" href="https://edtech-skillnest.onrender.com/dashboard/enrolled-courses">Go to My Courses</a>
                        </div>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                        <p>
                            If you have any questions, feel free to contact our support team at 
                            <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
                        </p>
                        <p>&copy; ${new Date().getFullYear()} EdTech. All rights reserved.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
};