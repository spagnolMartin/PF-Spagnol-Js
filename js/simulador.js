let cartList = document.querySelector("#cart_list");
const shoesList = document.querySelector(".shoes_list");
const cartCount = document.querySelector(".total-count");
const cartTotal = document.querySelector(".total-cart");
const clearCart = document.querySelector('.clear-cart');
let pricesCart = document.querySelector('.prices_cart');

let cart = [];
let products = [];
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

//Fetching products from API.
const loadProducts = async () =>{
    const resp = await fetch("../data.json");
    const data = await resp.json();
    if(products.length < data.length){
        data.forEach((prod) => {
            products.push(new Product(prod.name, prod.price, prod.count, prod.img, prod.brand, prod.category, prod.code));
        });
    }

    saveProducts();
}

loadProducts();

//Json storage Functions
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

if(localStorage.getItem('products') != null){
    products = JSON.parse(localStorage.getItem('products'));
}

console.log(products);

//Cleans HTML cart List.
function cleanCart(){
    cartList.innerHTML = " ";
}

//Cart's total product count.
function totalCount(){
    let totalCount = 0;
        
    for(i in cart){
        totalCount += cart[i].count;
    }

    return totalCount;
}

//Add a product to the cart.
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

//Add an existing cart product to the cart.
function addProduct(product){
    product.count++;        
    cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;
    saveCart();
}

//Displaying Products .
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

//Displaying Every Product added to the cart.
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

//Returns mostExpensive item from an array
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

-Incoroporar al menos una librería al proyecto (Toastify para alert.).

-ENVIAR LINK CON EL REPO Y OTRO LINK CON EL HOSTING.

-- Cosas que se pueden agregar: 
    -- Boton View para ver página por cada producto.
    -- Buscador y que encuentre el producto por nombre.
    -- VER PÁGINAS WEB.

--Nota: 
 --Se podría hacer orientado a objetos en vez de funcional.
-De interacción con el DOM falta: 

*/