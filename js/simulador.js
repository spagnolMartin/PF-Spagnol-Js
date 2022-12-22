//Classes
class Product {

    constructor(name, price, code){
        this.name = name;
        this.price = parseFloat(price);
        this.code = code;
    }

}

const yeezy = new Product ( "yeezy","260", "Y250");
const airForce = new Product ("airForce", "120", "AF1");
const airMax = new Product ("air Max 97", "160", "AM97");

class Persona {
    productos = []

    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    addProduct(product){
        this.productos.push(product);
    } 

    subtotal(){
        return this.productos.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
    }

    taxes(){
        return this.subtotal() * 0.21;
    }

    total(){
        return this.subtotal() + this.taxes();
    }

    saludar(){
        alert(`Welcome to urban Shoes, ${persona1.name} ,how you doing?` )
    }

}

let nombre = prompt("Enter your name: ");
let email = prompt("Enter your email: ");

const persona1 = new Persona(nombre, email);

saludar();
chooseProducts();
showResults();

//Functions

function saludar(){
    persona1.saludar()
}

function doesTheProductExists(chosenProduct) {
    
    if(chosenProduct == "A" || chosenProduct == "Y" || chosenProduct == "M"){
        return true;
    }else{
        return false;
    }

}

function chooseProducts(){

    alert("Press A for Air Force \n- Press Y for Yeezy \n- Press M for Air Max \n- Press any other for Exit");
    let chosenProduct = prompt("Chose the shoe that you want: ");

    while(doesTheProductExists(chosenProduct)){

        switch(chosenProduct){
            case "A":
                persona1.addProduct(airForce);
                break;
            case "Y":
                persona1.addProduct(yeezy);
                break;
            case "M":
                persona1.addProduct(airMax);
                break;
        }

        chosenProduct = prompt("Chose the shoe that you want: "); 
    }

    console.log(persona1);
}

function showResults(){
    alert(`Subtotal: $ ${persona1.subtotal()} \n Taxes: $ ${persona1.taxes()} \n  Total: $ ${persona1.total()}`);
}