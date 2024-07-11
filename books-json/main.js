$(function() {
    fetchBooks()
})

function fetchBooks() {
    onBeforeSend()
    let xhr = new XMLHttpRequest()
    xhr.open('GET', './data.json', true)

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            //     console.log(JSON.parse(xhr.responseText))
                handleResults(JSON.parse(xhr.responseText))
            } else {
                onAPIError()
            }
        }    
    }
    
    xhr.send()
}
    
function onBeforeSend() {
    hideError()
}

function handleResults(response) {
    if (!response) {
        showError()
    }

    let books = response.books
    buildBooks(books)
}

function buildBooks(books) {
    let output = `<tr><th>Title</th><th>Author</th></tr>`

    for (const book of books) {
        let title = book.title
        let author = book.author
        console.log(title)


        output += `<tr><td>${title}</td><td>${author}</td></tr>`
    }

    $('#booksList').html(output)
}

function onAPIError() {
    console.log('Error in API')
}

function showError() {
    $('.error.hidden').clone().removeClass('hidden').appendTo($('.container'))
}

function hideError() {
    $('.container').find('.error').remove()
}