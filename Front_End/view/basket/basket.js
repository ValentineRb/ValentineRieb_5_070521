// -------------------------------------------------------------------------------------------
/// Function called when the page is loaded.
(() => {
  let basket = getBasketFromLocalStorage()
  displayAllProductsInBasket(basket)
  displayTotalPrice()
  sendOrder(basket)
  if (isBasketEmpty(basket)) {
    alertEmptyBasket()
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
/// Alert when basket is empty.
function alertEmptyBasket() {
  alert("Votre panier est vide.")
}

// -------------------------------------------------------------------------------------------------
/// Check if basket is empty.
function isBasketEmpty(basket) {
  for (let key in basket) {
    if (basket.hasOwnProperty(key)) {
      return false
    }
  }
  return true;
}

// -------------------------------------------------------------------------------------------------
/// Calculate total price of the order and add it in session storage.
function calculateTotalPrice(basket) {
  let totalPrice = 0
  for (const key in basket) {
    const product = basket[key]
    const price = product.productPrice
    const quantity = product.productQuantity
    totalPrice += price * quantity
  }
  sessionStorage.setItem('totalPrice', totalPrice)
  return totalPrice
}

// -------------------------------------------------------------------------------------------------
/// Calculate total price of the order.
function displayTotalPrice() {
  const basket = getBasketFromLocalStorage()
  const totalPrice = calculateTotalPrice(basket)
  document.getElementById('total').textContent = `Montant total de `+ totalPrice + `.00 €`
}

// -------------------------------------------------------------------------------------------------
/// Send order.
function sendOrder(basket) {
  // Get the form and define actions on submit event.
  const customerForm = document.getElementById('customer-form')
  customerForm.addEventListener('submit', e => {
    e.preventDefault()
    if (!isBasketEmpty(basket)) {
      // Get form elements by name.
      const firstNameField = customerForm.elements["first-name"]
      const lastNameField = customerForm.elements["last-name"]
      const emailField = customerForm.elements["email"]
      const addressField = customerForm.elements["address"]
      const cityField = customerForm.elements["city"]
      // Check inputs validity.
      const isValidForm = validateForm(firstNameField, lastNameField, emailField, addressField, cityField)
      if (isValidForm) {
        // Build order.
        const order = buildOrder(firstNameField.value, lastNameField.value, emailField.value, addressField.value, cityField.value, basket)
        // Send order.
        post(order)
      }
    } else {
      alertEmptyBasket()
      customerForm.reset()
    }
  })
}

// -------------------------------------------------------------------------------------------------
/// Validate form.
function validateForm(firstNameField, lastNameField, emailField, addressField, cityField) {
  const onlyTextRegex = /^[ A-zÀ-ÿ\-\']+$/
  const alphanumericTextRegex = /^[ 0-9A-zÀ-ÿ\-\']+$/
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const isValidForm = validateField(firstNameField, onlyTextRegex)
  && validateField(lastNameField, onlyTextRegex)
  && validateField(emailField, emailRegex)
  && validateField(addressField, alphanumericTextRegex)
  && validateField(cityField, onlyTextRegex)
  return isValidForm
}

// -------------------------------------------------------------------------------------------------
/// Validate user input.
function validateField(field, regex) {
  // If field.value contains only caracters from the regex, test() function will return true.
  // If field.value contains at least one caracter which is not from the regex, test() function will return false.
  const isValidInput = regex.test(field.value)
  // Alert if user input is invalid.
  if (!isValidInput) {
    alert("Veuillez remplir le champ " + field.labels[0].textContent + " correctement afin de valider la commande.")
  }
  return isValidInput
}

// -------------------------------------------------------------------------------------------------
/// Build order with the contact objet and the array of product ids.
function buildOrder(firstName, lastName, email, address, city, basket) {
  // Build contact object.
  const contact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    city: city
  }
  // Get an array of product ids.
  const productIds = getProductIds(basket)
  // Build the order object.
  const order = {
    contact: contact,
    products: productIds
  }
  return order
}

// -------------------------------------------------------------------------------------------------
/// Get an array of product ids.
function getProductIds(basket) {
  let productIds = []
  for (const key in basket) {
    if (basket.hasOwnProperty(key)) {
      const productInBasket = basket[key]
      const productInBasketId = productInBasket.productId
      // If productInBasketId is not already in productIds array it will be added.
      if (!productIds.includes(productInBasketId)) {
        productIds.push(productInBasketId)
      }
    }
  }
  return productIds
}

// -------------------------------------------------------------------------------------------------
/// Post order.
function post(order) {
  const requestParams = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {'Content-Type': 'application/json'}
  }
  const url = "http://localhost:3000/api/teddies/order"
  fetch(url, requestParams)
  .then(response => response.json())
    .then(data => {
      console.log(data.orderId)
      localStorage.removeItem('localStorageBasket')
      document.getElementById('customer-form').reset()
      window.location.href = `../confirmation/confirmation.html?orderId=${data.orderId}`
    })
    .catch(error => alert(error.message + ": La connexion au serveur n'a pas pu être effectué."))
}
