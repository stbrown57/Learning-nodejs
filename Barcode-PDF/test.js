/**
 * Script to generate a PDF document containing multiple barcodes with automatic pagination
 * Uses [JSBarcode](https://www.npmjs.com/package/barcode-generator) for barcode generation and [jsPDF](https://www.npmjs.com/package/jspdf) for PDF creation
 * 
 * @requires barcode-generator
 * @requires jspdf
 */

import JSBarcode from 'barcode-generator';
import { jsPDF } from 'jspdf';

// Array of barcode data
const barcodeDataArray = ['BARCODE1', 'BARCODE2', 'BARCODE3', 'BARCODE4', 'BARCODE5', 'BARCODE6'];
const barcodeOptions = {
  format: 'CODE128',
  width: 2,
  height: 30,
  displayValue: true
};

// Create new PDF document
const doc = new jsPDF();

// Constants for page layout
const pageHeight = doc.internal.pageSize.height;
const barcodeHeight = 50; // Total height needed for each barcode including spacing
const marginTop = 10;

// Generate and add multiple barcodes
barcodeDataArray.forEach((barcodeData, index) => {
  // Calculate Y position for current barcode
  const yPosition = marginTop + (index * barcodeHeight);
  
  // Check if we need a new page
  if (yPosition + barcodeHeight > pageHeight) {
    doc.addPage();
    // Reset the index for the new page
    const newIndex = index % Math.floor((pageHeight - marginTop) / barcodeHeight);
    const newYPosition = marginTop + (newIndex * barcodeHeight);
    
    const barcodeImage = JSBarcode.draw(barcodeData, barcodeOptions);
    doc.addImage(barcodeImage, 'JPEG', 10, newYPosition, 100, 30);
    doc.text(`Barcode ${index + 1}: ${barcodeData}`, 10, newYPosition + 35);
  } else {
    const barcodeImage = JSBarcode.draw(barcodeData, barcodeOptions);
    doc.addImage(barcodeImage, 'JPEG', 10, yPosition, 100, 30);
    doc.text(`Barcode ${index + 1}: ${barcodeData}`, 10, yPosition + 35);
  }
});

doc.save('multiple_barcodes.pdf');
