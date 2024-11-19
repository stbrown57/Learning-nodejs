import { copyCSVToDuckDB } from "./ingestDB.js";


const csvFile = "ComputerADList.csv";
const targetTable = "computers";

copyCSVToDuckDB(csvFile, targetTable);