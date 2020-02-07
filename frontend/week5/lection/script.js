//en klass
class Car {
    constructor(brand, yearmodel, price) {
        this.brand = brand;
        this.yearmodel = yearmodel;
        this.price = price;
    }

    GetAge() {
        return new Date().getFullYear() - this.yearmodel;
    }

    ToString() {
        return this.brand + "," + this.GetAge() + "år," + this.price + "€";
    }
}

//sessonStorage:
//-för lagaring av data i anslutning till webbläsaren
//- töm när sessionen tar slut
//localStorage
//-måste tömmas med kommando
//OBS! För att lagra en array i session- el. localstorage:
//sessionStorage.sessionvariabel= JSON.stringify(array)
//OBS"! För att hämta en array frpn session- el. localStorage:
//arrayvariabel = JSONpars(sessionStorage.sessionvariabel)

let lastUsed = "";

window.addEventListener("load", () => {
    //if (sessionStorage.sessionlastused){
    if (localStorage.sessionlastused) {
        //lastUsed= sessionStorage.sessionlastused;
        lastUsed = localStorage.sessionlastused;
        document.getElementById("lastused").innerHTML = "Senast använd " + lastUsed;
    }
    //sessionStorage.sessionlastused = new Date().toLocaleString();
    localStorage.sessionlastused = new Date().toLocaleString();
    let fromLocalStorage = JSON.parse(localStorage.allcars);
    fromLocalStorage.forEach((thecar) => {
        let car = new Car(thecar.brand, thecar.yearmodel, thecar.price);
        cararray.push(car);
    });
})

document.getElementById("remove").addEventListener("click", () => {
    //localStorage.clear();
    localStorage.removeItem("sessionlastused");
    lastUsed = "";
    document.getElementById("lastused").innerHTML = "Senast använd"
});

//let cararray = [];

document.getElementById("register").addEventListener("click", () => {
    let brand = document.getElementById("brand").value;
    let yearmodel = document.getElementById("yearmodel").value;
    let price = document.getElementById("price").value;
    /*let car = {
        brand,
        yearmodel,
        price
    };*/
    let car = new Car(brand, yearmodel, price);
   //cararray.push(car);
    //document.getElementById("currentcar").innerHTML = car.brand + "," + car.yearmodel + "," + car.price;
    //document.getElementById("allcars").innerHTML += car.brand + "," + car.yearmodel + "," + car.price + "<br>";
    document.getElementById("currentcar").innerHTML = car.ToString();
    document.getElementById("allcars").innerHTML += car.ToString() + "<br>";
});
