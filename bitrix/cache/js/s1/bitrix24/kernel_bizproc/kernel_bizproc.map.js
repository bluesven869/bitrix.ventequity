{"version":3, "file":"kernel_bizproc.js", "sections": [{"offset": { "line": 3, "column": 0 }, "map": {"version":3,"file":"/bitrix/js/bizproc/tools.min.js","sources":["/bitrix/js/bizproc/tools.js"],"names":["BX","namespace","Bizproc","doInlineTask","parameters","callback","scope","__waiting","hasClass","addClass","bitrix_sessid","ajax","method","dataType","url","data","onsuccess","response","ERROR","window","alert","removeClass","SUCCESS","arguments","taskPopupInstance","taskPopupCallback","showTaskPopup","taskId","userId","useIframe","message","HTML","wrapper","create","style","width","innerHTML","title","titleNode","findChild","className","textContent","remove","PopupWindow","Math","round","random","content","closeIcon","titleBar","contentColor","contentNoPaddings","zIndex","offsetLeft","offsetTop","closeByEsc","draggable","restrict","overlay","backgroundColor","opacity","events","onPopupClose","popup","destroy","delegationPopup","load","show","delegationSelected","showDelegationPopup","lightShadow","autoHide","bindOptions","forceBindPosition","angle","position","offset","buttons","PopupWindowButton","text","click","e","delegateTask","close","PopupWindowButtonLink","event","PreventDefault","delegationOnSelect","user","id","fromUserId","toUserId","SITE_ID","action","sessid","task_id","from_user_id","to_user_id","success","location","reload","showWorkflowInfoPopup","workflowId","showWorkflowLogPopup","params","type","isPlainObject","postTaskForm","form","BPRUNNING","actionName","actionValue","btn","document","activeElement","explicitOriginalTarget","toLowerCase","name","value","target","BXFormTarget","frame_name","body","appendChild","props","src","display","property","BXFormCallback","parseJSON","bind","proxy","_submit_callback","submit","WorkflowFaces","showFaces","tasks","simple","taskBased","__popup","createMenu","isShown","i","k","s","length","l","tasksContent","cls","task","uContent","USERS","STATUS","tpl","PHOTO_SRC","FULL_NAME","push","join","usersMenu","taskHead","NAME"],"mappings":"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"}}]}