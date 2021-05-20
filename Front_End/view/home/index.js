/* Gère l'affichage et les interactions de la page d'accueil
 ** Récupération des données avec fetch(), appel du serveur.
 ** Transformation des données en json
 ** Pour vérifier si l'Api fonctionne bien : console.log(jsonListItem)
 ** Une fois les items récupérés on doit les afficher: avec une boucle for of:
 ** 1.Pour chaque Item on va créer un objet Item en lui passant le json.
 ** 2.On veut que ça s'affiche dans le container HTML après le H1: on inclue des variables interpolées:
 ** name + price + image (on les retrouve ds l'Api)
 */

fetch("http://localhost:3000/api/teddies")
  .then((data) => data.json())
  .then((jsonListItem) => {
    // fetch("http://localhost:3000/api/teddies").then(function(data){
    //  return data.json();
    // }).then(function(jsonListItem){
    //   console.log(jsonListItem);
    // })
    for (let jsonItem of jsonListItem) {
      let item = new Item(jsonItem);
      document.querySelector(".row").innerHTML += 
      `<div class="col">
        <a class="card-link" href="#">
            <div class="card h-100">
              <div class="card-header">
                <h5 class="card-title text-center">${item.name}</h5>
              </div>
              <img src="${item.imageUrl}" class="card-img-top h-100" alt="oursons">
              <div class="card-footer text-center">
                <p>${item.price} €</p>
              </div>
            </div>
          </a>
        </div>`;
    }
  });

/** ScrollToTop Button **/

let scrollToTopBtn = document.querySelector(".scrollToTopBtn");
let rootElement = document.documentElement;

function handleScroll() {
  // Do something on scroll
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.7) {
    // Show button
    scrollToTopBtn.classList.add("showBtn");
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);