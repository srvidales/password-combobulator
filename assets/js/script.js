// Assignment code here

// Password criteria enum
const Criteria = {
    Lowercase: 'lowercase',
    Uppercase: 'uppercase',
    Numeric: 'numeric',
    Special: 'special',
}

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
    const lowercaseCharRange = [97, 122];
    return String.fromCharCode(generateRandomValueInRange(lowercaseCharRange));
}

/**
 * Generates a random uppercase character.
 * @returns {string} The random uppercase character.
 */
function generateUppercaseChar() {
    const uppercaseCharRange = [65, 90];
    return String.fromCharCode(generateRandomValueInRange(uppercaseCharRange));
}

/**
 * Generates a random numeric character.
 * @returns {string} The random numeric character.
 */
function generateNumericChar() {
    const numericCharRange = [48, 57];
    return String.fromCharCode(generateRandomValueInRange(numericCharRange));
}

/**
 * Generates a random special character.
 * @returns {string} The random special character.
 */
function generateSpecialChar() {
    // Special char array per https://owasp.org/www-community/password-special-characters
    const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    return specialChars[generateRandomValueInRange([0, specialChars.length - 1])]
}

/**
 * Returns an initialized passwordData object based on user input.
 * @returns {{criteria: {uppercase: {count: number, enabled: boolean}, special: {count: number, enabled: boolean}, lowercase: {count: number, enabled: boolean}, enabledCriteria: null, numeric: {count: number, enabled: boolean}}, length: number, text: null}}
 * The passwordData object.
 */
function initializePasswordData() {

    const noSelectionPrompt = 'You must select at least one type of characters.'

    var passwordData = {}

    do {
        passwordData = {
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

        passwordData.text = new Array(passwordData.length).fill(null);
        passwordData.criteria.enabledCriteria = [];

        for (var criteriaKey in Criteria) {
            initializeEnabledCriteria(passwordData, Criteria[criteriaKey])
        }

        if (passwordData.criteria.enabledCriteria.length === 0) {
            window.alert(noSelectionPrompt)
        }

    } while (passwordData.criteria.enabledCriteria.length === 0)

    return passwordData;
}

/**
 * Initializes the enabledCriteria array with indexes of enabled criteria.
 * @param passwordData The passwordData object.
 * @param criteriaKey The criteria key to check for.
 */
function initializeEnabledCriteria(passwordData, criteriaKey) {
    if (passwordData.criteria[criteriaKey].enabled) {
        passwordData.criteria.enabledCriteria.push(Object.values(Criteria).indexOf(criteriaKey))
    }
}

/**
 * Returns the user's value for length.
 * @returns {number} User's length value.
 */
function promptForLength() {

    const lengthPrompt = 'Enter password length between 8 and 128 characters:'
    const passwordMinMaxRange = [8, 128]

    var userLength = 0;
    do {
        userLength = Number(window.prompt(lengthPrompt));
    } while (isNaN(userLength) || userLength < passwordMinMaxRange[0] || userLength > passwordMinMaxRange[1])

    return userLength;

}

/**
 * Returns true if the user clicks "OK" to lowercase prompt and false otherwise.
 * @returns {boolean} User's lowercase answer.
 */
function promptForLowercase() {
    const lowercasePrompt = 'Include lowercase characters?'
    return window.confirm(lowercasePrompt)
}

/**
 * Returns true if the user clicks "OK" to uppercase prompt and false otherwise.
 * @returns {boolean} User's uppercase answer.
 */
function promptForUppercase() {
    const uppercasePrompt = 'Include uppercase characters?'
    return window.confirm(uppercasePrompt)
}

/**
 * Returns true if the user clicks "OK" to numeric prompt and false otherwise.
 * @returns {boolean} User's numeric answer.
 */
function promptForNumeric() {
    const numericPrompt = 'Include numeric characters?'
    return window.confirm(numericPrompt)
}

/**
 * Returns true if the user clicks "OK" to special character prompt and false otherwise.
 * @returns {boolean} User's special character answer.
 */
function promptForSpecialChar() {
    const specialPrompt = 'Include special characters?'
    return window.confirm(specialPrompt)
}

/**
 * Main function in charge of generating and returning the password.
 * @returns {*} The password.
 */
function generatePassword() {

    const passwordData = initializePasswordData()

    generatePlan(passwordData)
    executePlan(passwordData)

    console.log('passwordData.criteria', passwordData.criteria)
    console.log('passwordData.text', passwordData.text)

    return passwordData.text.join('');

}

/**
 * Generates a plan to create a password. Plan consists of a must-have section and a random section.
 * @param passwordData The passwordData object.
 */
function generatePlan(passwordData) {

    generatePlanMustHaveSection(passwordData);
    generatePlanRandomSection(passwordData);

}

/**
 * Generates plan must-have section. Criteria that must be present is added to plan.
 * @param passwordData The passwordData object.
 */
function generatePlanMustHaveSection(passwordData) {

    for (var criteriaKey in Criteria) {
        incrementCriteriaCount(passwordData, Criteria[criteriaKey], true)
    }

}

/**
 * Increments the criteria count. Used when inserting characters of certain criteria.
 * @param passwordData The passwordData object.
 * @param criteriaKey The criteria key that needs to be incremented.
 * @param checkEnabled Verify if the criteria is enabled before incrementing.
 */
function incrementCriteriaCount(passwordData, criteriaKey, checkEnabled) {

    if (checkEnabled) {
        if (passwordData.criteria[criteriaKey].enabled) {
            passwordData.criteria[criteriaKey].count++;
        }
    } else {
        passwordData.criteria[criteriaKey].count++;
    }

}

/**
 * Generates random section of plan. Random characters based on criteria are added.
 * @param passwordData The passwordData object.
 */
function generatePlanRandomSection(passwordData) {

    var count = 0

    while (count < passwordData.length - passwordData.criteria.enabledCriteria.length) {
        const enabledCriteriaIndex =
            generateRandomValueInRange([0, passwordData.criteria.enabledCriteria.length - 1])
        switch (passwordData.criteria.enabledCriteria[enabledCriteriaIndex]) {
            case 0:
                incrementCriteriaCount(passwordData, Criteria.Lowercase, false)
                count++;
                break;
            case 1:
                incrementCriteriaCount(passwordData, Criteria.Uppercase, false)
                count++;
                break;
            case 2:
                incrementCriteriaCount(passwordData, Criteria.Numeric, false)
                count++;
                break;
            case 3:
                incrementCriteriaCount(passwordData, Criteria.Special, false)
                count++;
                break;
        }
    }

}

/**
 * Executes the generated plan thereby generating and inserting characters.
 * @param passwordData The passwordData object.
 */
function executePlan(passwordData) {

    var count = 0;
    var pendingCriteria = JSON.parse(JSON.stringify(passwordData.criteria));

    while (count < passwordData.length) {
        const pendingCriteriaIndex =
            generateRandomValueInRange([0, pendingCriteria.enabledCriteria.length - 1])
        switch (pendingCriteria.enabledCriteria[pendingCriteriaIndex]) {
            case 0:
                count = processInsert(passwordData, pendingCriteria, pendingCriteriaIndex,
                    generateLowercaseChar, Criteria.Lowercase, count);
                break;
            case 1:
                count = processInsert(passwordData, pendingCriteria, pendingCriteriaIndex,
                    generateUppercaseChar, Criteria.Uppercase, count);
                break;
            case 2:
                count = processInsert(passwordData, pendingCriteria, pendingCriteriaIndex,
                    generateNumericChar, Criteria.Numeric, count);
                break;
            case 3:
                count = processInsert(passwordData, pendingCriteria, pendingCriteriaIndex,
                    generateSpecialChar, Criteria.Special, count);
                break;
        }
    }

}

/**
 * Processes an insert. Inserts character and decrements pending criteria count.
 * Remove criteria if criteria reaches zero.
 * @param passwordData
 * @param pendingCriteria
 * @param randomCriteria
 * @param func
 * @param criteriaKey
 * @param count
 * @returns {*}
 */
function processInsert(passwordData, pendingCriteria, randomCriteria, func, criteriaKey, count) {

    insertChar(passwordData, func)
    count++;

    if (--pendingCriteria[criteriaKey].count === 0) {
        pendingCriteria.enabledCriteria.splice(randomCriteria, 1);
    }

    return count;

}

/**
 * Inserts character in random password location if location is null otherwise iterates through
 * password until reaching a null.
 * @param passwordData The passwordData object.
 * @param func The function that generates the criteria character.
 */
function insertChar(passwordData, func) {

    var inserted = false;

    var location = generateRandomValueInRange([0, passwordData.length - 1])
    do {
        if (passwordData.text[location] === null) {
            passwordData.text[location] = func()
            inserted = true
        } else {
            if (location < passwordData.length - 1) {
                location++;
            } else {
                location = 0;
            }
        }
    } while (!inserted)

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
