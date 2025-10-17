exports.certificateTemplate = (userName, courseName, completionDate) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Certificate</title>
        <style>
            body {
                font-family: 'Georgia', serif;
                background: #fdfdfd;
                padding: 40px;
                text-align: center;
                position: relative;
            }

            .certificate-container {
                border: 10px solid #2c3e50;
                padding: 50px;
                border-radius: 15px;
                background: #ffffff;
                box-shadow: 0px 0px 20px rgba(0,0,0,0.15);
                position: relative;
            }

            .certificate-title {
                font-size: 40px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 10px;
                text-transform: uppercase;
            }

            .subtitle {
                font-size: 18px;
                margin-bottom: 30px;
                color: #555;
            }

            .name {
                font-size: 32px;
                font-weight: bold;
                margin: 20px 0;
                color: #1a5276;
            }

            .course {
                font-size: 26px;
                font-weight: bold;
                margin: 10px 0;
                color: #117a65;
            }

            .date {
                margin-top: 30px;
                font-size: 18px;
                color: #7d7d7d;
            }

            .footer {
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
                padding: 0 50px;
            }

            .signature {
                text-align: center;
            }

            .signature-line {
                margin-top: 50px;
                border-top: 2px solid #333;
                width: 200px;
                margin-left: auto;
                margin-right: auto;
            }

            .logo {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 100px;
                height: auto;
                opacity: 0.9;
            }
        </style>
    </head>
    <body>
        <div class="certificate-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3przndJA76LEddJYIlVB7aqm1WTmd5lovxDyy2_Kl3ZQUnsM3Uy-9vE&s" class="logo" alt="Logo"/>

            <div class="certificate-title">Certificate of Completion</div>
            <div class="subtitle">This is proudly presented to</div>

            <div class="name">${userName}</div>

            <div class="subtitle">for successfully completing the course</div>
            <div class="course">${courseName}</div>

            <div class="date">Awarded on ${completionDate}</div>

            <div class="footer">
                <div class="signature">
                    <div class="signature-line"></div>
                    <p>Instructor</p>
                </div>
                <div class="signature">
                    <div class="signature-line"></div>
                    <p>Director</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};
