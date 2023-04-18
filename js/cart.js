const cart = [];

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

//altTxt: "Photo d'un canapé rouge, deux places"
//color: "Red"
//id: "034707184e8e4eefb46400b5a3774b5f"
//imageUrl: "http://localhost:3000/images/kanap07.jpeg"
//price: 1999
//quantity: 1

function retrieveItemsFromCache() {
   const numberOfItems = localStorage.length 
   for(let i = 0;i <= numberOfItems;i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject )
    }
}

function displayItem(item) {
    const article = makeArticle(item)
    const image = makeImage(item)
}

function makeImage(item) {
  const image = document.createElement('img')
  image.src = item.imageURL
  image.alt = item.altTxt
  return image
}
