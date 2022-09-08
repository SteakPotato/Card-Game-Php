let spriteList = [];
let spritesrc = [];
let spriteSpawn = [];
let startComp = -150
let bodywidth 
let bodyheight 

//dom animations in lobby
//when page is loaded initialise arrays and push all sprite
window.addEventListener("load", () => {
    bodywidth = document.body.offsetWidth
    bodyheight = document.body.offsetHeight
    let start = 10

    //spawning point
    spriteSpawn = [
        [startComp,startComp],
        [startComp,bodyheight/2],
        [startComp,bodyheight],
        [bodywidth ,bodyheight/2],
        [bodywidth ,startComp],
        [bodywidth ,bodyheight ],
        [bodywidth/2,startComp],
        [bodywidth/2,bodyheight ]
    ];

    // sprite src
    spritesrc = [
        "images/sidekick/Bot_VALKRI_MK1.png",
        "images/sidekick/Bot_Referee.png",
        "images/sidekick/Bot_Ninja.png",
        "images/sidekick/Bot_Tengu.png",
        "images/sidekick/Bot_Wendigo (1).png",
        "images/sidekick/Bot_Harlequin_Marionette.png"
    ];
    tick();
    setTimeout(pushAllSprite, 800);
})

//push all sprite
let pushAllSprite = () =>{

    //chose random num between a min and a max
    let randnum = (min,max) => {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        //im excluding 0
        while(num == 0){
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return num
    }

    //assinign speed based on spawn
    //x and y
    let chooseSpeed = (x,y) => {
        if(x == startComp){
            speedx = 1 
        }else if(x == bodywidth ){
            speedx = -1 
        }else if(x == bodywidth/2 ){
            speedx = randnum(min,max)
        }

        if(y == startComp){
            speedy = 1 
        }else if(y == bodyheight ){
            speedy = -1 
        }else if(y == bodyheight/2 ){
            speedy = randnum(min,max)
        }
    }

    //all variable for sprite
    let rand = spriteSpawn[Math.floor(Math.random() * spriteSpawn.length)]
    let randsrc = spritesrc[Math.floor(Math.random() * spritesrc.length)]
    let imgsrc = randsrc
    let x = rand[0]
    let y = rand[1]
    let min = -1 
    let max = 1
    let speedx
    let speedy 

    chooseSpeed(x,y,speedx,speedy)
    spriteList.push(new Sidekick(x, y,speedx,speedy,imgsrc));
    setTimeout(pushAllSprite, 800);
}

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        let alive = sprite.tick();

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}

//sprite class
class Sidekick {
    constructor(x, y,speedx,speedy,imgurl) {
        this.node = document.createElement("img");
        this.node.src =imgurl
        this.node.className = "sidekick";
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
        this.speedy = speedy;
        this.speedx = speedx;
        this.accX = speedx/10;
        this.accY = speedy/10;

        if(this.speedx < 0){
            this.node.classList.add("flip");
        }
        document.body.append(this.node);
    }

    tick() {
        let currentY = this.node.offsetTop;
        let currentX = this.node.offsetLeft;
        let maxSpeed = 5

        let alive = true;
        // y
        if(this.speedy < maxSpeed){
            this.speedy += this.accY; 
        }
        currentY += this.speedy;
        this.node.style.top = currentY + "px";

        //x
        if(this.speedx < maxSpeed){
            this.speedx += this.accX; // velocity
        }
        currentX += this.speedx;
        this.node.style.left = currentX + "px";

        //remove when touching borders
        if (currentY < -350 || currentX < -350||currentX > bodywidth || currentY > bodyheight ) {
            alive = false;
            this.node.remove();
        }

        return alive;
    }
}