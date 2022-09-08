<?php
    require_once("action/loginAction.php");
    $action = new loginAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAGIX</title>
    <script src="js/login.js"></script>
    <script src="js/TiledImage.js"></script>
    <script src="js/loginLocal.js"></script>
    
    <link rel="stylesheet" href="css/global.css">
</head>

<body>
    <div class = form-container>
    <canvas id="canvas"  ></canvas>
        <form action="login.php" method ='post'>
            <input type="text" name="username" placeholder='username' required />
            <input type="password" name="password" placeholder='password'required />
            <div>
                <button type="submit">Login</button>
                <a href="guide.php">Guide</a>
            </div>
        </form>
    </div>
    
</body>
</html>