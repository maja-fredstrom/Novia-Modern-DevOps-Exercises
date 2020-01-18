const ELEMENTS = {
    RESULT_TEXT: document.getElementById("resultText"),
    ERROR_MESSAGE: document.getElementById("errorMessage"),
    USERNAME: document.getElementById("usersName"),
    LENGTH: document.getElementById("usersLength"),
    WEIGHT: document.getElementById("usersWeight"),
    BUTTON: document.getElementById("bmiCalculatorButton")
};

function showError(errorMessage) {
    let textNode = document.createTextNode(errorMessage + " ");
    ELEMENTS.ERROR_MESSAGE.appendChild(textNode);
}

function removeChildren(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

function clearErrorMessage() {
    removeChildren(ELEMENTS.ERROR_MESSAGE);
}

function printResult(bmi, weightType) {
    let name = ELEMENTS.USERNAME.value;
    let roundedBmi = Math.round(bmi * 100) / 100;
    let textNode = document.createTextNode(`${name} , BMI =  ${roundedBmi} , weight type =  ${weightType}`);
    ELEMENTS.RESULT_TEXT.appendChild(textNode);
}

function clearResult() {
    removeChildren(ELEMENTS.RESULT_TEXT);
}

function calculateWeightType(bmi) {
    if (bmi <= 20) {
        return "under weight";
    } else if (bmi > 20 && bmi < 30) {
        return "normal weight";
    } else if (bmi > 30) {
        return "over weight";
    } else {
        throw new Error("Unexpected BMI value, " + bmi);
    }
}

function validateInput(length, weight) {
    if ((length < 100 || length > 250) && (weight < 30 || weight > 300)) {
        throw new Error("Invalid length and height!!");
    }
    if (length < 100 || length > 250) {
        throw new Error("Invalid length!!");
    }
    if (weight < 30 || weight > 300) {
        throw new Error("Invalid weight!!");
    }
}

function calculateBmi() {
    let length = ELEMENTS.LENGTH.value;
    let weight = ELEMENTS.WEIGHT.value;
    validateInput(length, weight);
    return weight / Math.pow((length / 100), 2);
}

ELEMENTS.BUTTON.addEventListener("click", function () {
    clearErrorMessage();
    clearResult();
    let bmi;
    try {
        bmi = calculateBmi();
    } catch (error) {
        showError(error.message);
        return;
    }
    let weightType = calculateWeightType(bmi);
    printResult(bmi, weightType);
}, false);
