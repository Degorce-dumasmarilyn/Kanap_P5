
//fonction addProducts reçoit les données en format JSON sous forme de paramètre//
// et boucle à travers chaque objet dans la liste de données.//

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
 
 function addProducts(data) {
  
  data.forEach((kanap) => {
  
  const {_id, imageUrl, altTxt, name, description} = kanap
  const anchor = makeAnchor(_id)
  const article = document.createElement("article")
  const image = makeImage(imageUrl, altTxt)
  const h3 = makeH3(name)
  const p = makeParagraph(description)

  appendElementsToArticle(article, image, h3, p)
  appendArticleToAnchor(anchor, article)
 }) 
} 
// rajout des éléments à l article//
function appendElementsToArticle(article, image, h3, p) {
  article.appendChild(image)
  article.appendChild(h3)
  article.appendChild(p)
}

//La fonction "makeAnchor(id)" crée un lien HTML ("a") et lui attribue un attribut "href" qui est//
// l'URL de la page "product.html" avec un paramètre "id" que nous lui passons en argument. //
//La fonction renvoie ensuite ce lien HTML créé.//
function makeAnchor(id) {
  const anchor = document.createElement("a")
  anchor.href = "./product.html?id=" + id
  return anchor
}
//fonction prend en entrée deux paramètres : un élément ancre (anchor) et un élément article (article).//
// La fonction recherche ensuite un élément dans le document avec l'ID "items" et vérifie s'il existe.//

function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector("#items")
  if (items != null) {
    items.appendChild(anchor)
    anchor.appendChild(article)
  }
}
//La fonction makeImage() sert à créer un élément img en HTML, avec une source d'image (imageUrl) et un texte alternatif (altTxt).
// Cette fonction supprime également les attributs title et style de l'image et renvoie l'élément créé //
 function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  image.removeAttribute("title")
  image.removeAttribute("style")
  return image
} 
 // fonction sert à créer un élément HTML "h3" en y ajoutant du texte et une classe CSS avec la méthode ".classList.add"//
function makeH3(name) {
  const h3 = document.createElement("h3")
  h3.textContent = name 
  h3.classList.add("productName")
  return h3
}
//Cette fonction permet de créer un élément de paragraphe ("p") dans le document HTML, //
//de lui attribuer le contenu de la variable "description", //
//de lui ajouter une classe "productDescription", et de retourner cet élément créé//
function makeParagraph(description) {
  const p =  document.createElement("p")
  p.textContent = description
  p.classList.add("productDescription")
  return p
}

