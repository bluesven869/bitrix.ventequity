<?php
/**
 * Thurly Framework
 * @package bitrix
 * @subpackage main
 * @copyright 2001-2012 Thurly
 */

namespace Bitrix\Main\Entity;

/**
 * Entity field class for integer data type
 * @package bitrix
 * @subpackage main
 */
class IntegerField extends ScalarField
{
	public function convertValueToDb($value)
	{
		return $this->getConnection()->getSqlHelper()->convertToDbInteger($value);
	}
}