{"version":3,"sources":["bitrix_mobile.js"],"names":["window","app","BXCordovaPlugin","name","sync","convertBoolean","this","pluginName","useSyncPlugin","callbackIndex","callbacks","dataBrigePath","mobileSiteDir","available","platform","apiVersion","db","_that","document","addEventListener","prototype","RegisterCallBack","func","CallBackExecute","index","result","prepareParams","params","convertBooleanFlag","key","clone","obj","copyObject","_obj","i","l","Object","toString","call","length","exec","funcName","pluginParams","BX","proxy","JSON","stringify","syncPlugin","execute","device","toUpperCase","cordova","Cordova","dataBase","create","displayName","capacity","version","notificationBar","action","actionSheet","titleAction","refresh","textPanelAction","showSlidingPanel","changeAccount","showDocumentsCache","showButtonPanel","hideSlidingPanel","hideButtonPanel","showSelectPicker","hideSelectPicker","updateButtonBadge","openBarCodeScanner","openPhotos","removeAllCache","loadPageBlank","loadPageStart","confirm","confirmData","callback","title","text","buttons","accept","navigator","notification","alert","alertData","button","openLeft","setPageTitle","removeTableCache","tableId","table_id","showDatePicker","hideDatePicker","showInput","showInputLoading","loading_status","status","clearInput","hideInput","reload","url","location","href","flipScreen","removeButtons","openBXTable","TABLE_SETTINGS","table_settings","markmode","insertCallback","data","ThurlyMobile","Utils","htmlspecialchars","modal","showtitle","openDocument","showPopupLoader","hidePopupLoader","changeCurPageParams","getPageParams","enableInVersion","menuCreate","menuShow","menuHide","ver","strict","BXMobileAppContext","getApiVersion","appVersion","e","parseInt","checkOpenStatus","asyncRequest","openUrl","onCustomEvent","eventName","where","needPrepare","delegate","params_pre","getVar","passVar","variable","evalVar","Bitrix24Android","receiveStringValue","takePhoto","options","fail","quality","correctOrientation","targetWidth","targetHeight","sourceType","source","mediaType","allowEdit","saveToPhotoAlbum","destinationType","undefined","camera","getPicture","openMenu","showModalDialog","closeModalDialog","closeController","addButtons","openContent","closeMenu","loadPage","page_id","setPageID","pageID","openNewPage","loadMenu","openTable","skipSpecialChars","openUserList","addUserListButton","pullDown","backgroundColor","bodySelector","body","className","querySelector","bodyStyles","getComputedStyle","rgb2hex","rgb","match","slice","color","pullDownLoadingStop","enableScroll","enable_status","enableCaptureKeyboard","enableLoadingScreen","showLoadingScreen","hideLoadingScreen","visibleNavigationBar","visible","visibleToolBar","enableSliderMenu","enable","enableRight","setCounters","counters","setBadge","number","refreshPanelPage","pagename","page","setPanelPages","pages","getToken","dt","token","ajax","post","mobile_action","device_name","model","uuid","device_token","device_type","sessid","bitrix_sessid","BasicAuth","userSuccessCallback","success","userFailCallback","failture","authParams","check_url","parse","sessid_md5","message","logOut","xhr","XMLHttpRequest","open","onreadystatechange","readyState","send","getCurrentLocation","geolocationSuccess","geolocationError","onsuccess","onerror","geolocation","getCurrentPosition","setVibrate","ms","vibrate","bindloadPageBlank","intentLink","hash","target","tagName","findParent","indexOf","autoResizeForm","textarea","pageContainer","maxHeight","formContainer","parentNode","origTextareaHeight","ownerDocument","defaultView","getPropertyValue","origFormContainerHeight","setAttribute","currentTextareaHeight","hiddenTextarea","createElement","style","height","visibility","position","left","appendChild","resize","resizeDelay","value","scrollHeight","bottom","scrollTo","documentElement","setTimeout","resetAutoResize","getAttribute","showHiddenImages","images","getElementsByTagName","image","realImage","isElementVisibleOnScreen","src","element","coords","getElementCoords","windowTop","pageYOffset","scrollTop","windowBottom","clientHeight","top","offsetHeight","topVisible","bottomVisible","isElementVisibleOn2Screens","windowHeight","box","getBoundingClientRect","originTop","originLeft","pageXOffset","type","isString","replace","isArray","fastClick","bindDelegate","elem","isTarget","handler","h","delegateEvent","FastButton","bind","LazyLoad","hidden","error","inited","loaded","types","background","clearImages","showImages","checkOwnVisibility","_initImage","node","isImageVisible","backgroundImage","registerImage","id","isImageVisibleCallback","isNotEmptyString","push","isFunction","registerImages","ids","toLowerCase","getImageById","removeImage","util","deleteFromArray","onScroll","BitrixAnimation","animate","start","finish","propName","progress","state","Math","round","step","animateProgress","Date","delta","transition","transitions","linear","duration","timer","setInterval","clearInterval","complete","delay","makeEaseInOut","makeEaseOut","elastic","pow","cos","PI","quad","cubic","quart","quint","circ","sin","acos","back","bounce","a","b","addCustomEvent","lang","k","active","isAppActive","isBackground","BXMobileApp","pathname","search","UI","Page","set","MobileAjaxWrapper","method","failure_callback","progress_callback","offline","processData","headers","Init","preparePost","callback_failure","callback_progress","callback_loadstart","loadstart_callback","callback_loadend","loadend_callback","Wrap","timeout","dataType","defer","response","bFailed","RepeatRequest","onfailure","errorCode","requestStatus","load_callback","error_callback","abort_callback","auth_data","response_ii","OfflineAlert","DoNothing","BMAjaxWrapper","MobileNetworkStatus","_this","networkState","network","connection","Connection","UNKNOWN","NONE","BMNetworkStatus","addListener","el","listener","useCapture","destroy","removeEventListener","handleEvent","event","attachEvent","detachEvent","isTouch","events","touchEvents","fastButton","onTouchStart","onTouchMove","onClick","stopPropagation","cancelBubble","startX","touches","clientX","startY","clientY","abs","reset","preventDefault","clickbuster","preventGhostClick","x","y","coordinates","pop","splice","returnValue","ReadyDevice"],"mappings":"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","file":""}