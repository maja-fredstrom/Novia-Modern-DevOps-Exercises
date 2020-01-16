function showErrorMessage(error) {
    document.getElementById("error").innerHTML = error;
}

function clearErrorMessage() {
    showErrorMessage("");
}

function addRowToTable(radius, calculatedValue, tableID) {
    let newTable = document.getElementById(tableID);
    let newRow = newTable.insertRow(-1);
    let radiusCell = newRow.insertCell(0);
    radiusCell.appendChild(document.createTextNode(radius));
    let calculationCell = newRow.insertCell(1);
    calculationCell.appendChild(document.createTextNode(calculatedValue));
}


document.getElementById("radioArea").addEventListener("input", function () {
    if (this.checked)
        document.getElementById("calculateButton").value = "Calculate Area"
}, false);
document.getElementById("radioCircumference").addEventListener("input", function () {
    if (this.checked)
        document.getElementById("calculateButton").value = "Calculate Circumference"
}, false);

document.getElementById("calculateButton").addEventListener("click", function () {
    clearErrorMessage();
    let radius = document.getElementById("enteredRadius").value;
    if (radius <= 0) {
        showErrorMessage("Please enter a positive number!!");
        return;
    }
    if (document.getElementById("radioArea").checked) {
        let area = Math.PI * Math.sqrt(radius);
        addRowToTable(radius, area, "areaTable");
    } else if (document.getElementById("radioCircumference").checked) {
        let circumference = 2 * Math.PI * radius;
        addRowToTable(radius, circumference, "cTable");
    }
}, false);
