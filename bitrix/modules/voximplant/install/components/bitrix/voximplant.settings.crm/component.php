<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/**
 * @var $arParams array
 * @var $arResult array
 * @var $this CBitrixComponent
 * @var $APPLICATION CMain
 * @var $USER CUser
 */

if (!CModule::IncludeModule('voximplant'))
	return;

$permissions = \Bitrix\Voximplant\Security\Permissions::createWithCurrentUser();
if(!$permissions->canPerform(\Bitrix\Voximplant\Security\Permissions::ENTITY_SETTINGS,\Bitrix\Voximplant\Security\Permissions::ACTION_MODIFY))
	return false;


$arResult['WORKFLOW_OPTIONS'] = array(
	CVoxImplantConfig::WORKFLOW_START_IMMEDIATE => GetMessage("VI_CRM_INTEGRATION_WORKFLOW_EXECUTION_IMMEDIATE"),
	CVoxImplantConfig::WORKFLOW_START_DEFERRED => GetMessage("VI_CRM_INTEGRATION_WORKFLOW_EXECUTION_DEFERRED")
);
$arResult['WORKFLOW_OPTION'] = CVoxImplantConfig::GetLeadWorkflowExecution();

if (!(isset($arParams['TEMPLATE_HIDE']) && $arParams['TEMPLATE_HIDE'] == 'Y'))
	$this->IncludeComponentTemplate();

return $arResult;
?>