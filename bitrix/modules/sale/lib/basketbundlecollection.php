<?php
/**
 * Thurly Framework
 * @package bitrix
 * @subpackage sale
 * @copyright 2001-2012 Thurly
 */
namespace Bitrix\Sale;

use Bitrix\Sale\Internals;

class BasketBundleCollection
	extends Basket
{
	/** @var null|BasketItem */
	protected $parentBasketItem = null;

	/**
	 * @param BasketItem $basketItem
	 */
	public function setParentBasketItem(BasketItem $basketItem)
	{
		$this->parentBasketItem = $basketItem;
	}

	/**
	 * @return BasketItem|null
	 */
	public function getParentBasketItem()
	{
		return $this->parentBasketItem;
	}

	/**
	 * @return Basket
	 */
	protected static function createBasketObject()
	{
		$registry = Registry::getInstance(Registry::REGISTRY_TYPE_ORDER);
		$basketClassName = $registry->getBundleBasketClassName();

		return new $basketClassName;
	}

}
