{"version":3,"sources":["helper.js"],"names":["BX","namespace","Helper","frameOpenUrl","frameCloseUrl","isOpen","frameNode","popupNodeWrap","curtainNode","popupNode","closeBtn","openBtn","popupLoader","topBar","topBarHtml","langId","reloadPath","ajaxUrl","currentStepId","notifyBlock","notifyNum","notifyText","notifyId","notifyButton","topPaddingNode","isAdmin","init","params","this","helpUpBtnText","helpBtn","notifyData","runtimeUrl","notifyUrl","helpUrl","create","attrs","className","children","text","message","html","bind","proxy","show","setBlueHeroView","window","event","origin","indexOf","data","title","browser","IsIE8","IsIE9","IsIE10","height","style","insertTopBar","_showContent","action","closePopup","changeHeight","showNotification","num","BXIM","openMessenger","user_id","ThurlyOS","LeftMenuClass","getStructureForHelper","structure","contentWindow","postMessage","menu","articleCount","needCheckNotify","checkNotification","ajax","post","sessid","bitrix_sessid","createFrame","frameborder","name","id","scrollTop","opacity","classList","add","addClass","top","getCord","remove","_setPosFixed","document","body","width","offsetWidth","overflow","_clearPosFixed","closeBtnHandler","node","innerHTML","createPopup","e","PreventDefault","appendChild","clearTimeout","shadowTimer","helpTimer","unbind","loadFrame","_close","transition","undefined","removeClass","removeProperty","setTimeout","display","src","showContent","additionalParam","right","paddingBottom","left","onCustomEvent","windowScroll","GetWindowScrollPos","easing","duration","start","scroll","finish","makeEaseOut","transitions","quart","step","state","scrollTo","complete","animate","type","keyCode","target","srcElement","reloadFrame","url","pos","obj","bottom","isNaN","parseFloat","isFinite","numBlock","setNotification","showFlyingHero","method","dataType","onsuccess","res","load","eval","time","button","onfailure","showAnimatedHero","block","admin","panel","DIV","offsetHeight","stage","swiffy","Stage","swiffyobject","setBackground"],"mappings":"AAAAA,GAAGC,UAAU,aAEbD,GAAGE,QAEFC,aAAe,GACfC,cAAgB,GAChBC,OAAS,MACTC,UAAY,KACZC,cAAgB,KAChBC,YAAc,KACdC,UAAY,KACZC,SAAW,KACXC,QAAU,KACVC,YAAc,KACdC,OAAS,KACTC,WAAa,KACbC,OAAQ,KACRC,WAAY,KACZC,QAAS,GACTC,cAAe,GACfC,YAAc,KACdC,UAAW,GACXC,WAAY,GACZC,SAAU,EACVC,aAAc,GACdC,eAAiB,KACjBC,QAAS,IAETC,KAAO,SAAUC,GAEhBC,KAAKzB,aAAewB,EAAOxB,cAAgB,GAC3CyB,KAAKxB,cAAgBuB,EAAOvB,eAAiB,GAC7CwB,KAAKC,cAAgBF,EAAOE,eAAiB,GAC7CD,KAAKb,OAASY,EAAOZ,QAAU,GAC/Ba,KAAKjB,QAAUgB,EAAOG,QACtBF,KAAKT,YAAcQ,EAAOR,YAC1BS,KAAKZ,WAAaW,EAAOX,YAAc,GACvCY,KAAKX,QAAUU,EAAOV,SAAW,GACjCW,KAAKV,cAAgBS,EAAOT,eAAiB,GAC7CU,KAAKG,WAAaJ,EAAOI,YAAc,KACvCH,KAAKI,WAAaL,EAAOK,YAAc,KACvCJ,KAAKK,UAAYN,EAAOM,WAAa,GACrCL,KAAKM,QAAUP,EAAOO,SAAW,GACjCN,KAAKR,UAAYO,EAAOP,WAAa,GACrCQ,KAAKJ,eAAiBG,EAAOH,gBAAkB,KAC/CI,KAAKH,QAAWE,EAAOF,SAAWE,EAAOF,SAAW,IAAO,IAAM,IAEjEG,KAAKhB,YAAcZ,GAAGmC,OAAO,OAC5BC,OAAOC,UAAU,wBACjBC,UAAYtC,GAAGmC,OAAO,OACrBC,OAAOC,UAAU,6BACjBE,KAAOvC,GAAGwC,QAAQ,sBAIpBZ,KAAKd,WAAa,oEAAsEc,KAAKZ,WAAa,QAAQhB,GAAGwC,QAAQ,gBAAgB,6CAE7IZ,KAAKf,OAASb,GAAGmC,OAAO,OACvBC,OAAOC,UAAU,oBACjBI,KAAOb,KAAKd,aAGbd,GAAG0C,KAAKd,KAAKjB,QAAS,QAASX,GAAG2C,MAAMf,KAAKgB,KAAMhB,OACnD5B,GAAG0C,KAAKd,KAAKjB,QAAS,QAASX,GAAG2C,MAAMf,KAAKiB,gBAAiBjB,OAE9D5B,GAAG0C,KAAKI,OAAQ,UAAW9C,GAAG2C,MAAM,SAASI,GAE5CA,EAAQA,GAASD,OAAOC,MAExB,KAAKA,EAAMC,QAAUD,EAAMC,OAAOC,QAAQ,aAAe,EACzD,CACC,OAGD,GAAGrB,KAAKvB,gBACE0C,EAAU,MAAK,YAAcA,EAAMG,KAAKC,QAC/CnD,GAAGoD,QAAQC,SAAWrD,GAAGoD,QAAQE,UAAYtD,GAAGoD,QAAQG,kBAAoBR,EAAU,MAAK,UAE9F,CACC,GAAGA,EAAMG,KAAKM,OACb5B,KAAKtB,UAAUmD,MAAMD,OAAST,EAAMG,KAAKM,OAAS,KACnD5B,KAAK8B,oBAAoBX,EAAU,MAAK,SAAWA,EAAMG,KAAKC,MAAQJ,EAAMG,MAC5EtB,KAAK+B,eAGN,GAAGZ,EAAMG,KAAKU,QAAU,cACxB,CACChC,KAAKiC,aAGN,GAAGd,EAAMG,KAAKU,QAAU,eACxB,CACC,GAAGb,EAAMG,KAAKM,OAAS,EACvB,CACC5B,KAAKkC,aAAaf,EAAMG,KAAKM,SAI/B,GAAGT,EAAMG,KAAKU,QAAU,aACxB,CACC5D,GAAGE,OAAO6D,iBAAiBhB,EAAMG,KAAKc,KAGvC,GAAGjB,EAAMG,KAAKU,QAAU,WACxB,CACCK,KAAKC,cAAcnB,EAAMG,KAAKiB,SAG/B,GAAGpB,EAAMG,KAAKU,QAAU,mBACxB,CACC,UAAW5D,GAAGoE,SAASC,eAAiB,SACxC,CACC,UAAWrE,GAAGoE,SAASC,cAAcC,uBAAyB,WAC9D,CACC,IAAIC,EAAYvE,GAAGoE,SAASC,cAAcC,wBAC1C1C,KAAKtB,UAAUkE,cAAcC,aAAab,OAAQ,YAAac,KAAMH,GAAY,OAKpF,GAAGxB,EAAMG,KAAKU,QAAU,qBACxB,CACChC,KAAKtB,UAAUkE,cAAcC,aAAab,OAAQ,uBAAwBe,aAAc/C,KAAKR,WAAY,OAExGQ,OAEH,GAAID,EAAOiD,iBAAmB,IAC9B,CACChD,KAAKiD,oBAGN,GAAIjD,KAAKR,UAAY,EACrB,CACCpB,GAAGE,OAAO6D,iBAAiBnC,KAAKR,aAIlCyB,gBAAkB,WAEjB,IAAKjB,KAAKV,cACT,OAEDlB,GAAG8E,KAAKC,KACPnD,KAAKX,SAEJ+D,OAAShF,GAAGiF,gBACZrB,OAAQ,UACR1C,cAAeU,KAAKV,eAErB,eAIFgE,YAAc,WAEb,GAAIlF,GAAG,sBAAwBA,GAAG,gBAAkB,SACnD,OAED4B,KAAKtB,UAAYN,GAAGmC,OAAO,UAC1BC,OACCC,UAAW,gBACX8C,YAAa,EACbC,KAAM,OACNC,GAAI,gBAINrF,GAAG0C,KAAKd,KAAKtB,UAAW,OAAON,GAAG2C,MAAM,WACvCf,KAAKnB,UAAU6E,UAAY,GACzB1D,QAGJ+B,aAAe,WAEd/B,KAAKtB,UAAUmD,MAAM8B,QAAU,EAE/B,GAAG3D,KAAKf,OAAO2E,UACf,CACC5D,KAAKf,OAAO2E,UAAUC,IAAI,qBAC1B7D,KAAKf,OAAO2E,UAAUC,IAAI,wBAEtB,CACJzF,GAAG0F,SAAS9D,KAAKf,OAAO,qBACxBb,GAAG0F,SAAS9D,KAAKf,OAAQ,oBAG1Be,KAAKf,OAAO4C,MAAMkC,IAAM/D,KAAKgE,UAAUD,IAAM,KAE7C/D,KAAKhB,YAAY4E,UAAUK,OAAO,8BAGnCC,aAAe,WAEdC,SAASC,KAAKvC,MAAMwC,MAAQF,SAASC,KAAKE,YAAc,KACxDH,SAASC,KAAKvC,MAAM0C,SAAW,UAGhCC,eAAiB,WAEhBL,SAASC,KAAKvC,MAAMwC,MAAQ,OAC5BF,SAASC,KAAKvC,MAAM0C,SAAW,IAGhCE,gBAAkB,WAEjB,GAAIrG,GAAG,yBAA2BA,GAAG,mBAAqB,SACzD,OAED,GAAG4B,KAAKH,SAAW,IACnB,CACCG,KAAKlB,SAAWV,GAAGmC,OAAO,OACzBC,OACCC,UAAW,gBACXgD,GAAI,iBAEL/C,UAAYtC,GAAGmC,OAAO,OAAQC,OAAQC,UAAW,8BAMpDqB,aAAe,SAAS4C,GAEvB1E,KAAKf,OAAO0F,UAAW3E,KAAKd,WAAawF,GAG1CE,YAAc,WAEb,GAAIxG,GAAG,2BAA6BA,GAAG,qBAAuB,SAC7D,OAED4B,KAAKpB,YAAcR,GAAGmC,OAAO,OAC5BC,OACCC,UAAa,kBACbgD,GAAM,qBAIRzD,KAAKnB,UAAYT,GAAGmC,OAAO,OAC1BG,UACCtC,GAAGmC,OAAO,OACTG,UACCV,KAAKtB,WAEN8B,OACCC,UAAW,mBAGbT,KAAKf,OACLe,KAAKhB,aAENwB,OACCC,UAAW,kBAIbrC,GAAG0C,KAAKd,KAAKnB,UAAW,QAAS,SAASgG,GAEzCzG,GAAG0G,eAAeD,KAGnBV,SAASC,KAAKW,YAAY/E,KAAKpB,aAC/BuF,SAASC,KAAKW,YAAY/E,KAAKnB,WAE/B,GAAGmB,KAAKH,SAAW,IAClBsE,SAASC,KAAKW,YAAY/E,KAAKlB,WAGjCmD,WAAa,WAEZ+C,aAAahF,KAAKiF,aAClBD,aAAahF,KAAKkF,WAClB9G,GAAG+G,OAAOnF,KAAKnB,UAAW,gBAAiBT,GAAG2C,MAAMf,KAAKoF,UAAWpF,OAEpE5B,GAAG+G,OAAOhB,SAAU,UAAW/F,GAAG2C,MAAMf,KAAKqF,OAAQrF,OACrD5B,GAAG+G,OAAOhB,SAAU,QAAS/F,GAAG2C,MAAMf,KAAKqF,OAAQrF,OAEnD,GAAGA,KAAKnB,UAAUgD,MAAMyD,aAAeC,UACtCnH,GAAG0C,KAAKd,KAAKnB,UAAW,gBAAiBT,GAAG2C,MAAMf,KAAKwE,eAAgBxE,YAEvEA,KAAKwE,iBAGNxE,KAAKnB,UAAUgD,MAAMwC,MAAQ,EAC7BrE,KAAKf,OAAO4C,MAAMwC,MAAQ,EAE1BjG,GAAGoH,YAAYxF,KAAKf,OAAQ,qBAE5B,GAAGe,KAAKH,SAAW,IAClBzB,GAAGoH,YAAYxF,KAAKlB,SAAU,sBAG/BkB,KAAKf,OAAO4C,MAAM4D,eAAe,OAEjCzF,KAAKkF,UAAYQ,WAAWtH,GAAG2C,MAAM,WAEpCf,KAAKpB,YAAYiD,MAAM8B,QAAU,EAEjC,GAAG3D,KAAKH,SAAW,IAClBG,KAAKlB,SAAS+C,MAAM8D,QAAU,OAE/BvH,GAAGoH,YAAYxF,KAAKjB,QAAS,sBAE3BiB,MAAM,KAETA,KAAKiF,YAAcS,WAAWtH,GAAG2C,MAAM,WAEtCf,KAAKtB,UAAUkH,IAAM5F,KAAKxB,cAC1BwB,KAAKnB,UAAUgD,MAAM8D,QAAU,OAC/B3F,KAAKpB,YAAYiD,MAAM8D,QAAU,OACjC3F,KAAKtB,UAAUmD,MAAM8B,QAAU,EAC/B3D,KAAKtB,UAAUmD,MAAMD,OAAS,EAC9BxD,GAAGoH,YAAYxF,KAAKhB,YAAa,6BACjCZ,GAAG+G,OAAOnF,KAAKnB,UAAW,gBAAiBT,GAAG2C,MAAMf,KAAKwE,eAAgBxE,OAEzE,GAAGA,KAAKf,OAAO2E,UACd5D,KAAKf,OAAO2E,UAAUK,OAAO,yBAE7B7F,GAAGoH,YAAYxF,KAAKf,OAAQ,oBAC7Be,KAAKvB,OAAS,OAEbuB,MAAM,MAGT6F,YAAc,SAASC,GAEtB,UAAWA,IAAoB,SAC/B,CACC9F,KAAKzB,aAAeyB,KAAKzB,aAAe,IAAMuH,EAG/C,IAAI/B,EAAM/D,KAAKgE,UAAUD,IACzB,IAAIgC,EAAQ/F,KAAKgE,UAAU+B,MAC3Bf,aAAahF,KAAKiF,aAClBD,aAAahF,KAAKkF,WAElBlF,KAAKkE,eAELlE,KAAKpB,YAAYiD,MAAMkC,IAAMA,EAAK,KAClC/D,KAAKpB,YAAYiD,MAAMwC,MAAQrE,KAAKgE,UAAU+B,MAAQ,KACtD/F,KAAKpB,YAAYiD,MAAM8D,QAAU,QACjC3F,KAAKnB,UAAUgD,MAAM8D,QAAU,QAC/B3F,KAAKnB,UAAUgD,MAAMkC,IAAMA,EAAM,KACjC/D,KAAKnB,UAAUgD,MAAMmE,cAAgBjC,EAAM,KAC3C/D,KAAKhB,YAAY6C,MAAMkC,IAAMA,EAAM,KAEnC,GAAG/D,KAAKH,SAAW,IACnB,CACCG,KAAKlB,SAAS+C,MAAMkC,IAAOA,EAAM,GAAM,KACvC/D,KAAKlB,SAAS+C,MAAMoE,KAAQF,EAAQ,GAAM,KAC1C/F,KAAKlB,SAAS+C,MAAM8D,QAAU,QAG/BvH,GAAG0F,SAAS9D,KAAKjB,QAAS,qBAE1B,GAAGiB,KAAKnB,UAAUgD,MAAMyD,aAAeC,UAAU,CAChDnH,GAAG0C,KAAKd,KAAKnB,UAAW,gBAAiBT,GAAG2C,MAAMf,KAAKoF,UAAWpF,WAC7D,CACLA,KAAKoF,UAAU,MAGhBpF,KAAKiF,YAAcS,WAAWtH,GAAG2C,MAAM,WAEtCf,KAAKpB,YAAYiD,MAAM8B,QAAU,EAEjCvF,GAAG0F,SAAS9D,KAAKlB,SAAU,uBAEzBkB,MAAM,IAETA,KAAKkF,UAAYQ,WAAWtH,GAAG2C,MAAM,WAEpCf,KAAKnB,UAAUgD,MAAMwC,MAAQ,IAAM,KACnCrE,KAAKf,OAAO4C,MAAMwC,MAAQ,IAAM,KAChCjG,GAAG0F,SAAS9D,KAAKhB,YAAa,6BAE9BZ,GAAG0C,KAAKqD,SAAU,UAAW/F,GAAG2C,MAAMf,KAAKqF,OAAQrF,OACnD5B,GAAG0C,KAAKqD,SAAU,QAAS/F,GAAG2C,MAAMf,KAAKqF,OAAQrF,OACjDA,KAAKvB,OAAS,MAEZuB,MAAM,MAGVgB,KAAO,SAAS8E,GAEf9F,KAAKsD,cACLtD,KAAKyE,kBACLzE,KAAK4E,cAELxG,GAAG8H,cAAchF,OAAQ,oBAEzB,IAAIiF,EAAe/H,GAAGgI,qBACtB,GAAID,EAAazC,YAAc,EAC/B,CACC,IAAKtF,GAAGiI,QACPC,SAAU,IACVC,OAAQC,OAAQL,EAAazC,WAC7B+C,QAASD,OAAQ,GACjBlB,WAAYlH,GAAGiI,OAAOK,YAAYtI,GAAGiI,OAAOM,YAAYC,OACxDC,KAAM,SAAUC,GACf5F,OAAO6F,SAAS,EAAGD,EAAMN,SAE1BQ,SAAU5I,GAAG2C,MAAM,WAClBf,KAAK6F,YAAYC,IACf9F,QACAiH,cAGL,CACCjH,KAAK6F,YAAYC,KAInBT,OAAS,SAASlE,GAEjBA,EAAQA,GAASD,OAAOC,MACxB/C,GAAG0G,eAAe3D,GAElB,GAAGA,EAAM+F,MAAQ,SAAW/F,EAAMgG,SAAW,GAC5CnH,KAAKiC,cAGPmD,UAAY,SAASjE,GAEpB,GAAGA,IAAU,KAAK,CACjBA,EAAQA,GAASD,OAAOC,MACxB,IAAIiG,EAASjG,EAAMiG,QAAUjG,EAAMkG,WAEnC,GAAGD,GAAUpH,KAAKnB,UACjBmB,KAAKtB,UAAUkH,IAAM5F,KAAKzB,iBACtB,CACLyB,KAAKtB,UAAUkH,IAAM5F,KAAKzB,eAI5B+I,YAAc,SAASC,GAEtBvH,KAAKtB,UAAUmD,MAAM8B,QAAU,EAC/B3D,KAAKtB,UAAUkH,IAAM2B,EAErB,GAAGvH,KAAKf,OAAO2E,UACd5D,KAAKf,OAAO2E,UAAUK,OAAO,yBAE7B7F,GAAGoH,YAAYxF,KAAKf,OAAQ,oBAE7Be,KAAKnB,UAAU6E,UAAY,GAE5BM,QAAU,WAET,IAAIwD,EACHC,GAAO1D,IAAM,EAAGgC,MAAQ,GAEzB,GAAG/F,KAAKJ,eACR,CACC4H,EAAMpJ,GAAGoJ,IAAIxH,KAAKJ,gBAClB6H,EAAI1D,IAAMyD,EAAIE,OACdD,EAAI1B,MAAQyB,EAAIzB,UAEZ,CACJyB,EAAMpJ,GAAGoJ,IAAIrD,SAASC,MACtBqD,EAAI1B,MAAQyB,EAAIzB,MAGjB,OAAO0B,GAGRvF,aAAe,SAASN,GAEvB,GAAGA,EAAS,EACX5B,KAAKtB,UAAUmD,MAAMD,OAASA,EAAS,MAGzCO,iBAAmB,SAASC,GAE3B,IAAKuF,MAAMC,WAAWxF,KAASyF,SAASzF,IAAQA,EAAM,EACtD,CACC,IAAI0F,EAAW,oCAAsC1F,EAAM,GAAK,MAAQA,GAAO,aAGhF,CACC0F,EAAW,GAEZ9H,KAAKT,YAAYoF,UAAYmD,EAE7B9H,KAAK+H,gBAAgB3F,IAGtB4F,eAAiB,SAAST,KAEzB,IAAKA,IACJ,OAEDnJ,GAAG8E,MACF+E,OAAS,MACTC,SAAU,OACVX,IAAKvH,KAAKM,QAAUiH,IACpBjG,QACA6G,UAAW/J,GAAG2C,MAAM,SAASqH,KAE5B,GAAIA,IACJ,CACChK,GAAGiK,MAAMrI,KAAKI,YAAa,WAC1BkI,KAAKF,SAGLpI,SAIL+H,gBAAkB,SAAS3F,EAAKmG,GAE/BnK,GAAG8E,MACF+E,OAAQ,OACRC,SAAU,OACVX,IAAKvH,KAAKX,QACViC,MAEC8B,OAAShF,GAAGiF,gBACZrB,OAAQ,YACRI,IAAKA,EACLmG,KAAMA,GAEPJ,UAAW/J,GAAG2C,MAAM,SAAUqH,KAE3BpI,SAILiD,kBAAoB,WAEnB7E,GAAG8E,MACF+E,OAAS,OACTC,SAAU,OACVX,IAAKvH,KAAKK,UACViB,KAAMtB,KAAKG,WACXgI,UAAW/J,GAAG2C,MAAM,SAASqH,GAE5B,IAAKT,MAAMS,EAAIhG,KACf,CACCpC,KAAKmC,iBAAiBiG,EAAIhG,KAE1B,GAAIgG,EAAI3E,GACR,CACCzD,KAAKN,SAAW0I,EAAI3E,GACpBzD,KAAKP,WAAa2I,EAAIhE,KACtBpE,KAAKL,aAAeyI,EAAII,OAGzB,GAAIJ,EAAIb,IACPvH,KAAKgI,eAAeI,EAAIb,SAG1B,CACCvH,KAAK+H,gBAAgB,GAAI,UAExB/H,MACHyI,UAAWrK,GAAG2C,MAAM,WACnBf,KAAK+H,gBAAgB,GAAI,SACvB/H,SAIL0I,iBAAmB,WAElB,IAAKtK,GAAGoD,QAAQC,QAChB,CACCrD,GAAGiK,MAAM,oCAAqC,yCAA0C,WACvF,IAAIM,EAAQvK,GAAGmC,OAAO,OAAQC,OAAQC,UAAa,gBAAiBgD,GAAM,mBAE1E,GAAGrF,GAAGwK,OAASxK,GAAGwK,MAAMC,MACxB,CACCF,EAAM9G,MAAMkC,IAAM3F,GAAGwK,MAAMC,MAAMC,IAAIC,aAAa,GAAG,KAGtD5E,SAASC,KAAKW,YAAY4D,GAC1B,IAAIK,EAAQ,IAAIC,OAAOC,MAAMP,EAAOQ,iBACpCH,EAAMI,cAAc,MAEpB1D,WAAW,WACVsD,EAAMzC,SACJ,KAEHb,WAAW,WACViD,EAAM9G,MAAM8D,QAAU,QACrB","file":""}