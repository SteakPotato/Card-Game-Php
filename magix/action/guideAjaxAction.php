<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/guideDAO.php");

    class guideAjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $result = NULL;

            if(isset($_POST["type"]) && $_POST["type"] === "getArticle") {
                $result = guideDAO::getArticle();

            } elseif (isset($_POST["type"]) && $_POST["type"] === "getComment") {
                $result = guideDAO::getComment($_POST["id"]);

            } elseif (isset($_POST["type"]) && $_POST["type"] === "addArticle") {
                $date = date("Y-m-d");
                $auteur = $_SESSION["username"];
                $result = guideDAO::addArticle($_POST["titre"], $date,$_POST["text"],$auteur);

            } elseif (isset($_POST["type"]) && $_POST["type"] === "editArticle") {
                $auteur = $_SESSION["username"];
                $result = guideDAO::editArticle($_POST["titre"],$_POST["text"],$auteur,$_POST["articleId"]);

            }elseif (isset($_POST["type"]) && $_POST["type"] === "removeArticle") {
                $result = guideDAO::removeArticle($_POST["articleId"]);

            } elseif (isset($_POST["type"]) && $_POST["type"] === "addComment") {
                if($_SESSION["visibility"] < 1){
                    $result = guideDAO::addComment($_POST["name"], $_POST["comment"],$_POST["articleId"]);
                }elseif($_SESSION["visibility"] > 0){
                    $auteur = $_SESSION["username"];
                    $result = guideDAO::addComment($auteur, $_POST["comment"],$_POST["articleId"]);
                }

            }
            return compact("result");
        }
    }