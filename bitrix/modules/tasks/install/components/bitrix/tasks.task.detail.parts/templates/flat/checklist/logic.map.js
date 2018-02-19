{"version":3,"file":"logic.min.js","sources":["logic.js"],"names":["BX","namespace","Tasks","Component","TaskDetailPartsChecklist","checkListItem","itemData","parent","this","vars","ctrls","data","can","MODIFY","REMOVE","TOGGLE","tData","clone","CHECKED","isComplete","READONLY","APPEARANCE","isSeparatorValue","TITLE","mode","scope","getNodeByTemplate","mergeEx","prototype","blockRedraw","title","flag","IS_COMPLETE","redraw","sortIndex","index","SORT_INDEX","parseInt","id","ID","number","num","isNaN","control","innerHTML","overwriteHtml","TITLE_HTML","util","htmlspecialchars","titleTmp","value","toString","destruct","remove","isSeparator","setAppearance","app","dropCSSFlags","setCSSFlag","setEditMode","setReadMode","applyTitleChange","handleDelete","replace","match","setCSSMode","e","checked","Util","Widget","extend","sys","code","options","autoSync","taskId","taskCanEdit","methods","construct","callConstruct","items","newIncrement","syncLock","dd","DragAndDrop","createFlying","delegate","node","itemId","item","autoMarkItemAfter","autoMarkZoneTopBottom","bindDropZone","instances","dragNDrop","query","bindEvents","load","option","bindDelegateControl","passCtx","setItemEdit","setItemCancel","setItemApply","setItemToggle","setItemApplyOnKeydown","newItemOpenForm","newItemCloseForm","newItemAdd","newItemTitleKeydown","onCompleteToggle","newSeparatorAdd","bindEvent","itemRelocated","listNode","nodeScope","itemInst","acts","toComplete","push","afterItemId","after","getOngoingItemByGreatestSortIndex","afterId","sync","shiftSortIndexes","getSortedItemList","newArr","k","length","i","btn","getInstanceByNode","getQuery","deleteItem","confirm","message","way","ctx","isEnter","PreventDefault","itemScope","controlP","type","isElementNode","Query","addItem","params","bindNode","handle","controlAll","unBindNode","syncAddItem","onAdd","onToggle","TASK_ID","todo","callback","syncToggle","isFunction","DoNothing","q","self","apply","m","args","rp","execute","done","errors","result","call","ix","sort","a","b","redrawControls","complete","total","showControlIf","completeCounters","redrawPool","ongoingPool","create","completePool","append","moveNodePool","from","to","childNodes","isPlainObject","cnt","ACTION","max","maxItemId","getGreatestSortIndex","switchControl","focus","makeItemData","RESULT","DATA","disable","enable","text","toggleClass","condition","addClass","removeClass","count"],"mappings":"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"}