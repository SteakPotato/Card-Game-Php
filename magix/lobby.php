<?php
    require_once("action/lobbyAction.php");
    $action = new lobbyAction();
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
    <script src="js/lobby.js"></script>
    <link rel="stylesheet" href="css/global.css">
</head>

<body>
    <div class = 'lobby-container'>
        <div class="content">
            <div class = 'quote-box'> <p>Welcome To The Arena <?=  $_SESSION["username"] ?> ! Choose Wisely.</p></div>
            <div class = 'button-container'>
                <a href="?Pratique">Pratique</a>
                <a href="?Jouer">Jouer</a>
                <a href="guide.php">Guide</a>
                <a href="?Quitter">Quitter</a>
            </div>
        </div>
        <div class = 'chat'>
            <iframe style="width:700px;height:240px;" onload="applyStyles(this)"
                src="https://magix.apps-de-cours.com/server/#/chat/<?=  $_SESSION["key"] ?>">
            </iframe>
        </div>
    </div>
</body>
<script>
    //localstorage
    if (localStorage["username"] == null) {
		let data =  "<?=  $_SESSION["username"]?>";
		localStorage["username"] = data
    }
</script>
</html>
