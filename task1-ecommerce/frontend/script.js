function addToCart(productName, price) {
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name: productName,
price: price
});

localStorage.setItem("cart", JSON.stringify(cart));
alert(productName + " added to cart!");
}
