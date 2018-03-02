<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

/**
 * Thurly vars
 *
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponent $component
 * @var CBitrixComponentTemplate $this
 * @global CMain $APPLICATION
 */


$APPLICATION->IncludeComponent(
	"bitrix:rest.marketplace.localapp.toolbar",
	".default",
	array(
		"COMPONENT_PAGE" => $arParams["COMPONENT_PAGE"],
		"ADD_URL" => $arParams["ADD_URL"],
		"LIST_URL" => $arParams["LIST_URL"],
	),
	$component
);

$APPLICATION->IncludeComponent(
	"bitrix:rest.marketplace.localapp.edit",
	".default",
	array(
		"ID" => $arResult["VARIABLES"]["id"],
		"LIST_URL" => $arParams["LIST_URL"],
		"EDIT_URL_TPL" => $arParams["EDIT_URL_TPL"],
	),
	$component
);