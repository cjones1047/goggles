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

let secretWordList = [
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

const previousGuesses = []

let secretWord;

let guessesMade = 0;

const guessButton = document.getElementById('guess-button')


// different animations listed below
const imageFading = {
    animation: [
        {opacity: 1},
        {opacity: 0},
        {opacity: 1}
    ],

    timing: {
        duration: 4000,
        iterations: 1
    }
}

const fadeIn = {
    animation: [
        {opacity: 0},
        {opacity: 1}
    ],

    timing: {
        duration: 1000,
        iterations: 1,
        easing: "ease-in"
    }
}

const fadeOut = {
    animation: [
        {opacity: 1},
        {opacity: 0}
    ],

    timing: {
        duration: 1500,
        iterations: 1,
        easing: "ease-in"
    }
}

const flipHint = {
    animation: [
        {transform: 'rotateX(360deg)'}
    ],

    timing: {
        duration: 500,
        iterations: 1,
        easing: "ease-out"
    }
}

document.getElementById('play-icon').addEventListener('click',event => {  // what happens when 'play' button is clicked
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
        document.getElementById('image-1').animate(imageFading.animation, imageFading.timing)
    },4000)
    setTimeout(() => {
        document.getElementById('image-1').src = hintImagesUrls[0]
    },6000)
})

const chooseImages = (dataJSON) => {
    for(let i=hintImagesUrls.length;hintImagesUrls.length<6;i++) { // only 6 image hints in total chosen for each secret word, filtered by the url ending in 'jpg' and being classified as a 'media domain'
        if(dataJSON.data.children[i].data.url.slice(-3) === 'jpg') {
            if(dataJSON.data.children[i].data.is_reddit_media_domain === true
            && hintImagesUrls.find(element => element === dataJSON.data.children[i].data.url) === undefined) {
                hintImagesUrls.push(dataJSON.data.children[i].data.url)
                console.log(i+":"+dataJSON.data.children[i].data.url)
            }
        }
    }
}

document.addEventListener('DOMContentLoaded',() => { // pulls image hint data while randomly selecting word on initial load screen, so pulling JSON data doesn't slow down gameplay
    document.getElementById('home-page').animate(fadeIn.animation, fadeIn.timing)
    if(sessionStorage.getItem('updatedWordList') !== null) {
        console.log('Updated word list: ')
        const newSecretWordList = JSON.parse(sessionStorage.getItem('updatedWordList'))
        secretWordList = newSecretWordList
        console.log(newSecretWordList)
    }
    console.log('DOM Loaded')
    function validateWordResponse () {
        const randomWordIndex = Math.floor(Math.random() * (secretWordList.length-1))
        secretWord = secretWordList[randomWordIndex]
        console.log('Random word selected: '+secretWord)
        
        fetch(`https://www.reddit.com/r/pics/search.json?q=${secretWord}+nsfw:no&limit=100`) 
            .then((responseData)=> responseData.json())
            .then((jsonData)=>{
                console.log(jsonData) 
                chooseImages(jsonData)
            })
            .catch((err) => {
                console.log('ERROR: Reselecting secret word...')
                validateWordResponse()
            })
    }
    validateWordResponse()
    
})

guessButton.addEventListener('click', (event) => {
    if(document.getElementById('guess-text').value !== '') {
        event.preventDefault()
        document.getElementById('guess-text').style.WebkitAnimationPlayState = "running";
    } else {return}
    guessesMade++
    let userGuess = document.getElementById('guess-text').value
    console.log(`Event input:`)
    console.log(userGuess)
    if(userGuess.toLowerCase() === secretWord) { // if user's guess is correct
        console.log('winner')
        disableUserInput()
        console.log('disableUserInput function ran')
        console.log('Guesses made: '+guessesMade)
        document.getElementById('win-text-row').innerText = `You win! ${secretWordList.length-1} left!`
        setTimeout(() => {
            document.getElementById('play-page').animate(fadeOut.animation,fadeOut.timing)
        }, 750)
        setTimeout(() => {
            document.getElementById('play-page').style.display = 'none'
        }, 2200)
        setTimeout(() => {
            document.getElementById('win-page').style.display = 'flex'
            return
        }, 2400)

    } else {   // if user's guess is wrong
        console.log('Guesses made: '+guessesMade)
        document.getElementById('guess-text').value = null
        if(guessesMade === 3) {
            const anotherHint = `${secretWord.slice(0,1)}${'*'.repeat(secretWord.length-1)}`
            document.getElementById('guess-text').placeholder = `Another hint: ${anotherHint}`;
        }
        if(guessesMade > 0) {
            previousGuesses.push(` ${userGuess}`)
            document.getElementById('guess-label').animate(flipHint.animation,flipHint.timing)
            setTimeout(() => {
                document.getElementById('guess-label').innerText = `Previous guesses: ${previousGuesses}`
            }, flipHint.timing.duration/2)
        }
        if(guessesMade === 6) {
            setTimeout(() => {
                document.getElementById('play-page').animate(fadeOut.animation,fadeOut.timing)
            }, 750)
            setTimeout(() => {
                document.getElementById('play-page').style.display = 'none'
            }, 2200)
            setTimeout(() => {
                document.getElementById('loss-page').style.display = 'flex'
                return
            }, 2400)
        }
        document.getElementById('guess-text').classList.add('is-invalid')
        document.getElementById(`image-${guessesMade+1}`).animate(imageFading.animation, imageFading.timing)
        setTimeout(() => {
            document.getElementById(`image-${guessesMade+1}`).src = hintImagesUrls[guessesMade]
        }, 2000)
        setTimeout(() => {
            document.getElementById('guess-text').classList.remove('is-invalid')
            document.getElementById('guess-text').style.WebkitAnimationPlayState = "paused"
        }, 1000)
    }
})

function disableUserInput () { // happens right when you guess correctly so that you can't change it to a wrong guess
    const parent = document.getElementById('guess-section')
    const child = document.getElementById('guess-input')
    const newEl = document.createElement('fieldset')
    newEl.setAttribute('disabled', '')
    parent.appendChild(newEl)
    newEl.appendChild(child)
    console.log('user input disabled')
}

document.getElementById('win-reset-button').addEventListener('click', (event) => {  // reset button on win page
    event.preventDefault()
    resetGame(event)

})

document.getElementById('loss-reset-button').addEventListener('click', (event) => { // reset button on loss page
    event.preventDefault()
    resetGame(event)

})

function resetGame (event) {
    if (event.target === document.getElementById('win-reset-button')) { // resets the game to initial page and sends the new secret word list (shortened by the words you got right) into session storage so as long as your tab stays open, your progress is tracked
        console.log("User won")
        secretWordList.splice(secretWordList.findIndex((index) => index === secretWord), 1)
        const shorterWordList = secretWordList
        sessionStorage.setItem('updatedWordList', JSON.stringify(shorterWordList))
        if(secretWordList.length === 0) {
            document.getElementById('win-text-row').style.fontSize = '7vw'
            document.getElementById('win-text-row').innerText = 'You got every word!'
            document.getElementById('win-reset-button').remove()
            return
        } 
        window.location.reload()
    }
    if (event.target === document.getElementById('loss-reset-button')) {
        console.log("User lost")
        window.location.reload()
    }
}