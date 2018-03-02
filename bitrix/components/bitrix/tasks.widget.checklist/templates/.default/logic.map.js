{"version":3,"file":"logic.min.js","sources":["logic.js"],"names":["BX","namespace","Tasks","Component","TasksWidgetCheckList","extend","sys","code","options","confirmDelete","methods","construct","this","callConstruct","getManager","subInstance","manager","constructor","ItemManager","scope","data","option","preRendered","enableSync","entityRoute","entityId","bindEvent","onManagerChange","bind","bindEvents","bindControl","onCompleteTogglerClick","complete","control","toggleCompleted","hasClass","order","total","completed","index","number","each","item","isSeparator","isChecked","NUMBER","SORT","SORT_INDEX","sort","innerHTML","controlAll","showHideCompleted","way","changeCSSFlag","Util","fadeSlideToggleByClass","count","openForm","openAddForm","ItemSet","controlBind","itemFx","useDragNDrop","callMethod","onAddSeparatorClick","vars","formInitialized","bindItemActions","bindOnItemEx","onItemToggleClick","onItemToggleChange","onItemEditClick","onItemApplyClick","onItemNewTitleKeyPress","bindDNDDropZones","dd","arguments","bindDropZone","onDragNDropItemRelocatedAfter","p","node","neigbours","getItemByNode","acts","wasChecked","nowChecked","zone","push","id","value","afterItem","after","findLastUnCheckedItem","afterId","getSyncer","perform","onItemDeleteByCross","isEditMode","toggleItemMode","args","message","then","deleteItemRemote","apply","e","isLockedCheck","eventReturnFalse","Window","event","checkSync","getStriker","toggle","insertItemBefore","findItemBefore","isEnter","beforeItem","amongComplete","Promise","container","disappear","append","insertBefore","appear","resolve","fireEvent","reject","before","last","first","max","lastItemId","get","form","onFormCloseClick","onFormSubmitClick","onFormTitleKeyPress","addItemByForm","clearForm","toggleForm","focusForm","addItemRemote","makeItemData","title","length","opts","util","htmlspecialchars","lockInput","_OWNER_ENTITY_ID_","TITLE","result","res","getData","RESULT","DATA","ID","VALUE","parseInt","DISPLAY","addItem","unLockInput","focus","disable","enable","toggleMode","htmlspecialcharsback","text","indexes","getGreatestSort","CHECKED","ACTION_UPDATE","ACTION_DELETE","ACTION_TOGGLE","getItemClass","Item","Striker","duration","postTimeout","Sync","enabled","routePrefix","getItemDeleteControlId","modeEdit","setCSSMode","display","isSeparatorValue","APPEARANCE","flag","IS_COMPLETE","checked","cValue","parent","unStrike","checkLocked","methodsStatic","extractValue","Math","abs","hashCode","random","toString","prepareDataSt","READONLY","CHECKED_ATTRIBUTE","DISABLED_ATTRIBUTE","STROKE_CSS","ITEM_SET_INVISIBLE","replace","match","textChunkSize","animations","prototype","addAnimation","animation","key","getAnimation","removeAnimation","anim","clearTimeout","timer","pr","fulfill","getAnimationKeyByBlock","block","found","cbOn","cbOff","aKey","strike","cancelStrikeAnimation","partCnt","childNodes","textParts","k","m","nextNode","nodeType","Node","TEXT_NODE","strSplit","textContent","create","removeChild","finalLength","tmOut","floor","nextStep","setTimeout","addClass","clearStrike","removeClass","str","len","parts","sub","i","substr","slice","prefix","sLock","query","getQuery","Query","todo","q","rp","load","execute","call"],"mappings":"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"}