{"version":3, "file":"page_0e924a3df03ad7d4be216ed003a35059.js", "sections": [{"offset": { "line": 2, "column": 0 }, "map": {"version":3,"file":"/bitrix/components/bitrix/news/templates/.default/bitrix/forum.topic.reviews/.default/script.min.js","sources":["/bitrix/components/bitrix/news/templates/.default/bitrix/forum.topic.reviews/.default/script.js"],"names":["window","BX","namespace","FTRList","params","this","id","form","mess","ii","length","bind","preorder","pageNumber","pageCount","addCustomEvent","delegate","add","pageNumberInput","elements","create","props","type","name","appendChild","value","pageCountInput","findChild","attr","input_pageno","remove","prototype","result","container","listform","post","className","msgNode","fTextToNode","message","attrs","children","fReplaceOrInsertNode","document","parentNode","navigation","navDIV","i","navPlaceholders","findChildren","insertBefore","tmpDiv","nextSibling","nodeType","bottomPager","innerHTML","firstChild","fRunScripts","node","author","getAttribute","buttons","tagName","func","res","proxy_context","act","func2","func3","adjust","events","click","bx-href","href","DoNothing","selection","GetSelection","replace","videoWMV","str","p1","rWmv","exec","rFlv","search","regexReplaceTableTag","s","tag","replacement","re_match","RegExp","re_replace","ij","browser","IsIE","onCustomEvent","text","confirm","link","tbl","findParent","note","replyActionDone","show","hide","ajax","loadJSON","AJAX_CALL","sessid","bitrix_sessid","status","curpage","top","location","fx","time","callback_complete","reviews","class","reload","bHidden","hasClass","label","tbldiv","toggleClass","setAttribute","style","addClass","FTRForm","d","editor","windowEvents","messageMax","onsuccess","onfailure","submit","isAjax","oCaptcha","Captcha","proxy","Show","ready","Update","quote","paste","transverse","e","validate","prepareForm","disableButtons","send","PreventDefault","state","arr","getElementsByTagName","disabled","SaveContent","errors","Message","GetContent","MessageLength","MessageMax","TITLE","alert","busy","submitAjax","method","url","action","dataType","get","clear","previewDIV","previewParent","previewNode","PostFormAjaxStatus","scrollToNode","CheckAndReInit","fAutosave","pEditorDocument","Init","fileDIV","fileINPUT","fileINPUT1","index","clone","removeChild","attachLink","attachNote","captchaIMAGE","captchaHIDDEN","captchaINPUT","captchaDIV","getCaptcha","src","attribute","setTimeout","Focus","defer","display","GetViewMode","SetBxTag","bbCode","actions","setExternalSelection","Exec","doc","GetIframeDoc","range","GetRange","mention","util","htmlspecialcharsback","spaceNode","html","InsertNode","parentMention","body","InsertAfter","SetAfter","textareaView","WrapWith","OnEditorInitedAfterEvents","Forum","event1","event","pop","removeCustomEvent","OnEditorInitedAfter","push","lheId","insertImageAfterUpload","posts","all","scrollWidth","offsetWidth","tmpdiv","childNodes","arNote","msgBox","statusDIV","beforeDivs","tmp","insert","SetReviewsAjaxPostTmp","forumAjaxPostTmp","sourceNode","targetNode","parentTargetNode","beforeTargetNode","nextNode","isDomNode","isArray","msg","ob","processHTML","processScripts","SCRIPT","ShowLastEditReason","checked","div","AttachFile","iNumber","iCount","sIndex","oObj","element","bFined","parseInt","getElementById","bHide","getSelection","toString","createRange"],"mappings":"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"}}]}