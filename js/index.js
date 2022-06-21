// alright lets just create our own wordlist lol:
// 1. mountain
// 2. fish
// 3. bench
// 4. sega
// 5. mario
// 6. ragnarok
// 7. tree
// 8. recorder
// 9. treadmill
// 10. plane
// 11. sky
// 12. star
// 13. tank
// 14. pokemon
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

document.getElementById('play-icon').addEventListener('click',event => {
    document.getElementById('play-icon').style.WebkitAnimationPlayState = "running";
    setTimeout(() =>
        document.getElementById('home-page').style.WebkitAnimationPlayState = "running"
    ,1500)
    setTimeout(() =>
        document.getElementById('home-page').style.display = "none"
    ,2500)
    setTimeout(() =>
        document.getElementById('play-page').style.display = "block"
    ,3000)
})