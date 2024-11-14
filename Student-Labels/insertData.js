import fs from 'fs';
import { parse } from 'csv-parse';
import { connectToDatabase } from './db.js';

// First, get the database connection
const db = await connectToDatabase();

fs.createReadStream("./Students-test.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        db.serialize(function () {
            db.run(
                "INSERT INTO students VALUES (?, ?, ?, ?, ?, ?, ?)", // SQL query needs to be in quotes
                [row[0], row[1], row[2], row[3], row[4], row[5], row[6]],
                function (error) {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log(`Inserted a row with the id: ${this.lastID}`); // Template literal needs backticks
                }
            );
        });
    });
