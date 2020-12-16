# Palindrome Database
A service to store submitted palindromes. Includes a simple UI which connects to the 2 endpoints of the API; one to check whether a string is a palindrome and the other to pull recently submitted palindromes.
## Set up

Install dependencies
```bash 
$ npm install
```
Start the server with 
```bash 
$ npm start
``` 
or 
```bash 
$ nodemon
```
Public assets served on `localhost:port`.

## API Usage

### List recent entries

**Request:** 
`GET /api/v1/palindromes`

**Response:** 
`200 OK` - Returns a list of 10 entry objects submitted within the last 10 minutes, or a
fewer amount if less than 10 were submitted.

```json
[
  {
    "id": 10,
    "date_submitted": "2019-01-17T23:33:24.783Z",
    "string": "A nut for a jar of tuna."
  },
  {
    "id": 11,
    "date_submitted": "2019-01-17T23:34:32.540Z",
    "string": "Taco Cat"
  },
  {
    "id": 12,
    "date_submitted": "2019-01-17T23:34:50.034Z",
    "string": "Borrow or Rob?"
  }
]
```

### Submit a string
**Request:**
`POST /api/v1/palindromes/check/:string`

**Responses:**
`201 Created` - String is a palindrome, entry submitted to database.

```json
{
  "isPalindrome": true,
  "id": 11,
  "date_submitted": "2019-01-17T23:34:32.540Z",
  "string": "Taco Cat"
}
```
`200 OK` - String is a palindrome, entry has already been submitted.
```json
{
  "isPalindrome": true,
  "message": "Entry already submitted."
}
```
`200 OK` - String is not a palindrome.
```json
{
  "isPalindrome": false,
  "string": "aBorrow or Rba?"
}
```
