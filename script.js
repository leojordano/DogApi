window.addEventListener('load', () => {
    OnInit()
    callBreeds()
})

const img = document.querySelector('#img')

var setedDog = window.localStorage.getItem('breed')
var color
var font
var name
var dogImg 

function OnInit() {
    const store = window.localStorage

    if(store.getItem('name')) {
        document.querySelector('.form-control').value = store.getItem('name')
        setAnimalName(store.getItem('name'))
    }

    if(store.getItem('fontColor')) {
        const el = document.querySelector('.colorFont')
        const arr = [...el.options]
        arr.map(item => {
            if(item.value == store.getItem('fontColor')) {
                return item.selected = true
            }
            return
        })
        
        setColor(store.getItem('fontColor'))
    }

    if(store.getItem('font')) {
        const el = document.querySelector('.font')
        const arr = [...el.options]
        arr.map(item => {
            if(item.value == store.getItem('font')) {
                return item.selected = true
            }
            return
        })
        setFont(store.getItem('font'))
    }

    if(store.getItem('img')) {
        document.querySelector('#img').src = store.getItem('img')
        dogImg = store.getItem('img')
    } else {
        callRandomImage()
    }
}

async function callBreeds() {
    const select = document.querySelectorAll('.selectDog')
    await fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(res => {
            for(breed in res.message) {
                const el = document.createElement('option')
                let text = document.createTextNode(breed)
                el.appendChild(text)
                el.value = breed
                select[0].appendChild(el)
            }

            imgDogValue = document.querySelector('.breed')
            
            select[0].children[0].disabled = true
            select[1].children[0].disabled = true
            select[2].children[0].disabled = true
        }).finally(() => {
            let store = window.localStorage
            if(store.getItem('breed')) {
                        const el = document.querySelector('.breed')
                        const arr = [...el.options]
                        arr.map(item => {
                            if(item.value == store.getItem('breed')) {
                                return item.selected = true
                            }
                            return
                        })
                } 
        })
}

async function callRandomImage() {
    let store = window.localStorage.getItem('breed') 
    if(store) {
        await fetch(`https://dog.ceo/api/breed/${store}/images/random`)
        .then(res => res.json())
        .then(data => {
            dogImg = data.message
            img.src = data.message
        })
    } else {
        await fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(data => {
                dogImg = data.message
                img.src = data.message
            })
    }
}

async function anotherImg() {
    if(setedDog) {
        await fetch(`https://dog.ceo/api/breed/${setedDog}/images/random`)
        .then(res => res.json())
        .then(data => {
            dogImg = data.message
            return img.src = data.message
        })
    } else {
        callRandomImage()
    }
}

async function setBreedImage(breed) {
    await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(res => res.json())
    .then(data => {
        setedDog = breed
        dogImg = data.message
        const setedImg = data.message
        return img.src = setedImg
    })
}

function setColor(value) {
    color = value
    document.querySelector('.animalName').style.color = value
}

function setFont(value) {
    font = value
    document.querySelector('.animalName').style.fontFamily = `${value}`
}

function setAnimalName(value) {
    name = value
    document.querySelector('.animalName').innerText = value
}

function saveDogData() {
    console.log(setedDog, color, font, name, dogImg)
    window.localStorage.setItem('breed', setedDog)
    window.localStorage.setItem('fontColor', color)
    window.localStorage.setItem('font', font)
    window.localStorage.setItem('name', name)
    window.localStorage.setItem('img', dogImg)

    const date = new Date()
    const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    window.localStorage.setItem('date', now)
}

function deleteDogData() {
    window.localStorage.removeItem('breed')
    window.localStorage.removeItem('fontColor')
    window.localStorage.removeItem('font')
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('img')
}

function reload() {
    return location.reload()
}





