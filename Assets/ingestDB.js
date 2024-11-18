import * as duckdb from "duckdb";
import * as d3 from "d3";
import * as fs from 'fs';
import {csv} from 'd3-fetch';

const csvContent = fs.readFileSync("ComputerADList.csv", "utf8"); // Read file content

//d3-dsv may parse with transformations
//const data = d3.csvParse(csvContent); // Parse the content with d3.csvParse

const data = await d3.dsv(",", "file:///Users/stbrown/Development/Learning-nodejs/Assets/ComputerADList.csv", (d) => {
    return {
      name: d.Name,
      customHardwareModel: d.CustomHardwareModel,
      OperatingSystem: d.OperatingSystem,
      OperatingSystemVersion: d.OperatingSystemVersion,
      description: d.Description,
      lastLoggedOnUser: d.customLastLoggedOnUser,
      lastLoggedOnUserDate: Date(d.customLastLoggedOnUserDate),
      serialNumber: d.serialNumber,
      DistinguishedName: d.DistiguishedName
    };
  });
console.log(data);