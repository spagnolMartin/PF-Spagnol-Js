//CART FUNCTIONS
function addFromCart(e){
    if(e.target.classList.contains("plus-item")){
        let productName = e.target.getAttribute("data-name");
        let product = cart.find(prod => prod.code === productName);

        addProduct(product);
        displayCart();

    }
}

function deleteOneFromCart(e){
    if(e.target.classList.contains("minus-item")){
        let productName = e.target.getAttribute("data-name");
        let product = cart.find(prod => prod.code === productName);

        product.count--;

        if(product.count == 0){
            deleteProduct(product);
        }
  
        //igual
        displayCart();
    }
}



function deleteProductFromCart(e) {
    if(e.target.classList.contains("delete-item")){
        let productName = e.target.getAttribute("data-name");
        let product = cart.find(prod => prod.code === productName);

        deleteProduct(product);
        displayCart();

    }
}

function deleteProduct(product){
    let index = cart.indexOf(product);
    cart.splice(index, 1);
}

function removeAllProducts(){
    cart = [];
    displayCart();
}

function totalPrice(){
    var totalPrice = 0;
    cart.forEach((prod) => {
        totalPrice += total(prod);
    })
    return totalPrice;
}

function total(prod){
    return prod.price * prod.count;   
}

//CART EVENTS
cartList.addEventListener("click", addFromCart);
cartList.addEventListener("click", deleteOneFromCart);
cartList.addEventListener("click", deleteProductFromCart);

clearCart.addEventListener("click", () => {
    removeAllProducts();
    cleanCart();
    displayCart();
    cartCount.innerHTML = `<span>Cart (${totalCount()})</span>`;
})

displayCart();

