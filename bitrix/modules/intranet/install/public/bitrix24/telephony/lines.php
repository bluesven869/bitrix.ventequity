<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

IncludeModuleLangFile($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/intranet/public_bitrix24/telephony/lines.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_after.php");

$APPLICATION->SetTitle(GetMessage("VI_PAGE_LINES_TITLE"));
?>

<?$APPLICATION->IncludeComponent("bitrix:voximplant.config", "", array());?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
