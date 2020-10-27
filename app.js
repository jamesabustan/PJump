document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const pj = document.createElement('div')
    let pjLeftSpace = 50
    let startPoint = 150
    let pjBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId 
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0
    

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

                if (platform.bottom < 10){
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            pjBottomSpace += 20
            pj.style.bottom = pjBottomSpace + 'px'
            if (pjBottomSpace > startPoint + 200){
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
                    startPoint = pjBottomSpace
                    jump()
                }
            })
        },30)
    }

    function gameOver() {
        console.log('game over')
        isGameOver = true
        while (grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function control(e) {
        if (e.key === "ArrowLeft"){
            moveLeft()
        } else if (e.key === "ArrowRight"){
            moveRight()
        } else if (e.key === "ArrowUp"){
            moveStraight()
        }
    }

    function moveLeft() {
        if(isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function() {
            if (pjLeftSpace >= 0){
                pjLeftSpace -=5
                pj.style.left = pjLeftSpace + 'px'
            } else moveRight()
        },30)
    }

    function moveRight() {
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function(){
            if(pjLeftSpace <= 340){
                pjLeftSpace += 5
                pj.style.left = pjLeftSpace + 'px'
            } else moveLeft()
        },30)
    }

    function moveStraight(){
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }

    function start(){
        if (!isGameOver){
            createPlatforms()
            createPJ()
            setInterval(movePlatforms,30)
            jump()
            document.addEventListener('keyup',control)
        }
    }
    //attach to button
    start()
})