import PDFDocument from 'pdfkit';

interface TableColumn {
  header: string;
  key: string;
  width: number;
}

export const generatePDF = (res: any, title: string, columns: TableColumn[], data: any[]) => {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });

  // Stream directly to response
  doc.pipe(res);

  // NDCA Branding Colors
  const colors = {
    navy: '#0B1220',
    gold: '#FACC15',
    textMuted: '#9CA3AF',
    rowEven: '#F9FAFB',
    rowOdd: '#FFFFFF',
    border: '#E5E7EB'
  };

  // Header Section
  doc.rect(0, 0, doc.page.width, 100).fill(colors.navy);
  
  doc.fillColor(colors.gold)
     .fontSize(22)
     .font('Helvetica-Bold')
     .text('NDCA PORTAL', 50, 30);
  
  doc.fillColor('#FFFFFF')
     .fontSize(14)
     .text(title, 50, 60);

  doc.fillColor(colors.textMuted)
     .fontSize(8)
     .text(`Generated on: ${new Date().toLocaleString()}`, 50, 78, { align: 'right', width: doc.page.width - 100 });

  // Table Logic
  let y = 140;
  const tableWidth = columns.reduce((acc, col) => acc + col.width, 0);
  const startX = 50;

  // Table Headers
  doc.rect(startX, y, tableWidth, 25).fill(colors.gold);
  doc.fillColor(colors.navy).fontSize(10).font('Helvetica-Bold');

  let currentX = startX;
  columns.forEach(col => {
    doc.text(col.header, currentX + 5, y + 8, { width: col.width - 10, align: 'left' });
    currentX += col.width;
  });

  y += 25;

  // Table Rows
  doc.font('Helvetica').fontSize(9).fillColor(colors.navy);

  if (data.length === 0) {
    doc.text('No records found.', startX, y + 10, { width: tableWidth, align: 'center' });
  } else {
    data.forEach((row, index) => {
      // Check for page overflow
      if (y > 750) {
        doc.addPage();
        y = 50;
        
        // Re-add headers on new page
        doc.rect(startX, y, tableWidth, 25).fill(colors.gold);
        doc.fillColor(colors.navy).fontSize(10).font('Helvetica-Bold');
        let headerX = startX;
        columns.forEach(col => {
          doc.text(col.header, headerX + 5, y + 8, { width: col.width - 10, align: 'left' });
          headerX += col.width;
        });
        y += 25;
        doc.font('Helvetica').fontSize(9).fillColor(colors.navy);
      }

      // Background alternating colors
      doc.rect(startX, y, tableWidth, 25)
         .fill(index % 2 === 0 ? colors.rowEven : colors.rowOdd);
      
      // Bottom border for row
      doc.strokeColor(colors.border)
         .lineWidth(0.5)
         .moveTo(startX, y + 25)
         .lineTo(startX + tableWidth, y + 25)
         .stroke();

      doc.fillColor(colors.navy);
      let rowX = startX;
      columns.forEach(col => {
        let value = row[col.key] || '-';
        doc.text(String(value), rowX + 5, y + 8, { width: col.width - 10, align: 'left' });
        rowX += col.width;
      });

      y += 25;
    });
  }

  // Footer / Pagination
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc.fillColor(colors.textMuted)
       .fontSize(8)
       .text(`Page ${i + 1} of ${pages.count}`, 50, doc.page.height - 50, { align: 'center' });
  }

  doc.end();
};
