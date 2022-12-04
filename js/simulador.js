let nombre = prompt("Enter your name: ");
let subTotal = 0;
let quantity = 0;

alert("Welcome to urban Shoes, "+nombre);

chooseProducts();
showResults();


//Functions

function doesTheProductExists(chosenProduct) {
    
    if(chosenProduct == "A" || chosenProduct == "Y" || chosenProduct == "M"){
        return true;
    }else{
        return false;
    }

}

function addProduct (price){
    subTotal += price;
    quantity ++; 
}

function chooseProducts(){

    alert("Press A for Air Force - Press Y for Yeezy - Press M for Air Max - Press any other for Exit");
    let chosenProduct = prompt("Chose the shoe that you want: ");

    while(doesTheProductExists(chosenProduct)){

        switch(chosenProduct){
            case "A":
                addProduct(120);
                break;
            case "Y":
                addProduct(260);
                break;
            case "M":
                addProduct(160);
                break;
        }

        chosenProduct = prompt("Chose the shoe that you want: "); 
    }
}

function showResults(){
    let taxes = subTotal * 0.21;
    let total = subTotal + taxes;
    alert("Subtotal: $"+subTotal +" Taxes: $"+taxes +" Total: $"+total);
}