var products = [];
var productListHtml = [];
var categoryListHtml = [];
var carouselHtml = [];
var priceTable = [];
var listProductId = [];

var cartList = [];
var cartListHtml = [];

// récupére la liste de produit en API
function getProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      products = json;
      generateProductsCard(products);
    });
}

// génére la liste de card produit en HTML
function generateProductsCard(products) {
  productListHtml = [];
  products.forEach((product, index) => {
    generateProductCategory(product);
    productListHtml.push(
      "<div class='col-lg-4 col-md-6 mb-4'>" +
        "<div class='card h-100'>" +
        "<a href='#'>" +
        "<img class='card-img-top' src=" +
        product.image +
        ">" +
        "</a>" +
        "<div class='card-body'>" +
        "<h4 class='card-title'>" +
        "<a href='#'>" +
        product.title +
        "</a>" +
        "</h4>" +
        "<h5>" +
        product.price +
        "€</h5>" +
        "<p class='card-text'>" +
        product.description +
        "</p>" +
        "</div>" +
        "<div class='card-footer'>" +
        product.category +
        '<button type="button" onClick="setProductInCart(\'' +
        product.id +
        "')\">" +
        "Ajouter au panier" +
        "</button>" +
        "</div></div></div>"
    );
  });

  categoryListHtml = [...new Set(categoryListHtml)];
  document.getElementById("categoryList").innerHTML = categoryListHtml.join("");
  document.getElementById("cardSection").innerHTML = productListHtml.join("");
}

function setProductInCart(selectedProduct) {
  listProductId.push(parseInt(selectedProduct));
}

function openCart() {
  var filterById;

  listProductId.forEach((product, index) => {
    filterById = products.filter((item) => item.id === product)[0];
    cartList.push(filterById);
  });

  cartList.forEach((list, index) => {
    cartListHtml.push("<li>" + list.title + "</li>");
  });

  document.getElementById("cartSection").innerHTML = cartListHtml.join("");
}

function accessPayment() {
  console.log("je passe");
  sessionStorage.setItem("cart", JSON.stringify(cartList));
  window.location.href = "./cart.html";
}

// je génére la liste des category en HTML avec en parametre le nom de la categorie
function generateProductCategory(product) {
  categoryListHtml.push(
    '<button type="button" onClick="getCategory(\'' +
      product.category +
      "')\">" +
      product.category +
      "</button>"
  );
}

// au clic sur une categorie, je récupére le nom de cette categorie et je fais un appel HTTP vers cette categorie
function getCategory(categoryName) {
  fetch("https://fakestoreapi.com/products/category/" + categoryName)
    .then((res) => res.json())
    .then((json) => {
      products = json;
      // je génere la liste des cartes en HTML avec ma nouvelle liste de produit
      generateProductsCard(products);
    });
}

// filtre les produits par ordre croissant
function filterBy(param) {
  var filterTable = products;
  if (priceTable.length > 0) {
    filterTable = priceTable;
  }
  if (param === "asc") {
    filterTable.sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (param === "desc") {
    filterTable.sort((a, b) => {
      return b.price - a.price;
    });
  }
  generateProductsCard(filterTable);
}

// filtre les produits par prix min et max
function filterByPrice() {
  priceTable = [];
  // products = liste des produits
  // product = chaque produit
  var priceMin = document.getElementById("prixMin").value;
  var priceMax = document.getElementById("prixMax").value;

  if (priceMin > priceMax) {
    alert("Le prix minimal ne peut pas etre superieur au maximal");
    document.getElementById("prixMin").value = "";
    document.getElementById("prixMax").value = "";
    return;
  }

  products.forEach((product, index) => {
    if (product.price >= priceMin && product.price <= priceMax) {
      priceTable.push(product);
    }
  });
  generateProductsCard(priceTable);
}

getProducts();
