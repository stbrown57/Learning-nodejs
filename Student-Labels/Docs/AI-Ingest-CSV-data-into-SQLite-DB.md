# Ingest CSV data into SQLite DB
Ingesting and cleaning up CSV data into an SQLite database using Node.js typically involves a few distinct steps: reading the CSV file, processing the data (which may include cleaning and transformation), and then inserting it into the SQLite database. Below are the steps you can follow, along with code examples for each:

### Step 1: Set up your Node.js Environment

First, make sure you have the necessary packages installed in your Node.js project:

1. **SQLite3**: To interact with the SQLite database.
2. **csv-parser** or **papaparse**: To read and parse CSV files.
3. **fs**: To interact with the file system (comes built-in with Node.js).

Install the dependencies via npm:

```bash
npm install sqlite3 csv-parser
```

### Step 2: Create SQLite Database

You can create an SQLite database (or open an existing one) using the `sqlite3` package. Here's an example of how to set up the SQLite database:

```javascript
const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database (or open an existing one)
let db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened successfully');
  }
});

// Create a table in the database (if it doesn't already exist)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER,
  email TEXT
)`);
```

### Step 3: Parse and Clean the CSV Data

You can use the `csv-parser` package to parse the CSV data. As you parse the data, you can also perform any necessary cleaning, such as handling missing values or formatting inconsistencies.

Here’s an example of how to parse and clean CSV data:

```javascript
const fs = require('fs');
const csv = require('csv-parser');

// Function to read and clean up CSV data
function processCSV(filePath) {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Clean and process each row as needed
      // Example: Trim whitespace and handle missing values
      const cleanedRow = {
        name: (row.name || '').trim(),
        age: row.age ? parseInt(row.age.trim(), 10) : null,
        email: (row.email || '').trim().toLowerCase(),
      };
      results.push(cleanedRow);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      insertIntoDatabase(results);
    });
}
```

### Step 4: Insert Data into SQLite Database

Once the CSV data is parsed and cleaned, you can insert the data into your SQLite database. Here’s how you can do that:

```javascript
// Function to insert cleaned data into SQLite database
function insertIntoDatabase(data) {
  const stmt = db.prepare('INSERT INTO users (name, age, email) VALUES (?, ?, ?)');

  data.forEach((row) => {
    // Insert data into the table
    stmt.run(row.name, row.age, row.email, (err) => {
      if (err) {
        console.error('Error inserting data into database:', err);
      }
    });
  });

  stmt.finalize(() => {
    console.log('Data insertion complete');
    db.close();
  });
}
```

### Step 5: Execute the Process

Finally, call the `processCSV` function to start the process of reading, cleaning, and inserting the data into your SQLite database.

```javascript
// Start the process with a CSV file
const filePath = 'path/to/your/file.csv';
processCSV(filePath);
```

### Example CSV File

Assuming you have a CSV file like this (`file.csv`):

```csv
name,age,email
John Doe,30,john@example.com
Jane Smith,,jane@example.com
Tom,25, tom@example.com
```

The data will be cleaned (e.g., trimming whitespaces and handling missing age values) and then inserted into the SQLite database.

### Additional Tips for Data Cleaning:
- **Handling missing or invalid data**: You can use JavaScript's built-in methods like `parseInt()`, `parseFloat()`, or `isNaN()` to validate numbers. For strings, you can check for empty values and decide whether to replace them with a default value or skip them.
- **Sanitize emails**: Normalize email addresses to lower case to avoid case sensitivity issues.
- **Remove duplicates**: You can add logic to check for duplicates before inserting data into the database (e.g., checking if the email already exists).

### Conclusion

The process of ingesting and cleaning up CSV data into an SQLite database involves:

1. Parsing the CSV using a library like `csv-parser`.
2. Cleaning and transforming the data as needed.
3. Inserting the cleaned data into the SQLite database using the `sqlite3` package.

This approach is flexible and can be adapted to different types of data and cleanup requirements.