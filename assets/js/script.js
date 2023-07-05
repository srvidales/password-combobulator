// Assignment code here

// ASCII char ranges per criteria
const ASCII_CHAR_LOWERCASE_RANGE = [97, 122];
const ASCII_CHAR_UPPERCASE_RANGE = [65, 90];
const ASCII_CHAR_NUMERIC_RANGE = [48, 57];
// Special char array per https://owasp.org/www-community/password-special-characters
const ASCII_SPECIAL_CHARS = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.',
  '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

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
