<?php
    require_once("action/gameAction.php");
    $action = new gameAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAGIX</title>
    <script src="js/lobbyJS.js"></script>
    <script src="js/game.js"></script>
    <link rel="stylesheet" href="css/global.css">
</head>
<body class ="gameBody">
    <ul class = "hand-container">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>

    <div class = "enemy-display">
        <div class="icon" id = "enemyicon"></div>
        <div class="health" id = "enemyhealth"></div>
        <div class="mana" id = "enemymana"></div>
    </div>
    <div class="enemyCardnumberContainer">
        
        <div class = "cardnumber" id = "enemy-cardnumber"></div>
    </div>
    
    <div class = 'profilContainer'>
        <img src="images/legends/Sentinel.png" >
    </div>
    
    <div class = "middle-top">
        <ul class = "board-enemy-container">
        
        </ul>
    </div>
    <div class = "middle-down">
        <ul class = "board-player-container">
        </ul>
    </div>

    <div class = "player-display">
            <div class="icon" id = "playericon"></div>
            <div class="health" id = "playerhealth"></div>
            <div class="mana" id = "playermana"></div>
    </div>
    <div class = "player-card">
        <ul class = "player-hand-container">

        </ul>
    </div>
    <div class="CardnumberContainer">
       
        <div class = "cardnumber" id = "player-cardnumber"></div>
    </div>

    <div class = "control-container">
        <div class = "time"></div>
        <a class = "hero" href="javascript:void(0)">Hero Power</a>
        <a class = "endturn" href="javascript:void(0)">End Turn</a>
        <a class = "toggleChat" href="javascript:void(0)">Toggle Chat</a>
    </div>

    <div class="msgContainer">
        <div class ="msg error"></div>
    </div>
    
    <div class = 'chatgame hide'>
        <iframe style="width:90%;height:250px;" onload="applyStyles(this)"
            src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["key"] ?>">
        </iframe>
    </div>

    <div class="fullpage ">
        <img src="images/Logo_BrawlhallaHammer512.png" alt="">
        <div>Waiting...</div>
    </div>
</body>
<template class = cardtemplate>
        <div class = "mp"></div>
        <div class = "mecanics">
            <div class = "class"></div>
            <div class = "desc"></div>
        </div>
        <div class="stat">
            <div class = "atk"></div>
            <div class = "hp"></div>
        </div>
</template>
<template class = ennemyCardtemplate>
    <img src="images/Logo_BrawlhallaHammer512.png" alt="">
</template>
