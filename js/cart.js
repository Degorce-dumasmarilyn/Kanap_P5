const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem (item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))
//parse fabrique un objet//
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length 
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}
//affiche le total du prix du panier//
function displayTotalPrice(item) {
  const totalQuantity = document.querySelector("#totalQuantity")
  totalQuantity.textContent = item.quantity
}
//toutes les fonctions dans le item//
function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cartItemContent = makeCartContent(item)
  article.appendChild(cartItemContent)
  displayArticle(article)
  displayTotalQuantity(item)
  displayTotalPrice()
}
//recalcul//
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
//recalcul//
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}

function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
  
}  

function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
  addQuatityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}
//bouton supprime//
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}

function deleteItem(item){
  const itemToDelete = cart.findIndex(
  (product) => product.id === item.id && product.color === item.color)
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}

function deleteArticleFromPage(item){
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`)
  articleToDelete.remove()
}

function addQuatityToSettings(settings, item) {saveNewDataToCache
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent ="Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity

  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
  

  quantity.appendChild(input)
  settings.appendChild(quantity)
}
//sauvegarde du panier//
function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}
function deleteDataFromCache(item){
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("div")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + "€"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
  
}
//Cette fonction sert à afficher un article dans la page web en ajoutant l'élément HTML 'article'
// à l'élément ayant comme identifiant "cart__items".
// Cela peut être utile pour afficher les articles ajoutés au panier//
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}
// fariquation de l article//
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}
//Cette fonction sert à créer et retourner un élément div contenant une image//
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}
//sert a effectué une requête POST vers l'URL 
//avec un corps de requête JSON qui est renvoyé par la fonction makeRequestBody//
function submitForm(e){
  e.preventDefault()
  if (cart.length === 0) { 
    alert("Please select items to buy")
    return
  }

  if (isFormInvalid()) return
  if (isEmailInvalid()) return
  
  const body = makeRequestBody()
  //URL//
  fetch("http://localhost:3000/api/products/order", {
    method:"POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.json())
  .then((data) => { 
    const orderId = data.orderId
    window.location.href = "/html/confirmation.html" + "?orderId=" + orderId
   
  })
  .catch((err) => console.error(err))
}
//sert:si mail mal rempli message erreur s'affiche//
function isEmailInvalid(){
  const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
  if (regex.test(email) === false) {
    alert("Please enter valid email")
    return true
  }
  return false
}
// sert :si formulaire mal rempli avoir un message erreur s'affiche//
function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields")
      return true
    }
    return false
  })
}
//sert à créer et retourner un objet body qui contient les informations d'un formulaire de commande//
// ainsi que les ids des produits présent dans le cache de l application.//
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.firstName.value
  const address = form.elements.firstName.value
  const city = form.elements.firstName.value
  const email = form.elements.firstName.value
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCache()
  }
  console.log(body)
  return body
}
//sert à récupérer les identifiants des produits stockés dans le localStorage//
function getIdsFromCache(){
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++){
    const key = localStorage.key(i)
    console.log(key)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}
  
  
  
 
