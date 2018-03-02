; /* /bitrix/js/intranet/structure.min.js?15198138853028*/
; /* /bitrix/js/intranet/notify_dialog/notify_dialog.min.js?15198138854884*/
; /* /bitrix/js/intranet/core_planner.js?15198138853206*/

; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/intranet/core_planner.js?15198138853206";s:6:"source";s:35:"/bitrix/js/intranet/core_planner.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(){

if(!!window.BX.CPlanner)
	return;

var BX = window.BX,
	planner_access_point = '/bitrix/tools/intranet_planner.php';

BX.planner_query = function(url, action, data, callback, bForce)
{
	if (BX.type.isFunction(data))
	{
		callback = data;data = {};
	}

	var query_data = {
		'method': 'POST',
		'dataType': 'json',
		'url': (url||planner_access_point) + '?action=' + action + '&site_id=' + BX.message('SITE_ID') + '&sessid=' + BX.bitrix_sessid(),
		'data':  BX.ajax.prepareData(data),
		'onsuccess': function(data) {
			if(!!callback)
			{
				callback(data, action)
			}

			BX.onCustomEvent('onPlannerQueryResult', [data, action]);
		},
		'onfailure': function(type, e) {
			if (e && e.type == 'json_failure')
			{
				(new BX.PopupWindow('planner_failure_' + Math.random(), null, {
					content: BX.create('DIV', {
						style: {width: '300px'},
						html: BX.message('JS_CORE_PL_ERROR') + '<br /><br /><small>' + BX.util.strip_tags(e.data) + '</small>'
					}),
					buttons: [
						new BX.PopupWindowButton({
							text : BX.message('JS_CORE_WINDOW_CLOSE'),
							className : "popup-window-button-decline",
							events : {
								click : function() {this.popupWindow.close()}
							}
						})
					]
				})).show();
			}
		}
	};

	return BX.ajax(query_data);
};

BX.CPlanner = function(DATA)
{
	this.DATA = DATA;
	this.DIV = null;
	this.DIV_ADDITIONAL = null;
	this.WND = null;

	BX.addCustomEvent('onGlobalPlannerDataRecieved', BX.delegate(this.onPlannerBroadcastRecieved, this));
	BX.onCustomEvent('onPlannerInit', [this, this.DATA]);
};

BX.CPlanner.prototype.onPlannerBroadcastRecieved = function(DATA)
{
	this.DATA = DATA;
	BX.onCustomEvent(this, 'onPlannerDataRecieved', [this, this.DATA]);
}

BX.CPlanner.prototype.draw = function()
{
	if(!this.DIV)
	{
		this.DIV = BX.create('DIV', {props: {className: 'bx-planner-content'}});
	}

	BX.onGlobalCustomEvent('onGlobalPlannerDataRecieved', [this.DATA]);

	return this.DIV;
};

BX.CPlanner.prototype.drawAdditional = function()
{
	if(!this.DIV_ADDITIONAL)
	{
		this.DIV_ADDITIONAL = BX.create('DIV', {style: {minHeight: 0}});
	}

	return this.DIV_ADDITIONAL;
};

BX.CPlanner.prototype.addBlock = function(block, sort)
{
	if(!block||!BX.type.isElementNode(block))
	{
		return;
	}

	block.bxsort = parseInt(sort)||100;

	if(!!block.parentNode)
	{
		block.parentNode.removeChild(block);
	}

	var el = this.DIV.firstChild;
	while(el)
	{
		if(el == block)
			break;

		if(!!el.bxsort&&el.bxsort>block.bxsort)
		{
			this.DIV.insertBefore(block, el);
			break;
		}
		el = el.nextSibling;
	}

	if(!block.parentNode||!BX.type.isElementNode(block.parentNode)) // 2nd case is for IE8
	{
		this.DIV.appendChild(block);
	}
};

BX.CPlanner.prototype.addAdditional = function(block)
{
	this.drawAdditional().appendChild(block);
};

BX.CPlanner.prototype.update = function(data)
{
	if(!!data)
	{
		this.DATA = data;
		this.draw();
	}
	else
	{
		this.query('update');
	}
};

BX.CPlanner.prototype.query = function(action, data)
{
	return BX.planner_query(planner_access_point, action, data, BX.proxy(this.update, this));
};

BX.CPlanner.query = function(action, data)
{
	return BX.planner_query(planner_access_point, action, data);
};

})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:69:"/bitrix/js/intranet/notify_dialog/notify_dialog.min.js?15198138854884";s:6:"source";s:50:"/bitrix/js/intranet/notify_dialog/notify_dialog.js";s:3:"min";s:54:"/bitrix/js/intranet/notify_dialog/notify_dialog.min.js";s:3:"map";s:54:"/bitrix/js/intranet/notify_dialog/notify_dialog.map.js";}"*/
(function(){"use strict";BX.namespace("BX.Intranet");BX.Intranet.NotifyDialog=function(t){if(!BX.type.isPlainObject(t)){throw new Error('BX.Intranet.Notify: "options" is not an object.')}if(!BX.type.isArray(t.listUserData)){throw new Error('BX.Intranet.Notify: "listUserData" is not an array.')}if(!BX.type.isNotEmptyString(t.notificationHandlerUrl)){throw new Error('BX.Intranet.Notify: "notificationHandlerUrl" is required.')}this.listUserData=t.listUserData;this.notificationHandlerUrl=t.notificationHandlerUrl;this.postData=t.postData||{};var e,i,n,o;if(t.popupTexts){e=t.popupTexts.hasOwnProperty("title")&&BX.type.isNotEmptyString(t.popupTexts.title)?t.popupTexts.title:"Title";i=t.popupTexts.hasOwnProperty("header")&&BX.type.isNotEmptyString(t.popupTexts.header)?t.popupTexts.header:"Header";n=t.popupTexts.hasOwnProperty("description")&&BX.type.isNotEmptyString(t.popupTexts.description)?t.popupTexts.description:"Description";o=t.popupTexts.hasOwnProperty("sendButton")&&BX.type.isNotEmptyString(t.popupTexts.sendButton)?t.popupTexts.sendButton:"SendButton"}else{e="Title";i="Header";n="Description";o="SendButton"}this.popupTexts={title:e,header:i,description:n,sendButton:o};this.closePopupAfterNotify=t.closePopupAfterNotify==="Y";this.init()};BX.Intranet.NotifyDialog.prototype.constructor=BX.Intranet.NotifyDialog;BX.Intranet.NotifyDialog.prototype.init=function(){this.popup=null;this.createPopup()};BX.Intranet.NotifyDialog.prototype.setUsersForNotify=function(t){if(!BX.type.isArray(t)){throw new Error('BX.Intranet.Notify: "listUserData" is not an array.')}this.listUserData=t;this.popup=null};BX.Intranet.NotifyDialog.prototype.show=function(){if(this.popup===null){this.createPopup()}this.popup.show()};BX.Intranet.NotifyDialog.prototype.sendNotify=function(){var t=BX.proxy_context.dataset.id;BX.addClass(BX("intranet-notify-dialog-button-"+t),"webform-small-button-wait");this.postData["SITE_ID"]=BX.message("SITE_ID");this.postData["sessid"]=BX.bitrix_sessid();this.postData["userId"]=t;BX.ajax({method:"POST",dataType:"json",url:this.notificationHandlerUrl,data:this.postData,onsuccess:BX.proxy(function(e){if(e.status==="success"){BX.hide(BX("intranet-notify-dialog-button-"+t));BX("intranet-notify-dialog-success-"+t).innerHTML=BX.message("INTRANET_NOTIFY_DIALOG_NOTIFY_SUCCESS");if(this.closePopupAfterNotify){setTimeout(BX.proxy(function(){this.popup.destroy()},this),1e3)}}BX.removeClass(BX("intranet-notify-dialog-button-"+t),"webform-small-button-wait")},this)})};BX.Intranet.NotifyDialog.prototype.createPopup=function(){this.popup=new BX.PopupWindow("intranet-notify-popup",null,{content:this.createContent(),overlay:true,closeIcon:{marginRight:"4px",marginTop:"9px"},closeByEsc:true,buttons:[new BX.PopupWindowButton({text:BX.message("INTRANET_NOTIFY_DIALOG_BUTTON_CLOSE"),events:{click:BX.proxy(function(){this.popup.destroy()},this)}})]});this.listUserData.forEach(function(t){BX.bind(BX("intranet-notify-dialog-button-"+t.id),"click",BX.proxy(this.sendNotify,this))},this)};BX.Intranet.NotifyDialog.prototype.createContent=function(){var t,e;e=BX.create("div",{children:[BX.create("span",{props:{className:"intranet-notify-dialog-header"},children:[BX.create("span",{props:{innerHTML:"!",className:"intranet-notify-dialog-exclamation-point-icon"}}),BX.create("span",{props:{innerHTML:BX.util.htmlspecialchars(this.popupTexts.header)}})]}),BX.create("div",{props:{className:"intranet-notify-dialog-description"},html:BX.util.htmlspecialchars(this.popupTexts.description)}),BX.create("span",{props:{className:"intranet-notify-dialog-title-who-notify"},html:BX.message("INTRANET_NOTIFY_DIALOG_TITLE_WHO_NOTIFY")})]});this.listUserData.forEach(function(t){var i=[];if(t.img){i.push(BX.create("img",{attrs:{src:t.img}}))}e.appendChild(BX.create("div",{props:{className:"intranet-notify-dialog-user"},children:[BX.create("span",{props:{className:"intranet-notify-dialog-user-avatar"},children:[BX.create("span",{props:{className:"intranet-notify-dialog-user-avatar-inner"},children:i})]}),BX.create("span",{props:{className:"intranet-notify-dialog-user-info"},children:[BX.create("span",{html:BX.util.htmlspecialchars(t.name)})]}),BX.create("span",{props:{id:"intranet-notify-dialog-success-"+parseInt(t.id),className:"intranet-notify-dialog-success"}}),BX.create("span",{props:{id:"intranet-notify-dialog-button-"+parseInt(t.id),className:"webform-small-button intranet-notify-dialog-small-button "+"webform-small-button-blue"},attrs:{"data-id":parseInt(t.id)},html:BX.util.htmlspecialchars(this.popupTexts.sendButton)})]}))},this);t=BX.create("div",{props:{className:"intranet-notify-dialog-container"},children:[BX.create("div",{props:{className:"intranet-notify-dialog-title"},text:this.popupTexts.title}),BX.create("div",{props:{className:"intranet-notify-dialog-content"},children:[e]})]});return t}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:51:"/bitrix/js/intranet/structure.min.js?15198138853028";s:6:"source";s:32:"/bitrix/js/intranet/structure.js";s:3:"min";s:36:"/bitrix/js/intranet/structure.min.js";s:3:"map";s:36:"/bitrix/js/intranet/structure.map.js";}"*/
(function(){if(!!BX.IntranetStructure)return;BX.IntranetStructure={bInit:false,popup:null,arParams:{}};BX.IntranetStructure.Init=function(t){if(t)BX.IntranetStructure.arParams=t;if(BX.IntranetStructure.bInit)return;BX.IntranetStructure.bInit=true;BX.ready(BX.delegate(function(){BX.IntranetStructure.popup=BX.PopupWindowManager.create("BXStructure",null,{autoHide:false,zIndex:0,offsetLeft:0,offsetTop:0,draggable:{restrict:true},closeByEsc:true,titleBar:BX.message("INTR_STRUCTURE_TITLE"+(t["UF_DEPARTMENT_ID"]>0?"_EDIT":"")),closeIcon:true,buttons:[new BX.PopupWindowButton({text:BX.message("INTR_STRUCTURE_BUTTON"),className:"popup-window-button-accept",events:{click:function(){var t=BX("STRUCTURE_FORM");var e=this;var r=BX.delegate(function(t){BX.removeClass(e.buttonNode,"popup-window-button-wait");if(t=="close"){BX.IntranetStructure.popup.close();if(window.BXSTRUCTURECALLBACK)window.BXSTRUCTURECALLBACK.apply(BX.IntranetStructure.popup,[t]);else BX.reload()}else if(/^error:/.test(t)){var r=BX.create("DIV",{html:'<div class="webform-round-corners webform-error-block" style="margin-top:5px" id="error">												<div class="webform-corners-top"><div class="webform-left-corner"></div><div class="webform-right-corner"></div></div>												<div class="webform-content">													<ul class="webform-error-list">'+t.substring(6,t.length)+'</ul>												</div>												<div class="webform-corners-bottom"><div class="webform-left-corner"></div><div class="webform-right-corner"></div></div>											</div>'});if(BX.findChild(BX.IntranetStructure.popup.contentContainer,{className:"webform-error-block"},true)){BX.IntranetStructure.popup.contentContainer.replaceChild(r,BX.IntranetStructure.popup.contentContainer.firstChild)}else{BX.IntranetStructure.popup.contentContainer.insertBefore(r,BX.IntranetStructure.popup.contentContainer.firstChild)}}else{BX.IntranetStructure.popup.setContent(t);if(window.BXSTRUCTURECALLBACK)window.BXSTRUCTURECALLBACK.apply(BX.IntranetStructure.popup,[t])}});if(t&&!BX.hasClass(e.buttonNode,"popup-window-button-wait")){BX.addClass(e.buttonNode,"popup-window-button-wait");if(!t.reload){BX.ajax.submit(t,r)}else{BX.ajax.get(t.action,r)}}}}}),new BX.PopupWindowButtonLink({text:BX.message("INTR_CLOSE_BUTTON"),className:"popup-window-button-link-cancel",events:{click:function(){this.popupWindow.close()}}})],content:'<div style="width:450px;height:230px"></div>',events:{onAfterPopupShow:function(){this.setContent('<div style="width:450px;height:230px" id="intr_struct_load">'+BX.message("INTR_LOADING")+"</div>");BX.ajax.post("/bitrix/tools/intranet_structure.php",{lang:BX.message("LANGUAGE_ID"),site_id:BX.message("SITE_ID")||"",arParams:BX.IntranetStructure.arParams},BX.delegate(function(t){this.setContent(t)},this))}}})},this))};BX.IntranetStructure.ShowForm=function(t){BX.IntranetStructure.Init(t);BX.IntranetStructure.popup.params.zIndex=BX.WindowManager?BX.WindowManager.GetZIndex():0;BX.IntranetStructure.popup.show()}})();
/* End */
;
//# sourceMappingURL=kernel_intranet.map.js