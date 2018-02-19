<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

$defaultMenuTarget = SITE_TEMPLATE_ID === "bitrix24" ? "above_pagetitle" : "task_menu";
$isBitrix24Template = SITE_TEMPLATE_ID === "bitrix24";

if ($isBitrix24Template)
{
	$this->SetViewTarget('inside_pagetitle');
}

if (!isset($arParams['MENU_GROUP_ID']))
{
	$arParams['MENU_GROUP_ID'] = $arParams['GROUP_ID'];
}

if (isset($arParams['FILTER']) && is_array($arParams['FILTER']))
{
	$selectors = array();

	foreach ($arParams['FILTER'] as $filterItem)
	{
		if (!(isset($filterItem['type']) &&
			  $filterItem['type'] === 'custom_entity' &&
			  isset($filterItem['selector']) &&
			  is_array($filterItem['selector']))
		)
		{
			continue;
		}

		$selector = $filterItem['selector'];
		$selectorType = isset($selector['TYPE']) ? $selector['TYPE'] : '';
		$selectorData = isset($selector['DATA']) && is_array($selector['DATA']) ? $selector['DATA'] : null;
		$selectorData['MODE'] = $selectorType;
		$selectorData['MULTI'] = $filterItem['params']['multiple'] && $filterItem['params']['multiple'] == 'Y';

		if (!empty($selectorData) && $selectorType == 'user')
		{
			$selectors[] = $selectorData;
		}
		if (!empty($selectorData) && $selectorType == 'group')
		{
			$selectors[] = $selectorData;
		}
	}

	if (!empty($selectors))
	{
		\CUtil::initJSCore(
			array(
				'tasks_integration_socialnetwork'
			)
		);
	}

	if (!empty($selectors))
	{
		?>
		<script type="text/javascript"><?
		foreach ($selectors as $groupSelector)
		{
			$selectorID = $groupSelector['ID'];
			$selectorMode = $groupSelector['MODE'];
			$fieldID = $groupSelector['FIELD_ID'];
			$multi = $groupSelector['MULTI'];
			?>BX.ready(
				function()
				{
					BX.FilterEntitySelector.create(
						"<?= \CUtil::JSEscape($selectorID)?>",
						{
							fieldId: "<?= \CUtil::JSEscape($fieldID)?>",
							mode: "<?= \CUtil::JSEscape($selectorMode)?>",
							multi: <?= $multi ? 'true' : 'false'?>
						}
					);
				}
			);<?
			}
			?></script><?
	}
}
?>
<? if (!$isBitrix24Template): ?>

	<div class="tasks-interface-filter-container">
		<? endif ?>

		<div
			class="pagetitle-container<? if (!$isBitrix24Template): ?> pagetitle-container-light<? endif ?> pagetitle-flexible-space">
			<? $APPLICATION->IncludeComponent(
				"bitrix:main.ui.filter",
				"",
				array(
					"FILTER_ID"             => $arParams["FILTER_ID"],
					"GRID_ID"               => $arParams["GRID_ID"],
					"FILTER"                => $arParams["FILTER"],
					"FILTER_PRESETS"        => $arParams["PRESETS"],
					"ENABLE_LABEL"          => true,
					'ENABLE_LIVE_SEARCH'    => $arParams['USE_LIVE_SEARCH'] == 'Y',
					'RESET_TO_DEFAULT_MODE' => true
				),
				$component,
				array("HIDE_ICONS" => true)
			); ?>
		</div>

		<? if ($arParams['USE_GROUP_SELECTOR'] == 'Y'): ?>
			<?
			$containerID = 'tasks_group_selector';
			if (isset($arResult['GROUPS'][$arParams['GROUP_ID']]))
			{
				$currentGroup = $arResult['GROUPS'][$arParams['GROUP_ID']];
				unset($arResult['GROUPS'][$arParams['GROUP_ID']]);
			}
			else
			{
				$currentGroup = array(
					'id'   => 'wo',
					'text' => \GetMessage('TASKS_BTN_GROUP_WO')
				);
			}
			?>

			<div class="pagetitle-container pagetitle-flexible-space">
				<div id="<?=htmlspecialcharsbx($containerID)?>"
					 class="tasks-interface-toolbar-button-container">
					<div class="webform-small-button webform-small-button-transparent webform-small-button-dropdown">
						<span class="webform-small-button-text"
							  id="<?=htmlspecialcharsbx($containerID)?>_text">
								<?=htmlspecialcharsbx($currentGroup['text'])?>
							</span>
						<span class="webform-small-button-icon"></span>
					</div>
				</div>
			</div>


			<script type="text/javascript">
				BX.ready(
					function()
					{
						BX.TasksGroupsSelectorInit({
							groupId: <?= intval($arParams['GROUP_ID'])?>,
							selectorId: "<?= \CUtil::JSEscape($containerID)?>",
							buttonAddId: "tasks-buttonAdd",
							pathTaskAdd: "<?= \CUtil::JSEscape(\CComponentEngine::makePathFromTemplate(
													$arParams['MENU_GROUP_ID'] > 0
													? $arParams['PATH_TO_GROUP_TASKS_TASK']
													: $arParams['PATH_TO_USER_TASKS_TASK'],
													array(
														'action'   => 'edit',
														'task_id'  => 0,
														'user_id'  => $arResult['USER_ID'],
														'group_id' => $arParams['MENU_GROUP_ID']
													)
												))?>",
							groups: <?= \CUtil::PhpToJSObject(array_values($arResult['GROUPS']))?>,
							currentGroup: <?= \CUtil::PhpToJSObject($currentGroup)?>,
							groupLimit: <?= intval($arParams['GROUP_SELECTOR_LIMIT'])?>,
							messages: {
								TASKS_BTN_GROUP_WO: "<?= \GetMessageJS('TASKS_BTN_GROUP_WO')?>",
								TASKS_BTN_GROUP_SELECT: "<?= \GetMessageJS('TASKS_BTN_GROUP_SELECT')?>"
							}
						});
					}
				);
			</script>
		<? endif; ?>

		<div class="pagetitle-container pagetitle-align-right-container">

			<?php if ($arParams['SHOW_USER_SORT'] == 'Y' ||
					  $arParams['USE_GROUP_BY_SUBTASKS'] == 'Y' ||
					  $arParams['USE_GROUP_BY_GROUPS'] == 'Y' ||
					  $arParams['USE_EXPORT'] == 'Y' ||
					  !empty($arParams['POPUP_MENU_ITEMS'])
			): ?>
				<div id="tasks-popupMenuOptions"
					 class="webform-small-button webform-small-button-transparent webform-cogwheel">
					<span class="webform-button-icon"></span>
				</div>
			<?php endif ?>

			<? if ($arParams["SHOW_QUICK_FORM_BUTTON"] != "N"): ?>
				<span
					class="webform-small-button webform-small-button-transparent tasks-quick-form-button"
					id="task-quick-form-button"
					title="<?=GetMessage("TASKS_ADD_QUICK_TASK")?>"
				>
			<span class="webform-small-button-icon"></span>
		</span>
			<? endif ?>

			<?php
			$taskUrlTemplate = $arParams['MENU_GROUP_ID'] > 0 ? $arParams['PATH_TO_GROUP_TASKS_TASK']
				: $arParams['PATH_TO_USER_TASKS_TASK'];
			$taskTemplateUrlTemplate = $arParams['PATH_TO_USER_TASKS_TEMPLATES'];
			$taskTemplateUrlTemplateAction = $arParams['PATH_TO_USER_TASKS_TEMPLATES_ACTION'];
			?>

			<?php
			if($arParams['MENU_GROUP_ID'] == 0 || $arParams['SHOW_CREATE_TASK_BUTTON'] != 'N'):
			?>
			<span
				class="webform-small-button-separate-wrap">
				<?/*
					<a href="<?=CComponentEngine::makePathFromTemplate(
						$taskUrlTemplate,
						array(
							'action'   => 'edit',
							'task_id'  => 0,
							'user_id'  => $arResult['USER_ID'],
							'group_id' => $arParams['MENU_GROUP_ID']
						)
					)?>" class="webform-small-button webform-small-button-blue tasks-add-button-icon-plus">&#x0002B;</a>
				*/?>
			<a href="<?=CComponentEngine::makePathFromTemplate(
				$taskUrlTemplate,
				array(
					'action'   => 'edit',
					'task_id'  => 0,
					'user_id'  => $arResult['USER_ID'],
					'group_id' => $arParams['MENU_GROUP_ID']
				)
			)?>"
			   class="webform-small-button webform-small-button-blue" id="tasks-buttonAdd"><?=GetMessage('TASKS_BTN_ADD_TASK')?></a>
			<span id="tasks-popupMenuAdd" class="webform-small-button-right-part"></span>
		</span>
			<?php endif?>
		</div>

		<? if (!$isBitrix24Template): ?>
	</div>
<? endif ?>

<?php if ($arParams['SHOW_USER_SORT'] == 'Y' ||
		  $arParams['USE_GROUP_BY_SUBTASKS'] == 'Y' ||
		  $arParams['USE_GROUP_BY_GROUPS'] == 'Y' ||
		  $arParams['USE_EXPORT'] == 'Y' ||
		  !empty($arParams['POPUP_MENU_ITEMS'])
): ?>
	<script type="text/javascript">
		(function()
		{
			var menuItemsOptions = [];
			var columnId = '<?=$arParams['SORT_FIELD']?>';
			var columnDir = '<?=$arParams['SORT_FIELD_DIR']?>';

			BX.addCustomEvent('BX.Main.grid:sort', function(column, grid)
			{
				if (BX.type.isNotEmptyString(column.sort_by))
				{
					columnId = column.sort_by;

				}
				if (BX.type.isNotEmptyString(column.sort_order))
				{
					columnDir = column.sort_order;
				}
			});

			<?php if($arParams['USE_GROUP_BY_SUBTASKS'] == 'Y'):?>
			<?php
			$instance = \CTaskListState::getInstance(\Bitrix\Tasks\Util\User::getId());
			$state = $instance->getState();
			$submodes = $state['SUBMODES'];
			$groupBySubTasks = $submodes['VIEW_SUBMODE_WITH_SUBTASKS']['SELECTED'] == 'Y';
			?>
			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				text: '<?=$submodes['VIEW_SUBMODE_WITH_SUBTASKS']['TITLE']?>',
				className: "<?=$groupBySubTasks ? 'menu-popup-item-accept' : 'menu-popup-item-none'?>",
				onclick: function(event, item)
				{
					var query = new BX.Tasks.Util.Query({
						autoExec: true
					});
					query.add('ui.listcontrols.togglegroupbytasks', {}, {}, BX.delegate(function(errors, data)
					{
						if (!errors.checkHasErrors())
						{
							if (BX.hasClass(item.layout.item, "menu-popup-item-accept"))
							{
								BX.removeClass(item.layout.item, "menu-popup-item-accept");
								BX.addClass(item.layout.item, "menu-popup-item-none");
							}
							else
							{
								BX.addClass(item.layout.item, "menu-popup-item-accept");
								BX.removeClass(item.layout.item, "menu-popup-item-none");
							}

							if (BX.Main.gridManager)
							{
								BX.Main.gridManager.getById('<?=Bitrix\Tasks\Ui\Filter\Task::getFilterId(
								)?>').instance.reloadTable();
							}
							else
							{
								top.BX.reload(true);
							}
						}
					}));
				}

			});
			<?php endif?>

			<?php if($arParams['USE_GROUP_BY_GROUPS'] == 'Y'):?>
			<?php
			$instance = \CTaskListState::getInstance(\Bitrix\Tasks\Util\User::getId());
			$state = $instance->getState();
			$submodes = $state['SUBMODES'];
			$groupBySubTasks = $submodes['VIEW_SUBMODE_WITH_GROUPS']['SELECTED'] == 'Y';
			?>
			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				text: '<?=$submodes['VIEW_SUBMODE_WITH_GROUPS']['TITLE']?>',
				className: "<?=$groupBySubTasks ? 'menu-popup-item-accept' : 'menu-popup-item-none'?>",
				onclick: function(event, item)
				{
					var query = new BX.Tasks.Util.Query({
						autoExec: true
					});
					query.add('ui.listcontrols.togglegroupbygroups', {}, {}, BX.delegate(function(errors, data)
					{
						if (!errors.checkHasErrors())
						{
							if (BX.hasClass(item.layout.item, "menu-popup-item-accept"))
							{
								BX.removeClass(item.layout.item, "menu-popup-item-accept");
								BX.addClass(item.layout.item, "menu-popup-item-none");
							}
							else
							{
								BX.addClass(item.layout.item, "menu-popup-item-accept");
								BX.removeClass(item.layout.item, "menu-popup-item-none");
							}

							if (BX.Main.gridManager)
							{
								BX.Main.gridManager.getById('<?=Bitrix\Tasks\Ui\Filter\Task::getFilterId(
								)?>').instance.reloadTable();
							}
							else
							{
								top.BX.reload(true);
							}
						}
					}));
				}

			});
			<?php endif?>

			<?php if($arParams['SHOW_USER_SORT'] == 'Y'):?>

			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				delimiter: true
			});

			<?php
			$sortFields = \Bitrix\Tasks\Ui\Controls\Column::getFieldsForSorting();
			?>

			menuItemsOptions.push({
				id: "popupMenuOptionsSort",
				text: '<?=GetMessageJS('TASKS_USER_SORT')?>',
				className: "menu-popup-item-none menu-popup-sort",
				events: {
					onSubMenuShow: function()
					{
						var className = 'menu-popup-item-accept';

						this.getSubMenu().getMenuItems().forEach(function(item)
						{
							if (item.className != undefined && item.className.indexOf('menu-popup-item-sort-field') >= 0)
							{
								if (columnId === item.value)
								{
									BX.addClass(item.getLayout().item, className);
								}
								else
								{
									BX.removeClass(item.getLayout().item, className);
								}
							}

							if (columnId == 'SORTING')
							{
								if (item.getId() === "delimiterDir"
									|| (item.className != undefined && item.className.indexOf('menu-popup-item-sort-dir') >= 0))
								{
									item.getLayout().item.classList.add('menu-popup-item-display-none');
								}
							}
							else
							{
								BX.removeClass(item.getLayout().item, 'menu-popup-item-display-none');
							}

							if (item.className != undefined && item.className.indexOf('menu-popup-item-sort-dir') >= 0)
							{
								if (columnDir === item.value)
								{
									BX.addClass(item.getLayout().item, className);
								}
								else
								{
									BX.removeClass(item.getLayout().item, className);
								}
							}
						});
					}
				},
				items: [
					<?php foreach($sortFields as $sortField):?>
					{
						text: '<?=GetMessageJS('TASKS_BTN_SORT_'.$sortField)?>',
						value: '<?=$sortField?>',
						className: "menu-popup-item-sort-field menu-popup-item-none",
						onclick: function(event, menuItem)
						{
							columnId = menuItem.value;

							BX.Tasks.SortManager.setSort(columnId, columnDir, '<?=$arParams['GRID_ID']?>');
						}
					},
					<?php if($sortField == 'SORTING'):?>
					{
						tabId: "popupMenuOptions",
						delimiter: true
					},
					<?php endif?>
					<?php endforeach?>
					{
						tabId: "popupMenuOptions",
						id: 'delimiterDir',
						delimiter: true
					},
					{
						tabId: "popupMenuOptions",
						className: "menu-popup-item-sort-dir menu-popup-item-accept",
						text: "<?=GetMessageJS('TASKS_BTN_SORT_DIR_ASC')?>",
						value: 'asc',
						onclick: function(event, menuItem)
						{
							columnDir = menuItem.value;
							BX.Tasks.SortManager.setSort(columnId, columnDir, '<?=$arParams['GRID_ID']?>');
						}
					},
					{
						tabId: "popupMenuOptions",
						className: "menu-popup-item-sort-dir menu-popup-item-none",
						text: "<?=GetMessageJS('TASKS_BTN_SORT_DIR_DESC')?>",
						value: 'desc',
						onclick: function(event, menuItem)
						{
							columnDir = menuItem.value;
							BX.Tasks.SortManager.setSort(columnId, columnDir, '<?=$arParams['GRID_ID']?>');
						}
					}
				]
			});
			<?php endif?>

			<?php if($arParams['USE_EXPORT'] == 'Y'):?>
			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				delimiter: true
			});

//			menuItemsOptions.push({
//				tabId: "popupMenuOptions",
//				text: '<?//=GetMessageJS('TASKS_BTN_IMPORT')?>//',
//				className: "menu-popup-item-none",
//				items: [
//					{
//						tabId: "popupMenuOptions",
//						text: '<?//=GetMessageJS('TASKS_BTN_IMPORT_CSV')?>//',
//						className: "tasks-interface-filter-icon-excel",
//						href: '<?//=$arParams['PATH_TO_TASKS']?>//import/'
//					}
//				]
//			});
			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				text: '<?=GetMessageJS('TASKS_BTN_EXPORT')?>',
				className: "<?=$groupBySubTasks ? 'menu-popup-item-none' : 'menu-popup-item-none'?>",
				items: [
					{
						tabId: "popupMenuOptions",
						text: '<?=GetMessageJS('TASKS_BTN_EXPORT_EXCEL')?>',
						className: "tasks-interface-filter-icon-excel",
						href: '<?=$arParams['PATH_TO_TASKS']?>?EXPORT_AS=EXCEL&ncc=1'
					}
				]
			});

			menuItemsOptions.push({
				tabId: "popupMenuOptions",
				text: '<?=GetMessageJS('TASKS_BTN_SYNC')?>',
				className: "<?=$groupBySubTasks ? 'menu-popup-item-none' : 'menu-popup-item-none'?>",
				items: [
					{
						tabId: "popupMenuOptions",
						text: '<?=GetMessageJS('TASKS_BTN_SYNC_OUTLOOK')?>',
						className: "tasks-interface-filter-icon-outlook",
						onclick: function(event, item)
						{
							<?=CIntranetUtils::GetStsSyncURL(array('LINK_URL' => $arParams['PATH_TO_TASKS']), 'tasks')?>
						}
					}
				]
			});
			<?php endif?>

			<?if (!empty($arParams['POPUP_MENU_ITEMS'])):?>
				<?foreach ($arParams['POPUP_MENU_ITEMS'] as $menuItem):?>
				menuItemsOptions.push({
					tabId: "<?= isset($menuItem['tabId']) ? $menuItem['tabId'] : ''?>",
					text: "<?= isset($menuItem['text']) ? $menuItem['text'] : ''?>",
					href: "<?= isset($menuItem['href']) ? $menuItem['href'] : ''?>",
					className: "<?= isset($menuItem['className']) ? $menuItem['className'] : ''?>",
					onclick: <?= isset($menuItem['onclick']) ? $menuItem['onclick'] : '""'?>,
					params: <?= isset($menuItem['params']) ? $menuItem['params'] : '{}'?>
				});
				<?endforeach;?>
			<?endif;?>

			var buttonRect = BX("tasks-popupMenuOptions").getBoundingClientRect();
			var menu = BX.PopupMenu.create(
				"popupMenuOptions",
				BX("tasks-popupMenuOptions"),
				menuItemsOptions,
				{
					closeByEsc: true,
					offsetLeft: buttonRect.width / 2,
					angle: true
				}
			);

			BX.bind(BX("tasks-popupMenuOptions"), "click", BX.delegate(function()
			{
				if (BX.data(BX("tasks-popupMenuOptions"), "disabled") !== true)
				{
					menu.popupWindow.show();
				}
			}, this));
		})();
	</script>
<?php endif ?>

	<script type="text/javascript">
		(function()
		{
			<?php
			if($arParams['MENU_GROUP_ID'] == 0 || $arParams['SHOW_CREATE_TASK_BUTTON'] != 'N'):
			?>
				var menuItemsLists = [];

				menuItemsLists.push({
					tabId: "popupMenuAdd",
					text: "<?= GetMessageJS('TASKS_BTN_ADD_TASK')?>",
					href: "<?= CComponentEngine::makePathFromTemplate(
						$taskUrlTemplate,
						array(
							'action'   => 'edit',
							'task_id'  => 0,
							'user_id'  => $arResult['USER_ID'],
							'group_id' => $arParams['MENU_GROUP_ID']
						)
					)?>"
				});

				menuItemsLists.push({
					tabId: "popupMenuAdd",
					text: "<?= GetMessageJS('TASKS_BTN_ADD_TASK_BY_TEMPLATE')?>",
					href: "",
					className: "menu-popup-no-icon menu-popup-item-submenu",
					events: {
						onSubMenuShow: function()
						{

							if (this.subMenuLoaded)
							{
								return;
							}

							var query = new BX.Tasks.Util.Query({
								autoExec: true
							});

							var submenu = this.getSubMenu();
							submenu.removeMenuItem("loading");

							query.add('task.template.find', { parameters: { select: ['ID', 'TITLE'] } }, {}, BX.delegate(function(errors, data)
							{

								this.subMenuLoaded = true;

								if (!errors.checkHasErrors())
								{

									var tasksTemplateUrlTemplate = '<?=CComponentEngine::makePathFromTemplate(
										$taskUrlTemplate,
										array(
											'action'   => 'edit',
											'task_id'  => 0,
											'user_id'  => $arResult['USER_ID'],
											'group_id' => $arParams['MENU_GROUP_ID']
										)
									)?>';

									var subMenu = [];
									if (data.RESULT.DATA.length > 0)
									{
										BX.Tasks.each(data.RESULT.DATA, function(item, k)
										{
											subMenu.push({
												text: BX.util.htmlspecialchars(item.TITLE),
												href: tasksTemplateUrlTemplate + '?TEMPLATE=' + item.ID
											});
										}.bind(this));
									}
									else
									{
										subMenu.push({ text: '<?=GetMessageJS('TASKS_AJAX_EMPTY_TEMPLATES')?>' });
									}
									this.addSubMenu(subMenu);
									this.showSubMenu();
								}
								else
								{
									this.addSubMenu([
										{ text: '<?=GetMessageJS('TASKS_AJAX_ERROR_LOAD_TEMPLATES')?>' },
									]);

									this.showSubMenu();
								}

							}, this));
						}
					},
					items: [
						{
							id: "loading",
							text: "<?=GetMessageJS('TASKS_AJAX_LOAD_TEMPLATES')?>"
						}
					]
				});

				menuItemsLists.push({
					tabId: "popupMenuAdd",
					delimiter: true
				});

				menuItemsLists.push({
					tabId: "popupMenuAdd",
					text: "<?= GetMessageJS('TASKS_BTN_LIST_TASK_TEMPLATE')?>",
					href: "<?= CComponentEngine::makePathFromTemplate(
						$taskTemplateUrlTemplate,
						array('user_id' => $arResult['USER_ID'])
					)?>",
					target: '_top'
				});


				var buttonRect = BX("tasks-popupMenuAdd").getBoundingClientRect();
				var menu = BX.PopupMenu.create(
					"popupMenuAdd",
					BX("tasks-popupMenuAdd"),
					menuItemsLists,
					{
						closeByEsc: true,
						offsetLeft: buttonRect.width / 2,
						angle: true
					}
				);
			<?php endif?>

			BX.bind(BX("tasks-popupMenuAdd"), "click", BX.delegate(function()
			{
				menu.popupWindow.show();
			}, this));

		})();
	</script>
<?php

if ($isBitrix24Template)
{
	$this->EndViewTarget();
}