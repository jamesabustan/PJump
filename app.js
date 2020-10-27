document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const pj = document.createElement('div')
    let pjLeftSpace = 50
    let pjBottomSpace = 150
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId 
    let downTimerId

    createPJ = () => {
        grid.appendChild(pj)
        pj.classList.add('pj')
        pj.style.left = pjLeftSpace + 'px'
        pj.style.bottom = pjBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
       for (let i=0; i < platformCount; i++){
           let platformGap = 600 / platformCount
           let newPlatBottom = 100 + i * platformGap
           let newPlatform = new Platform(newPlatBottom)
           platforms.push(newPlatform)
       }
    }

    function movePlatforms(){
        if (pjBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        upTimerId = setInterval(function () {
            pjBottomSpace += 20
            pj.style.bottom = pjBottomSpace + 'px'
            if (pjBottomSpace > 350){
                fall()
            }
        },30)
    }

    function fall() {
        clearInterval(upTimerId)
        downTimerId = setInterval(function () {
            pjBottomSpace -= 5
            pj.style.bottom = pjBottomSpace + 'px'
            if (pjBottomSpace <= 0){
                gameOver()
            }
        },30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function start(){
        if (!isGameOver){
            createPJ()
            createPlatforms()
            setInterval(movePlatforms,30)
            jump()
        }
    }
    //attach to button
    start()
})