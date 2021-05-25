(async () => {
  displayBasketItems()
  displayTotalPrice()
})()

function displayBasketItems() {
  // Récupérer les éléments du panier.
  const basketItems = basket.getBasketItems()

  // Loop over basketItems et hydrate
  for(let key in basketItems) {
    displayBasketItem(basketItems[key])
  }
}

function displayBasketItem(basketItem) {
  // 1. Récupérer l'élément template qui est invisible lors du chargement de la page.
  const templateElementBasket = document.getElementById("template-basket-item")

  // 2. Clôner le template.
  let cloneElementBasket = document.importNode(templateElementBasket.content, true)

  // 3. Remplir le clône avec les informations du product.
  const productName = basketItem["productName"]
  const productColor = basketItem["productColor"]
  const productQuantity = basketItem["productQuantity"]
  const productPrice = basketItem["productPrice"]
  cloneElementBasket.getElementById('name-and-color').textContent = productName + `, ` + productColor
  cloneElementBasket.getElementById('quantity').value = productQuantity
  cloneElementBasket.getElementById('price').textContent = productPrice * productQuantity + `.00 €`

  
  // Add events
  // cloneElementBasket.getElementById('quantity').onchange = (e) => {
  //   e.preventDefault()
  //   basket.updateBasketItemQuantity(basketItem["productId"], productColor, e.target.value)
  // }

  // 4. Ajouter le clône dans le DOM à l'endroit approprié, à savoir le parent contenant le child template.
  document.getElementById("row-template").appendChild(cloneElementBasket)
}

function displayTotalPrice() {
  // Afficher le prix total de la commande.
  document.getElementById('total').textContent = basket.totalPrice() + `.00 €`
}
