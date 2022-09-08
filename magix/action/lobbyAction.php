<?php
    require_once("action/CommonAction.php");

    class lobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        //will look which call to the api
        protected function executeAction() {
            $hasConnectionError = false;
            $data = [];
            $data['key'] = $_SESSION['key'];
            $result = NULL;
    
            if(isset($_GET['Pratique'])) {
                $data['type'] ="TRAINING" ;
                $result = parent::callAPI("games/auto-match", $data);
            }
            if(isset($_GET['Jouer'])) {
                $data['type'] = "PVP" ;
                $result = parent::callAPI("games/auto-match", $data);
            }
            if(isset($_GET['Quitter'])) {
                $result = parent::callAPI("signout", $data);
            }
            if($result != NULL){
                if ($result == "INVALID_KEY" || $result == "INVALID_GAME_TYPE" || $result == "DECK_INCOMPLETE" || $result == "MAX_DEATH_THRESHOLD_REACHED") {
                    $hasConnectionError = true;
                    header("location:login.php");
                    exit;
                }
                if ($result == "SIGNED_OUT") {
                    session_unset();
                    session_destroy();
                    header("location:login.php");
                    exit;
                }
                else {
                    var_dump($result);
                    header("location:game.php");
                    exit;
                }
            }

            return $hasConnectionError;
        }
    }