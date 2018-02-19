{"version":3,"file":"item.min.js","sources":["item.js"],"names":["BX","namespace","Tasks","Kanban","Item","options","apply","this","arguments","container","timer","prototype","__proto__","constructor","dateFormats","short","en","de","ru","full","renderTime","string","showSeconds","sec_num","parseInt","hours","Math","floor","minutes","seconds","clipTitle","fullTitle","title","arrTitle","split","lastWord","length","splice","join","setDataKey","key","val","data","getData","getDataKey","setStatus","code","show","task_complete","task_status_title","style","removeClass","addClass","textContent","message","hide","in_progress","hasClass","task_start","setAttribute","startTask","taskId","getId","action","allow_time_tracking","time_tracking","TasksTimerManager","start","stop","getGrid","ajax","error","updateItem","Utils","showErrorDialog","fatal","bind","completeTask","currentStatus","columnId","getColumnId","deadlineTask","format","date","convertBitrixFormat","calendar","node","proxy_context","bTime","currentTime","date_deadline","callback","deadline","id","changeAuthorTask","changeMemberTask","delegateTask","selector","Integration","Socialnetwork","NetworkSelector","scope","mode","query","useSearch","useAdd","parent","popupOffsetTop","popupOffsetLeft","bindEvent","delegate","gridData","getGridData","userId","close","open","getTaskUrl","pathToTask","replace","switchClass","el","className","switchVisible","display","setFilterTag","tagName","substr","filterManager","Main","getById","gridId","filterApi","getApi","currValues","getFilterFieldsValues","TAG","setFields","render","createLayout","color","getColumn","getColor","rgb","util","hex2rgb","rgba","r","g","b","withoutControl","completed","allow_complete","allow_start","formatLang","background","containerImg","link","innerHTML","name","high","tags","cleanNode","i","c","tag","create","text","events","click","appendChild","allow_change_deadline","unbind","Date","getFullYear","deferred","completed_supposedly","overdue","date_start","new","task_content","count_comments","count_files","check_list","complete","work","log","comment","checklist","file","author","remove","props","authorType","extranet","crm","mail","avatarClass","photo","backgroundImage","src","cursor","allow_edit","user_container","responsible","responsibleType","allow_delegate","time_logs","time_estimate","track_control","dblclick","Bitrix24","PageSlider","task_status","createShadow","addEventListener","addHoverClass","removeHoverClass","itemBlock","setTimeout","classList","add","clearTimeout"],"mappings":"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"}