import * as fs from "fs";

const filePath = 'Staff.csv';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const modifiedData = data.replace(/["=]/g, '');

  fs.writeFile(filePath, modifiedData, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }

    console.log('File successfully modified.');
  });
});