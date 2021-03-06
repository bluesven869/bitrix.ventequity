<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/**
 * Thurly Framework
 * @package bitrix
 * @subpackage sale
 * @copyright 2001-2015 Bitrix
 */

/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/** This is alfa version of component! Don't use it! */
/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */


use \Bitrix\Main\Localization\Loc;
use Bitrix\Tasks\Ui\Filter;

Loc::loadMessages(__FILE__);

CBitrixComponent::includeComponentClass("bitrix:tasks.task.list");

class TasksTaskGanttComponent extends TasksTaskListComponent
{
	protected function doPreAction()
	{
		parent::doPreAction();
//		\Bitrix\Tasks\Ui\Filter\Task::getListStateInstance()->setViewMode(\CTaskListState::VIEW_MODE_GANTT);

		return true;
	}

	protected function getPageSize()
	{
		return 50;
	}
	protected function getData()
	{
		parent::getData();

		// TODO ������� ���� ��
		$taskIds = array();
		foreach ($this->arResult[ 'LIST' ] as $item)
		{
			$taskIds[] = $item[ 'ID' ];
		}

		$this->arResult[ "TASKS_LINKS" ] = array();
		$res = \Bitrix\Tasks\Internals\Task\ProjectDependenceTable::getListByLegacyTaskFilter($this->listParameters[ 'legacyFilter' ]);
		while($item = $res->fetch())
		{
			if(in_array($item['TASK_ID'], $taskIds))
			{
				$this->arResult['TASKS_LINKS'][$item['TASK_ID']][] = $item;
			}
		}

		//region GANTT
		$componentObject = null;
		$this->arResult[ "NAV_STRING" ] = $this->arResult[ "NAV_OBJECT" ]->getPageNavStringEx(
			$componentObject, "", "arrows", false, null, Filter\Task::getGridOptions()->GetNavParams()
		);
		//endregion
	}

	protected function getSelect()
	{
		if($this->exportAs != null)
		{
			$columns = array(
				"ID",
				"TITLE",
				"RESPONSIBLE_ID",
				"CREATED_BY",
				"CREATED_DATE",
				"REAL_STATUS",
				"PRIORITY",
				"START_DATE_PLAN",
				"END_DATE_PLAN",
				"DEADLINE",
				"TIME_ESTIMATE",
				"TIME_SPENT_IN_LOGS",
				"CLOSED_DATE",
				"MARK",
				"ADD_IN_REPORT",
				"GROUP_ID"
			);
			return $columns;
		}
		else
		{
			return array('*');
		}
	}
}