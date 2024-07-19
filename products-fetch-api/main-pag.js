let itemsPerPage = 5
let currentPage = 1
let totalPages = 0
let allProducts = []


$(function() {
    fetchData()
    .then(products => {
        allProducts = products
        renderItems(products, currentPage)
        renderPagination(products)
    })
    .catch(error => console.log("Failed to fetch products", error))


    $('#pagination').on('click', 'a', function(e) {
        e.preventDefault()  // prevent default link behavior
        currentPage = $(this).data('page')
        renderItems(allProducts, currentPage)
        renderPagination(allProducts)
    })
})

function renderItems(products, page) {
    $('#prod-list').empty()
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, products.length)

    const productsHTML = products
                                .slice(startIndex, endIndex)
                                .map(product => 
                                    `<div><strong>Name: </strong>${product.name}</div>
                                    <div><strong>Price: </strong>${product.price}</div>
                                    <div><strong>Type: </strong>${product.type}</div><hr>`
                                )
                                .join('');

    $('#prod-list').html(productsHTML)
}

function renderPagination(products) {
    totalPages = Math.ceil(products.length / itemsPerPage)
    $('#pagination').empty()
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : ''
        $('#pagination').append(`<li><a href="#" class="${activeClass}" data-page="${i}">${i}</a></li>`)
    } 
}

function fetchData() {
    // Promosified AJAX call
    return new Promise((resolve, reject) => {
        let ajaxRequest = new XMLHttpRequest()
        ajaxRequest.open('GET', 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', true)
        ajaxRequest.timeout = 5000
        ajaxRequest.ontimeout = () => onApiError()

        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState === 4) {
                if (ajaxRequest.status === 200) {
                    const products = JSON.parse(ajaxRequest.responseText)
                    resolve(products)
                } else {
                    reject(new Error('Failed to load data'))
                }
            }
        }

        ajaxRequest.send()
    })
}

function onApiError() {
    console.log('API Error')
}