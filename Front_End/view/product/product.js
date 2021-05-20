// -------------------------------------------------------------------------------------------
/// Code à exécuter lors du chargement de la page.
/// L'écriture ci-dessous est la syntaxe usuelle pour définir et appeler une fonction fléchée en même temps:
/// ( keyword (params) => instructions )( args ) - le keyword peut être vide ou async par exemple.
/// Cette syntaxe évite de faire un appel et une définition séparés d'une fonction main().
(async () => {
  const productId = getProductId()
  const product = await getProductFromServer(productId)
  displayProduct(product)
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
  // Placeholder Code
}