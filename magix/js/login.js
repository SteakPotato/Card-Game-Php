let canvas = null;
let ctx = null;
let spriteList = [];
let leftArrowOn = false;
let rightArrowOn = false;

//canvas animations for login

//when the page is loaded push the sprites
window.addEventListener("load", () => {

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    spriteList.push(new sidekick("images/sidekick/white.png",0.25,1430,125,true,16));
    spriteList.push(new sidekick("images/sidekick/black.png",0.20,277,520,false,16));
    spriteList.push(new sidekick("images/sidekick/hellfire.png",0.7,700,720,false,36));

    tick();
    setTimeout(changexy,1800)
})
//create a sprite after a delay
let create = (x,y) => {
    spriteList.push(new sidekick("images/sidekick/hellfire.png",0.7,x,y,false,36));
    setTimeout(changexy,1800)
}
//change the x,y randomly and remove the sprite, after the delay create another
let changexy = () => {
    spriteList.pop(2)
    let x =  Math.floor(Math.random() * (1550 - 30 + 1)) + 30;
    let y =  Math.floor(Math.random() * (850 - 700 + 1)) + 700;
    setTimeout(() => {
        create(x,y)
    },2500)

}

const tick = () => {
    //windows width
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

//helped me find x,y position
document.onclick = (e) => {
    console.log(e.pageX,e.pageY)
}


//class
class sidekick {
	constructor(src,sizescale,x,y,flipped,col) {
		let columnCount = col;
		let rowCount = 1;
		let refreshDelay = 50;
		let loopColumn = true;
		let scale = sizescale;
		this.tiledImage = new TiledImage(src, columnCount, rowCount,
							refreshDelay, loopColumn, scale, null);

		//this.tiledImage.changeRow(1);
		this.tiledImage.changeMinMaxInterval(0, col);

        if(flipped == true){
            this.tiledImage.setFlipped(true);
        }

		this.x = x;
		this.y = y;
	}

	tick () {
		this.tiledImage.tick(this.x, this.y, ctx);

		return true;
	}
}
