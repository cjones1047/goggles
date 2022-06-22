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

const secretWords = [
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

const hintImages = []

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

