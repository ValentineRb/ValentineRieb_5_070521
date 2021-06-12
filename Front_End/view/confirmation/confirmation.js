// -------------------------------------------------------------------------------------------
/// Function called when the page is loaded.
(async () => {
  let orderId = getOrderIdFromUrl()
  console.log(orderId)
  displayOrderId(orderId)
  displayTotalPrice()
})()

// -------------------------------------------------------------------------------------------
/// Extarct the orderId from the URL.
function getOrderIdFromUrl() {
  // 1. Store URL of the current page.
  let currentPage = window.location.href
  // 2. Create new object URL.
  let newURL = new URL(currentPage)
  // 3. Use URL property searchParams and method get() to get the search parameter after "?"id"=....".
  return newURL.searchParams.get("orderId")
}

// -------------------------------------------------------------------------------------------------
/// Display orderId.
function displayOrderId(orderId) {
  document.getElementById('order-number').textContent = orderId
}

// -------------------------------------------------------------------------------------------------
/// Display totalPrice.
function displayTotalPrice() {
  const totalPrice = sessionStorage.getItem('totalPrice')
  document.getElementById('order-price').textContent = totalPrice + `.00 €`
}
