import * as duckdb from "duckdb";
import * as d3 from "d3";
import * as fs from 'fs';
import {csv} from 'd3-fetch';

const csvContent = fs.readFileSync("ComputerADList.csv", "utf8"); // Read file content

//d3-dsv may parse with transformations
const data = d3.csvParse(csvContent); // Parse the content with d3.csvParse
//const data = d3.csv(csvContent);
console.log(data);
