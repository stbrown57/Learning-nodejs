import fs from 'fs';
import sqlite3 from "sqlite3";
const filepath = './scps.db';

export function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
    CREATE TABLE students
    (
      student_id       VARCHAR(10),
      first_name       VARCHAR(20),
      middle_name      VARCHAR(20),
      last_name        VARCHAR(20),
      grade            VARCHAR(4),
      homeroom         VARCHAR(4),
      email            VARCHAR(30)
    )
  `);
}