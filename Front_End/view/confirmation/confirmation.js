/**
 * Gère l'affichage et les interactions de la page de contact
 */

// utilisation de l'API validation. Ca va utiliser les attributs qui se trouvent dans notre formulaire ou dans les champs du formulaire 
//et vérifier que ces attributs de validation sont corrects.
// les attributs de validation: il y en a bcp qui existent : minlenght - maxlenght - required - pattern - ....

// On récupére le formulaire: 
// On récupère le boutton 
document.querySelector('.form input[type="button"]').addEventListener("click",function(){
  // on veut savoir si l'intégralité des champs sont valides ou pas: 
  var valid = true;
//quand l'évènement se déclanche on veut parcourir tous les inputs: donc on utilise une boucle: 
  for(let input of document.querySelectorAll(".form input,.form textarea")) {
    //Pour chaque element on va vérifier si l'élément est valide  avec la fonction:
    valid = valid && input.reportValidity();
    // si jamais si il y a un champ pas valide a un moment alors on arrete de tester les suivants
    if(!valid){
      break;
    }
    //input.checkValidity(); // méthode de l'API validation qui va vérifier si les contraintes sont respectées
    // autre fonction qui existe reportValidity() , elle faire la meme chose mais en plus elle afriche des messages sur le navigateur pour dire 
    //"attention ce champ n'est pas correct"
    // il y aussi setCustomValidity() et ds les () on passe un message ("blablabla")A faire avant le reportValidity()
  }
  // si le formulaire est tjrs valide aprés le passage de la boucle de tous les champs le valid est tjrs à true: donc le formulaire est valide
  // on peut donc afficher un message :
  if(valid){
    alert("Votre message a bien été envoyé");
  }
});