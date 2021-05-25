// -------------------------------------------------------------------------------------------
/// Code à exécuter lors du chargement de la page.
/// L'écriture ci-dessous est la syntaxe usuelle pour définir et appeler une fonction fléchée en même temps:
/// ( keyword (params) => instructions )( args ) - le keyword peut être vide ou async par exemple.
/// Cette syntaxe évite de faire un appel et une définition séparés d'une fonction main().
(async () => {
  const productId = getProductId()
  const product = await getProductFromServer(productId)
  displayProduct(product)
  displayColorChoices(product)

  document.getElementById('add-to-basket').onclick = (event) => {
    event.preventDefault()
    basket.addBasketItem(product)
  }

  document.getElementById('test-update').onclick = (event) => {
    event.preventDefault()
    basket.updateBasketItemQuantity(product, 100)
  }

  document.getElementById('test-remove').onclick = (event) => {
    event.preventDefault()
    basket.removeBasketItem(product)
  }
})()

// -------------------------------------------------------------------------------------------
/// Récupérer et retourner l'id du produit à partir de l'URL.
function getProductId() {
  let str = window.location.href
  let url = new URL(str)
  return url.searchParams.get("id")
}

// -------------------------------------------------------------------------------------------
/// 1. On veut envoyer une requête à l'API pour qu'elle nous retourne des données du produit.
/// Données retournées = httpResponseBody 
/// 2. Pour lire la httpResponseBody on appelle la méthode json()
/// Données retournées = Une promesse qui s'auto-résout en renvoyant le corps/body de la requête parsée au format JSON.
/// 3. Si une erreur est rencontrée, elle est utilisée pour renvoyer un message d'erreur à l'utilisateur.
async function getProductFromServer(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(httpResponseBody => httpResponseBody.json())
      .catch(error => alert(error.message + ": La connexion au serveur n'a pas pu être effectué."))
}

// -------------------------------------------------------------------------------------------
/// Afficher un seul produit.
function displayProduct(product) {
  // 1. Récupérer l'élément template qui est invisible lors du chargement de la page.
  const templateElement = document.getElementById("template-selection")

  // 2. Clôner le template.
  let cloneElement = document.importNode(templateElement.content, true)

  // 3. Remplir le clône avec les informations du product.
  cloneElement.getElementById("selection-name").textContent = product.name
  cloneElement.getElementById("selection-image").src = product.imageUrl
  cloneElement.getElementById("selection-price").innerHTML = product.price / 100 + `.00 €`
  cloneElement.getElementById("selection-description").textContent = product.description
  
  // 4. Ajouter le clône dans le DOM à l'endroit approprié, à savoir le parent contenant le child template.
  document.getElementById("row").appendChild(cloneElement)
}

// -------------------------------------------------------------------------------------------
/// Afficher les choix de couleurs disponibles.
function displayColorChoices(product) {
  const colors = product.colors;
  for (i = 0; i < colors.length; i++) {
    displayColorChoice(colors[i])
  }
}

// -------------------------------------------------------------------------------------------
/// Afficher un choix de couleur.
function displayColorChoice(color) {
  // 1. Récupérer l'élément template qui est invisible lors du chargement de la page.
  const templateElementForm = document.getElementById("template-color-customization")

  // 2. Clôner le template.
  let cloneElementForm = document.importNode(templateElementForm.content, true)

  // 3. Remplir le clône avec les informations du product.
  cloneElementForm.getElementById("label-option").textContent = color
  cloneElementForm.getElementById("label-option").setAttribute("value", color)

  // 4. Ajouter le clône dans le DOM à l'endroit approprié, à savoir le parent contenant le child template.
  document.getElementById("color").appendChild(cloneElementForm)
}

  // -------------------------------------------------------------------------------------------
  /// EXPLICATIONS SUPPLEMENTAIRES / SYNTAXES COMPLEMENTAIRES

  // -------------------------------------------------------------------------------------------
  // const element = document.getElementById('add-to-basket')
  // element.addEventListener('click', function(event){
  //   event.preventDefault()
  //   basket.addBasketItem(product)
  // })
  // Add event listeners on button

  // -------------------------------------------------------------------------------------------
  // const form = document.createElement('form');
  // document.getElementById("selection-customization").appendChild(form);

  // const formBlocP = document.createElement('p');
  // //formP.class ='colors-choice';
  // form.appendChild(formBlocP);

  // const label = document.createElement('label');
  // formBlocP.appendChild(label);
  // label.setAttribute('for', "color");
  // label.innerHTML ="Personnalisez votre ourson : " + `<br/> <br/>`;

  // const select = document.createElement('select');
  // formBlocP.appendChild(select);
  // select.setAttribute('name', "color");
  // select.setAttribute('id',"color");

  // const colors = product.colors;
  // for (i = 0; i < colors.length; i++) {
  //   const option = document.createElement('option');
  //   select.appendChild(option);
  //   option.setAttribute('value', "product-colors");
  //   option.textContent = colors[i];
  // }

  // document.getElementById("row").appendChild(cloneElementForm)