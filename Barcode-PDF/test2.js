import Barcode  from 'node-barcode';

// Generate a CODE128 barcode as an SVG string
const svgString = Barcode.barcode('31111001234567', {
  format: 'CODE128',
  width: 1.5,
  height: 15
});

// You can now use this SVG string to display or save the barcode.
console.log(svgString);