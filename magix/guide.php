<?php
    require_once("action/guideAction.php");
    $action = new guideAction();
    $data = $action->execute();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAGIX</title>
    <script src="js/guide.js"></script>
    <link rel="stylesheet" href="css/global.css">
</head>
<body class = "guide-body">
    <div class = 'guide-container'>
        <div class="nav-bar">
            <div>The Strategy Guide</div>
            <?php
            if($_SESSION["visibility"] >= 1) {
                ?> <a class ="addArticle" href="javascript: void(0)">Add Article</a> <?php
            }
            ?>
        </div>
        <div class="article-container"></div>
    </div>
</body>
<template class = ficheArticleFull>
    <div class = modal>
        <span class="close">&times;</span>
        <div class="editbutton-container">
            <?php
            if($_SESSION["visibility"] >= 1) {
                ?> <a class ="delete" href="javascript: void(0)">Delete</a><?php
                ?> <a class ="edit" href="javascript: void(0)">Edit</a><?php
                ?> <a class ="save" href="javascript: void(0)">Save</a><?php
            }
            ?>
        </div> 
        <div class = "articleAndComment">
            <div class = "modal-article">
                <div class="info">
                    <div class = "titre"></div>
                    <div class = "info-auteur">
                        <div class="auteur"></div>
                        <div class="date"></div>
                    </div>
                </div>
                <div class = "content">
                    <div id = "contenu-text" class="text"></div>
                </div>
            </div>
            <div class = "modal-comment">
                <div class="comment-container">
        
                </div>
                <form class="input-comment" method="POST">
                    <?php
                    if($_SESSION["visibility"] < 1) {
                        ?> <input id = "name" type="text" maxlength="250" placeholder="Name*" required><?php
                    }
                    ?>
                    <textarea id = "contenu-comment" placeholder="Add Comment*" required></textarea>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        </div>

    </div>
</template>

<template class = ficheArticle>
    <div class="info">
        <div class = "titre"></div>
        <div class="auteur"></div>
        <div class="date"></div>
    </div>
</template>

<template class = ficheComment>
    <div class="comment-name"></div>
    <div class = "comment-content"></div>
</template>

<template class = ficheAjoutArticle>
    <form class="input-article" method="POST" autocomplete = off>
        <span class="close">&times;</span>
        <input id = "titre" type="text" maxlength="250" placeholder="Title*" name="email" required>
        <textarea id = "contenu-text" placeholder="Type text here*"  required></textarea>
        <input type="submit" value="Submit"/>
    </form>
</template>
</html>