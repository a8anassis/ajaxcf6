$(function() {

    fetchData()
})

function fetchData() {
    let ajaxRequest = new XMLHttpRequest()

    ajaxRequest.open('GET', `https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json`, true)
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState === 4) {
            if (ajaxRequest.status === 200) {
                handleResults(JSON.parse(ajaxRequest.responseText))
            } else {
                onAPIError()
            }
        }
    }
    ajaxRequest.send()
}

function handleResults(results) {
    if (!results) return

    buildProducts(results)
}

function buildProducts(products) {
    let row = ''
    for (const product of products) {
        const { name, price, type} = product
        row = `<strong>Name:</strong>${name}<br>
                <strong>Price:</strong>${price}<br>
                <strong>Type:</strong>${type}<br>
                <hr>`
        $('#prodList').append(row)
    }
}

function onAPIError() {
    console.log('API Error')
}