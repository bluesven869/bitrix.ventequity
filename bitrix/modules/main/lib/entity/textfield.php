<?php
/**
 * Thurly Framework
 * @package bitrix
 * @subpackage main
 * @copyright 2001-2012 Thurly
 */

namespace Bitrix\Main\Entity;

/**
 * Entity field class for text data type
 * @package bitrix
 * @subpackage main
 */
class TextField extends StringField
{
	public function convertValueToDb($value)
	{
		return $this->getConnection()->getSqlHelper()->convertToDbText($value);
	}
}