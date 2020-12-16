/*
* Handle initial input errors and submit string to API.
* Param:
*   event (object): Submit event generated from form submission.
*/
const handleSubmit = (event) => {
  // Prevent default page refresh by form submit event.
  event.preventDefault();
  // Form input element for basic validation.
  const string = document.getElementById('string').value;

  if(string.length == 0) {
    // Populates error element below input field with an error message.
    showFeedback({error: 'Please enter a value.'});
  } else {
    // Send entered string to API for additional checks.
    palindromesAPI('POST', string);
  }
}

/*
* Conditionally render messages to error/success elements below input field.
* Param:
*   message (string): Error/success message to be displayed.
*/
const showFeedback = (message) => {
  errorFeedback = document.getElementById('error-message');
  successFeedback = document.getElementById('success-message');
  // Populate the relevant element and empty the other.
  if(message.error) {
    errorFeedback.innerHTML = message.error;
    successFeedback.innerHTML = '';
  } else {
    successFeedback.innerHTML = message.success;
    errorFeedback.innerHTML = '';
  }
}

/*
* Send a GET/POST request to the API.
* Params:
*   method (string): Method for HTTP request (GET or POST).
*   string (string): String to be submitted to the API.
*/
const palindromesAPI = (method = 'GET', string = '') => {
  let config, url;
  if(method == 'POST') {
    // Set up request configuration, 2nd param for fetch().
    config = {
      method: method,
      headers: {'Content-Type': 'application/json'},
    };
    url = `http://localhost:3000/api/v1/palindromes/check/${string}`
  } else {
    config = {method: method};
    url = 'http://localhost:3000/api/v1/palindromes';
  }
  
  fetch(url, config)
  // Parse response to object.
  .then(response => response.json())
  .then(data => {
    // Pass obtained data to user input feedback or to data render.
    method == 'POST' ? parseResponse(data) : renderData(data);
  })
  // Pass error from fetch to UI. Likely to not be readbla for public, 
  //probably worth replacing with generic error text (e.g. Unable to fetch data)
  .catch((err) => showFeedback({error: err}));
}

/*
* Parse fetched data into corresponding error/success messages for user input.
* Params:
*   data (object): Response received from the API, parsed to object from JSON.
*/
const parseResponse = (data) => {
  if(data.isPalindrome == true && !data.message) {
    showFeedback({success: 'String is a palindrome. Added to database.'});
    // Repull entries from API to update with recent entry.
    palindromesAPI();
    document.getElementById('string').value = '';
  } else if(data.isPalindrome == true && data.message) {
    showFeedback({success: `String is a palindrome. ${data.message}`});
  } else if(data.isPalindrome == false) {
    showFeedback({error: 'String is not a palindrome. Try another string.'})
  } else {
    showFeedback({error: 'A server error occurred.'})
  }
}

/*
* Render list of entries received from the API.
* Param:
*   data (list): List of palindrome entry objects from the API response.
*/
const renderData = (data) => {
  // New element to store entries.
  const list = document.createElement('div');
  list.id = 'entry-list';

  const appendList = (string) => {
    const h3 = document.createElement('h3');
    const text = document.createTextNode(string);
    h3.appendChild(text);
    list.appendChild(h3);
  }
  if(data.length == 0) {
    appendList('No recent entries.')
  } else {
    data.forEach(entry => appendList(entry.string));
  }
  const oldList = document.getElementById('entry-list');
  oldList.parentNode.replaceChild(list, oldList);
}