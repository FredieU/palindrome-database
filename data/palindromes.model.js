const { exists, newID, timeDiff, writeFile } = require('../helpers/helper');
let palindromes = require('./data.json');

/*
* Get recently submitted palindromes in the last 10 minutes.
* Up to a maximum of 10 entries.
*/
const getPalindromes = () => {
  // Initialise empty array to store past 10 entries or past 10 mins of entries.
  let results = [];
  return new Promise((resolve) => {
    if(palindromes.length == 0) resolve(results);
    
    palindromes.reverse().forEach(entry => {
      const recent = timeDiff(entry.date_submitted, new Date());
      if(recent && results.length <= 10) results.push(entry);
    });
    resolve(results);
  });
}

/*
* Create new entry object, append to list and save to JSON file.
* Param:
*   string (string): Entry received from URL parameter.
*/
const savePalindrome = (string) => {
  return new Promise((resolve, reject) => {
    const id = newID(palindromes);
    const date = new Date();
    const newEntry = {
      id: id,
      date_submitted: date,
      string: string
    };
    if(!exists(string, palindromes)) {
      palindromes.push(newEntry);
      writeFile('./data/data.json', palindromes)
      .then(() => resolve(newEntry))
      .catch(err => reject(err));
    } else {
      resolve({message: 'Entry already submitted.'})
    }
  })
}

module.exports = {
  getPalindromes,
  savePalindrome
};