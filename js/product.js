//recuperation du id//
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
//recupere le prix depuis api et le colle dans la variable//
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}
//renvoie une requête server//
fetch (`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then(res => handleData(res))
//La fonction handleData extrait ensuite les informations nécessaires du produit reçu en tant que paramètre et 
//utilise ces informations pour créer des éléments HTML pour afficher les détails du produit//
function handleData(kanap) {
    const { altTxt, colors, description, imageUrl, name, price } = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeCartContent(description)
    makeColors(colors)
    
}
//fonction cherche un élément DOM spécifique avec la classe "item__img" et//
// y ajoute l'image à l'aide de la méthode appendChild()//
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}
//description du nom du kanap//
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}
//affichage du prix du kanap//
function makePrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}
//affichage de la description du kanap//
function makeCartContent(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
} 
//sélections de la colors du kanap//
function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }    
}               
  //fonction sert à ajouter un événement de click sur un élément HTML identifier par son ID //
const button = document.querySelector("#addToCart")
if (button != null)
    button.addEventListener("click", handleClick)     
    
// gére le processus de commande  en récupérant  les informations entrées par l utilisateur//
// verifie valide puis sauvegardeet renvoie au panier//
function handleClick () {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value

    if (isOrderInvalid(color, quantity)) return
    saveOrder(color, quantity)
    redirectToCart()
}

    //sauvegarde dans localstorage//
function saveOrder(color, quantity) {
    const key = `${id}-${color}`
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName 
    } 
    //modifie les données exsistantes en ajoutant la nouvelle quantity exsistante//
    //vérifier si la clé existe déjà dans le localStorage//
    const storedData = JSON.parse(localStorage.getItem(key))
    if(storedData){
        //modifier les donnéés existantes//
        storedData.quantity += Number(quantity)
        //ajouter de nouvelles données//
        localStorage.setItem(key, JSON.stringify(storedData))
    }
    else{localStorage.setItem(key, JSON.stringify(data))
    }
}
    

// si c'est mal rempli message d erreur//
function isOrderInvalid(color, quantity) {
    if(color == null || color === "" || quantity == null  || quantity === 0){
        alert("Please select a color and quantity")
        return true
    }
} 

//redirige vers le panier//
function redirectToCart() {
    window.location.href = "cart.html"
}    

            
 


   

   
   















    
























