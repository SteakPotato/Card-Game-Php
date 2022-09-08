<?php
    require_once("action/ajax-stateAction.php");
    $action = new ajaxStateAction();
    $data = $action->execute();
    echo json_encode($data["result"]);


