import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const downloadCertificate = async (studentName, courseName) => {
  // 1. Create a temporary div for the certificate design
  const element = document.createElement("div");
  element.style.width = "800px";
  element.style.padding = "40px";
  element.style.textAlign = "center";
  element.style.border = "20px solid #2C1810"; 
  element.style.backgroundColor = "white";
  element.style.color = "#2C1810";
  element.style.fontFamily = "serif";

  element.innerHTML = `
    <div style="border: 5px solid #D4AF37; padding: 50px;">
      <h1 style="font-size: 50px; margin-bottom: 10px;">Certificate of Completion</h1>
      <p style="font-size: 20px; text-transform: uppercase;">This is to certify that</p>
      <h2 style="font-size: 40px; margin: 20px 0; border-bottom: 2px solid #2C1810; display: inline-block; padding: 0 30px;">
        ${studentName}
      </h2>
      <p style="font-size: 20px;">has successfully completed the course</p>
      <h3 style="font-size: 25px; font-weight: bold;">${courseName}</h3>
      <div style="margin-top: 50px; display: flex; justify-content: space-between;">
        <span>Instructor: SkillNest Team</span>
        <span>Date: ${new Date().toLocaleDateString()}</span>
      </div>
    </div>
  `;

  document.body.appendChild(element);


  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("l", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${courseName}-Certificate.pdf`);


  document.body.removeChild(element);
};