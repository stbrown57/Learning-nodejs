/**
 * Script to generate a PDF document containing barcodes formatted for Avery 5160 labels
 * with centered text above each barcode
 */

// ... previous imports and setup remain the same ...

barcodeDataArray.forEach((data, index) => {
    // Calculate position (same as before)
    const col = index % labelsPerRow;
    const row = Math.floor(index / labelsPerRow) % labelsPerCol;
    const page = Math.floor(index / (labelsPerRow * labelsPerCol));
    
    if (index > 0 && index % (labelsPerRow * labelsPerCol) === 0) {
      doc.addPage();
    }
    
    const xPos = marginLeft + (col * (labelWidth + colGap));
    const yPos = marginTop + (row * labelHeight);
    
    // Create canvas for barcode
    const canvas = new Canvas.createCanvas();
    JsBarcode(canvas, data.code, barcodeOptions);
    
    // Center and add text lines
    doc.setFontSize(8);
    const textWidth1 = doc.getTextWidth(data.line1);
    const textWidth2 = doc.getTextWidth(data.line2);
    const centerX1 = xPos + (labelWidth - textWidth1) / 2;
    const centerX2 = xPos + (labelWidth - textWidth2) / 2;
    
    doc.text(data.line1, centerX1, yPos + 10);
    doc.text(data.line2, centerX2, yPos + 20);
    
    // Add barcode (same position as before)
    doc.addImage(
      canvas.toBuffer(), 
      'PNG', 
      xPos + 5, 
      yPos + 25,
      labelWidth - 10, 
      30
    );
  });
  