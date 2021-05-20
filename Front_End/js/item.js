/**
 * Représentation du format d'un item: un objet item avec ses propriétés json
 */

// class Item {
//   constructor (jsonItem) {
//     jsonItem && Object.assign(this, jsonItem);
//   }
// }

class Item {
  constructor (jsonItem) {
    this.colors = jsonItem.colors;
    this.name = jsonItem.name;
    this.id = jsonItem._id;
    this.price = jsonItem.price;
    this.imageUrl = jsonItem.imageUrl;
    this.description = jsonItem.description;
  }
}


































// // Main function, auto called at load time
// ;(async () => {
//   const products = await getProducts()
//   hydratePage(products)
// })()

// async function getProducts() {
//   return fetch("http://localhost:3000/api/teddies")
//     .then((httpBodyResponse) => httpBodyResponse.json())
//     .then((products) => products)
//     .catch((error) => {
//       alert(
//         "La connexion au serveur n'a pas pu être effectué. Cela est certainement lié à l'endormissement du serveur Heroku, veuillez attendre quelques secondes le temps qu'il sorte de son lit puis réesayez"
//       )
//     })
// }

// function hydratePage(products) {
//   // Remove loading boxes
//   document.getElementById('product-type').innerHTML = products[0].name
// }

