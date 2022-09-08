<?php
    require_once("action/CommonAction.php");

    class LoginAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        //will look if login worked
        protected function executeAction() {
            $hasConnectionError = false;

            $data = [];

            if (isset($_POST["username"]) && isset($_POST["password"])) {
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];
            }
            
            $result = parent::callAPI("signin", $data);

            if ($result == "INVALID_USERNAME_PASSWORD") {
                $hasConnectionError = true;
            }
            else {
                $key = $result->key;
                $_SESSION["key"] = $key;
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                header("location:lobby.php");
                exit;
            }

			return compact("hasConnectionError");
        }
    }