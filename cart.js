var cart = [];
var cartHtml = [];

function getCart() {
  cart = sessionStorage.getItem("cart");
  cart = JSON.parse(cart);
  generateCartHtml(cart);
}

function generateCartHtml(cart) {
  cartHtml = [];
  cart.forEach((product, index) => {
    cartHtml.push(
      "<li class='list-group-item'>" +
        product.title +
        "<br>" +
        product.description +
        "<br>" +
        product.price +
        "<br>" +
        '<button type="button" onClick="deleteProduct(\'' +
        index +
        "')\">" +
        "Supprimer" +
        "</button>" +
        "</li>"
    );
  });
  document.getElementById("cartSection").innerHTML = cartHtml.join("");
}

function returnToList() {
  return (window.location.href = "./index.html");
}

function deleteProduct(index) {
  delete cart[index];
  const filter = cart.filter((elm) => elm);
  generateCartHtml(filter);
}

getCart();
