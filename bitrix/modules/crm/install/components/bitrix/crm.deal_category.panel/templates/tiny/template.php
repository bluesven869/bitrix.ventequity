<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true)die();
/**
 * Thurly vars
 *
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponentTemplate $this
 * @global CMain $APPLICATION
 */

$guid = $arResult['GUID'];
$containerID = "{$guid}_container";
$selectorButtonID = "{$guid}_selector";

?><div class="pagetitle-container pagetitle-align-right-container">
	<div id="<?=htmlspecialcharsbx($containerID)?>" class="crm-interface-toolbar-button-container">
		<div id="<?=htmlspecialcharsbx($selectorButtonID)?>" class="webform-small-button webform-small-button-transparent
		<?if($arResult['IS_CUSTOMIZED'])
		{
		?> webform-small-button-dropdown<?
		}
		elseif($arResult['CAN_CREATE_CATEGORY'])
		{
			?> webform-small-button-plus<?
		}
		?>">
			<span class="webform-small-button-text">
				<?=$arResult['CATEGORY_NAME'] !== ''
					? htmlspecialcharsbx($arResult['CATEGORY_NAME'])
					: GetMessage('CRM_DEAL_CATEGORY_SELECTOR')
				?>
			</span>
			<span class="webform-small-button-icon"></span>
		</div>
	</div>
</div>
<script type="text/javascript">
	BX.ready(
		function()
		{
			BX.CrmDealCategoryTinyPanel.messages =
			{
				"create": "<?=GetMessageJS('CRM_DEAL_CATEGORY_PANEL_ADD_CATEGORY')?>"
			};

			BX.CrmDealCategoryTinyPanel.create(
				"<?=CUtil::JSEscape($guid)?>",
				{
					items: <?=CUtil::PhpToJSObject($arResult['ITEMS'])?>,
					containerId: "<?=CUtil::JSEscape($containerID)?>",
					selectorButtonId: "<?=CUtil::JSEscape($selectorButtonID)?>",
					isCustomized: <?=$arResult['IS_CUSTOMIZED'] ? 'true' : 'false'?>,
					enableCreation: <?=$arResult['CAN_CREATE_CATEGORY'] ? 'true' : 'false'?>,
					createUrl: "<?=CUtil::JSEscape($arResult['CATEGORY_CREATE_URL'])?>",
					createLockScript: "<?=CUtil::JSEscape($arResult['CREATE_CATEGORY_LOCK_SCRIPT'])?>"
				}
			);
		}
	);
</script>

