<?php
    require_once("action/guideAjaxAction.php");
    $action = new guideAjaxAction();
    $data = $action->execute();
    echo json_encode($data["result"]);