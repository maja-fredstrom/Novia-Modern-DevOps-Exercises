function setTemperatureType(celcius) {
    if (temperature > 50 || temperature < -50) {
        throw new Error("fel celcius");
    } else if (temperature < -10) {
        return "mycket kallt";
    } else if (temperature < 0) {
        return "kallt";
    } else if (temperature < 20) {
        return "varmt";
    } else {
        return "hett";
    }
}

let temperature = prompt("Celsius");
try {
    let temperatureType = setTemperatureType(temperature);
    let temperatureF = 1.8 * temperature + 32;
    alert(temperatureType + ", Fahrenheit = " + temperatureF);
} catch (error) {
    alert(error.message);
} finally {
    let reload = prompt("Should I reload ? y/n");
    if (reload === "y") {
        location.reload(true);
    }
}


/*let age = prompt("Ålder? ");
let agetype;
if (age<13) {
     agetype="barn";
    } else if (age<20) {
        agetype="tonåring";
    } else if (age < 35) {
        agetype="ung";
    } else if (age < 65) {
        agetype="vuxen";
    } else {
        agetype="senior";
    }
alert(agetype); */


/*let age = prompt("Ålder? ");
if (age >= 0 && age < 105) {
      alert("OK");
    } else {
        alert("INTE OK");
    }*/


/*let number = prompt("Hur många tal?");
let sum = 0 ;
for( let i = 1 ; i <= number; i++){
    sum += i;
}
alert(sum);
location.reload(true);*/
