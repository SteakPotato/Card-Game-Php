
let selectedCard = {}

//will check the state off the game
const state = () => {

    let data = new FormData();
    data.append("type","STATE");

    fetch("ajax-state.php", {    
        method : "POST",       
        credentials: "include",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    let page = document.querySelector(".fullpage")
    if(data =="WAITING" || data =="LAST_GAME_WON" || data =="LAST_GAME_LOST"){
        switch (data) {
            case "WAITING":
                page.querySelector("div").innerText = "Waiting..."
                break;
            case "LAST_GAME_WON":
                page.querySelector("div").innerText = "You Won"
                break;
        
            case "LAST_GAME_LOST":
                page.querySelector("div").innerText = "You Lost"
                break;
        }

        if(page.classList.contains("hide")){
            page.classList.remove("hide")
        }

    }else{

        if(!page.classList.contains("hide")){
            page.classList.add("hide")
        }
        displayGame(data);
    }
    setTimeout(state, 1000); 
    })
}


//will display everything in game
let displayGame = (data) => {
        //player
    //display
    let playerhealth = document.querySelector("#playerhealth")
    let playerClass = document.querySelector("#playericon")
    let playermp = document.querySelector("#playermana")
    let msg = document.querySelector("msg")
    //control
    let time = document.querySelector(".time")
    let endturn = document.querySelector(".endturn")
    //player card
    let cardnumber = document.querySelector("#player-cardnumber")
    let handcontainer = document.querySelector(".player-hand-container") 
    let boardPlayerContainer = document.querySelector(".board-player-container")

        //enemy
    //display
    let enemyhealth = document.querySelector("#enemyhealth")
    let enemyClass = document.querySelector("#enemyicon")
    let enemymp = document.querySelector("#enemymana")
    let enemycardnumber = document.querySelector("#enemy-cardnumber")
    let enemyHand = document.querySelector(".hand-container")
    //board card
    let boardEnemyContainer = document.querySelector(".board-enemy-container")


        //set player
    //display
    playerhealth.innerHTML = "Health : "+data.hp
    playerClass.innerHTML = data.heroClass
    playermp.innerHTML = "Mana : "+data.mp
    cardnumber.innerHTML = data.remainingCardsCount
    //control
    time.innerHTML = "Time Left : "+data.remainingTurnTime
    if(data.yourTurn == true){
        endturn.classList.add('greenborder');
        endturn.classList.add('greenborder:hover');
    }else if(endturn.classList.contains('greenborder')){
        endturn.classList.remove('greenborder');
        endturn.classList.remove('greenborder:hover');
    }
    //player card
    handcontainer.innerHTML=''
    for(let i = 0; i < data.hand.length;i++){
        let cardTemp = document.querySelector(".cardtemplate").innerHTML;
        let li = document.createElement("li");
		li.className = "card";
        li.id = data.hand[i].uid;
		li.innerHTML = cardTemp;
        card = li

        isCardPlayable(card,data.hand[i],data.mp)
        addCardstyle(card,data.hand[i].cost)

        card.querySelector(".mp").innerHTML = data.hand[i].cost

        if(data.hand[i].mechanics[0]!== 'undefined'){
            card.querySelector(".class").innerHTML = data.hand[i].mechanics[0]
        }
        else{
            card.querySelector(".class").innerHTML = ""
        }

        if(data.hand[i].mechanics.length > 1){
            card.querySelector(".desc").innerHTML = data.hand[i].mechanics[1]
        }

        card.querySelector(".atk").innerHTML = data.hand[i].atk
        card.querySelector(".hp").innerHTML = data.hand[i].hp
        handcontainer.appendChild(card)
    }
    //board
    boardPlayerContainer.innerHTML ="";
    for(let i = 0; i < data.board.length;i++){
        let cardTemp = document.querySelector(".cardtemplate").innerHTML;
        let li = document.createElement("li");
		li.className = "card";
        li.id = data.board[i].uid;
		li.innerHTML = cardTemp;
        let card = li;
        /*class selected*/ 
        if (selectedCard["player"] == card.id){
            card.classList.add("selected");
        }
        checkMechanics(card,data.board[i].mechanics)
        addCardstyle(card,data.board[i].cost)

        card.querySelector(".mp").innerHTML = data.board[i].cost
        if(data.board[i].mechanics[0]!== 'undefined'){
            card.querySelector(".class").innerHTML = data.board[i].mechanics[0]
        }
        else{
            card.querySelector(".class").innerHTML = ""
        }

        if(data.board[i].mechanics.length > 1){
            card.querySelector(".desc").innerHTML = data.board[i].mechanics[1]
        }
        card.querySelector(".hp").innerHTML = data.board[i].hp
        card.querySelector(".atk").innerHTML = data.board[i].atk
        boardPlayerContainer.appendChild(card);
    }

        //set enemy    
    //display
    enemyhealth.innerHTML = "Health : "+data.opponent.hp
    enemyClass.innerHTML = data.opponent.heroClass
    enemymp.innerHTML = "Mana : "+data.mp
    enemycardnumber.innerHTML =data.opponent.remainingCardsCount

    card = document.querySelector(".profilContainer img")
    if (selectedCard["ennemy"] == 0){
        card.classList.add("selected");
    }
    else{
        card = document.querySelector(".profilContainer img")
        card.classList.remove("selected");
    }

    //card
    enemyHand.innerHTML =""
    for(let i = 0; i < data.opponent.handSize;i++){
        let cardTemp = document.querySelector(".ennemyCardtemplate").innerHTML;
        let li = document.createElement("li");
		li.className = "cardLogo";
		li.innerHTML = cardTemp;
        let card = li;
        enemyHand.appendChild(card)
    }
    //board
    boardEnemyContainer.innerHTML="";
    for(let i = 0; i < data.opponent.board.length;i++){
        let cardTemp = document.querySelector(".cardtemplate").innerHTML;
        let li = document.createElement("li");
		li.className = "card";
        li.id = data.opponent.board[i].uid;
		li.innerHTML = cardTemp;
        let card = li;

        /*class selected*/ 
        if (selectedCard["ennemy"] == card.id){
            card.classList.add("selected");
        }
        checkMechanics(card,data.opponent.board[i].mechanics)
        addCardstyle(card,data.opponent.board[i].cost)
        card.querySelector(".mp").innerHTML = data.opponent.board[i].cost
        if(data.opponent.board[i].mechanics[0]!== 'undefined'){
            card.querySelector(".class").innerHTML = data.opponent.board[i].mechanics[0]
        }
        else{
            card.querySelector(".class").innerHTML = ""
        }
        
        if(data.opponent.board[i].mechanics.length > 1){
            card.querySelector(".desc").innerHTML = data.opponent.board[i].mechanics[1]
        }
        card.querySelector(".atk").innerHTML = data.opponent.board[i].atk
        card.querySelector(".hp").innerHTML = data.opponent.board[i].hp
        boardEnemyContainer.appendChild(card)
    }

    //add les events
    addPlayListenners();
}
//add backgrounds to the cards
let addCardstyle = (card,cost) => {
    switch(cost){
        case 0:
            card.style.background = "url(images/legends/Ada.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        case 1:
            card.style.background = "url(images/legends/Nai.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 2:
            card.style.background = "url(images/legends/Orion.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 3:
            card.style.background = "url(images/legends/Thatch.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 4:
            card.style.background = "url(images/legends/Nix-no-outline.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 5:
            card.style.background = "url(images/legends/Kor.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 6:
            card.style.background = "url(images/legends/Thor.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 7:
            card.style.background = "url(images/legends/Bodvar-1.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 8:
            card.style.background = "url(images/legends/Jhala.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 9:
            card.style.background = "url(images/legends/Ulgrim.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
        case 10:
            card.style.background = "url(images/legends/petra-card.png) no-repeat center center ";
            card.style.backgroundSize="100% 100%";
        break;
    }
}

//listenners for side button
let addControlbuttonListeners = () => {
    //click on heropower
    let hero = document.querySelector(".hero").addEventListener("click",() => {
        let data = new FormData();
        data.append("type","HERO_POWER");

        fetch("ajax-state.php", {   
            method : "POST",       
            credentials: "include",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            checkErrors(data)
        }) 
    })
    //click on end turn
    let end = document.querySelector(".endturn").addEventListener("click",() => {
        let data = new FormData();
        data.append("type","END_TURN");
        fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
            method : "POST",       // l’API (games/state)
            credentials: "include",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            checkErrors(data)
        })
    })

    //click on chat
    let togglechat = document.querySelector(".toggleChat").addEventListener("click",() => {
        let chat = document.querySelector(".chatgame")
        if(chat.classList.contains("show")){
           chat.classList.toggle("show")
           chat.classList.toggle("hide") 
        }else {
            chat.classList.toggle("hide")
            chat.classList.toggle("show")
        }
    })
    //Selecting hero icon for attacking 
    let enemyclass = document.querySelector(".profilContainer img")
    enemyclass.addEventListener("click",() => {
        selectedCard["ennemy"] = "0";
        card = document.querySelector(".profilContainer img")
        card.classList.add("selected");
        checkCards()
    })
}

//listenners for cards
let addPlayListenners = () => {
    let playerCards = document.querySelector(".player-hand-container")
    let boardEnnemy =  document.querySelector(".board-enemy-container")
    let board =  document.querySelector(".board-player-container")

    //cards
    if( playerCards.children.length > 0){
        playerCards.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click",() => {
                let data = new FormData();
                data.append("type","PLAY");
                data.append("uid",card.id);
                fetch("ajax-state.php", {   
                    method : "POST",       
                    credentials: "include",
                    body: data
                })
                .then(response => response.json())
                .then(data => {
                    checkErrors(data)
                })
            })
        })
    }

    //board
    if( board.children.length > 0){
        board.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click",() => {
                selectedCard["player"] = card.id;
                card.classList.add("selected");
                checkCards()
            })
        })
    }
    if( boardEnnemy.children.length > 0){
        boardEnnemy.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click",() => {
                selectedCard["ennemy"] = card.id;
                card.classList.add("selected");
                checkCards()
            })
        })
    }

}

//check card selected on board : player and ennemy
let checkCards = () => {
    if (selectedCard["player"] && selectedCard["ennemy"]){
        let data = new FormData();
        data.append("type","ATTACK");
        data.append("uid",selectedCard["player"]);
        data.append("targetuid",selectedCard["ennemy"]);

        fetch("ajax-state.php", {   
            method : "POST",       
            credentials: "include",
            body: data
        })
        .then(response => response.json())
        .then(data => {
            checkErrors(data)
            selectedCard = {}
        })
    }
}

// check if a card is playable
let isCardPlayable = (card,id,mp) => {
    if(id.cost <= mp){
        if(!card.classList.contains("playable")){
            card.classList.add("playable")
        }  
    }else{
        if(!card.classList.contains("notPlayable")){
            card.classList.add("notPlayable")
        }
    }
}

//check the mechanics of a card
let checkMechanics = (card,mechanics) => {
    mechanics.forEach((list) => {
        if(list == "Taunt"){
            card.querySelector(".mecanics").classList.add("taunt")

        }else if(list == "Stealth"){
            card.querySelector(".mecanics").classList.add("stealth")

        }
    })
}

//check for player errors
let checkErrors = (data) => {
    let msg = document.querySelector(".msg")
    if(typeof data == "string"){
        if(data === "NOT_ENOUGH_ENERGY"){
            msg.innerHTML = "NOT ENOUGH MANA"
        }else if(data === "BOARD_IS_FULL"){
            msg.innerHTML = "THE BOARD IS FULL"

        }else if(data === "CARD_IS_SLEEPING"){
            msg.innerHTML = "CARD IS SLEEPING"

        }else if(data === "MUST_ATTACK_TAUNT_FIRST"){
            msg.innerHTML = "ATTACK TAUNT FIRST"

        }else if(data === "OPPONENT_CARD_HAS_STEALTH"){
            msg.innerHTML = "ENEMY CARD HAS STEALTH"

        }else if(data === "HERO_POWER_ALREADY_USED"){
            msg.innerHTML = "HERO POWER ALREADY USED"
        }else if(data === "WRONG_TURN"){
            msg.innerHTML = "WRONG TURN"
        }
        else{
             msg.innerHTML = data;
        }
        if(msg.classList.contains('showError')){
            msg.classList.remove('showError')
            msg.classList.add('showError')
        }
        else{
            msg.classList.add('showError')
        }
    }
    else{
        if(msg.classList.contains('showError')){
            msg.classList.remove('showError')
        }
        displayGame(data)
    }
}

//when page is loaded add listenners and check the state after X sec
window.addEventListener("load", () => {
addControlbuttonListeners();
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

