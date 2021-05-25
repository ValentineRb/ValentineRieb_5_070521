// -------------------------------------------------------------------------------------------
/// Code à exécuter lors du chargement de la page.
/// L'écriture ci-dessous est la syntaxe usuelle pour définir et appeler une fonction fléchée en même temps:
/// ( keyword (params) => instructions )( args ) - le keyword peut être vide ou async par exemple.
/// Cette syntaxe évite de faire un appel et une définition séparés d'une fonction main().
(async () => {
  const products = await getProductsFromServer()
  displayAllProducts(products)
})()

// -------------------------------------------------------------------------------------------
/// 1. On veut envoyer une requête à l'API pour qu'elle nous retourne des données.
/// Données retournées = httpResponseBody 
/// 2. Pour lire la httpResponseBody on appelle la méthode json()
/// Données retournées = Une promesse qui s'auto-résout en renvoyant le corps/body de la requête parsée au format JSON.
/// 3. Si une erreur est rencontrée, elle est utilisée pour renvoyer un message d'erreur à l'utilisateur.
async function getProductsFromServer() {
  return fetch("http://localhost:3000/api/teddies")
    .then(httpResponseBody => httpResponseBody.json())
      .catch(error => alert(error.message + ": La connexion au serveur n'a pas pu être effectué."))
}

// -------------------------------------------------------------------------------------------
/// Afficher tous les produits en les parcourant un par un.
function displayAllProducts(products) {
  products.forEach(product => displaySingleProduct(product))
}

// -------------------------------------------------------------------------------------------
/// Afficher un seul produit.
function displaySingleProduct(product) {
  // 1. Récupérer l'élément template qui est invisible lors du chargement de la page.
  const templateElement = document.getElementById("template-card")

  // 2. Clôner le template.
  let cloneElement = document.importNode(templateElement.content, true)

  // 3. Remplir le clône avec les informations du product.
  cloneElement.getElementById("card-title").textContent = product.name
  cloneElement.getElementById("card-image").src = product.imageUrl
  cloneElement.getElementById("card-footer-text").innerHTML = product.price / 100 + `.00 €`
  cloneElement.getElementById("card-link").href = `/Front_End/view/product/product.html?id=${product._id}` // URL product personnalisé

  // 4. Ajouter le clône dans le DOM à l'endroit approprié, à savoir le parent contenant le child template.
  document.getElementById("row").appendChild(cloneElement)
}
