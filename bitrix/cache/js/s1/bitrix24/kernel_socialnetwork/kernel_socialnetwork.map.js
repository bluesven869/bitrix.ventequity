{"version":3, "file":"kernel_socialnetwork.js", "sections": [{"offset": { "line": 8, "column": 0 }, "map": {"version":3,"file":"/bitrix/js/socialnetwork/content_view.min.js","sources":["/bitrix/js/socialnetwork/content_view.js"],"names":["BX","window","UserContentView","displayHeight","mobile","ajaxUrl","pathToUserProfile","inited","viewAreaList","lastViewAreaList","viewAreaReadList","viewAreaSentList","viewAreaAverageHeight","viewAreaTimePeriodMin","viewAreaTimePeriodMax","viewAreaTimePeriodAvg","sendViewAreaTimeout","commentsContainerId","commentsClassName","commentsFullContentClassName","currentPopupId","popupList","clear","this","setDisplayHeight","document","documentElement","clientHeight","init","params","addEventListener","throttle","getInViewScope","passive","delegate","type","isPlainObject","isBoolean","isNotEmptyString","browser","SupportLocalStorage","viewedContent","localStorage","get","isArray","addCustomEvent","onUCRecordHasDrawn","OnUCListWasShown","OnUCHasBeenInitializedMobile","setTimeout","sendViewAreaData","getInViewScopeNode","nodeId","node","d","Date","currentTime","parseInt","getTime","i","length","isNodeVisibleOnScreen","xmlId","getXmlId","util","in_array","setRead","id","getAttribute","getSaveValue","found","push","save","eventParams","onCustomEvent","BXMobileApp","coords","getBoundingClientRect","visibleAreaTop","visibleAreaBottom","top","bottom","val","toSendList","request_data","action","sessid","bitrix_sessid","site","message","lang","viewXMLIdList","mobile_action","ajax","url","method","dataType","data","onsuccess","SUCCESS","set","onfailure","registerViewArea","fullContentNode","entityXmlId","ACTION","fn","onUCRecordHasDrawnFunc","fnWeb","debounce","unbind","fnMobile","UI","Page","isVisible","callback","status","bind","containerId","join","viewArea","findChild","tag","className","fullContentArea","ob","container","findChildren","ENTITY_XML_ID","registerViewAreaList","fullContentClassName","liveUpdate","cntNode","CONTENT_ID","cntWrapNode","plusOneNode","create","props","style","width","clientWidth","height","html","insertBefore","firstChild","innerHTML","cleanNode","Counter","contentId","popup","popupTimeoutId","popupContent","hiddenCountNode","popupContentPage","popupShownIdList","prototype","tagName","PULL","extendWatch","popupScroll","clearTimeout","appendChild","list","page","openPopup","itemsCount","hiddenCount","spanTag0","createElement","avatarNode","items","attrs","src","href","target","title","children","replace","adjustWindow","PopupWindow","lightShadow","offsetLeft","autoHide","closeByEsc","zIndex","bindOptions","position","events","onPopupClose","onPopupDestroy","content","setAngle","popupTimeout","close","show","_this","proxy_context","scrollTop","scrollHeight","offsetHeight","unbindAll","forceBindPosition","adjustPosition","command"],"mappings":"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"}},{"offset": { "line": 20, "column": 0 }, "map": {"version":3,"file":"/bitrix/js/socialnetwork/render_parts.min.js","sources":["/bitrix/js/socialnetwork/render_parts.js"],"names":["BX","window","RenderParts","currentUserSonetGroupIdList","mobile","publicSection","init","params","this","getNodeSG","entity","hidden","VISIBILITY","util","in_array","ENTITY_ID","getNodeHiddenDestination","create","attrs","href","LINK","target","text","NAME","getNodeU","props","className","getNodeDR","getNodeTask","length","userId","parseInt","message","getNodeCreateTaskSourceComment","getNodeUA"],"mappings":"CAAA,WACA,GAAIA,GAAKC,OAAOD,EAChB,IAAIA,EAAGE,YACP,CACC,OAGDF,EAAGE,aAEFC,+BACAC,OAAQ,MACRC,cAAe,MAGhBL,GAAGE,YAAYI,KAAO,SAASC,GAE9B,SAAWA,GAAOJ,6BAA+B,YACjD,CACCK,KAAKL,4BAA8BI,EAAOJ,4BAE3C,SAAWI,GAAOF,eAAiB,YACnC,CACCG,KAAKH,gBAAkBE,EAAOF,cAE/BG,KAAKJ,SAAWG,EAAOH,OAGxBJ,GAAGE,YAAYO,UAAY,SAASC,GAEnC,GAAIC,SACID,GAAOE,YAAc,aACzBF,EAAOE,YAAc,kBACpBZ,EAAGa,KAAKC,SAASJ,EAAOK,UAAWP,KAAKL,4BAG7C,IAAIQ,EACJ,CACC,MAAOH,MAAKQ,+BAGb,CACC,OACER,KAAKJ,OACHJ,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,KACbC,OAAQ,UAETC,KAAMZ,EAAOa,OAEZvB,EAAGiB,OAAO,QACXK,KAAMZ,EAAOa,QAMlBvB,GAAGE,YAAYsB,SAAW,SAASd,GAElC,OACEF,KAAKJ,OACHJ,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,MAEdK,OACCC,UAAW,oBAAsBhB,EAAOE,YAAc,WAAa,6BAA+B,KAEnGU,KAAMZ,EAAOa,OAEZvB,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,MAEdE,KAAMZ,EAAOa,OAKjBvB,GAAGE,YAAYyB,UAAY,SAASjB,GAEnC,OACEF,KAAKJ,OACHJ,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,KACbC,OAAQ,UAETC,KAAMZ,EAAOa,OAEZvB,EAAGiB,OAAO,QACXK,KAAMZ,EAAOa,OAKjBvB,GAAGE,YAAY0B,YAAc,SAASlB,GAErC,OACEF,KAAKJ,SACFI,KAAKH,eACNK,EAAOU,KAAKS,OAAS,SACdnB,GAAOE,YAAc,mBACrBF,GAAOE,WAAWkB,QAAU,aACnCC,SAASrB,EAAOE,WAAWkB,SAAWC,SAAS/B,EAAGgC,QAAQ,YAC1DhC,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,KACbC,OAAQ,UAETC,KAAMZ,EAAOa,OAEZvB,EAAGiB,OAAO,QACXK,KAAMZ,EAAOa,OAKjBvB,GAAGE,YAAY+B,+BAAiC,SAASvB,GAExD,OAEGF,KAAKJ,SACFI,KAAKH,eACNK,EAAOU,KAAKS,OAAS,EAEtB7B,EAAGiB,OAAO,KACXC,OACCC,KAAMT,EAAOU,KACbC,OAAQ,UAETC,KAAKtB,EAAGgC,QAAQ,sDAEfhC,EAAGiB,OAAO,QACXK,KAAMtB,EAAGgC,QAAQ,sDAKrBhC,GAAGE,YAAYgC,UAAY,WAE1B,MAAOlC,GAAGiB,OAAO,QAChBK,KAAMtB,EAAGgC,QAAQ,0CAInBhC,GAAGE,YAAYc,yBAA2B,WAEzC,MAAOhB,GAAGiB,OAAO,QAChBK,KAAMtB,EAAGgC,QAAQ"}},{"offset": { "line": 24, "column": 0 }, "map": {"version":3,"file":"/bitrix/js/socialnetwork/comment_aux.min.js","sources":["/bitrix/js/socialnetwork/comment_aux.js"],"names":["BX","window","CommentAux","init","params","RenderParts","getLiveText","type","result","length","message","replace","this","getShareList","taskId","parseInt","taskName","sourceEntityType","sourceEntityId","task","renderEntity","ENTITY_TYPE","NAME","LINK","VISIBILITY","userId","taskResponsibleId","sourceComment","sourceEntityLink","messageType","isEnabledKeepVersion","userGender","renderedShareList","ii","hasOwnProperty","push","join","entity","getNodeU","getNodeUA","getNodeSG","getNodeDR","getNodeTask","getNodeCreateTaskSourceComment","tmp","create","children","innerHTML","cleanNode"],"mappings":"CAAA,WAEA,GAAIA,GAAKC,OAAOD,EAChB,IAAIA,EAAGE,WACP,CACC,OAGDF,EAAGE,aAIHF,GAAGE,WAAWC,KAAO,SAASC,GAE7BJ,EAAGK,YAAYF,KAAKC,GAGrBJ,GAAGE,WAAWI,YAAc,SAASC,EAAMH,GAE1C,GAAII,GAAS,EACb,IAAID,GAAQ,QACZ,CACC,SACQH,IAAU,UACdA,EAAOK,OAAS,EAEpB,CACCD,EAASR,EAAGU,QAAQN,EAAOK,QAAU,EAAI,iCAAmC,mCAC5ED,GAASA,EAAOG,QAAQ,eAAgBC,KAAKC,aAAaT,SAGvD,IAAIG,GAAQ,aACjB,CACC,SACQH,IAAU,gBACPA,GAAOU,QAAU,aACxBC,SAASX,EAAOU,QAAU,SACnBV,GAAOY,UAAY,aAC1BZ,EAAOY,SAASP,OAAS,SAClBL,GAAOa,kBAAoB,aAClCb,EAAOa,iBAAiBR,OAAS,SAC1BL,GAAOc,gBAAkB,aAChCH,SAASX,EAAOc,gBAAkB,EAEtC,CACC,GAAIC,GAAOP,KAAKQ,cACfC,YAAa,OACbC,KAAMlB,EAAOY,SACbO,KAAM,GACNC,YACCC,aAAgBrB,GAAOsB,mBAAqB,aAAeX,SAASX,EAAOsB,mBAAqB,EAAIX,SAASX,EAAOsB,mBAAqB,IAI3I,IAAItB,EAAOa,kBAAoB,YAC/B,CACCT,EAASR,EAAGU,QAAQ,4CAA4CC,QAAQ,cAAeQ,OAEnF,IAAIf,EAAOa,kBAAoB,eACpC,CACC,GAAIU,GAAgBf,KAAKQ,cACxBC,YAAa,0BACbE,WAAcnB,GAAOwB,kBAAoB,YAAcxB,EAAOwB,iBAAmB,IAElFpB,GAASR,EAAGU,QAAQ,+CAA+CC,QAAQ,cAAeQ,GAAMR,QAAQ,iBAAkBgB,SAIxH,IAAIpB,GAAQ,cACjB,CACC,GAAIsB,SACIzB,IAAU,gBACPA,GAAO0B,sBAAwB,aACtC1B,EAAO0B,qBACP,uCACA,2CAEJ,IAAIC,SACI3B,IAAU,gBACPA,GAAO2B,YAAc,YAC5B3B,EAAO2B,WACP,EAEJvB,GAASR,EAAGU,QAAQmB,GAAeE,EAAWtB,OAAS,EAAI,IAAMsB,EAAa,KAG/E,MAAOvB,GAGRR,GAAGE,WAAWW,aAAe,SAAST,GAErC,GAAII,GAAS,EACb,IAAIwB,KAEJ,UACQ5B,IAAU,UACdA,EAAOK,OAAS,EAEpB,CACC,GAAIwB,EACJ,KAAKA,EAAK,EAAGA,EAAK7B,EAAOK,OAAQwB,IACjC,CACC,GAAI7B,EAAO8B,eAAeD,GAC1B,CACCD,EAAkBG,KAAKvB,KAAKQ,aAAahB,EAAO6B,MAIlDzB,EAASwB,EAAkBI,KAAK,MAGjC,MAAO5B,GAGRR,GAAGE,WAAWkB,aAAe,SAASiB,GAErC,GAAI7B,GAAS,EAEb,UACQ6B,IAAU,UACdA,EAAOhB,aAAe,YAE1B,CACC,OAAQgB,EAAOhB,aAEd,IAAK,IACJb,EAASR,EAAGK,YAAYiC,SAASD,EACjC,MACD,KAAK,KACJ7B,EAASR,EAAGK,YAAYkC,WACxB,MACD,KAAK,KACJ/B,EAASR,EAAGK,YAAYmC,UAAUH,EAClC,MACD,KAAK,KACJ7B,EAASR,EAAGK,YAAYoC,UAAUJ,EAClC,MACD,KAAK,OACJ7B,EAASR,EAAGK,YAAYqC,YAAYL,EACpC,MACD,KAAK,0BACJ7B,EAASR,EAAGK,YAAYsC,+BAA+BN,EACvD,MACD,UAGD,GAAIO,GAAM5C,EAAG6C,OAAO,OACnBC,UACCtC,IAIFA,GAASoC,EAAIG,SACb/C,GAAGgD,UAAUJ,EAAK,MAGnB,MAAOpC"}}]}