// exports.courseEnrollmentEmail = (courseName, name) => {
//     return `<!DOCTYPE html>
//     <html>
    
//     <head>
//         <meta charset="UTF-8">
//         <title>Course Registration Confirmation</title>
//         <style>
//             body {
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 16px;
//                 line-height: 1.4;
//                 color: #333333;
//                 margin: 0;
//                 padding: 0;
//             }
    
    
//             .container {
//                 max-width: 600px;
//                 margin: 0 auto;
//                 padding: 20px;
//                 text-align: center;
//             }
    
//             .logo {
//                 max-width: 200px;
//                 margin-bottom: 20px;
//             }
    
//             .message {
//                 font-size: 18px;
//                 font-weight: bold;
//                 margin-bottom: 20px;
//             }
    
//             .body {
//                 font-size: 16px;
//                 margin-bottom: 20px;
//             }
    
//             .cta {
//                 display: inline-block;
//                 padding: 10px 20px;
//                 background-color: #FFD60A;
//                 color: #000000;
//                 text-decoration: none;
//                 border-radius: 5px;
//                 font-size: 16px;
//                 font-weight: bold;
//                 margin-top: 20px;
//             }
    
//             .support {
//                 font-size: 14px;
//                 color: #999999;
//                 margin-top: 20px;
//             }
    
//             .highlight {
//                 font-weight: bold;
//             }
//         </style>
    
//     </head>
    
//     <body>
//         <div class="container">
//             <a href="https://studynotion-by-vivek.vercel.app/"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
//                     alt="StudyNotion Logo"></a>
//             <div class="message">Course Registration Confirmation</div>
//             <div class="body">
//                 <p>Dear ${name},</p>
//                 <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
//                     are excited to have you as a participant!</p>
//                 <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
//                 </p>
//                 <a class="cta" href="https://studynotion-by-vivek.vercel.app/dashboard">Go to Dashboard</a>
//             </div>
//             <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
//                     href="mailto:mailbystudynotion@gmail.com">mailbystudynotion@gmail.com</a>. We are here to help!</div>
//         </div>
//     </body>
    
//     </html>`;
//   };

exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Course Enrollment Confirmation</title>
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
            }
            .highlight {
                color: #D95D39; /* burnt-sienna */
                font-weight: bold;
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
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .button-wrapper {
                text-align: center;
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
                            <h1>Successfully Enrolled!</h1>
                            <p>Dear ${name},</p>
                            <p>
                                Congratulations! You have successfully enrolled in the course 
                                <span class="highlight">"${courseName}"</span>. 
                                We are thrilled to have you join our learning community!
                            </p>
                            <p>
                                All your course materials are now available on your dashboard. 
                                Click the button below to start your learning journey.
                            </p>
                            <div class="button-wrapper">
                                <a class="cta-button" href="http://localhost:5173/dashboard/my-profile">Go to My Dashboard</a>
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