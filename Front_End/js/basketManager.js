/// Création d'une classe Basket. Elle n'a pas de constructor, seulement des méthodes.
class Basket {

  // -------------------------------------------------------------------------------------------
  /// Appellée lorsqu'on voit quelque chose comme: ...... = this.basketItems
  get basketItems() {
    return JSON.parse(localStorage.getItem('basketItems') || '{}')
  }

  // -------------------------------------------------------------------------------------------
  /// Appellée lorsqu'on voit quelque chose comme: this.basketItems = ......
  set basketItems(basketItems) {
    localStorage.setItem('basketItems', JSON.stringify(basketItems))
  }

  // -------------------------------------------------------------------------------------------
  /// Méthode de la classe permettant d'ajouter un article dans le "panier" = Local Storage
  addBasketItem(product) {
    // 1. S'assurer que la couleur est bien sélectionnée.
    const select = document.getElementById("color")
    const selectedColor = select.value
    if(selectedColor === "Sélectionner la couleur") {
      alert("Veuillez sélectionner une couleur.")
    } else {
      // 2. S'assurer que le local storage est toujours en ligne avec le basketItems js
      // 'basketItems' = nom utilisé par le local storage pour enregistrer les données.
      // basketItems = {CLE : VALEUR} - la valeur elle-meme contient un dictionnaire {Cle : valeur}
      // CLE = product._id : VALEUR = {productId:...correspondant à product._id, productName:..., productPrice: ..., ....}
      // JSON.parse() permet de désérialiser (passer de json à js)
      let basketItems = this.basketItems
      // 3. Vérifier si le product est déjà dans le basketItems
      const productAlreadyInBasket = !!basketItems[product._id + selectedColor]

      if (productAlreadyInBasket) {
        // Si le product est déjà dans le panier il suffit d'augmenter la quantité.
        basketItems[product._id + selectedColor]["productQuantity"]++
      } else {
        // Création du dictionnaire basketItemDetails la VALEUR de la CLE product._id
        let basketItemDetails = {
          productId: product._id,
          productName: product.name,
          productPrice: product.price / 100,
          productColor: selectedColor,
          productQuantity: 1
        }
        basketItems[product._id + selectedColor] = basketItemDetails // dic [key]= value
      }
      this.basketItems = basketItems
      this.redirectToBasket()
    }
  }

  // -------------------------------------------------------------------------------------------
  /// Méthode permettant d'ajuster le prix total en fonction de la quantité.
  totalPrice() {
    let totalPrice = 0
    const basketItems = this.basketItems
    for (let key in basketItems) {
      const basketItemDetails = basketItems[key]
      const productPrice = basketItemDetails["productPrice"]
      const productQuantity = basketItemDetails["productQuantity"]
      const totalPricePerProduct = productPrice * productQuantity
      totalPrice += totalPricePerProduct
    }
    return totalPrice
  }

  // -------------------------------------------------------------------------------------------
  /// Méthode permettant d'ajuster la quantité.
  updateBasketItemQuantity(productId, productColor, newQuantity) {
    // // 1. On doit s'assurer que la couleur est bien sélectionnée.
    // const select = document.getElementById("color")
    // const selectedColor = select.value
    // if(selectedColor === "Sélectionner la couleur") {
    //   alert("Veuillez sélectionner une couleur.")
    // } else {
      let basketItems = this.basketItems
      // 2. Vérifier si le product est déjà dans le basketItems
      const productAlreadyInBasket = !!basketItems[productId + productColor]
      
      // 3. Si le product est dans le panier, on permet la modification de la quantité.
      if (productAlreadyInBasket) {
        basketItems[productId + productColor]["productQuantity"] = newQuantity
        // Sérialiser avec JSON.stringify => this.basketItems = basketItems
        this.basketItems = basketItems
      } else {
        alert("Un produit doit déjà être dans le panier pour pouvoir changer sa quantité.")
      }
    // }
  }

  // -------------------------------------------------------------------------------------------
  /// Méthode permettant de supprimer le product.
  removeBasketItem(product) {
    // 1. On doit s'assurer que la couleur est bien sélectionnée.
    const select = document.getElementById("color")
    const selectedColor = select.value

    let basketItems = this.basketItems
    // 2. Vérifier si le product est déjà dans le basketItems
    const productAlreadyInBasket = !!basketItems[product._id + selectedColor]
      
    // 3. Si le product est dans le panier, on permet la supression du product.
    if (productAlreadyInBasket) {
      delete basketItems[product._id + selectedColor]
      // 4. Sérialiser avec JSON.stringify => this.basketItems = basketItems
      this.basketItems = basketItems
    } else {
      alert("Un produit doit déjà existé pour pouvoir être supprimé.")
    }
  }

  // -------------------------------------------------------------------------------------------
  /// Méthode permettant de supprimer le product.
  getBasketItems() {
    return this.basketItems
  }

  // -------------------------------------------------------------------------------------------
  /// Rediriger l'utilisateur vers la page panier.
  redirectToBasket() {
    location.href = "/Front_End/view/basket/basket.html"
  }
}

let basket = new Basket()

  // -------------------------------------------------------------------------------------------
  /// EXPLICATIONS SUPPLEMENTAIRES / SYNTAXES COMPLEMENTAIRES

  // -------------------------------------------------------------------------------------------
  /// LOCAL STORAGE:
  // 'basketItems' = nom utilisé par le local storage pour enregistrer les données.
  // Important: le local storage ne peut pas enregistrer des tableaux et des objets. 
  // Il sera alors difficile de communiquer entre le code js et le local storage en json,
  // étant donné que basketItems est = {CLE : VALEUR} ,la valeur elle-meme contient un dictionnaire {Cle : valeur}
  // CLE = product._id : VALEUR = {productId:...correspondant à product._id, productName:..., productPrice: ..., ....}
  // S'assurer que le local storage est toujours en ligne avec le basketItems JS.
  // JSON.parse() permet de désérialiser (passer de json à js)
  // JSON.stringify() transforme en chaîne de caractères JSON l'objet transmis en paramètre.

  // -------------------------------------------------------------------------------------------
  /// GETTER et SETTER functions:
  /// getter function: The get syntax binds an object property to a function that will be called when that property is looked up.
  /// Par exemple ici quand la propriété basketItems est observée la getter fonction sera automatiquement appellée.
  /// Appellée lorsqu'on voit quelque chose comme: ...... = this.basketItems
  /// get basketItems() {
  ///   return JSON.parse(localStorage.getItem('basketItems') || '{}')
  /// }

  /// setter function: The set syntax binds an object property to a function to be called when there is an attempt to set that property.
  /// Par exemple ici quand la propriété basketItems est initialisée/changée la setter fonction sera automatiquement appellée.
  /// Appellée lorsqu'on voit quelque chose comme: this.basketItems = ......
  /// set basketItems(basketItems) {
  ///   localStorage.setItem('basketItems', JSON.stringify(basketItems))
  /// }

  // -------------------------------------------------------------------------------------------
  /// EXPLICATION !!:
  /// !! permet de caster en booléen. Par exemple ici:
  /// - si product est dans basketItems alors basketItems[product] va nous renvoyer une valeur valide.
  /// l'application de !! va caster cette valeur valide en true.
  /// - autrement, basketItems[product] = undefined et donc l'application de !! va caster la valeur en false.
  /// let basketItems = this.basketItems

  // -------------------------------------------------------------------------------------------
  /// GETTER et SETTER functions:
  /// Autre syntaxe pour la création du dictonnaire basketItemDetails
  /// let basketItemDetails = {}
  /// basketItemDetails["productId"] = product._id
  /// basketItemDetails["productName"] = product.name
  /// basketItemDetails["productPrice"] = product.name
  /// basketItemDetails["productColor"] = selectedColor
  /// basketItemDetails["productQuantity"] = 1
