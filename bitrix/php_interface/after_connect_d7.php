<?
$connection = \Bitrix\Main\Application::getConnection();
$connection->queryExecute("SET sql_mode='ALLOW_INVALID_DATES'");
$connection->queryExecute("SET LOCAL time_zone='".date('P')."'");
?>