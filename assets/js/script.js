// Assignment code here

// ASCII char ranges per criteria
const ASCII_CHAR_LOWERCASE_RANGE = [97, 122];
const ASCII_CHAR_UPPERCASE_RANGE = [65, 90];
const ASCII_CHAR_NUMERIC_RANGE = [48, 57];
// Special char array per https://owasp.org/www-community/password-special-characters
const ASCII_SPECIAL_CHARS = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.',
  '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
// Password minimum and maximum length
const PASSWORD_MIN_MAX = [8, 12]
// Window Text
const PASSWORD_LENGTH_PROMPT = 'Enter password length between 8 and 12 characters:'
const PASSWORD_LOWERCASE_PROMPT = 'Include lowercase characters?'
const PASSWORD_UPPERCASE_PROMPT = 'Include uppercase characters?'
const PASSWORD_NUMERIC_PROMPT = 'Include numeric characters?'
const PASSWORD_SPECIAL_PROMPT = 'Include special characters?'

/**
 * Generates a random number between a given range.
 * @param range An array with two numbers, the min range and max range.
 * @returns {number} The random number generated between the given range.
 */
function generateRandomValueInRange(range) {
  return Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
}

/**
 * Generates a random lowercase character.
 * @returns {string} The random lowercase character.
 */
function generateLowercaseChar() {
  return String.fromCharCode(generateRandomValueInRange(ASCII_CHAR_LOWERCASE_RANGE));
}

/**
 * Generates a random uppercase character.
 * @returns {string} The random uppercase character.
 */
function generateUppercaseChar() {
  return String.fromCharCode(generateRandomValueInRange(ASCII_CHAR_UPPERCASE_RANGE));
}

/**
 * Generates a random numeric character.
 * @returns {string} The random numeric character.
 */
function generateNumericChar() {
  return String.fromCharCode(generateRandomValueInRange(ASCII_CHAR_NUMERIC_RANGE));
}

/**
 * Generates a random special character.
 * @returns {string} The random special character.
 */
function generateSpecialChar() {
  return ASCII_SPECIAL_CHARS[generateRandomValueInRange([0, ASCII_SPECIAL_CHARS.length - 1])]
}

/**
 * Returns an initialized passwordData object based on user input.
 * @returns {{criteria: {uppercase: {count: number, enabled: boolean}, special: {count: number, enabled: boolean}, lowercase: {count: number, enabled: boolean}, enabledCriteria: null, numeric: {count: number, enabled: boolean}}, length: number, text: null}}
 */
function initializePasswordData() {

  const passwordData = {
    length: promptForLength(),
    criteria: {
      lowercase: {
        enabled: promptForLowercase(),
        count: 0
      },
      uppercase: {
        enabled: promptForUppercase(),
        count: 0,
      },
      numeric: {
        enabled: promptForNumeric(),
        count: 0,
      },
      special: {
        enabled: promptForSpecialChar(),
        count: 0,
      },
      enabledCriteria: null,
    },
    text: null,
  }

  passwordData.text = new Array(passwordData.length).fill(null)
  passwordData.criteria.enabledCriteria = []

  return passwordData;
}

/**
 * Returns the user's value for length.
 * @returns {number}
 */
function promptForLength() {

  var userLength = 0;
  do {
    userLength = Number(window.prompt(PASSWORD_LENGTH_PROMPT));
  } while ( isNaN(userLength) || userLength < PASSWORD_MIN_MAX[0] || userLength > PASSWORD_MIN_MAX[1])

  return userLength;

}

/**
 * Returns true if the user clicks "OK" to lowercase prompt and false otherwise.
 * @returns {boolean}
 */
function promptForLowercase() {
    return window.confirm(PASSWORD_LOWERCASE_PROMPT)
}

/**
 * Returns true if the user clicks "OK" to uppercase prompt and false otherwise.
 * @returns {boolean}
 */
function promptForUppercase() {
    return window.confirm(PASSWORD_UPPERCASE_PROMPT)
}

/**
 * Returns true if the user clicks "OK" to numeric prompt and false otherwise.
 * @returns {boolean}
 */
function promptForNumeric() {
    return window.confirm(PASSWORD_NUMERIC_PROMPT)
}

/**
 * Returns true if the user clicks "OK" to special character prompt and false otherwise.
 * @returns {boolean}
 */
function promptForSpecialChar() {
    return window.confirm(PASSWORD_SPECIAL_PROMPT)
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
