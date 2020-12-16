const fs = require('fs');

/*
* Generate a new ID based on the IDs of the existing entry array.
* Param:
*   array (array): Array of palin
*/
const newID = (array) => {
  return array.length > 0 ? array[array.length - 1].id + 1 : 1
}

/*
* Save entry object to JSON file.
* Params:
*   file (string): Path to JSON file.
*   data (object): Entry object for the submitted palindrome string.
*/
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data), (err) => {
      err ? reject(err) : resolve();
    });
  })
}

/*
* Check if the submitted string already exists in the JSON file.
* Params:
*   string (string): Palindrome string
*   data (list): List of submitted palindromes.
*/
const exists = (string, data) => {
  let check = false;
  data.forEach(entry => {
    if (string === entry.string) check = true;
  });
  return check
}

/*
* Calculates time difference between two dates.
* Params:
*   date (string) - Date string from entry data.
*   now (object) - Date object from "new Date()"
*/
const timeDiff = (date, now) => {
  // Date string from JSON > epoch timestamp in milliseconds
  const epochDate = Date.parse(date);
  // Date object > epoch timestamp in milliseconds
  const epochNow = now.valueOf();
  // Time difference in seconds converted to minutes
  const diff = (epochNow - epochDate) / 1000 / 60
  return diff < 10 ? true : false
}

module.exports = {
  newID,
  writeFile,
  exists,
  timeDiff
}