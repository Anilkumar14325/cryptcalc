import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToPDF = (title: string, content: string, data: any) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  doc.setFontSize(12);
  doc.text(content, 20, 40);
  
  // Add simulation data
  let y = 60;
  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 20, y);
    y += 10;
  });
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

export const exportToWord = (title: string, content: string, data: any) => {
  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <p>${content}</p>
        <h2>Simulation Data</h2>
        <ul>
          ${Object.entries(data)
            .map(([key, value]) => `<li>${key}: ${value}</li>`)
            .join('')}
        </ul>
      </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.doc`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToExcel = (data: any) => {
  const ws = XLSX.utils.json_to_sheet([data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Simulation Data');
  XLSX.writeFile(wb, 'simulation-data.xlsx');
};