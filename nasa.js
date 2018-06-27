// requires http-server to run

const baseURL = 'https://images-api.nasa.gov/search'
let url;

const searchTerm = document.querySelector('.search')
const searchForm = document.querySelector('form')
const submitBtn = document.querySelector('.submit')
const nav = document.querySelector('nav')

const section = document.querySelector('section')
const modalImg = document.getElementById('modalPicture')
const modalLabel = document.getElementById('modalLabel')
const modalDescription = document.getElementById('modalDescription')

searchForm.addEventListener('submit', fetchResults)

function fetchResults(e){
    e.preventDefault();
    url = baseURL + '?q=' + searchTerm.value
    console.log('URL: ', url)


fetch(url).then(function(result){
    return result.json()
}).then(function(json){
    displayResults(json)
})
}

function displayResults(json){
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }

    let pictures = json.collection.items
    console.log('Picture: ', pictures)

    if(pictures.length === 0) {
        let para = document.createElement('p')
        para.textContent = 'No results returned.'
        section.appendChild(para)
    } else {
         for(let i = 0; i < pictures.length; i++) {
            let current = pictures[i]
            if (current.links[0].render == "image"){
                let img = document.createElement('img')
                img.src = current.links[0].href
                img.setAttribute('class', 'image')
                img.setAttribute('data-toggle', 'modal')
                img.setAttribute('data-target', '#modal')
                section.appendChild(img)
                img.onclick = function(){
                    modalImg.src = this.src
                    modalLabel.textContent = current.data[0].title
                    modalDescription.innerHTML = current.data[0].description
                }
            }   
        }
    }
}