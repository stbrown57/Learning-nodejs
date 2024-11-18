import duckdb from "duckdb";
import * as fs from "fs";

const db = new duckdb.Database("computerAD.duckdb");

async function copyCSVToDuckDB(csvFilePath, tableName) {
  try {
    // Create the table (no need for explicit connection)
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} AS SELECT * FROM read_csv_auto('${csvFilePath}')`;
    await db.exec(createTableQuery); // Use db.exec()

    console.log(`Data from ${csvFilePath} copied to table ${tableName}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

// ... rest of your code

// Example usage
const csvFile = "ComputerADList.csv";
const targetTable = "computer";

copyCSVToDuckDB(csvFile, targetTable);
