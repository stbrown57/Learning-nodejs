import fs from 'fs';
import { parse } from 'csv-parse';

fs.createReadStream("./Students-test.csv")
.pipe(parse({ delimiter: ",", from_line: 2}))
.on("data", function (row) {
    console.log(row);
})
.on("end", function () {
    console.log("finished");
})
.on("error", function (error) {
    console.log(error.message);
});
