
let frm = document.querySelector('form')
let search = document.getElementById('search')
let error = document.getElementById('error')
let success = document.getElementById('success')

// success.innerHTML = 'Loading...'

frm.addEventListener('submit', (e) => {
    success.innerHTML = ''
    error.innerHTML = ''
    success.innerHTML = 'Loading...'
    e.preventDefault()
    let location = search.value
    // http://localhost:3000
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if (data.error) {
                success.innerHTML = ''
                error.innerHTML = data.error
                console.log(data.error)
            } else {
                error.innerHTML = ''
                success.innerHTML = data.location
                console.log(data.location)
            }
        })
    })
})