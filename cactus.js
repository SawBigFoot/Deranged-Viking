    import {
        setCustomProperty,
        incrementCustomProperty,
        getCustomProperty,
    } from "./updateCustomProperty.js"
    
    const SPEED = 0.05
    const CACTUS_INTERVAL_MIN = 500
    const CACTUS_INTERVAL_MAX = 2000
    const worldElem = document.querySelector("[data-world]")
    
    let nextCactusTime
    export function setupCactus() {
        nextCactusTime = CACTUS_INTERVAL_MIN
        document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
        })
    }
    
    export function updateCactus(delta, speedScale) {
        document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
        })
    
        if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime =
            randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
        }
        nextCactusTime -= delta
    }
    
    export function getCactusRects() {
        return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
        })
    }
    
    function createCactus() {
        const cactus = document.createElement("img")
        cactus.dataset.cactus = true
    
        const ChanceFactor = Math.floor(Math.random() * 3 + 1) // Randomize between 1 and 3
    

        if (ChanceFactor === 3) {

        let isMissile0 = true

        setInterval(() => {
        
        if (isMissile0) {

                cactus.src = "imgs/missile-0.png"
        } else {

            let isMissile1 = true

            setInterval(() => {
            
            if (isMissile1) {
                cactus.src = "imgs/missile-1.png"
            } else {
                cactus.src = "imgs/missile-2.png"
            }

            isMissile1 = !isMissile1

            }, 500)

        }

        isMissile0 = !isMissile0

        }, 250) // Change image every 750ms
        cactus.src = "imgs/missile-0.png" // 1/3 chance of missile
        console.log("Missile spawned")
        
        } else {
        cactus.src = "imgs/cactus-0.png" // 2/3 chance of cactus
        console.log("Cactus spawned")
        toggleCactusImage(cactus) // Only start toggling for cacti
        }
    
        cactus.classList.add("cactus")
        setCustomProperty(cactus, "--left", 100)
        worldElem.append(cactus)
    }
    
    // Function to toggle cactus images (only for cacti)
    function toggleCactusImage(cactus) {
        let isCactus0 = true
    
        // Start toggling images between cactus-0.png and cactus-1.png
        setInterval(() => {
        if (isCactus0) {
            cactus.src = "imgs/cactus-1.png"
        } else {
            cactus.src = "imgs/cactus-0.png"
        }
        isCactus0 = !isCactus0
        }, 750) // Change image every 750ms
    }
    
    function randomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }