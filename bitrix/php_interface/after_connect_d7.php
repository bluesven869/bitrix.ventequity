<?
$connection = \Bitrix\Main\Application::getConnection();
$connection->queryExecute("SET sql_mode=''");
$connection->queryExecute("SET LOCAL time_zone='".date('P')."'");
?>