<?php
    require_once("action/CommonAction.php");

    class ajaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        //will look for wich command and call Dao methods
        protected function executeAction() {
            $data = [];
            $data['key'] = $_SESSION['key'];
            $result = NULL;
            if(isset($_POST["type"]) && $_POST["type"] === "STATE") {
                $result = parent::callAPI("games/state", $data);

            } elseif (isset($_POST["type"]) && $_POST["type"] === "END_TURN") {
                $data['type'] ="END_TURN" ;
                $result = parent::callAPI("games/action", $data);

            } elseif(isset($_POST["type"]) && $_POST["type"] === "HERO_POWER") {
                $data['type'] ="HERO_POWER" ;
                $result = parent::callAPI("games/action", $data);

            } elseif(isset($_POST["type"]) && $_POST["type"] === "PLAY") {
                $data['type'] = "PLAY" ;
                $data['uid'] = $_POST["uid"];
                $result = parent::callAPI("games/action", $data);

            } elseif(isset($_POST["type"]) && $_POST["type"] === "ATTACK") {
                $data['type'] ="ATTACK" ;
                $data['uid'] =$_POST["uid"];
                $data['targetuid'] =$_POST["targetuid"];
                $result = parent::callAPI("games/action", $data);
            }

            return compact("result");
        }
    }