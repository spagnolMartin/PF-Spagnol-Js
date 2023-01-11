let cartList = document.querySelector("#cart_list");
const shoesList = document.querySelector(".shoes_list");
const cartCount = document.querySelector(".total-count");
const cartTotal = document.querySelector(".total-cart");
const clearCart = document.querySelector('.clear-cart');
let pricesCart = document.querySelector('.prices_cart');

console.log(clearCart);


let cart = [];
class Product {
    constructor(name, price, count, img, brand, category, code){
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
        this.category = category;
        this.brand = brand;
        this.code = code;
    }
}

let sentez = new Product("Nina-Negro", "320", 0, "../images/sentez-negra.png", "Sentez","bags", "sentN");
let dunklow = new Product("Nike Dunk Low Black-White", "230", 0,"../images/nike_dunk_low_black_white.png", "Nike","shoes", "nikeBW");
let dunklowYellow = new Product("Nike Dunk Low Yellow", "350", 0,"../images/nike_dunk_low_yellow.jpg", "Nike","shoes", "nikeY");
let lebron = new Product("Nike Lebron XVII", "180", 0,"../images/nike_lebron_xvii.jpg", "Nike","shoes", "nikeLB");
let raybanAmore = new Product("Ray Ban Amore", "110", 0, "../images/rayban-amore.png", "Ray Ban", "glasses","rayA");
let raybanFerrari = new Product("Ray Ban Ferrari", "115", 0, "../images/rayban-ferrari.jpg", "Ray Ban", "glasses", "rayF");
let versaceGlasses = new Product("Medusa Biggie", "345", 0, "../images/versace.jpg", "Versace", "glasses", "verMB");
let sentezBari = new Product("Bari", "280", 0, "../images/sentez-bari.jpg", "Sentez","bags", "sentB");
let sentezEstocolmo = new Product("Estocolmo", "340", 0, "../images/sentez-estocolmo.jpg", "Sentez","bags", "sentE");

let products = [sentez, dunklow, raybanAmore, versaceGlasses, raybanFerrari, lebron, dunklowYellow, sentezBari, sentezEstocolmo];

function saveProducts(){
    localStorage.setItem('products', JSON.stringify(products));
}

function saveCart(){
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function loadCart(){
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}

if(sessionStorage.getItem('shoppingCart') != null){
    loadCart();
}

function cleanCart(){
    cartList.innerHTML = " ";
}

function totalCount(){
    let totalCount = 0;
        
    for(i in cart){
        totalCount += cart[i].count;
    }

    return totalCount;
}

function addToCart(e){
    if(e.target.classList.contains("shoes_buy_button")){
        let productName = e.target.getAttribute("data-name");
        let product = products.find(prod => prod.code == productName);
        
        if(!(cart.find(prod => prod.code == productName))){
            cart.push(product);
        }

        addProdNot(product);
        addProduct(product);

    }
} 

function addProduct(product){
    product.count++;        
    cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;
    saveCart();
}

//Displaying Products Functions.
function displayProducts(array){
    array.forEach((prod) =>{
        const row = document.createElement("div");
        row.className = "shoes";
        row.innerHTML = `
        <img class="shoes_photo" src=${prod.img} alt=${prod.name}>
        <span class="shoes_name">${prod.name}</span>
        <span class="shoes_brand">${prod.brand}</span>
        <div class="shoes_costs">
            <span class="shoes_price">$${prod.price}</span>
            <button data-name=${prod.code} class="shoes_buy_button">BUY</button>
       </div>
        `;
        shoesList.appendChild(row);
      });

      cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;
}

function displayCart(){
    saveCart();
    cleanCart();
        if(cart.length == 0){
            const background = document.createElement("div");
            background.innerHTML = `
            <div class="empty_cart">
                <h1>Your cart is empty. <h1>
                <h4>LAS CATALINAS<h2>
            <div>
            `
            ;
            pricesCart.style.width = "0%";
            pricesCart.innerHTML = " ";
            background.style.width = "100%";
    
            cartList.appendChild(background);
            cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;

        }else{

            cart.forEach((prod) =>{
                const row = document.createElement("div");
                row.className = "cartProd";
                row.innerHTML = `
                <div class="container">
                <h5>${prod.name}</h5>
                <h4>${prod.brand}</h4>
                <p>$ ${prod.price}</p>
                <button class='minus-item btn ' data-name="${prod.code}">-</button>
                <button class='plus-item btn' data-name="${prod.code}">+</button>
                <p>${prod.count}</p>
                <p>$ ${total(prod)}</p>
                <button class='delete-item btn btn-danger' data-name="${prod.code} ">DELETE ITEM</button>
                </div>
                `;
                cartList.appendChild(row);
              });
        
            cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;
            cartTotal.innerHTML = `<span>${totalPrice()}</span>`;
        }

}   

let mostExpensive = (array) => {
    let mostExpensiveProd;
    let mostExpensivePrice = 0;

    array.forEach((prod) => {
        if(prod.price > mostExpensivePrice){
            mostExpensivePrice = prod.price;
            mostExpensiveProd = prod;
        }
    }) 

    return mostExpensiveProd;
}

let shoes = products.filter(prod => prod.category === "shoes");
let glasses = products.filter(prod => prod.category === "glasses");
let bags = products.filter(prod => prod.category === "bags");

let mostExpensiveShoe = mostExpensive(shoes);
let mostExpensiveBag = mostExpensive(bags);
let mostExpGlasses = mostExpensive(glasses);

let mostExpensiveProducts = [mostExpensiveShoe, mostExpensiveBag, mostExpGlasses];

//Notifications
const addProdNot = (product) => Toastify({
    text: product.name + " added to your cart! ",
    offset: {
      x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
}).showToast();
/*
Cosas importantes - Entrega final.: 

-Local Storage **
-Asincrónicas
-Archivo Json
-Interacción con el DOM. **
-Incoroporar al menos una librería al proyecto (Toastify para alert.).

-ENVIAR LINK CON EL REPO Y OTRO LINK CON EL HOSTING.


-De interacción con el DOM falta: 

*/