// alright lets just create our own wordlist:
// 1. mountain
// 2. fish
// 3. bench
// 4. iceberg
// 5. game
// 6. ragnarok
// 7. tree
// 8. recorder
// 9. treadmill
// 10. plane
// 11. sky
// 12. star
// 13. tank
// 14. kitten
// 15. ukelele
// 16. ray
// 17. blanket
// 18. mansion
// 19. glove
// 20. flag
// 21. armadillo
// 22. locomotive
// 23. spider
// 24. chess
// 25. thermometer

const secretWordList = [
    'mountain',
    'fish',
    'bench',
    'iceberg',
    'game',
    'ragnarok',
    'tree',
    'recorder',
    'treadmill',
    'plane',
    'sky',
    'star',
    'tank',
    'kitten',
    'ukelele',
    'ray',
    'blanket',
    'mansion',
    'glove',
    'flag',
    'armadillo',
    'locomotive',
    'spider',
    'chess',
    'thermometer'
]

const hintImagesUrls = []

let secretWord;

let guessesMade = 0;

const guessButton = document.getElementById('guess-button')

const imageFading = [
    {opacity: 1},
    {opacity: 0},
    {opacity: 1}
]

const imageFadingTiming = {
    duration: 4000,
    iterations: 1
}

document.getElementById('play-icon').addEventListener('click',event => {
    document.getElementById('play-icon').style.WebkitAnimationPlayState = "running";
    setTimeout(() => {
        document.getElementById('home-page').style.WebkitAnimationPlayState = "running"
    },1000)
    setTimeout(() => {
        document.getElementById('home-page').style.display = "none"
    },2000)
    setTimeout(() => {
        document.getElementById('play-page').style.display = "block"
    },2500)
    setTimeout(() => {
        document.getElementById('image-1').animate(imageFading, imageFadingTiming)
    },4000)
    setTimeout(() => {
        document.getElementById('image-1').src = hintImagesUrls[0]
    },6000)
})

const chooseImages = (dataJSON) => {
    for(let i=hintImagesUrls.length;hintImagesUrls.length<6;i++) { // only 6 images given
        if(dataJSON.data.children[i].data.url.slice(-3) === 'jpg') {
            if(dataJSON.data.children[i].data.is_reddit_media_domain === true
            && hintImagesUrls.find(element => element === dataJSON.data.children[i].data.url) === undefined) {
                hintImagesUrls.push(dataJSON.data.children[i].data.url)
                console.log(i+":"+dataJSON.data.children[i].data.url)
            }
        }
    }
}

document.addEventListener('DOMContentLoaded',() => {
    console.log('DOM Loaded')
    const randomWordIndex = Math.floor(Math.random() * (secretWordList.length-1))
    secretWord = secretWordList[randomWordIndex]
    console.log('Random word selected: '+secretWord)
    
    fetch(`https://www.reddit.com/r/pics/search.json?q=${secretWord}+nsfw:no&limit=100`) 
        .then((responseData)=> responseData.json())
        .then((jsonData)=>{
            console.log(jsonData) 
            chooseImages(jsonData)
        })
        .catch((jsonData) => {
            console.log('ERROR')
        })
})

guessButton.addEventListener('click', (event) => {
    if(document.getElementById('guess-text').value !== '') {
        event.preventDefault()
    }
    const guessText = document.getElementById('guess-text')
    console.log(`Event input`)
    console.log(guessText.value)
    if(guessText.value.toLowerCase() === secretWord) {
        console.log('winner')
    }
})

