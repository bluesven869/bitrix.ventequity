<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

/** @var CMain $APPLICATION */
$APPLICATION->SetTitle('ThurlyOS.Time');
$APPLICATION->IncludeComponent("bitrix:faceid.timeman.start", ".default", array());

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");