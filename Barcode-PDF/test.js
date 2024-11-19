/**
 * Script to generate a PDF document containing barcodes formatted for Avery 5160 labels
 * Uses [JSBarcode](https://www.npmjs.com/package/jsbarcode) for barcode generation 
 * and [jsPDF](https://www.npmjs.com/package/jspdf) for PDF creation
 * 
 * Avery 5160 Specifications:
 * - Labels per page: 30 (3 across, 10 down)
 * - Label size: 2.625" x 1" (189 x 72 points)
 * - Page margins: 0.5" top/bottom, 0.219" sides (36/15.8 points)
 * 
 * @requires jsbarcode
 * @requires jspdf
 * @requires canvas
 */

const Canvas = require('canvas');
const JsBarcode = require('jsbarcode');
const { jsPDF } = require('jspdf');

// Array of barcode data objects
const barcodeDataArray = [
  { code: '2186577', line1: 'Joseph Taylor', line2: 'Homeroom: 14' },
  { code: '2190021', line1: 'Xavire Smith', line2: 'Homeroom: 14' },
  { code: '2188756', line1: 'Micole Alexander', line2: 'Homeroom: 14'}
  // Add more items as needed
];

const barcodeOptions = {
  format: 'CODE128',
  width: 1.5,
  height: 15,        // Reduced height to accommodate text
  displayValue: false,
  fontSize: 8
};

// Create new PDF document (US Letter size)
const doc = new jsPDF({
  format: 'letter',
  unit: 'pt'
});

// Avery 5160 layout constants
const labelWidth = 189;
const labelHeight = 72;
const marginTop = 36;
const marginLeft = 15.8;
const colGap = 15.8;
const labelsPerRow = 3;
const labelsPerCol = 10;

barcodeDataArray.forEach((data, index) => {
  // Calculate position
  const col = index % labelsPerRow;
  const row = Math.floor(index / labelsPerRow) % labelsPerCol;
  const page = Math.floor(index / (labelsPerRow * labelsPerCol));
  
  // Add new page if needed
  if (index > 0 && index % (labelsPerRow * labelsPerCol) === 0) {
    doc.addPage();
  }
  
  // Calculate x and y positions for current label
  const xPos = marginLeft + (col * (labelWidth + colGap));
  const yPos = marginTop + (row * labelHeight);
  
  // Create canvas for barcode
  const canvas = new Canvas.createCanvas();
  JsBarcode(canvas, data.code, barcodeOptions);
  
  // Add text lines
  doc.setFontSize(8);
  doc.text(data.line1, xPos + 5, yPos + 10);
  doc.text(data.line2, xPos + 5, yPos + 20);
  
  // Add barcode
  doc.addImage(
    canvas.toBuffer(), 
    'PNG', 
    xPos + 5, 
    yPos + 25,     // Positioned below the text lines
    labelWidth - 10, 
    30
  );
});

doc.save('avery5160_barcodes.pdf');
