// -------------------------------------------------------------------------------------------
/// Function called when the page is loaded.
(async () => {
  const selectedProductId = getSelectedProductIdFromUrl();
  const selectedProduct = await getSelectedProductFromServer(selectedProductId);
  displaySelectedProduct(selectedProduct);
  displayAvailableColors(selectedProduct);
  addToBasket(selectedProduct);
})();

// -------------------------------------------------------------------------------------------
/// The product.html URL has been customized such that it contains the selected product ID:
/// "/Front_End/view/product/product.html?id=5be9c8541c9d440000665243"
/// It has been customized when the product was displayed on the home page.
/// This function extracts the productId from the URL.
function getSelectedProductIdFromUrl() {
  // 1. Store URL of the current page.
  let currentPage = window.location.href;
  // 2. Create new object URL.
  let newURL = new URL(currentPage);
  // 3. Use URL property searchParams and method get() to get the search parameter after "?"id"=....".
  return newURL.searchParams.get("id");
}

// -------------------------------------------------------------------------------------------------
/// Get data from the API for a given productId.
async function getSelectedProductFromServer(selectedProductId) {
  const url = `http://localhost:3000/api/teddies/${selectedProductId}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => alert(error.message + ": La connexion au serveur n'a pas pu être effectué."));
}

// -------------------------------------------------------------------------------------------------
/// Display the selected product.
function displaySelectedProduct(selectedProduct) {
  // 1. Access to the template.
  const templateElt = document.getElementById("template-selection");
  // 2. Clone the template.
  const templateEltClone = document.importNode(templateElt.content, true);
  // 3. Populate the template.
  templateEltClone.getElementById("selection-name").textContent = selectedProduct.name;
  templateEltClone.getElementById("selection-image").src = selectedProduct.imageUrl;
  templateEltClone.getElementById("selection-price").innerHTML = selectedProduct.price / 100 + `.00 €`;
  templateEltClone.getElementById("selection-description").textContent = selectedProduct.description;
  // 4. Push the template in HTML code.
  document.getElementById("row").appendChild(templateEltClone);
}

// -------------------------------------------------------------------------------------------------
/// Display color dropdown list.
function displayAvailableColors(selectedProduct) {
  const colors = selectedProduct.colors;
  for (i = 0; i < colors.length; i++) {
    const templateElt = document.getElementById("template-color-customization");
    const templateEltClone = document.importNode(templateElt.content, true);
    templateEltClone.getElementById("label-option").value = colors[i];
    templateEltClone.getElementById("label-option").textContent = colors[i];
    document.getElementById("color").appendChild(templateEltClone);
  }
}

// -------------------------------------------------------------------------------------------------
/// Store the product in the local storage.
function addToBasket(selectedProduct) {
  // 1. Pick up the button element from HTML.
  const button = document.getElementById("add-to-basket");
  // 2. Create click event.
  button.addEventListener("click", function (event) {
    // 3. PREVENDEFAULT COMMENTAIRE
    event.preventDefault();
    // 4. Add an alert if color is not selected.
    const selectedColor = getSelectedColor();
    if (selectedColor === "Sélectionner la couleur") {
      alert("Veuillez sélectionner une couleur.");
    } else {
      // 5. Otherwise, declare a variable called basket which is an empty object {key:value}.
      let basket = {};
      // 6. Get data from the local storage.
      // 6.1. First check if there is already an item called 'localStorageBasket' in the local storage.
      if (localStorage.getItem("localStorageBasket")) {
        // 6.2. If so, get the item 'localStorageBasket' which is in string format then convert it into a JavaScript object stored in the object basket.
        basket = JSON.parse(localStorage.getItem("localStorageBasket"));
      }
      // 7. Check if the newly selected product is already in the basket.
      // If so, we only increment the quantity otherwise we add a new {key:value} pair to the object basket.
      // 7.1. Create the key corresponding to the selected product.
      const basketKey = selectedProduct._id + selectedColor;
      // 7.2. does the key already exist?
      if (basketKey in basket) {
        // 7.3. Access to the value of the key and store it in a variable.
        let productAlreadyInBasket = basket[basketKey];
        // 7.4. Increment the quantity.
        productAlreadyInBasket.productQuantity++;
      } else {
        // 7.5. Create new object key:value pair defining the selected product. This will be the value of the key to be added to basket objet.
        let selectedProductInBasket = {
          productName: selectedProduct.name,
          productId: selectedProduct._id,
          productColor: selectedColor,
          productPrice: selectedProduct.price / 100,
          productQuantity: 1,
        };
        // 8. Add new {key:value} pair into the object basket.
        basket[basketKey] = selectedProductInBasket;
      }
      // 9. Convert the JavaScript object into a string and store it creating a new {key:value} pair into the local storage.
      localStorage.setItem("localStorageBasket", JSON.stringify(basket));
      // 10. Redirect to basket page.
      redirectToBasketPage();
    }
  });
}

// -------------------------------------------------------------------------------------------------
/// Get the color selection value.
function getSelectedColor() {
  const selectedColorElement = document.getElementById("color");
  return selectedColorElement.value;
}

// -------------------------------------------------------------------------------------------------
/// Redirect to the basket page.
function redirectToBasketPage() {
  location.href = "../basket/basket.html";
}
