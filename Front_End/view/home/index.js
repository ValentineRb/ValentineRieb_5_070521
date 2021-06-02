// -------------------------------------------------------------------------------------------
/// Function called when the page is loaded.
(async () => {
  const products = await getProductsFromServer()
  displayProducts(products)
  // console.log(products)
})()

// -------------------------------------------------------------------------------------------------
/// Get data from the API
async function getProductsFromServer() {
  const url = "http://localhost:3000/api/teddies"
  return fetch(url)
  .then(res => res.json())
    .then(data => data)
      .catch(error => alert(error.message + ": La connexion au serveur n'a pas pu être effectué."))
}

// -------------------------------------------------------------------------------------------------
/// Loop over all products and display them.
function displayProducts(products) {
  for (const product of products) {
    displayProduct(product)
  }
  // for (let index = 0; index < products.length; index++) {
  //   displayProduct(products[index])
  // }

  // products.forEach(product => {
  //   displayProduct(product)
  // });

  // products.forEach(function(product){
  //   displayProduct(product)
  // });

  // for (const key in products) {
  //   if (Object.hasOwnProperty.call(products, key)) {
  //     displayProduct(products[key])
  //   }
  // }
}

// -------------------------------------------------------------------------------------------------
/// Display a single product via cloning a template, populating and appending the clone to the HTML code.
function displayProduct(product) {
  // 1. Access to the template.
  const templateElt = document.getElementById('template-card')
  // 2. Clone the template.
  let templateEltClone = document.importNode(templateElt.content, true)
  // 3. Populate the template.
  templateEltClone.getElementById('card-title').textContent = product.name
  templateEltClone.getElementById('card-image').src = product.imageUrl
  templateEltClone.getElementById('card-footer-text').textContent = product.price / 100 + `.00 €`
  // 4. Customize the product.html URL attached to the current card such that it contains the product ID:
  // "/Front_End/view/product/product.html?id=5be9c8541c9d440000665243"
  templateEltClone.getElementById("card-link").href = `/Front_End/view/product/product.html?id=${product._id}`
  // 5. Push the template in HTML code.
  document.getElementById('row').appendChild(templateEltClone)
}
