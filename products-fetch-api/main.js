$(function() {
    fetchData()
})

function fetchData() {
    fetch(`https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json`)
    .then(response => {
        if (!response.ok) {
            return Promise.reject(new Error(`Response status: ${response.status}`))
        }
        return response.json()
    })
    .then(data => handleResults(data))
    .catch(error => console.log(error.message))
}

function handleResults(products) {
    if (!products) {
        return
    }

    buildProducts(products)
}

function buildProducts(products) {
    const transformedProducts = products.map(({ name: proName, price, type }) => {
        return  `<strong>Name: </strong>${proName}<br>
                 <strong>Price: </strong>${price}<br>
                 <strong>Type: </strong>${type}<br>
                 <hr>`
        
    }) 

    const productsHTML = transformedProducts.join('')
    $('#productsList').html(productsHTML)
}