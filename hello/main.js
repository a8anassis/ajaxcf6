$(function() {
    $('#btn').on('click', function() {
        fetchData()
    })
})

function fetchData() {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', './hello.txt', true)

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResults(xhr.responseText)
            }
            else {
                showError()
            }
        }
    }

    xhr.send()
}

