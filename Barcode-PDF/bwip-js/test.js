import bwipjs from '@bwip-js/node';  // Platform-specific package import


let svg = bwipjs.toSVG({
    bcid: 'code128',       // Barcode type
    text: '31111001234567',    // Text to encode
    height: 2,              // Bar height, in millimeters
    includetext: true,            // Show human-readable text
    textxalign: 'center',        // Always good to set this
    textcolor: 'ff0000',        // Red text
});

console.log(svg);