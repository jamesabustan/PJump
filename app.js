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
    let isJumping = true

    function createPJ() {
        grid.appendChild(pj)
        pj.classList.add('pj')
        pjLeftSpace = platforms[0].left
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
        isJumping = true
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
        isJumping = false
        downTimerId = setInterval(function () {
            pjBottomSpace -= 5
            pj.style.bottom = pjBottomSpace + 'px'
            if (pjBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach(platform => {
                if( 
                (pjBottomSpace >= platform.bottom) && 
                (pjBottomSpace <= platform.bottom + 15) &&
                ((pjLeftSpace + 60 ) >= platform.left) &&
                (pjLeftSpace <= (platform.left + 85)) &&
                !isJumping
                ){
                    console.log('landed')
                    jump()
                }
            })
        },30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control() {
        if (e.key === "ArrowLeft"){
            //move left
        } else if (e.key === "ArrowRight"){
            //move right
        } else if (e.key === "ArrowUp"){
            //move straight
        }
    }

    function start(){
        if (!isGameOver){
            createPlatforms()
            createPJ()
            setInterval(movePlatforms,30)
            jump()
        }
    }
    //attach to button
    start()
})