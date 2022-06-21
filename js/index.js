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
// 14. 
// 15. zelda
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

const secretWords = [
    mountain,
    fish,
    bench,
    iceberg,
    game,
    ragnarok,
    tree,
    recorder,
    treadmill,
    plane,
    sky,
    tank,

]

document.getElementById('play-icon').addEventListener('click',event => {
    document.getElementById('play-icon').style.WebkitAnimationPlayState = "running";
    setTimeout(() =>
        document.getElementById('home-page').style.WebkitAnimationPlayState = "running"
    ,1000)
    setTimeout(() =>
        document.getElementById('home-page').style.display = "none"
        
    ,2000)
    setTimeout(() =>
        document.getElementById('play-page').style.display = "block"
    ,2000)
})

document.addEventListener('DOMContentLoaded',() => {
    console.log('DOM Loaded')
})

const chooseImages = (dataJSON) => {
    for(let i=0;i<dataJSON.data.children.length;i++) {
        if(dataJSON.data.children[i].data.url.slice(-3) === 'jpg') {
            slideShowImageURLs.push(dataJSON.data.children[i].data.url)
        }
    }

    runSlideshow = setInterval(showSlide,5000);
}

document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    userText = document.getElementById('input-box').value.replaceAll(' ', '+')
    console.log(userText)
    document.getElementById('search-button').value = 'loading...'
    
    fetch(`https://www.reddit.com/search.json?q=${userText}+nsfw:no&limit=100`) 
        .then((responseData)=> responseData.json())
        .then((jsonData)=>{
            chooseImages(jsonData)
        })
        .catch((jsonData) => {
            console.log('ERROR')
        })
})