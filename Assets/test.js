import duckdb from 'duckdb';
import * as fs from 'fs';


async function copyCsvToDuckDB(csvFilePath, tableName) {
  let db;  // Declare db here
  try {
    db = new duckdb.Database('computersAD.duckdb');

    await db.exec(`COPY ${tableName} FROM '${csvFilePath}' (HEADER TRUE);`);

    const results = await db.all(`SELECT * FROM ${tableName}`);
    console.log(results);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (db) { // Check if db is defined before closing
        db.close(); 
    }
  }
}


// Usage example
const csvFilePath = './ComputerADList.csv';
const tableName = 'computers';
copyCsvToDuckDB(csvFilePath, tableName);