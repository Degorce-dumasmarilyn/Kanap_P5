const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


//recupere le numero de commande//
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}
 //vide le panier lorsque la commande est validé// 
function removeAllCache() {
    const cache = window.localStorage
    cache.clear()
}





