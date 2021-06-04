// -------------------------------------------------------------------------------------------
/// Function called when the page is loaded.
(async () => {
  let basket = getBasketFromLocalStorage()
  displayAllProductsInBasket(basket)
  displayTotalPrice()
  if (isBasketEmpty(basket)) {
    redirectToHomePage()
  }
})()

// -------------------------------------------------------------------------------------------------
/// Get data from local storage. Data are a collection of key:value pairs.
/// Key = productId + productColor : Value = {productName:"...", productId:"...",...}
function getBasketFromLocalStorage() {
  let basket = JSON.parse(localStorage.getItem('localStorageBasket')) || {}
  return basket
}

// -------------------------------------------------------------------------------------------------
/// Loop over keys in the basket object and display the values that are attached to them.
function displayAllProductsInBasket(basket) {
  for (const key in basket) {
    if (Object.hasOwnProperty.call(basket, key)) {
      const product = basket[key]
      displaySingleProductInBasket(product)
    }
  }
}

// -------------------------------------------------------------------------------------------------
/// Display one product in the basket.
function displaySingleProductInBasket(product) {
  // 1. Access to the template
  const templateElt = document.getElementById('template-basket-item')
  // 2. Clone the template
  const templateEltClone = document.importNode(templateElt.content, true)
  // 3. Populate the template
  templateEltClone.getElementById("name-and-color").textContent = product.productName + `, ` + product.productColor
  templateEltClone.getElementById("quantity").value = product.productQuantity
  templateEltClone.getElementById("price").textContent = product.productPrice * product.productQuantity +`.00 €`
  // 4. Add an event on the element 'quantity' to update the quantity of the product in the basket.
  templateEltClone.getElementById('quantity').addEventListener('change', function(event) {
    // 5. Store the value of the input changed by the user.
    const newQuantity = Number(event.target.value)
    // 6. Update the quantity in the local storage.
    updateProductQuantity(product.productId, product.productColor, newQuantity)
    // 7. Access to the id="price" in the HTML code by the parents of this element.
    let priceElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("#price")
    // 8. Populate the HTML price element.
    priceElement.textContent = product.productPrice * newQuantity + `.00 €`
    displayTotalPrice()
  })
  // 9. Add an event on the element 'bin'.On the click the function is called to empty the basket.
  templateEltClone.getElementById('bin').addEventListener('click', function(event) {
    removeProductFromBasket(product.productId, product.productColor)
    displayTotalPrice()
  })
  // 10. Push the template in the HTML code.
  document.getElementById("row-template").appendChild(templateEltClone)
}

// -------------------------------------------------------------------------------------------------
/// Function which updates the quantity in the local storage.
function updateProductQuantity(productId, productColor, newQuantity) {
  // 1. Store data from local storage in basket which is an objet {key:value}.
  let basket = getBasketFromLocalStorage()
  // 2. Construct the key which allows us to access the product whose quantity needs to be updated.
  const basketKey = productId + productColor
  // 3. Access to the product.
  let productInBasket = basket[basketKey]
  // 4. Access to its property productQuantity and update it with the new quantity.
  productInBasket.productQuantity = newQuantity
  // 5. Resave the basket in the local storage.
  localStorage.setItem('localStorageBasket', JSON.stringify(basket))
}

// -------------------------------------------------------------------------------------------------
/// Function which updates the quantity in the local storage.
function removeProductFromBasket(productId, productColor) {
  // 1. Store data from local storage in basket which is an objet {key:value}.
  let basket = getBasketFromLocalStorage()
  // 2. Construct the key which allows us to access the product to be deleted.
  const basketKey = productId + productColor
  // 3. Remove the product.
  delete basket[basketKey]
  // 4. Resave the basket in the local storage.
  localStorage.setItem('localStorageBasket', JSON.stringify(basket))
}

// -------------------------------------------------------------------------------------------------
/// Redirect to the home page.
function redirectToHomePage() {
  location.href = "../home/index.html"
}

// -------------------------------------------------------------------------------------------------
/// Check if basket is empty.
function isBasketEmpty(basket) {
  for(let key in basket) {
      if(basket.hasOwnProperty(key))
          return false;
  }
  return true;
}

// -------------------------------------------------------------------------------------------------
/// Calculate total price of the order.
function calculateTotalPrice(basket) {
  let totalPrice = 0
  for (const key in basket) {
    const product = basket[key]
    const price = product.productPrice
    const quantity = product.productQuantity
    totalPrice += price * quantity
  }
  return totalPrice
}

// -------------------------------------------------------------------------------------------------
/// Calculate total price of the order.
function displayTotalPrice() {
  const basket = getBasketFromLocalStorage()
  const totalPrice = calculateTotalPrice(basket)
  document.getElementById('total').textContent = totalPrice + `.00 €`
}
