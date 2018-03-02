
; /* Start:"a:4:{s:4:"full";s:80:"/bitrix/components/bitrix/idea.search/templates/.default/script.js?1519813880385";s:6:"source";s:66:"/bitrix/components/bitrix/idea.search/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.ready(function(){
	BX.bind(
		BX('bx-idea-lifesearch-field'),
		'focus',
		function(){
			if(this.value == BX.message('IDEA_SEARCH_DEFAULT'))
				this.value = '';
		}
	);

	BX.bind(
		BX('bx-idea-lifesearch-field'),
		'blur',
		function(){
			if(this.value == "")
				this.value = BX.message('IDEA_SEARCH_DEFAULT');
		}
	);

	BX.fireEvent(BX('bx-idea-lifesearch-field'), 'blur');
})
/* End */
;
; /* Start:"a:4:{s:4:"full";s:74:"/bitrix/components/bitrix/idea/templates/.default/script.js?15198138808885";s:6:"source";s:59:"/bitrix/components/bitrix/idea/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(window){
	if (!!window["JSPublicIdea"])
		return;
	window["JSPublicIdea"] = {
		/*low*/
		RequestURL: window.location.pathname,
		LoadStatusList: function()
		{
			BX.ajax({
				url: this.RequestURL + '?AJAX=IDEA&ACTION=GET_STATUS_LIST&sessid='+BX.bitrix_sessid(),
				method: 'GET',
				dataType: 'json',
				processData: true,
				onsuccess: function(data)
				{
					BX.onCustomEvent(this, 'IdeaOnLoadStatusList', [data]);
				}
			});
		},
		SetStatus: function(IdeaId, StatusId)
		{
			BX.ajax({
				url: this.RequestURL + '?AJAX=IDEA&ACTION=SET_STATUS&IDEA_ID=' + IdeaId + '&STATUS_ID=' + StatusId + '&sessid=' + BX.bitrix_sessid(),
				method: 'GET',
				dataType: 'json',
				processData: true,
				onsuccess: function(data){
					BX.onCustomEvent(this, 'IdeaOnSetStatus', [data, IdeaId, StatusId]);
				}
			});
		},

		/*ext*/
		arStatuses: {},
		arDialog:{},

		IsEmptyStatusList: function()
		{
			var res = true;
			for (var i in this.arStatuses)
			{
				if (this.arStatuses.hasOwnProperty(i))
				{
					res = false;
					break;
				}
			}
			return res;
		},

		ShowStatusDialog: function(IdeaStatusNode, IdeaId)
		{
			IdeaId = IdeaId||0;
			if(IdeaId == 0)
				return;

			var CallBack = function()
			{
				var j = 0;
				var Items = '';
				for(var i in JSPublicIdea.arStatuses)
				{
					if (JSPublicIdea.arStatuses.hasOwnProperty(i))
					{
						if(j>0)
							Items += '<div class="popup-window-hr"><i></i></div>';

						Items += ('<div class="js-idea-popup-status-item idea-action-cursor' + (j==0?' js-idea-popup-status-item-1st':'') + '" onclick="JSPublicIdea.SetStatus(' + IdeaId + ', ' + JSPublicIdea.arStatuses[i].ID + ')">'+
							'<div class="status-color-' + JSPublicIdea.arStatuses[i].XML_ID.toLowerCase() + '">' + JSPublicIdea.arStatuses[i].VALUE + '</div>' +
						'</div>');
						j++;
					}
				}

				if(!JSPublicIdea.arDialog["STATUS_DIALOG_" + IdeaId])
					JSPublicIdea.arDialog["STATUS_DIALOG_" + IdeaId] = new BX.PopupWindow(
						'status-dialog-' + IdeaId,
						IdeaStatusNode,
						{
							content: Items,
							lightShadow: true,
							autoHide: true,
							zIndex: 2500,
							offsetTop: 5,
							offsetLeft: -13
						}
					);
				JSPublicIdea.arDialog["STATUS_DIALOG_" + IdeaId].show();
			};

			if(this.IsEmptyStatusList())
			{
				BX.addCustomEvent('IdeaOnLoadStatusList', CallBack);
				this.LoadStatusList();
				return;
			}

			CallBack();
		},

		/*LS*/
		LifeSearchCache:{},
		LifeSearchQuery: '',
		LifeSearchProcessing: false,
		LifeSearchWaiter: function(activity)
		{
			var display = activity=='Y' ?'visible' :'hidden';

			var LSInputField = BX('bx-idea-waiter-big-lifesearch');
			if(LSInputField)
				LSInputField.style.visibility = display;
		},
		LifeSearch: function(SearchQuery)
		{
			this.LifeSearchQuery = SearchQuery;

			var LSCloseButton = BX('bx-idea-close-button-lifesearch');
			if(LSCloseButton)
				LSCloseButton.style.visibility = SearchQuery.length>0 ?'visible' :'hidden';

			var IdeaContentNode = BX('idea-posts-content');
			if(this.LifeSearchCache[SearchQuery] && IdeaContentNode)
			{
				IdeaContentNode.innerHTML = this.LifeSearchCache[SearchQuery];
				var innerContent = BX.findChildren(IdeaContentNode, {id:'idea-posts-content'}, false);
				if(innerContent && innerContent[0] && typeof innerContent[0].innerHTML != 'undefined')
				{
					IdeaContentNode.innerHTML = innerContent[0].innerHTML;
					this.LifeSearchWaiter('N');
				}
				return;
			}

			if(this.LifeSearchProcessing)
				return;

			this.LifeSearchProcessing = true;

			BX.ajax({
				url: this.RequestURL + '?AJAX=IDEA&ACTION=GET_LIFE_SEARCH&LIFE_SEARCH_QUERY=' + BX.util.urlencode(SearchQuery),
				method: 'GET',
				dataType: 'json',
				processData: true,
				onsuccess: function(SearchQuery){
					return function(data){
						BX.onCustomEvent(this, 'IdeaOnLifeSearch', [data, SearchQuery]);
					}
				}(SearchQuery)
			});

			this.LifeSearchWaiter('Y');
		},

		/*Subscribe*/
		SetSubscribe: function(IdeaId, self)
		{
			BX.ajax({
				url: this.RequestURL + '?AJAX=IDEA&ACTION=SUBSCRIBE&IDEA_ID=' + IdeaId + '&sessid=' + BX.bitrix_sessid(),
				method: 'GET',
				dataType: 'json',
				processData: true,
				onsuccess: function(data){
					BX.onCustomEvent(this, 'IdeaOnSetSubscribe', [data, self]);
				}
			});
		},

		DeleteSubscribe: function(IdeaId, self)
		{
			BX.ajax({
				url: this.RequestURL + '?AJAX=IDEA&ACTION=UNSUBSCRIBE&IDEA_ID=' + IdeaId + '&sessid=' + BX.bitrix_sessid(),
				method: 'GET',
				dataType: 'json',
				processData: true,
				onsuccess: function(data){
					BX.onCustomEvent(this, 'IdeaOnDeleteSubscribe', [data, self]);
				}
			});
		}
	};

	var subscribeFunction = function()
		{
			var IDNode = BX.findChildren(this, {tagName: "span"}, false);
			if(IDNode)
			{
				var IdeaId = IDNode[0].className.substr('idea-post-subscribe-'.length);
				if(IdeaId && IdeaId>0)
					JSPublicIdea.SetSubscribe(IdeaId, this)
			}
		},
		unsubscribeFunction = function()
		{
			var IDNode = BX.findChildren(this, {tagName: "span"}, false);
			if(IDNode)
			{
				var IdeaId = IDNode[0].className.substr('idea-post-subscribe-'.length);
				if(IdeaId && IdeaId>0)
					JSPublicIdea.DeleteSubscribe(IdeaId, this)
			}
		};

	//Custom Handlers
	BX.addCustomEvent('IdeaOnSetSubscribe', function(data, self) {
		if(data.SUCCESS == 'Y')
		{
			var IDNode = BX.findChildren(self, {tagName: "span"}, false);
			if(IDNode)
			{
				IDNode[0].innerHTML = data.CONTENT;
				BX.unbindAll(self);
				BX.bind(self, "click", unsubscribeFunction);
			}
		}
	});
	BX.addCustomEvent('IdeaOnDeleteSubscribe', function(data, self) {
		if(data.SUCCESS == 'Y')
		{
			var IDNode = BX.findChildren(self, {tagName: "span"}, false);
			if(IDNode)
			{
				IDNode[0].innerHTML = data.CONTENT;
				BX.unbindAll(self);
				BX.bind(self, "click", subscribeFunction);
			}
		}
	});

	BX.addCustomEvent('IdeaOnLoadStatusList', function(data){
		if(data.SUCCESS == 'Y' && !!data.STATUSES)
		{
			for(var i in data.STATUSES)
			{
				if (data.STATUSES.hasOwnProperty(i))
				{
					if(typeof(data.STATUSES[i]) != 'object')
						continue;
					JSPublicIdea.arStatuses[i] = data.STATUSES[i];
				}
			}
		}
	});

	BX.addCustomEvent('IdeaOnSetStatus', function(data, IdeaId, StatusId){
		if(data.SUCCESS == 'Y')
		{
			var StatusNode = BX('status-' + IdeaId);
			if(StatusNode)
			{
				StatusNode.innerHTML = JSPublicIdea.arStatuses[StatusId].VALUE;
				StatusNode.parentNode.className = StatusNode.parentNode.className.replace(/(status-color-)[^ ]+/ig, "$1" + JSPublicIdea.arStatuses[StatusId].XML_ID.toLowerCase());
				if(JSPublicIdea.arDialog["STATUS_DIALOG_" + IdeaId])
					JSPublicIdea.arDialog["STATUS_DIALOG_" + IdeaId].close();
			}
		}
	});

	BX.addCustomEvent('IdeaOnLifeSearch', function(data, SearchQuery){
		JSPublicIdea.LifeSearchProcessing = false;
		var IdeaContentNode = BX('idea-posts-content');
		if(data.SUCCESS == 'Y' && IdeaContentNode)
		{
			JSPublicIdea.LifeSearchCache[SearchQuery] = data.CONTENT;
			if(IdeaContentNode)
			{
				IdeaContentNode.innerHTML = JSPublicIdea.LifeSearchCache[SearchQuery];
				var innerContent = BX.findChildren(IdeaContentNode, {id:'idea-posts-content'}, false);
				if(innerContent && innerContent[0] && typeof innerContent[0].innerHTML != 'undefined')
					IdeaContentNode.innerHTML = innerContent[0].innerHTML;
			}

			if(SearchQuery != JSPublicIdea.LifeSearchQuery)
			{
				JSPublicIdea.LifeSearch(JSPublicIdea.LifeSearchQuery);
				return;
			}
		}

		JSPublicIdea.LifeSearchWaiter('N');
	});

	//Prepare life search buttons
	BX.ready(function(){
		var LSCloseButton = BX('bx-idea-close-button-lifesearch');
		var LSInputField = BX('bx-idea-lifesearch-field');
		if(LSCloseButton)
		{
			//Set NULL cache
			//var LifeSearchCacheNULL = BX('idea-posts-content');
			//if(LifeSearchCacheNULL)
			//	JSPublicIdea.LifeSearchCache[''] = LifeSearchCacheNULL.innerHTML;
			//Set Start Search Event
			BX.bind(LSInputField, 'keyup', function(){
				JSPublicIdea.LifeSearch(this.value);
			});
			//Set Clear Search Event
			BX.bind(LSCloseButton, 'click', function(){
				JSPublicIdea.LifeSearch('');
				if(LSInputField)
					LSInputField.value = '';
			});
		}

		if(LSInputField && LSInputField.value.length>0)
			LSCloseButton.style.visibility = 'visible';

		/*Subscribe*/
		var NodeID, Subscribe = BX.findChildren(document, {className: "idea-post-subscribe"}, true);
		if(Subscribe)
		{
			for(NodeID in Subscribe)
			{
				if (Subscribe.hasOwnProperty(NodeID))
				{
					BX.bind(Subscribe[NodeID], "click", subscribeFunction);
				}
			}
		}

		var UnSubscribe = BX.findChildren(document, {className: "idea-post-unsubscribe"}, true);
		if(UnSubscribe)
		{
			for(NodeID in UnSubscribe)
			{
				if (UnSubscribe.hasOwnProperty(NodeID))
				{
					BX.bind(UnSubscribe[NodeID], "click", unsubscribeFunction);
				}
			}
		}
	});
})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:88:"/bitrix/components/bitrix/idea.category.list/templates/.default/script.js?15198138802642";s:6:"source";s:73:"/bitrix/components/bitrix/idea.category.list/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.ready(function(){
	 var idea_active_menu= {
		tag:'a.bx-idea-active-menu',

		_node:BX('bx-idea-left-menu'),

		_tagname:function(){
			var name_patern=/^([a-z]{1,6})(\.|#)(\S+)/;
			var tag_n=name_patern.exec(this.tag)[1];
			return tag_n;
		},
		_classname:function(){
			var name_patern=/^([a-z]{1,6})(\.|#)(\S+)/;
			var class_n=name_patern.exec(this.tag)[3];
			return class_n;
		},

		active_tag:function(){
			var act_tag = BX.findChildren(this._node,{tagName:this._tagname(), className:this._classname()},true);
			if(act_tag)
				return act_tag[act_tag.length-1];
			else
				return false;
		},

		wrap: function(){
			var span = document.createElement('span');
			var span_corn = document.createElement('span');
			BX.addClass(span,'bx-idea-active-menu-item');
			//BX.addClass(span_corn,'bx-idea-menu-corner');

			if(!span.style.borderRadius && BX.browser.IsDoctype())span_corn.style.left='-9px';

			if(!BX.browser.IsDoctype() && BX.browser.IsIE()){
			span_corn.style.right='-12px';
			}

			span.style.borderRadius='3px 4px 4px 3px';
			var act_tag_wrap = this.active_tag();
			if(act_tag_wrap)
			{
				act_tag_wrap.parentNode.replaceChild(act_tag_wrap.parentNode.insertBefore(span, act_tag_wrap),act_tag_wrap);
				span.appendChild(act_tag_wrap);
				span.appendChild(span_corn);

				var TopParent = act_tag_wrap.parentNode.parentNode.parentNode.parentNode;
				if(BX.hasClass(TopParent, 'bx-idea-left-menu-li') && !BX.hasClass(TopParent, 'bx-idea-left-menu-open'))
					BX.addClass(TopParent, 'bx-idea-left-menu-open');

				var corn_height=(span.offsetHeight-3)/2;
				span_corn.style.borderBottomWidth = corn_height+'px';
				span_corn.style.borderTopWidth = corn_height+'px';
			}
		}
	};

	idea_active_menu.wrap();

	/*var menuLI = BX.findChildren(BX('bx-idea-left-menu'), {tagName:'li', className:'bx-idea-left-menu-li'}, true);
	if(menuLI)
	{
		for(var i=0; i<menuLI.length; i++)
	{
		var IsSubMenuExists = BX.findChildren(menuLI[i], {tagName:'ul', className:'bx-idea-left-menu_2'}, true);
		if(IsSubMenuExists)
				{
					var firstParentLink = BX.findChildren(menuLI[i], {tagName:'a', className:'bx-idea-left-menu-link'}, true);
					if(firstParentLink)
						firstParentLink[0].onclick = function()
						{
							BX.hasClass(this.parentNode, 'bx-idea-left-menu-open')?BX.removeClass(this.parentNode, 'bx-idea-left-menu-open'):BX.addClass(this.parentNode, 'bx-idea-left-menu-open');
						}
				}
		else
		{
				menuLI[i].onclick=function()
			{
					BX.hasClass(this, 'bx-idea-left-menu-open')?BX.removeClass(this, 'bx-idea-left-menu-open'):BX.addClass(this, 'bx-idea-left-menu-open');
				}
		}
		}
	}   */
});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:89:"/bitrix/components/bitrix/main.post.form/templates/.default/script.min.js?151981385166416";s:6:"source";s:69:"/bitrix/components/bitrix/main.post.form/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(){if(window["LHEPostForm"])return;var e={controller:{},handler:{}};BX.addCustomEvent(window,"BFileDLoadFormControllerWasBound",function(t){e.controller[t.id]=true});BX.addCustomEvent(window,"WDLoadFormControllerInit",function(t){e.controller[t.CID]=t});BX.addCustomEvent(window,"WDLoadFormControllerWasBound",function(t){e.controller[t.CID]=true});BX.addCustomEvent(window,"DiskDLoadFormControllerInit",function(t){e.controller[t.CID]=t});BX.addCustomEvent(window,"DiskLoadFormControllerWasBound",function(t){e.controller[t.CID]=true});BX.addCustomEvent(window,"OnEditorInitedBefore",function(t){if(e.handler[t.id]){t.__lhe_flags=["OnEditorInitedBefore"];if(e.handler[t.id]["params"]&&e.handler[t.id]["params"]["LHEJsObjName"])window[e.handler[t.id].params["LHEJsObjName"]]=t;e.handler[t.id].OnEditorInitedBefore(t)}});var t=function(t){if(e.handler[t.id]&&e.handler[t.id].editorIsLoaded!==true){e.handler[t.id].editorIsLoaded=true;e.handler[t.id].exec();BX.onCustomEvent(e.handler[t.id],"OnEditorIsLoaded",[e.handler[t.id],t])}};BX.addCustomEvent(window,"OnCreateIframeAfter",t);BX.addCustomEvent(window,"OnEditorInitedAfter",function(i,n){if(e.handler[i.id]){i.__lhe_flags.push("OnEditorInitedAfter");e.handler[i.id].OnEditorInitedAfter(i);if(e.handler[i.id].editorIsLoaded!==true&&n&&i.sandbox&&i.sandbox.inited)t.apply(i,[i])}});BX.util.object_search=function(e,t){for(var i in t){if(t.hasOwnProperty(i)){if(t[i]==e)return true;else if(typeof t[i]=="object"&&t[i]!==null){var n=BX.util.object_search_key(e,t[i]);if(n!==false)return n}}}return false};var i=function(e,t,i){i=i&&i.length>0?i:[];if(typeof t=="object"&&t.length>0){var n;while((n=t.pop())&&n&&t.length>0){i.push(n)}t=n}i.push(t);this.exist=true;this.bxTag=e;this.tag=t;this.tags=i;this.regexp=new RegExp("\\[("+i.join("|")+")=((?:\\s|\\S)*?)(?:\\s*?WIDTH=(\\d+)\\s*?HEIGHT=(\\d+))?\\]","ig");this.code="["+t+"=#ID##ADDITIONAL#]";this.wysiwyg='<span style="color: #2067B0; border-bottom: 1px dashed #2067B0; margin:0 2px;" id="#ID#"#ADDITIONAL#>#NAME#</span>'},n=function(t,i,n){this.CID=this.id=i;this.parser=t.parser["disk_file"]||null;this.params=n;this.node=BX("diskuf-selectdialog-"+i);this.handler=e.controller[i];this.manager=t;this.eventNode=this.manager.eventNode;this.parserName="disk_file";this.prefixNode="disk-edit-attach";this.prefixHTMLNode="disk-attach-";this.props={valueEditClassName:"wd-inline-file",securityCID:"disk-upload-cid"};this.storage="disk";this.fileToAttach={};this.xmlToAttach={};this.events={onInit:"DiskDLoadFormControllerInit",onShow:"DiskLoadFormController",onBound:"DiskLoadFormControllerWasBound"}};n.prototype={parser:false,eventNode:null,values:{},initialized:false,functionsToExec:[],exec:function(e,t){if(typeof e=="function")this.functionsToExec.push([e,t]);if(this.handler&&this.handler!==true){var i;while((i=this.functionsToExec.shift())&&i)i[0].apply(this,i[1])}},init:function(){if(this.initialized!==true){this.values={};this.functionsToExec=[];this.initialized=true;this.bindMainEvents(this.manager);if(this.parser!==null){this.bindEvents(this.manager);return this.initValues()}}return false},initValues:function(){var e=BX.findChildren(this.node,{className:this.props.valueEditClassName},true);if(e&&e.length>0){this.exec(this.runCheckText);return true}return false},bindMainEvents:function(t){var i=null;BX.addCustomEvent(t.eventNode,"onReinitializeBefore",BX.proxy(this.clean,this));BX.addCustomEvent(t.eventNode,"onShowControllers",BX.proxy(function(e){i=e;BX.onCustomEvent(t.eventNode,this.events.onShow,[e])},this));if(!e.controller[this.id]){var o=BX.delegate(function(e){if(e["UID"]==this.id||e["id"]==this.id){if(i==="show"||i==="hide"){BX.onCustomEvent(t.eventNode,this.events.onShow,[i]);i=null}BX.removeCustomEvent(window,this.events.onBound,o)}},this);BX.addCustomEvent(window,this.events.onBound,o)}if(BX["DD"]&&this.storage=="disk"){var s=BX.delegate(function(e){if((e["UID"]==this.id||e["id"]==this.id)&&this.manager["dropZoneExists"]!==true){BX.removeCustomEvent(window,this.events.onBound,s);this.manager["dropZoneExists"]=true;var i=this.eventNode,o=this.id;n.dndCatcher=n.dndCatcher||{};n.dndCatcher[o]={catch:true,files:[],dropZone:null,dropZoneMicro:null,initdrag:BX.delegate(function(){n.dndCatcher[o].dropZone=new BX.DD.dropFiles(t.eventNode);BX.addCustomEvent(t.eventNode,"OnImageDataUriHandle",BX.delegate(function(e,t){if(BX["UploaderUtils"]){var i=BX.UploaderUtils.dataURLToBlob(t.src);if(i&&i.size>0&&i.type.indexOf("image/")==0){i.name=i.name||t.title||"image."+i.type.substr(6);i.referrerToEditor=t;if(n.dndCatcher[o]["catch"]===true)n.dndCatcher[o]["drop"]([i]);else if(this.handler&&this.handler["addFile"])this.handler.addFile(i);BX.onCustomEvent(e,"OnImageDataUriCaught",[t])}}},this));BX.addCustomEvent(n.dndCatcher[o].dropZone,"dropFiles",n.dndCatcher[o]["drop"]);BX.addCustomEvent(n.dndCatcher[o].dropZone,"dragEnter",n.dndCatcher[o]["dragover"]);BX.addCustomEvent(n.dndCatcher[o].dropZone,"dragLeave",n.dndCatcher[o]["dragleave"]);if(BX("micro"+t.__divId)){n.dndCatcher[o].dropZoneMicro=new BX.DD.dropFiles(BX("micro"+t.__divId));BX.addCustomEvent(n.dndCatcher[o].dropZoneMicro,"dragEnter",function(){BX.onCustomEvent(t.eventNode,"OnShowLHE",["justShow"])})}BX.unbind(document,"dragover",n.dndCatcher[o]["initdrag"]);BX.onCustomEvent(t.eventNode,"onDropZoneExists",[])},this),dragover:BX.delegate(function(){BX.addClass(t.eventNode,"feed-add-post-dnd-over");BX.onCustomEvent(t.eventNode,"dragover",[])},this),dragleave:BX.delegate(function(){BX.removeClass(t.eventNode,"feed-add-post-dnd-over");BX.onCustomEvent(t.eventNode,"dragleave",[])},this),dragenterwindow:BX.delegate(function(){BX.addClass(t.eventNode,"feed-add-post-dnd-ready");if(BX("micro"+t.__divId)){BX.addClass(BX("micro"+t.__divId),"feed-add-post-micro-dnd-ready")}BX.onCustomEvent(t.eventNode,"dragenterwindow",[])},this),dragleavewindow:BX.delegate(function(e){BX.removeClass(t.eventNode,"feed-add-post-dnd-ready");if(BX("micro"+t.__divId)){BX.removeClass(BX("micro"+t.__divId),"feed-add-post-micro-dnd-ready")}BX.onCustomEvent(t.eventNode,"dragleavewindow",[])},this),drop:BX.delegate(function(e){BX.onCustomEvent(t.eventNode,"drop",[]);BX.onCustomEvent(window,"dragWindowLeave");BX.onCustomEvent(window,"__dragWindowLeave");var i=0;if(e&&e.length>0){if(n.dndCatcher[o]["catch"]===true){n.dndCatcher[o].files=e;i=1}else{i=2}BX.onCustomEvent(t.eventNode,this.events.onShow,["show"]);BX.removeClass(t.eventNode,"feed-add-post-dnd-ready feed-add-post-dnd-over")}return i},this)};BX.ready(function(){n.dndCatcher[o]["initdrag"]()});BX.addCustomEvent(i,"OnIframeDrop",BX.delegate(function(e){BX.PreventDefault(e);if(e["dataTransfer"]&&e["dataTransfer"]["files"]){if(n.dndCatcher[o].drop(e["dataTransfer"]["files"])===2){this.handler.agent.onChange(e["dataTransfer"]["files"])}}},this));BX.addCustomEvent(i,"OnIframeDragOver",n.dndCatcher[o].dragover);BX.addCustomEvent(i,"OnIframeDragLeave",n.dndCatcher[o].dragleave);if(!window["bxMpfDndCatcher"]){window["bxMpfDndCatcher"]=true;var a=false,r=function(){if(a===false){a=true;BX.bind(document,"dragleave",l);BX.bind(document,"dragover",l);BX.bind(document,"mouseout",d);BX.onCustomEvent(window,"dragWindowEnter")}},d=function(e){BX.unbind(document,"dragleave",l);BX.unbind(document,"dragover",l);BX.unbind(document,"mouseout",d);a=false;BX.onCustomEvent(window,"dragWindowLeave")},l=function(e){if(h>0){clearTimeout(h);h=0}BX.fixEventPageXY(e);var t=true;if(e.pageX>0&&e.pageY>0){var i=BX.GetWindowSize();if(e.pageY<i.scrollHeight&&e.pageX<i.scrollWidth){var n=e.pageY-i.scrollTop,o=e.pageX-i.scrollLeft;if(0<n&&n<i.innerHeight-20&&0<o&&o<i.innerWidth-20){t=false}}}if(t){d(e)}else{h=setTimeout(function(){l({type:"intervalLimit"})},100)}},h=0;BX.bind(document,"dragenter",function(e){if(window["bxMpfDndCatcher"]>0){clearTimeout(window["bxMpfDndCatcher"])}var t=true;if(e&&e["dataTransfer"]&&e["dataTransfer"]["types"]){for(var i=0;i<e["dataTransfer"]["types"].length;i++){if(e["dataTransfer"]["types"][i]=="Files"){t=true;break}}}if(t){r()}});BX.addCustomEvent(window,"__dragWindowLeave",d);BX.bind(document,"dragover",function(e){return BX.PreventDefault(e)});BX.bind(document,"drop",function(e){d(e);return BX.PreventDefault(e)})}BX.addCustomEvent(window,"dragWindowEnter",n.dndCatcher[o].dragenterwindow);BX.addCustomEvent(window,"dragWindowLeave",n.dndCatcher[o].dragleavewindow);this.__initCatcher=BX.delegate(function(e,i){if(e==this.id){BX.removeCustomEvent(t.eventNode,"onControllerInitialized",this.__initCatcher);i.agent.initDropZone(t.eventNode);if(n.dndCatcher[e].files.length>0){i.agent.onChange(n.dndCatcher[e].files);n.dndCatcher[e].files=[]}n.dndCatcher[e]["catch"]=false;this.__initCatcher=null}},this);BX.addCustomEvent(t.eventNode,"onControllerInitialized",this.__initCatcher)}},this);BX.addCustomEvent(window,this.events.onBound,s);if(e.controller[this.id])s(e.controller[this.id])}},bindEvents:function(e){this._catchHandler=BX.delegate(function(t){BX.removeCustomEvent(this.eventNode,this.events.onInit,this._catchHandler);this.handler=t;var i=BX.findChild(BX(e.formID),{attr:{id:this.props.securityCID}},true,false);if(i)i.value=this.handler.CID;this.exec();var n=BX.delegate(function(){BX.onCustomEvent(e.eventNode,"onUploadsHasBeenChanged",arguments)},this);BX.addCustomEvent(this.handler.agent,"onFileIsInited",n);BX.addCustomEvent(this.handler.agent,"ChangeFileInput",n);BX.onCustomEvent(e.eventNode,"onControllerInitialized",[this.id,t])},this);if(typeof this.handler!="object"||!this.handler)BX.addCustomEvent(e.eventNode,this.events.onInit,this._catchHandler);else this._catchHandler(this.handler);BX.addCustomEvent(e.eventNode,"OnFileUploadSuccess",BX.delegate(function(e,t,i){if(this.id==t.CID||this.id==t.id){i=i||{};i.usePostfix=true;this.addFile(e,i,t)}},this));BX.addCustomEvent(e.eventNode,"OnFileUploadFailed",BX.delegate(function(e,t,i){if(this.id==t.CID||this.id==t.id){this.failFile(e,i,t)}},this));BX.addCustomEvent(e.eventNode,"OnFileUploadRemove",BX.delegate(function(e,t){if(this.id==t.CID||this.id==t.id){this.deleteFile(e,{usePostfix:true},t)}},this));BX.addCustomEvent(this,"onFileIsInText",BX.proxy(function(e,t){this.adjustFile(this.checkFile(e),t)},this))},addFile:function(e,t,i){var n=this.checkFile(e.element_id,e,t);if(n){setTimeout(BX.proxy(function(){this.bindFile(n);this.adjustFile(n,false)},this),100);BX.onCustomEvent(this.eventNode,"onFileIsAdded",[n,this,i,t])}else{this.failFile(this,t,i)}return true},failFile:function(e,t,i){BX.onCustomEvent(this.eventNode,"onFileIsFailed",[this,i,t])},checkFile:function(e,t){e=""+(typeof e=="object"?e.id:e);if(typeof t=="object"&&t!==null&&e&&t.element_name&&BX(t.place)){var i={id:e,name:t.element_name,url:t.element_url,type:"isnotimage/xyz",isImage:false,place:BX(t.place,true),xmlID:BX(t.place,true).getAttribute("bx-attach-xml-id"),fileID:BX(t.place,true).getAttribute("bx-attach-file-id"),fileType:BX(t.place,true).getAttribute("bx-attach-file-type")},n;if(/(\.png|\.jpg|\.jpeg|\.gif|\.bmp)$/i.test(t.element_name)&&(n=BX.findChild(i.place,{className:"files-preview",tagName:"IMG"},true,false))&&n){i.type="image/xyz";i.lowsrc=n.src;i.element_url=i.src=n.src.replace(/\Wwidth=(\d+)/,"").replace(/\Wheight=(\d+)/,"");i.isImage=true;i.width=parseInt(n.getAttribute("data-bx-full-width")||n.getAttribute("data-bx-width"));i.height=parseInt(n.getAttribute("data-bx-full-height")||n.getAttribute("data-bx-height"))}if(i.xmlID)this.xmlToAttach[i.xmlID+""]=e;if(i.fileID)this.fileToAttach[i.fileID+""]=e;this.values[e]=i}return this.values[e]||false},bindFile:function(e){var t=e.place;if(typeof e=="object"&&t&&!t.hasAttribute("bx-file-is-bound")){var i=BX.findChild(t,{className:"f-wrap"},true,false),n=BX.findChild(t,{className:"files-preview"},true,false);if(i){BX.bind(i,"click",BX.delegate(function(){this.insertFile(e.id)},this));i.style.cursor="pointer";i.title=BX.message("MPF_FILE")}if(n){BX.bind(n,"click",BX.delegate(function(){this.insertFile(e.id)},this))}}},adjustFile:function(e,t){var i=e.place;if(t===true||t===false){if(!e.info)e.info=BX.findChild(e.place,{className:"files-info"},true,false);i=e.info;if(BX.type.isDomNode(i)){var n="check-in-text-"+e.id,o=BX(n),s=t===false?{attrs:{"bx-file-is-in-text":"N"},props:{className:"insert-btn"},html:'<span class="insert-btn-text">'+BX.message("MPF_FILE_INSERT_IN_TEXT")+"</span>"}:{attrs:{"bx-file-is-in-text":"Y"},props:{className:"insert-text"},html:'<span class="insert-btn-text">'+BX.message("MPF_FILE_IN_TEXT")+"</span>"};if(!o){s.attrs.id=n;s.events={click:BX.proxy(function(){this.insertFile(e.id)},this)};i.appendChild(BX.create("SPAN",s))}else{BX.adjust(o,s)}}}},insertFile:function(e){BX.onCustomEvent(this.eventNode,"onFileIsInserted",[this.checkFile(e),this])},deleteFile:function(e,t){e=this.checkFile(e,t);if(e){BX.onCustomEvent(this.eventNode,"onFileIsDeleted",[e,this]);this.values[e.id].place=null;delete this.values[e.id].place;this.values[e.id]=null;delete this.values[e.id];e=null;return true}return false},reinitValues:function(e,t){var i,n,o={};while((i=t.pop())&&i){n=BX(this.prefixHTMLNode+i);n=n?n.tagName=="A"?n:BX.findChild(n,{tagName:"IMG"},true):null;if(n){o["E"+i]={type:"file",id:i,name:n.getAttribute("data-bx-title"),size:n.getAttribute("data-bx-size"),sizeInt:n.getAttribute("data-bx-size"),width:n.getAttribute("data-bx-width"),height:n.getAttribute("data-bx-height"),storage:"disk",previewUrl:n.tagName=="A"?"":n.getAttribute("data-bx-src"),fileId:n.getAttribute("bx-attach-file-id")};if(n.hasAttribute("bx-attach-xml-id"))o["E"+i]["xmlId"]=n.getAttribute("bx-attach-xml-id");if(n.hasAttribute("bx-attach-file-type"))o["E"+i]["fileType"]=n.getAttribute("bx-attach-file-type")}}this.handler.selectFile({},{},o);this.runCheckText()},runCheckText:function(){if(!this._checkText)this._checkText=BX.delegate(this.checkText,this);this.manager.exec(this._checkText)},checkText:function(){var e,t=this.manager.getContent(),i=[],n,o;if(t!=""){e=t;for(o in this.xmlToAttach){if(this.xmlToAttach.hasOwnProperty(o)){t=t.replace(new RegExp("\\&\\#91\\;DOCUMENT ID=("+o+")([WIDTHHEIGHT=0-9 ]*)\\&\\#93\\;","gim"),"["+this.parser["tag"]+"="+this.xmlToAttach[o]+"$2]").replace(new RegExp("\\[DOCUMENT ID=("+o+")([WIDTHHEIGHT=0-9 ]*)\\]","gim"),"["+this.parser["tag"]+"="+this.xmlToAttach[o]+"$2]")}}for(o in this.fileToAttach){if(this.fileToAttach.hasOwnProperty(o)){t=t.replace(new RegExp("\\&\\#91\\;"+this.parser["tag"]+"=("+o+")([WIDTHHEIGHT=0-9 ]*)\\&\\#93\\;","gim"),"["+this.parser["tag"]+"="+this.fileToAttach[o]+"$2]").replace(new RegExp("\\["+this.parser["tag"]+"=("+o+")([WIDTHHEIGHT=0-9 ]*)\\]","gim"),"["+this.parser["tag"]+"="+this.fileToAttach[o]+"$2]")}}n=new RegExp("(?:\\&\\#91\\;)("+this.parser["tags"].join("|")+")=([a-z=0-9 ]+)(?:\\&\\#93\\;)","gim");if(n.test(t)){for(o in this.values){if(this.values.hasOwnProperty(o)){i.push(o)}}if(i.length>0){n=new RegExp("(?:\\&\\#91\\;|\\[)("+this.parser["tags"].join("|")+")=("+i.join("|")+")([WIDTHHEIGHT=0-9 ]*)(?:\\&\\#93\\;|\\])","gim");if(n.test(t))t=t.replace(n,BX.delegate(function(e,t,i,n){return"["+t+"="+i+n+"]"},this))}}if(e!=t)BX.onCustomEvent(this.eventNode,"onFileIsDetected",[t,this])}return t},clean:function(){if(this.handler&&this.handler.values){var e,t,i,n=BX(this.manager.formID);while((e=this.handler.values.pop())&&e){BX.remove(e)}if(this.handler.params&&this.handler.params.controlName){t=BX.findChildren(n,{tagName:"INPUT",attribute:{name:this.handler.params.controlName}},true)}if(t){for(i=0;i<t.length;i++){BX.remove(t[i])}}}},reinit:function(e,t){var i=[],n,o;for(n in t){if(t.hasOwnProperty(n)){if(t[n]["USER_TYPE_ID"]==this.parserName&&t[n]["VALUE"]){for(o in t[n]["VALUE"]){if(t[n]["VALUE"].hasOwnProperty(o)){i.push(t[n]["VALUE"][o])}}}}}if(i.length>0){this.exec(this.reinitValues,[e,i]);return true}return false}};var o=function(e,t,i){o.superclass.constructor.apply(this,arguments);this.parser=e.parser["webdav_element"]||null;this.node=BX("wduf-selectdialog-"+t);this.manager=e;this.parserName="webdav_element";this.prefixNode="wd-doc";this.prefixHTMLNode="wdif-doc-";this.storage="webdav";this.events={onInit:"WDLoadFormControllerInit",onShow:"WDLoadFormController",onBound:"WDLoadFormControllerWasBound"}};BX.extend(o,n);o.prototype.reinitValues=function(e,t){var i,n,o={};this.waitAnswerFromServer=[];while((i=t.pop())&&i){n=BX(this.prefixHTMLNode+i);n=n?n.tagName=="A"?n:BX.findChild(n,{tagName:"IMG"},true):null;if(n){o["E"+i]={type:"file",id:i,name:n.getAttribute("alt"),storage:"webdav",size:n.getAttribute("data-bx-size"),sizeInt:1,ext:"",link:n.getAttribute("data-bx-document")};if(n.hasAttribute("bx-attach-xml-id"))o["E"+i]["xmlId"]=n.getAttribute("bx-attach-xml-id");this.waitAnswerFromServer.push(i)}}if(this.waitAnswerFromServer.length>0){if(!this._defferCheckText)this._defferCheckText=BX.delegate(this.defferCheckText,this);BX.addCustomEvent(this.eventNode,"OnFileUploadSuccess",this._defferCheckText);this.handler.WDFD_SelectFile({},{},o)}};o.prototype.defferCheckText=function(e){var t=BX.util.array_search(e.element_id,this.waitAnswerFromServer);if(t>=0){this.runCheckText();this.waitAnswerFromServer=BX.util.deleteFromArray(this.waitAnswerFromServer,t)}if(this.waitAnswerFromServer.length<=0)BX.removeCustomEvent(this.eventNode,"OnFileUploadSuccess",this._defferCheckText)};var s=function(e,t,i){s.superclass.constructor.apply(this,arguments);this.parser=e.parser["file"]?e.parser["file"]:e.parser["postimage"]["exist"]?e.parser["postimage"]:null;this.postfix=i["postfix"]||"";this.node=BX("file-selectdialog-"+t);this.parserName="file";this.prefixNode="wd-doc";this.prefixHTMLNode="file-doc-";this.props={valueEditClassName:"file-inline-file",securityCID:"upload-cid"};this.storage="bfile";this.events={onInit:"BFileDLoadFormControllerInit",onShow:"BFileDLoadFormController",onBound:"BFileDLoadFormControllerWasBound"}};BX.extend(s,n);s.prototype.initValues=function(e){var t;if(e!==true){t=BX.findChildren(this.node,{className:this.props.valueEditClassName},true);if(t&&t.length>1){this.exec(this.initValues,[true]);return true}return false}t=this.handler.agent.values||[];var i,n,o,s,a={},r="/bitrix/components/bitrix/main.file.input/file.php?mfi_mode=down&cid="+this.handler.CID+"&sessid="+BX.bitrix_sessid();for(var d=0;d<t.length;d++){s=parseInt(t[d].getAttribute("id").replace(this.prefixNode,""));if(a["id"+s])continue;a["id"+s]="Y";if(s>0){n=BX.findChild(t[d],{className:"f-wrap"},true,false);if(!n)continue;o={element_id:s,element_name:n.innerHTML,parser:this.parser.bxTag,storage:"bfile",element_url:r+"&fileID="+s};i=this.addFile(o,{usePostfix:true,hasPreview:false})}}this.runCheckText();return true};s.prototype.checkFile=function(e,t,i){e=""+(typeof e=="object"?e.id:e);e=e+(i&&i["usePostfix"]===true?this.postfix:"");if(typeof t=="object"&&t!==null&&e&&t.element_name&&BX(this.prefixNode+t.element_id,true)){var n={id:e,name:t.element_name,url:t.element_url,type:"isnotimage/xyz",isImage:false,place:BX(this.prefixNode+t.element_id,true)},o;if((t["element_type"]&&t["element_type"].indexOf("image/")===0||/(\.png|\.jpg|\.jpeg|\.gif|\.bmp)$/i.test(t.element_name))&&((o=BX.findChild(n.place,{tagName:"IMG"},true,false))&&o||i&&i["hasPreview"]===false)){n.type="image/xyz";n.src=t["element_thumbnail"]||t["element_url"];n.isImage=true;n.hasPreview=false;n.lowsrc="";n.width="";n.height="";if(BX(o)){n.hasPreview=true;n.lowsrc=t["element_thumbnail"]||o["src"];n.width=parseInt(o.getAttribute("data-bx-full-width"));n.height=parseInt(o.getAttribute("data-bx-full-height"))}}else if(this.parser.bxTag=="postimage"){return false}if(BX(n.place,true).getAttribute("bx-attach-file-type")){n.fileType=BX(n.place,true).getAttribute("bx-attach-file-type")}this.values[e]=n}return this.values[e]||false};s.prototype.bindFile=function(e){var t=e&&e["place"]?e["place"]:null;if(typeof e=="object"&&t&&!t.hasAttribute("bx-file-is-bound")){if(e.isImage&&e.hasPreview){var i=BX.findChild(t,{className:"feed-add-img-title"},true,false),n=BX.findChild(t,{className:"feed-add-img-wrap"},true,false);if(n){BX.bind(n,"click",BX.proxy(function(){this.insertFile(e)},this));n.style.cursor="pointer";n.title=BX.message("MPF_IMAGE")}if(i){BX.bind(i,"click",BX.delegate(function(){this.insertFile(e)},this));i.style.cursor="pointer";i.title=BX.message("MPF_IMAGE")}}else s.superclass.bindFile.apply(this,arguments)}};s.prototype.clean=function(){s.superclass.clean.apply(this,arguments);if(this["handler"]&&this.handler["agent"]&&this.handler.agent["inputName"]){var e,t,i=BX(this.manager.formID);e=BX.findChildren(i,{tagName:"INPUT",attribute:{name:this.handler.agent.inputName+"[]"}},true);if(e){for(t=0;t<e.length;t++){BX.remove(e[t])}}}};var a=function(t,i){this.params=i;this.formID=t;this.showPinButton=!!BX("lhe_button_editor_"+this.formID);if(this.showPinButton){this.params.showPanelEditor=!!this.params.pinEditorPanel}this.oEditorId=i["LHEJsObjId"];this.__divId=i["LHEJsObjName"]||i["LHEJsObjId"];e.handler[this.oEditorId]=this;this.oEditor=a.getEditor(this.oEditorId);this.urlPreview=this.initUrlPreview(i);this.eventNode=BX("div"+this.__divId);BX.addCustomEvent(this.eventNode,"OnShowLHE",BX.delegate(this.OnShowLHE,this));BX.addCustomEvent(this.eventNode,"OnButtonClick",BX.delegate(this.OnButtonClick,this));BX.addCustomEvent(this.eventNode,"OnAfterShowLHE",function(e,t){if(t.oEditor&&t.oEditor["AllowBeforeUnloadHandler"])t.oEditor.AllowBeforeUnloadHandler();if(t.monitoringWakeUp===true)t.monitoringStart()});BX.addCustomEvent(this.eventNode,"OnAfterHideLHE",function(e,t){t.monitoringWakeUp=t.monitoringStop();if(t.oEditor&&t.oEditor["DenyBeforeUnloadHandler"])t.oEditor.DenyBeforeUnloadHandler()});this.initParsers(i);this.initFiles(t,i);BX.ready(BX.delegate(function(){if(BX("lhe_button_submit_"+t,true)){BX.bind(BX("lhe_button_submit_"+t,true),"mousedown",function(){BX.addClass(this,"feed-add-button-press")});BX.bind(BX("lhe_button_submit_"+t,true),"mouseup",function(){BX.removeClass(this,"feed-add-button-press")});BX.bind(BX("lhe_button_submit_"+t,true),"click",BX.proxy(function(e){BX.onCustomEvent(this.eventNode,"OnButtonClick",["submit"]);return BX.PreventDefault(e)},this))}if(BX("lhe_button_cancel_"+t,true)){BX.bind(BX("lhe_button_cancel_"+t,true),"mousedown",function(){BX.addClass(this,"feed-add-button-press")});BX.bind(BX("lhe_button_cancel_"+t,true),"mouseup",function(){BX.removeClass(this,"feed-add-button-press")});BX.bind(BX("lhe_button_cancel_"+t,true),"click",BX.proxy(function(e){BX.onCustomEvent(this.eventNode,"OnButtonClick",["cancel"]);return BX.PreventDefault(e)},this))}},this));this.inited=true;BX.addCustomEvent(BX(this.formID),"onAutoSavePrepare",function(e){e.FORM.setAttribute("bx-lhe-autosave-prepared","Y")});BX.onCustomEvent(this,"onInitialized",[this,t,i,this.parsers]);BX.onCustomEvent(this.eventNode,"onInitialized",[this,t,i,this.parsers]);if(this.oEditor&&this.oEditor.inited&&!this.oEditor["__lhe_flags"]){BX.onCustomEvent(this.oEditor,"OnEditorInitedBefore",[this.oEditor]);BX.onCustomEvent(this.oEditor,"OnEditorInitedAfter",[this.oEditor,true])}};a.prototype={editorIsLoaded:false,arFiles:{},parser:{},controllers:{},exec:function(e,t){this.functionsToExec=this.functionsToExec||[];if(typeof e=="function")this.functionsToExec.push([e,t]);if(this.editorIsLoaded===true){var i;while((i=this.functionsToExec.shift())&&i)i[0].apply(this,i[1])}},initParsers:function(e){this.parser={postimage:{exist:false,bxTag:"postimage",tag:"IMG ID",tags:["IMG ID"],regexp:/\[(IMG ID)=((?:\s|\S)*?)(?:\s*?WIDTH=(\d+)\s*?HEIGHT=(\d+))?\]/gi,code:"[IMG ID=#ID##ADDITIONAL#]",wysiwyg:'<img id="#ID#" src="'+'#SRC#" lowsrc="'+'#LOWSRC#" title=""#ADDITIONAL# />'},player:{exist:false,bxTag:"player",tag:"FILE ID",tags:["FILE ID"],regexp:/\[(FILE ID)=((?:\s|\S)*?)?\]/gi,code:"[FILE ID=#ID##ADDITIONAL#]",wysiwyg:'<img class="bxhtmled-player-surrogate" id="#ID#" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" contenteditable="false" title=""#ADDITIONAL# />'}};var t=e["parsers"]?e["parsers"]:{};for(var n in t){if(t.hasOwnProperty(n)&&/[a-z]/gi.test(n+"")){this.parser[n]=new i(n,t[n])}}if(BX.util.object_search("UploadImage",t)){this.parser["postimage"]["exist"]=true}if(typeof e["arSize"]=="object"){var o="";if(e["arSize"]["width"])o+="max-width:"+e["arSize"]["width"]+"px;";if(e["arSize"]["height"])o+="max-height:"+e["arSize"]["height"]+"px;";if(o!=="")this.parser["postimage"]["wysiwyg"]=this.parser["postimage"]["wysiwyg"].replace("#ADDITIONAL#",' style="'+o+'" #ADDITIONAL#')}},initFiles:function(e,t){this.arFiles={};this.controllers={common:{postfix:"",storage:"bfile",parser:"postimage",node:window,obj:null,init:false}};if(!t["CID"]||typeof t["CID"]!=="object")return;BX.addCustomEvent(this.eventNode,"onFileIsAdded",BX.delegate(this.OnFileUploadSuccess,this));BX.addCustomEvent(this.eventNode,"onFileIsFailed",BX.delegate(this.OnFileUploadFailed,this));BX.addCustomEvent(this.eventNode,"onFileIsDeleted",BX.delegate(this.OnFileUploadRemove,this));BX.addCustomEvent(this.eventNode,"onFileIsDetected",BX.delegate(this.setContent,this));BX.addCustomEvent(this.eventNode,"onFileIsInserted",BX.delegate(this.insertFile,this));var i,a,r;for(a in t["CID"]){if(t["CID"].hasOwnProperty(a)){i=t["CID"][a]["parser"];if(i=="disk_file")this.controllers[a]=new n(this,a,t["CID"][a]);else if(i=="webdav_element")this.controllers[a]=new o(this,a,t["CID"][a]);else if(i=="file")this.controllers[a]=new s(this,a,t["CID"][a]);if(this.controllers[a]&&this.controllers[a].init()&&!r)r=true}}BX.ready(BX.delegate(function(){BX.bind(BX("bx-b-uploadfile-"+e),"click",BX.proxy(this.controllerInit,this));if(r)this.controllerInit("show")},this))},controllerInit:function(e){this.controllerInitStatus=e=="show"||e=="hide"?e:this.controllerInitStatus=="show"?"hide":"show";BX.onCustomEvent(this.eventNode,"onShowControllers",[this.controllerInitStatus])},initUrlPreview:function(){if(this.params["urlPreviewId"]&&window["BXUrlPreview"]&&BX(this.params["urlPreviewId"])){return new BXUrlPreview(BX(this.params["urlPreviewId"]))}return null},getContent:function(){return this.oEditor?this.oEditor.GetContent():""},setContent:function(e){if(this.oEditor)this.oEditor.SetContent(e)},OnFileUploadSuccess:function(e,t,i,n){if(this.controllers[t.id]){var o=t.parser.bxTag+e.id;this.arFiles[o]=this.arFiles[o]||[];this.arFiles[o].push(t.id);if(n&&n["referrerToEditor"]){var s=this.getFileToInsert(e,t);BX.onCustomEvent(n["referrerToEditor"],"OnImageDataUriCaughtUploaded",[s]);BX.onCustomEvent(this.oEditor,"OnImageDataUriCaughtUploaded",[n["referrerToEditor"],e,s])}else if(i===true&&e.isImage&&this.insertImageAfterUpload){if(!this._insertFile)this._insertFile=BX.delegate(this.insertFile,this);this.exec(this._insertFile,arguments)}}},OnFileUploadFailed:function(e,t,i){if(i&&i["referrerToEditor"]){BX.onCustomEvent(i["referrerToEditor"],"OnImageDataUriCaughtFailed",[]);BX.onCustomEvent(this.editor,"OnImageDataUriCaughtFailed",[i["referrerToEditor"]])}},OnFileUploadRemove:function(e,t){if(this.controllers[t.id]){var i=t.parser.bxTag+e.id;if(this.arFiles[i]){var n=BX.util.array_search(t.id,this.arFiles[i]);this.arFiles[i]=BX.util.deleteFromArray(this.arFiles[i],n);if(!this.arFiles[i]||this.arFiles[i].length<=0){this.arFiles[i]=null;delete this.arFiles[i];if(!this._deleteFile)this._deleteFile=BX.delegate(this.deleteFile,this);this.exec(this._deleteFile,arguments)}}}},showPanelEditor:function(e,t){if(e==undefined)e=!this.oEditor.toolbar.IsShown();this.params.showPanelEditor=e;var i=BX("lhe_button_editor_"+this.formID),n=BX("panel-close"+this.__divId);if(n){this.oEditor.dom.cont.appendChild(n)}if(e){this.oEditor.dom.toolbarCont.style.opacity="inherit";this.oEditor.toolbar.Show();if(i)BX.addClass(i,"feed-add-post-form-btn-active");if(n)n.style.display=""}else{this.oEditor.toolbar.Hide();if(i)BX.removeClass(i,"feed-add-post-form-btn-active");if(n)n.style.display="none"}if(t!==false)BX.userOptions.save("main.post.form","postEdit","showBBCode",e?"Y":"N")},monitoring:{interval:null,text:"",savedText:"",files:[],savedFiles:[]},monitoringStart:function(){if(this.monitoring.interval===null){if(!this._monitoringStart){this._monitoringStart=BX.delegate(this.checkFilesInText,this);BX.addCustomEvent(this.oEditor,"OnContentChanged",BX.proxy(function(e){this.monitoring.text=e},this))}this.monitoring.interval=setInterval(this._monitoringStart,1e3)}},monitoringStop:function(){var e=this.monitoring.interval!==null;if(this.monitoring.interval!==null)clearInterval(this.monitoring.interval);this.monitoring.interval=null;return e},monitoringSetStatus:function(e,t,i){if(this.arFiles[e+t]){var n;for(var o=0;o<this.arFiles[e+t].length;o++){n=this.arFiles[e+t][o];BX.onCustomEvent(this.controllers[n],"onFileIsInText",[t,i])}}},checkFilesInText:function(){if(this.monitoring.text!==this.monitoring.savedText){this.monitoring.savedText=this.monitoring.text;this.monitoring.files=[];var e=this.monitoring.savedText,t,i=function(e,t){return function(i,n,o){e.monitoring.files.push([t,o].join("/"))}};for(t in this.parser){if(this.parser.hasOwnProperty(t)){if(!this.parser[t]["checkFilesInText"]){this.parser[t]["checkFilesInText"]=i(this,t)}e.replace(this.parser[t]["regexp"],this.parser[t]["checkFilesInText"])}}if(this.monitoring.savedFiles.join(",")!==this.monitoring.files.join(",")){var n={},o;while(o=this.monitoring.savedFiles.pop()){n[o]=null}for(t=0;t<this.monitoring.files.length;t++){o=this.monitoring.files[t];n[o]=n[o]>=0?n[o]+1:1}for(t in n){if(n.hasOwnProperty(t)){o=t.split("/");this.monitoringSetStatus(o[0],o[1],n[t]>0)}}}this.monitoring.savedFiles=this.monitoring.files;if(this.monitoring.savedFiles.length<=0)this.monitoringStop()}},checkFile:function(e,t){var i=false;if(typeof e=="string"){var n=typeof t=="string"?t:t.parser;if(!!this.arFiles[n+e]){var o=this.arFiles[n+e][0];t=this.controllers[o];i={file:t.values[e],controller:t}}}else if(this.controllers[t.id]){i={file:e,controller:t}}return i},insertFile:function(e,t){var i=this.oEditor;if(i&&e){var n=i.GetViewMode(),o=this.getFileToInsert(e,t);if(n=="wysiwyg"){i.InsertHtml(o.replacement);setTimeout(BX.delegate(i.AutoResizeSceleton,i),500);setTimeout(BX.delegate(i.AutoResizeSceleton,i),1e3)}else if(n=="code"&&i.bbCode){i.textareaView.Focus();i.textareaView.WrapWith(false,false,o.replacement)}o["callback"]()}},getFileToInsert:function(e,t){var i=this.oEditor;if(i&&e){var n=e["id"],o="",s=t.parser,a=i.GetViewMode(),r=this.parser[s.bxTag][a];if(e["fileType"]&&this.parser[e["fileType"]]&&a=="wysiwyg"){r=this.parser[e["fileType"]][a]}if(e["isImage"]){r=a=="wysiwyg"?this.parser["postimage"][a]:r;if(e.width>0&&e.height>0&&i.sEditorMode=="html"){o=' style="width:'+e.width+"px;height:"+e.height+"px;\" onload=\"this.style.width='auto';this.style.height='auto';\""}}if(a=="wysiwyg"){r=r.replace("#ID#",i.SetBxTag(false,{tag:s.bxTag,params:{value:n}})).replace("#SRC#",e.src).replace("#URL#",e.url).replace("#LOWSRC#",e.lowsrc||"").replace("#NAME#",e.name).replace("#ADDITIONAL#",o)+"<span>&nbsp;</span>"}else if(a=="code"&&i.bbCode){r=r.replace("#ID#",n).replace("#ADDITIONAL#","")}return{replacement:r,callback:BX.proxy(function(){this.monitoringSetStatus(t.parser.bxTag,e.id,true);this.monitoringStart()},this)}}return{replacement:"",callback:BX.DoNothing}},deleteFile:function(e,t){var i=this.oEditor,n=t.parser,o=e.id,s=i.GetContent();if(n&&s.indexOf("="+o)>=0){if(i.GetViewMode()=="wysiwyg"){var a=i.GetIframeDoc(),r,d;for(r in i["bxTags"]){if(i["bxTags"].hasOwnProperty(r)){if(typeof i.bxTags[r]=="object"&&i.bxTags[r]["params"]&&i.bxTags[r]["params"]["value"]==e.id){d=a.getElementById(r);if(d)d.parentNode.removeChild(d)}}}i.SaveContent()}else{s=s.replace(n.regexp,function(t,i,n){return n==e.id?"":t});i.SetContent(s);i.Focus()}this.monitoringSetStatus(n.bxTag,e.id,false)}},reinit:function(e,t){BX.onCustomEvent(this.eventNode,"onReinitializeBefore",[this,e,t]);this.arFiles={};delete this.monitoringWakeUp;this.monitoringStop();this.oEditor.CheckAndReInit(e||"");BX.onCustomEvent(this.eventNode,"onReinitialize",[this,e,t]);var i,n=false;for(i in this.controllers){if(this.controllers.hasOwnProperty(i)){if(this.controllers[i]["init"]&&this.controllers[i].reinit(e,t))n=true}}this.controllerInit(n?"show":"hide");if(this.params["~height"]){this.oEditor.SetConfigHeight(this.params["~height"]);this.oEditor.ResizeSceleton()}if(this.urlPreview){this.urlPreview.detachUrlPreview();var o;for(var s in t){if(t.hasOwnProperty(s)&&t[s].hasOwnProperty("USER_TYPE_ID")&&t[s]["USER_TYPE_ID"]==="url_preview"){o=t[s]["VALUE"]}}if(o)this.urlPreview.attachUrlPreview({id:o})}},Parse:function(e,t,i){var n=this.parser[e],o=this;if(n){t=t.replace(n.regexp,function(t,s,a,r,d){var l=o.checkFile(a,e);if(l&&(l=l.file)&&l){var h="",f=l.isImage?o.parser.postimage.wysiwyg:n.wysiwyg;o.monitoringStart();if(l.fileType&&o.parser[l.fileType]&&o.parser[l.fileType].wysiwyg){f=o.parser[l.fileType].wysiwyg}if(l.isImage){r=parseInt(r);d=parseInt(d);h=r&&d?' width="'+r+'" height="'+d+'"':"";if(h===""&&l["width"]>0&&l["height"]>0){h=' style="width:'+l["width"]+"px;height:"+l["height"]+"px;\" onload=\"this.style.width='auto';this.style.height='auto';\""}}return f.replace("#ID#",i.SetBxTag(false,{tag:e,params:{value:a}})).replace("#NAME#",l.name).replace("#SRC#",l.src).replace("#LOWSRC#",l.lowsrc).replace("#ADDITIONAL#",h).replace("#WIDTH#",parseInt(r)).replace("#HEIGHT#",parseInt(d))}return t})}return t},Unparse:function(e,t){var i="",n=e.tag;if(this.parser[n]){var o=parseInt(t.node.hasAttribute("width")?t.node.getAttribute("width"):0),s=parseInt(t.node.hasAttribute("height")?t.node.getAttribute("height"):0),a="";if(o>0&&s>0){a=" WIDTH="+o+" HEIGHT="+s}i=this.parser[n]["code"].replace("#ID#",e.params.value).replace("#ADDITIONAL#",a).replace("#WIDTH#",o).replace("#HEIGHT#",s)}return i},OnShowLHE:function(e,t,i){var n=this.__divId;e=e===false?false:e==="hide"?"hide":e==="justShow"?"justShow":true;this.oEditor=this.oEditor||a.getEditor(this.oEditorId);if(!this.oEditor)return;this.oEditor.Init();var o=BX("micro"+n),s=this.eventNode;if(o){o.style.display=e===true||e==="justShow"?"none":"block"}if(e=="hide"){BX.onCustomEvent(this.eventNode,"OnBeforeHideLHE",[e,this]);if(this.eventNode.style.display=="none"){BX.onCustomEvent(this.eventNode,"OnAfterHideLHE",[e,this])}else{new BX["easing"]({duration:200,start:{opacity:100,height:this.eventNode.scrollHeight},finish:{opacity:0,height:20},transition:BX.easing.makeEaseOut(BX.easing.transitions.quad),step:function(e){s.style.height=e.height+"px";s.style.opacity=e.opacity/100},complete:BX.proxy(function(){this.eventNode.style.cssText="";this.eventNode.style.display="none";BX.onCustomEvent(s,"OnAfterHideLHE",[e,this])},this)}).animate()}}else if(e){BX.onCustomEvent(this.eventNode,"OnBeforeShowLHE",[e,this]);if(e=="justShow"){this.eventNode.style.display="block";BX.onCustomEvent(this.eventNode,"OnAfterShowLHE",[e,this]);if(i!==false)this.oEditor.Focus()}else if(this.eventNode.style.display=="block"){BX.onCustomEvent(this.eventNode,"OnAfterShowLHE",[e,this]);if(i!==false)this.oEditor.Focus()}else{BX.adjust(this.eventNode,{style:{display:"block",overflow:"hidden",height:"20px",opacity:.1}});new BX["easing"]({duration:200,start:{opacity:10,height:20},finish:{opacity:100,height:s.scrollHeight},transition:BX["easing"].makeEaseOut(BX.easing.transitions.quad),step:function(e){s.style.height=e.height+"px";s.style.opacity=e.opacity/100},complete:BX.proxy(function(){BX.onCustomEvent(s,"OnAfterShowLHE",[e,this]);this.oEditor.Focus();this.eventNode.style.cssText=""},this)}).animate()}}else{BX.onCustomEvent(this.eventNode,"OnBeforeHideLHE",[e,this]);this.eventNode.style.display="none";BX.onCustomEvent(this.eventNode,"OnAfterHideLHE",[e,this])}},OnButtonClick:function(e){if(e!=="cancel"){var t={result:true};BX.onCustomEvent(this.eventNode,"OnClickBeforeSubmit",[this,t]);if(t["result"]!==false)BX.onCustomEvent(this.eventNode,"OnClickSubmit",[this])}else{BX.onCustomEvent(this.eventNode,"OnClickCancel",[this]);BX.onCustomEvent(this.eventNode,"OnShowLHE",["hide"])}},OnEditorInitedBefore:function(e){var t=this;this.oEditor=e;e.formID=this.formID;if(this.params)this.params["~height"]=e.config["height"];BX.addCustomEvent(e,"OnCtrlEnter",function(){e.SaveContent();if(t.params&&t.params["ctrlEnterHandler"]&&typeof window[t.params["ctrlEnterHandler"]]=="function")window[t.params["ctrlEnterHandler"]]();else BX.submit(BX(t.formID))});var i=this.params.parsers?this.params.parsers:[];if(BX.util.object_search("Spoiler",i)){e.AddButton({id:"spoiler",name:BX.message("spoilerText"),iconClassName:"spoiler",disabledForTextarea:false,src:BX.message("MPF_TEMPLATE_FOLDER")+"/images/lhespoiler.png",toolbarSort:205,handler:function(){var e=this,t=false;if(!e.editor.bbCode||!e.editor.synchro.IsFocusedOnTextarea()){t=e.editor.action.actions.formatBlock.exec("formatBlock","blockquote","bx-spoiler",false,{bxTagParams:{tag:"spoiler"}})}else{t=e.editor.action.actions.formatBbCode.exec("quote",{tag:"SPOILER"})}return t}});e.AddParser({name:"spoiler",obj:{Parse:function(e,t,i){if(/\[(cut|spoiler)(([^\]])*)\]/gi.test(t)){t=t.replace(/[\001-\006]/gi,"").replace(/\[cut(((?:=)[^\]]*)|)\]/gi,"$1").replace(/\[\/cut]/gi,"").replace(/\[spoiler([^\]]*)\]/gi,"$1").replace(/\[\/spoiler]/gi,"");var n=/(?:\001([^\001]*)\001)([^\001-\004]+)\002/gi,o=/(?:\003([^\003]*)\003)([^\001-\004]+)\004/gi,s=function(e,t){e=e.replace(/^(="|='|=)/gi,"").replace(/("|')?$/gi,"");return'<blockquote class="bx-spoiler" id="'+i.SetBxTag(false,{tag:"spoiler"})+'" title="'+e+'">'+t+"</blockquote>"},a=function(e,t,i){return s(t,i)};while(t.match(n)||t.match(o)){t=t.replace(n,a).replace(o,a)}}t=t.replace(/\001([^\001]*)\001/gi,"[cut$1]").replace(/\003([^\003]*)\003/gi,"[spoiler$1]").replace(/\002/gi,"[/cut]").replace(/\004/gi,"[/spoiler]");return t},UnParse:function(t,i){if(t.tag=="spoiler"){var n="",o;for(o=0;o<i.node.childNodes.length;o++){n+=e.bbParser.GetNodeHtml(i.node.childNodes[o])}n=BX.util.trim(n);if(n!="")return"[SPOILER"+(i.node.hasAttribute("title")?"="+i.node.getAttribute("title"):"")+"]"+n+"[/SPOILER]"}return""}}})}if(BX.util.object_search("MentionUser",i)){e.AddParser({name:"postuser",obj:{Parse:function(t,i){i=i.replace(/\[USER\s*=\s*(\d+)\]((?:\s|\S)*?)\[\/USER\]/gi,function(t,i,n){n=BX.util.trim(n);if(n=="")return"";return'<span id="'+e.SetBxTag(false,{tag:"postuser",params:{value:parseInt(i)}})+'" class="bxhtmled-metion">'+n+"</span>"});return i},UnParse:function(t,i){if(t.tag=="postuser"){var n="",o;for(o=0;o<i.node.childNodes.length;o++){n+=e.bbParser.GetNodeHtml(i.node.childNodes[o])}n=BX.util.trim(n);if(n!="")return"[USER="+t.params.value+"]"+n+"[/USER]"}return""}}})}var n=function(i,n){return t.Parse(i,n,e)},o=function(e,i){return t.Unparse(e,i)};for(var s in this.parser){if(this.parser.hasOwnProperty(s)){e.AddParser({name:s,obj:{Parse:n,UnParse:o}})}}if(this.showPinButton){this.pinEditorPanel=this.params&&this.params.pinEditorPanel===true;var a="toolbar_pin";var r=function(e,i){r.superclass.constructor.apply(this,arguments);this.id=a;this.title=BX.message("MPF_PIN_EDITOR_PANNEL");this.className+=" "+(t.pinEditorPanel?"bxhtmled-button-toolbar-pined":"bxhtmled-button-toolbar-pin");this.Create();if(i)i.appendChild(this.GetCont())};BX.extend(r,window.BXHtmlEditor.Button);r.prototype.OnClick=function(){BX.removeClass(this.pCont,"bxhtmled-button-toolbar-pined");BX.removeClass(this.pCont,"bxhtmled-button-toolbar-pin");if(t.pinEditorPanel){t.pinEditorPanel=false;BX.addClass(this.pCont,"bxhtmled-button-toolbar-pin")}else{t.pinEditorPanel=true;BX.addClass(this.pCont,"bxhtmled-button-toolbar-pined")}BX.userOptions.save("main.post.form","postEdit","pinEditorPanel",t.pinEditorPanel?"Y":"N")};window.BXHtmlEditor.Controls[a]=r;BX.addCustomEvent(e,"GetControlsMap",function(e){e.push({id:a,compact:true,hidden:false,sort:500,checkWidth:true,offsetWidth:32,wrap:"right"})})}},OnEditorInitedAfter:function(t){BX.addCustomEvent(t,"OnIframeDrop",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDrop",arguments)},this));BX.addCustomEvent(t,"OnIframeDragOver",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDragOver",arguments)},this));BX.addCustomEvent(t,"OnIframeDragLeave",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnIframeDragLeave",arguments)},this));BX.addCustomEvent(t,"OnImageDataUriHandle",BX.proxy(function(){BX.onCustomEvent(this.eventNode,"OnImageDataUriHandle",arguments)},this));BX.addCustomEvent(t,"OnAfterUrlConvert",this.OnAfterUrlConvert.bind(this));BX.addCustomEvent(t,"OnBeforeCommandExec",this.OnBeforeCommandExec.bind(this));t.contextMenu.items["postimage"]=t.contextMenu.items["postdocument"]=t.contextMenu.items["postfile"]=[{TEXT:BX.message("BXEdDelFromText"),bbMode:true,ACTION:function(){var e=t.contextMenu.GetTargetItem("postimage");if(!e)e=t.contextMenu.GetTargetItem("postdocument");if(!e)e=t.contextMenu.GetTargetItem("postfile");if(e&&e.element){t.selection.RemoveNode(e.element)}t.contextMenu.Hide()}}];if(!this.params["lazyLoad"]){BX.onCustomEvent(this.eventNode,"OnShowLHE",["justShow",t,false])}if(t.toolbar.controls&&t.toolbar.controls.FontSelector){t.toolbar.controls.FontSelector.SetWidth(45)}BX.addCustomEvent(BX(this.formID),"onAutoSavePrepare",function(e){var i=e;setTimeout(function(){BX.addCustomEvent(t,"OnContentChanged",BX.proxy(function(e){this["mpfTextContent"]=e;this.Init()},i))},1500)});BX.addCustomEvent(BX(this.formID),"onAutoSave",BX.proxy(function(e,t){if(BX.type.isNotEmptyString(e["mpfTextContent"]))t["text"+this.formID]=e["mpfTextContent"]},this));BX.addCustomEvent(BX(this.formID),"onAutoSaveRestore",BX.proxy(function(i,n){if(e.handler[t.id]){for(var o in e.handler[t.id].controllers){if(e.handler[t.id].controllers.hasOwnProperty(o)&&e.handler[t.id].controllers[o].handler&&e.handler[t.id].controllers[o].handler.params&&e.handler[t.id].controllers[o].handler.params.controlName&&e.handler[t.id].controllers[o].handler.params.controlName){delete n[e.handler[t.id].controllers[o].handler.params.controlName]}}}if(n["text"+this.formID]&&/[^\s]+/gi.test(n["text"+this.formID])){t.CheckAndReInit(n["text"+this.formID])}},this));if(BX(this.formID)&&BX(this.formID).hasAttribute("bx-lhe-autosave-prepared")&&BX(this.formID).BXAUTOSAVE){BX(this.formID).removeAttribute("bx-lhe-autosave-prepared");setTimeout(BX.proxy(function(){BX(this.formID).BXAUTOSAVE.Prepare()},this),100)}var i=this.formID,n=this.params;this.showPanelEditor(n.showPanelEditor,false);if(!t.mainPostFormCustomized){t.mainPostFormCustomized=true;BX.addCustomEvent(t,"OnIframeKeydown",function(e){if(window.onKeyDownHandler){window.onKeyDownHandler(e,t,i)}});BX.addCustomEvent(t,"OnIframeKeyup",function(e){if(window.onKeyUpHandler){window.onKeyUpHandler(e,t,i)}});if(window["BXfpdStopMent"+i]){BX.addCustomEvent(t,"OnIframeClick",function(){window["BXfpdStopMent"+i]()})}if(t&&t.textareaView.GetCursorPosition){BX.addCustomEvent(t,"OnTextareaKeyup",function(e){if(window.onTextareaKeyUpHandler){window.onTextareaKeyUpHandler(e,t,i)}});BX.addCustomEvent(t,"OnTextareaKeydown",function(e){if(window.onTextareaKeyDownHandler){window.onTextareaKeyDownHandler(e,t,i)}})}}},OnAfterUrlConvert:function(e){if(this.urlPreview){this.urlPreview.attachUrlPreview({url:e})}},OnBeforeCommandExec:function(e,t,i,n){if(this.urlPreview&&t=="createLink"&&BX.type.isPlainObject(n)&&n.hasOwnProperty("href")){this.urlPreview.attachUrlPreview({url:n.href})}}};a.getEditor=function(e){return window["BXHtmlEditor"]?window["BXHtmlEditor"].Get(typeof e=="object"?e.id:e):null};a.getHandler=function(t){return e.handler[typeof t=="object"?t.id:t]};a.unsetHandler=function(t){var i=typeof t=="object"?t.id:t;if(!e.handler[i])return;if(e.handler[i].oEditor)e.handler[i].oEditor.Destroy();e.handler[i]=null};a.reinitData=function(e,t,i){var n=a.getHandler(e);if(n)n.exec(n.reinit,[t,i]);return false};a.reinitDataBefore=function(e){var t=a.getHandler(e);if(t&&t["eventNode"])BX.onCustomEvent(t.eventNode,"onReinitializeBefore",[t])};window.LHEPostForm=a;window.BXPostFormTags=function(e,t){this.popup=null;this.formID=e;this.buttonID=t;this.sharpButton=null;this.addNewLink=null;this.tagsArea=null;this.hiddenField=null;this.popupContent=null;BX.ready(BX.proxy(this.init,this))};window.BXPostFormTags.prototype.init=function(){this.sharpButton=BX(this.buttonID);this.addNewLink=BX("post-tags-add-new-"+this.formID);this.tagsArea=BX("post-tags-block-"+this.formID);this.tagsContainer=BX("post-tags-container-"+this.formID);this.hiddenField=BX("post-tags-hidden-"+this.formID);this.popupContent=BX("post-tags-popup-content-"+this.formID);this.popupInput=BX.findChild(this.popupContent,{tag:"input"});var e=BX.findChildren(this.tagsContainer,{className:"feed-add-post-del-but"},true);for(var t=0,i=e.length;t<i;t++){BX.bind(e[t],"click",BX.proxy(this.onTagDelete,{obj:this,tagBox:e[t].parentNode,tagValue:e[t].parentNode.getAttribute("data-tag")}))}BX.bind(this.sharpButton,"click",BX.proxy(this.onButtonClick,this));BX.bind(this.addNewLink,"click",BX.proxy(this.onAddNewClick,this))};window.BXPostFormTags.prototype.onTagDelete=function(){BX.remove(this.tagBox);this.obj.hiddenField.value=this.obj.hiddenField.value.replace(this.tagValue+",","").replace("  "," ")};window.BXPostFormTags.prototype.show=function(){if(this.popup===null){this.popup=new BX.PopupWindow("bx-post-tag-popup",this.addNewLink,{content:this.popupContent,lightShadow:false,offsetTop:8,offsetLeft:10,autoHide:true,angle:true,closeByEsc:true,zIndex:-840,buttons:[new BX.PopupWindowButton({text:BX.message("TAG_ADD"),events:{click:BX.proxy(this.onTagAdd,this)}})]});BX.bind(this.popupInput,"keydown",BX.proxy(this.onKeyPress,this));BX.bind(this.popupInput,"keyup",BX.proxy(this.onKeyPress,this))}this.popup.show();BX.focus(this.popupInput)};window.BXPostFormTags.prototype.addTag=function(e){var t=BX.type.isNotEmptyString(e)?e.split(","):this.popupInput.value.split(",");var i=[];for(var n=0;n<t.length;n++){var o=BX.util.trim(t[n]);if(o.length>0){var s=this.hiddenField.value.split(",");if(!BX.util.in_array(o,s)){var a;var r=BX.create("span",{children:[a=BX.create("span",{attrs:{class:"feed-add-post-del-but"}})],attrs:{class:"feed-add-post-tags"}});r.insertBefore(document.createTextNode(o),a);this.tagsContainer.insertBefore(r,this.addNewLink);BX.bind(a,"click",BX.proxy(this.onTagDelete,{obj:this,tagBox:r,tagValue:o}));this.hiddenField.value+=o+",";i.push(o)}}}return i};window.BXPostFormTags.prototype.onTagAdd=function(){this.addTag();this.popupInput.value="";this.popup.close()};window.BXPostFormTags.prototype.onAddNewClick=function(e){e=e||window.event;this.show();BX.PreventDefault(e)};window.BXPostFormTags.prototype.onButtonClick=function(e){e=e||window.event;BX.show(this.tagsArea);this.show();BX.PreventDefault(e)};window.BXPostFormTags.prototype.onKeyPress=function(e){e=e||window.event;var t=e.keyCode?e.keyCode:e.which?e.which:null;if(t==13){setTimeout(BX.proxy(this.onTagAdd,this),0)}};window.BXPostFormImportant=function(e,t,i){if(i){this.formID=e;this.buttonID=t;this.inputName=i;this.fireButton=null;this.activeBlock=null;this.hiddenField=null;BX.ready(BX.proxy(this.init,this))}return false};window.BXPostFormImportant.prototype.init=function(){this.fireButton=BX(this.buttonID);this.activeBlock=BX(this.buttonID+"-active");var e=BX(this.formID);if(e){this.hiddenField=e[this.inputName];if(this.hiddenField&&this.hiddenField.value==1){this.showActive()}}BX.bind(this.fireButton,"click",BX.proxy(function(e){e=e||window.event;this.showActive();BX.PreventDefault(e)},this));BX.bind(this.activeBlock,"click",BX.proxy(function(e){e=e||window.event;this.hideActive();BX.PreventDefault(e)},this))};window.BXPostFormImportant.prototype.showActive=function(e){BX.hide(this.fireButton);BX.show(this.activeBlock,"inline-block");if(this.hiddenField){this.hiddenField.value=1}return false};window.BXPostFormImportant.prototype.hideActive=function(e){BX.hide(this.activeBlock);BX.show(this.fireButton,"inline-block");if(this.hiddenField){this.hiddenField.value=0}return false};var r=null;window.MPFbuttonShowWait=function(e){if(e&&!BX.type.isElementNode(e))e=null;e=e||this;e=e?e.tagName=="A"?e:e.parentNode:e;if(e){BX.addClass(e,"feed-add-button-load");r=e;BX.defer(function(){e.disabled=true})()}};window.MPFbuttonCloseWait=function(e){if(e&&!BX.type.isElementNode(e))e=null;e=e||r||this;if(e){e.disabled=false;BX.removeClass(e,"feed-add-button-load");r=null}};window.__mpf_wd_getinfofromnode=function(e,t){var i=BX.findChild(BX((e["prefixNode"]||"wd-doc")+e.element_id),{className:"files-preview",tagName:"IMG"},true,false);if(i){e.lowsrc=i.src;e.element_url=i.src.replace(/\Wwidth=(\d+)/,"").replace(/\Wheight\=(\d+)/,"");e.width=parseInt(i.getAttribute("data-bx-full-width"));e.height=parseInt(i.getAttribute("data-bx-full-height"))}else if(t.urlGet){e.element_url=t.urlGet.replace("#element_id#",e.element_id).replace("#ELEMENT_ID#",e.element_id).replace("#element_name#",e.element_name).replace("#ELEMENT_NAME#",e.element_name)}};var d={listen:false,plus:false,text:"",bSearch:false};window.BXfpdSelectCallback=function(e,t,i,n,o,s){BX.SocNetLogDestination.BXfpSelectCallback({item:e,type:t,bUndeleted:n,containerInput:BX("feed-add-post-destination-item"),valueInput:BX("feed-add-post-destination-input"),formName:o,tagInputName:"bx-destination-tag",tagLink1:BX.message("BX_FPD_LINK_1"),tagLink2:BX.message("BX_FPD_LINK_2"),state:typeof s!="undefined"?s:null})};window.BXfpdUnSelectCallback=function(e,t,i,n){BX.SocNetLogDestination.BXfpUnSelectCallback.call({formName:n,inputContainerName:"feed-add-post-destination-item",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag",tagLink1:BX.message("BX_FPD_LINK_1"),tagLink2:BX.message("BX_FPD_LINK_2")},e)};window.BXfpdOpenDialogCallback=function(e){BX.SocNetLogDestination.BXfpOpenDialogCallback.call({inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"})};window.BXfpdCloseDialogCallback=function(e){BX.SocNetLogDestination.BXfpCloseDialogCallback.call({inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"})};window.BXfpdCloseSearchCallback=function(e){BX.SocNetLogDestination.BXfpCloseSearchCallback.call({inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"})};window.onKeyDownHandler=function(e,t,i){var n=e.keyCode;if(!window["BXfpdStopMent"+i])return true;if(n==107||(e.shiftKey||e.modifiers>3)&&BX.util.in_array(n,[187,50,107,43,61])||e.altKey&&BX.util.in_array(n,[76])){setTimeout(function(){var e=t.selection.GetRange(),n=t.GetIframeDoc(),o=e?e.endContainer.textContent:"",s=o?o.slice(e.endOffset-1,e.endOffset):"",a=o?o.slice(e.endOffset-2,e.endOffset-1):"";if((s=="@"||s=="+")&&(!a||BX.util.in_array(a,["+","@",",","("])||a.length==1&&BX.util.trim(a)==="")){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=true;e.setStart(e.endContainer,e.endOffset-1);e.setEnd(e.endContainer,e.endOffset);t.selection.SetSelection(e);var r=BX.create("SPAN",{props:{id:"bx-mention-node"}},n);t.selection.Surround(r,e);e.setStart(r,1);e.setEnd(r,1);t.selection.SetSelection(e);if(!BX.SocNetLogDestination.isOpenDialog()){BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+i],{bindNode:l(r,t)})}}},10)}if(d.listen){var o=d.bSearch?"search":BX.SocNetLogDestination.obTabSelected[window["BXSocNetLogDestinationFormNameMent"+i]];if(n==t.KEY_CODES["enter"]){BX.SocNetLogDestination.selectCurrentItem(o,window["BXSocNetLogDestinationFormNameMent"+i]);t.iframeKeyDownPreventDefault=true;BX.PreventDefault(e)}else if(n==t.KEY_CODES["left"]){BX.SocNetLogDestination.moveCurrentItem(o,window["BXSocNetLogDestinationFormNameMent"+i],"left");t.iframeKeyDownPreventDefault=true;BX.PreventDefault(e)}else if(n==t.KEY_CODES["right"]){BX.SocNetLogDestination.moveCurrentItem(o,window["BXSocNetLogDestinationFormNameMent"+i],"right");t.iframeKeyDownPreventDefault=true;BX.PreventDefault(e)}else if(n==t.KEY_CODES["up"]){BX.SocNetLogDestination.moveCurrentItem(o,window["BXSocNetLogDestinationFormNameMent"+i],"up");t.iframeKeyDownPreventDefault=true;BX.PreventDefault(e)}else if(n==t.KEY_CODES["down"]){BX.SocNetLogDestination.moveCurrentItem(o,window["BXSocNetLogDestinationFormNameMent"+i],"down");t.iframeKeyDownPreventDefault=true;BX.PreventDefault(e)}}if(!d.listen&&d.listenFlag&&n===t.KEY_CODES["enter"]){var s=t.selection.GetRange();if(s.collapsed){var a=s.endContainer,r=t.GetIframeDoc();if(a){if(a.className!=="bxhtmled-metion"){a=BX.findParent(a,function(e){return e.className=="bxhtmled-metion"},r.body)}if(a&&a.className=="bxhtmled-metion"){t.selection.SetAfter(a)}}}}};window.onKeyUpHandler=function(e,t,i){var n=e.keyCode,o,s,a;if(!window["BXfpdStopMent"+i])return true;if(d.listen===true){if(n==t.KEY_CODES["escape"]){window["BXfpdStopMent"+i]()}else if(n!==t.KEY_CODES["enter"]&&n!==t.KEY_CODES["left"]&&n!==t.KEY_CODES["right"]&&n!==t.KEY_CODES["up"]&&n!==t.KEY_CODES["down"]){o=t.GetIframeDoc();var r=o.getElementById("bx-mention-node");if(r){a=BX.util.trim(t.util.GetTextContent(r));var h=a;a=a.replace(/^[\+@]*/,"");d.bSearch=a.length>0;BX.SocNetLogDestination.search(a,true,window["BXSocNetLogDestinationFormNameMent"+i],BX.message("MPF_NAME_TEMPLATE"),{bindNode:l(r,t)});if(d.leaveContent&&d._lastText&&h===""){window["BXfpdStopMent"+i]()}else if(d.leaveContent&&d.lastText&&h!==""&&a===""){d.bSearch=false;window["BXfpdStopMent"+i]();BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+i],{bindNode:l(r,t)})}d.lastText=a;d._lastText=h}else{window["BXfpdStopMent"+i]()}}}else{if(!e.shiftKey&&(n===t.KEY_CODES["space"]||n===t.KEY_CODES["escape"]||n===188||n===190)){s=t.selection.GetRange();if(s.collapsed){var f=s.endContainer;o=t.GetIframeDoc();if(f){if(f.className!=="bxhtmled-metion"){f=BX.findParent(f,function(e){return e.className=="bxhtmled-metion"},o.body)}if(f&&f.className=="bxhtmled-metion"){a=t.util.GetTextContent(f);var u=a.match(/[\s\.\,]$/);if(u||n===t.KEY_CODES["escape"]){f.innerHTML=a.replace(/[\s\.\,]$/,"");var c=BX.create("SPAN",{html:u||t.INVISIBLE_SPACE},o);t.util.InsertAfter(c,f);t.selection.SetAfter(c)}}}}}}};window.onTextareaKeyDownHandler=function(e,t,i){var n=e.keyCode;if(d.listen&&n==t.KEY_CODES["enter"]){BX.SocNetLogDestination.selectFirstSearchItem(window["BXSocNetLogDestinationFormNameMent"+i]);t.textareaKeyDownPreventDefault=true;BX.PreventDefault(e)}};window.onTextareaKeyUpHandler=function(e,t,i){var n,o,s=e.keyCode;if(d.listen===true){if(s==27){window["BXfpdStopMent"+i]()}else if(s!==13){o=t.textareaView.GetValue(false);n=t.textareaView.GetCursorPosition();if(o.indexOf("+")!==-1||o.indexOf("@")!==-1){var a=o.substr(0,n),r=Math.max(a.lastIndexOf("+"),a.lastIndexOf("@"));if(r>=0){var l=a.substr(r),h=l;l=l.replace(/^[\+@]*/,"");if(BX.SocNetLogDestination&&!BX.SocNetLogDestination.isOpenDialog()){BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+i])}d.bSearch=l.length>0;if(BX.SocNetLogDestination)BX.SocNetLogDestination.search(l,true,window["BXSocNetLogDestinationFormNameMent"+i],BX.message("MPF_NAME_TEMPLATE"));if(d.leaveContent&&d._lastText&&h===""){window["BXfpdStopMent"+i]()}else if(d.leaveContent&&d.lastText&&h!==""&&l===""){window["BXfpdStopMent"+i]();if(BX.SocNetLogDestination)BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+i])}d.lastText=l;d._lastText=h}}}}else{if(s==16){var f=this;this.shiftPressed=true;if(this.shiftTimeout)this.shiftTimeout=clearTimeout(this.shiftTimeout);this.shiftTimeout=setTimeout(function(){f.shiftPressed=false},100)}if(s==107||(e.shiftKey||e.modifiers>3||this.shiftPressed)&&BX.util.in_array(s,[187,50,107,43,61])){n=t.textareaView.element.selectionStart;if(n>0){o=t.textareaView.element.value;var u=o.substr(n-1,1);if(u&&(u==="+"||u==="@")){d.listen=true;d.listenFlag=true;d.text="";d.textarea=true;if(!BX.SocNetLogDestination.isOpenDialog()){BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+i])}}}}}};var l=function(e,t){var i=BX.pos(e),n=BX.pos(t.dom.areaCont),o=BX.GetWindowScrollPos(t.GetIframeDoc()),s=n.top+i.bottom-o.scrollTop+2,a=n.left+i.right-o.scrollLeft;return{top:s,left:a}};window.BxInsertMention=function(e){var t=e.item,i=e.type,n=e.formID,o=e.editorId,s=e.bNeedComa,r=a.getEditor(o),l;if(i=="users"&&t&&t.entityId>0&&r){if(r.GetViewMode()=="wysiwyg"){var h=r.GetIframeDoc(),f=r.selection.GetRange(),u=h.getElementById("bx-mention-node"),c=BX.create("SPAN",{props:{className:"bxhtmled-metion"},text:BX.util.htmlspecialcharsback(t.name)},h);l=BX.create("SPAN",{html:s?",&nbsp;":"&nbsp;"},h);r.SetBxTag(c,{tag:"postuser",params:{value:t.entityId}});if(u){r.util.ReplaceNode(u,c)}else{r.selection.InsertNode(c,f)}if(c&&c.parentNode){var p=BX.findParent(c,{className:"bxhtmled-metion"},h.body);if(p){r.util.InsertAfter(c,p)}}if(c&&c.parentNode){r.util.InsertAfter(l,c);r.selection.SetAfter(l)}}else if(r.GetViewMode()=="code"&&r.bbCode){r.textareaView.Focus();var m=r.textareaView.GetValue(false),B=r.textareaView.GetCursorPosition(),g=m.substr(0,B),X=Math.max(g.lastIndexOf("+"),g.lastIndexOf("@"));if(X>=0&&B>X){r.textareaView.SetValue(m.substr(0,X)+m.substr(B));r.textareaView.element.setSelectionRange(X,X)}r.textareaView.WrapWith(false,false,"[USER="+t.entityId+"]"+t.name+"[/USER]"+(s?", ":" "))}if(e.fireAddEvent===true){BX.onCustomEvent(window,"onMentionAdd",[t])}delete BX.SocNetLogDestination.obItemsSelected[window["BXSocNetLogDestinationFormNameMent"+n]][t.id];window["BXfpdStopMent"+n]();d["text"]="";if(r.GetViewMode()=="wysiwyg"){r.Focus();r.selection.SetAfter(l)}}};window.MPFMentionInit=function(e,t){if(!t["items"]["departmentRelation"]){t["items"]["departmentRelation"]=BX.SocNetLogDestination.buildDepartmentRelation(t["items"]["department"])}window["departmentRelation"]=t["items"]["departmentRelation"];if(t.initDestination===true){window.BXSocNetLogDestinationFormName="destination"+(""+(new Date).getTime()).substr(6);window.BXSocNetLogDestinationDisableBackspace=null;BX.SocNetLogDestination.init({name:window.BXSocNetLogDestinationFormName,searchInput:BX("feed-add-post-destination-input"),extranetUser:t["extranetUser"],bindMainPopup:{node:BX("feed-add-post-destination-container"),offsetTop:"5px",offsetLeft:"15px"},bindSearchPopup:{node:BX("feed-add-post-destination-container"),offsetTop:"5px",offsetLeft:"15px"},callback:{select:window.BXfpdSelectCallback,unSelect:BX.delegate(BX.SocNetLogDestination.BXfpUnSelectCallback,{formName:window.BXSocNetLogDestinationFormName,inputContainerName:"feed-add-post-destination-item",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag",tagLink1:BX.message("BX_FPD_LINK_1"),tagLink2:BX.message("BX_FPD_LINK_2")}),openDialog:BX.delegate(BX.SocNetLogDestination.BXfpOpenDialogCallback,{inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"}),closeDialog:BX.delegate(BX.SocNetLogDestination.BXfpCloseDialogCallback,{inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"}),openSearch:BX.delegate(BX.SocNetLogDestination.BXfpOpenDialogCallback,{inputBoxName:"feed-add-post-destination-input-box",inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"})},items:t["items"],itemsLast:t["itemsLast"],itemsSelected:t["itemsSelected"],isCrmFeed:t["isCrmFeed"],useClientDatabase:!!t["useClientDatabase"],destSort:t["destSort"],allowAddUser:t["allowAddUser"],allowAddCrmContact:t["allowAddCrmContact"],allowSearchCrmEmailUsers:typeof t["allowSearchCrmEmailUsers"]!="undefined"?!!t["allowSearchCrmEmailUsers"]:false,userNameTemplate:typeof t["userNameTemplate"]!="undefined"?t["userNameTemplate"]:"",allowSonetGroupsAjaxSearch:typeof t["allowSonetGroupsAjaxSearch"]!="undefined"?t["allowSonetGroupsAjaxSearch"]:false,allowSonetGroupsAjaxSearchFeatures:typeof t["allowSonetGroupsAjaxSearchFeatures"]!="undefined"?t["allowSonetGroupsAjaxSearchFeatures"]:{},showVacations:true,usersVacation:typeof t["usersVacation"]!="undefined"?t["usersVacation"]:{}});BX.bind(BX("feed-add-post-destination-input"),"keyup",BX.delegate(BX.SocNetLogDestination.BXfpSearch,{formName:window.BXSocNetLogDestinationFormName,inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag"}));BX.bind(BX("feed-add-post-destination-input"),"paste",BX.defer(BX.SocNetLogDestination.BXfpSearch,{formName:window.BXSocNetLogDestinationFormName,inputName:"feed-add-post-destination-input",tagInputName:"bx-destination-tag",onPasteEvent:true}));BX.bind(BX("feed-add-post-destination-input"),"keydown",BX.delegate(BX.SocNetLogDestination.BXfpSearchBefore,{formName:window.BXSocNetLogDestinationFormName,inputName:"feed-add-post-destination-input"}));BX.bind(BX("feed-add-post-destination-input"),"blur",BX.delegate(BX.SocNetLogDestination.BXfpBlurInput,{inputBoxName:"feed-add-post-destination-input-box",tagInputName:"bx-destination-tag"}));BX.bind(BX("bx-destination-tag"),"focus",function(e){BX.SocNetLogDestination.openDialog(window.BXSocNetLogDestinationFormName,{bByFocusEvent:true});return BX.PreventDefault(e)});BX.bind(BX("feed-add-post-destination-container"),"click",function(e){BX.SocNetLogDestination.openDialog(window.BXSocNetLogDestinationFormName);return BX.PreventDefault(e)});BX.addCustomEvent(window,"onMentionAdd",function(e){if(!BX.type.isPlainObject(BX.SocNetLogDestination.obItems[window.BXSocNetLogDestinationFormName]["users"][e.id])){BX.SocNetLogDestination.obItems[window.BXSocNetLogDestinationFormName]["users"][e.id]=e}BX.addCustomEvent(window,"BX.SocNetLogDestination:onBeforeSelectItemFocus",function(e){if(e.id==window.BXSocNetLogDestinationFormName){e.blockFocus=true}});if(typeof BX.SocNetLogDestination.obItemsSelected[window.BXSocNetLogDestinationFormName][e.id]=="undefined"||!BX.SocNetLogDestination.obItemsSelected[window.BXSocNetLogDestinationFormName][e.id]){BX.SocNetLogDestination.selectItem(window.BXSocNetLogDestinationFormName,null,null,e.id,"users",false)}});if(t["itemsHidden"]){for(var i in t["itemsHidden"]){if(t["itemsHidden"].hasOwnProperty(i)){window.BXfpdSelectCallback({id:(typeof t["itemsHidden"][i]["PREFIX"]!="undefined"?t["itemsHidden"][i]["PREFIX"]:"SG")+t["itemsHidden"][i]["ID"],name:t["itemsHidden"][i]["NAME"]},typeof t["itemsHidden"][i]["TYPE"]!="undefined"?t["itemsHidden"][i]["TYPE"]:"sonetgroups","",true,"","init")}}}BX.SocNetLogDestination.BXfpSetLinkName({formName:window.BXSocNetLogDestinationFormName,tagInputName:"bx-destination-tag",tagLink1:BX.message("BX_FPD_LINK_1"),tagLink2:BX.message("BX_FPD_LINK_2")})}window["BXfpdSelectCallbackMent"+e]=function(i,n,o){window.BxInsertMention({item:i,type:n,formID:e,editorId:t.editorId,fireAddEvent:t.initDestination})};window["BXfpdStopMent"+e]=function(){BX.SocNetLogDestination.closeDialog();BX.SocNetLogDestination.closeSearch();clearTimeout(BX.SocNetLogDestination.searchTimeout);BX.SocNetLogDestination.searchOnSuccessHandle=false};window["BXfpdOnDialogOpen"+e]=function(){d.listen=true;d.listenFlag=true};window["BXfpdOnDialogClose"+e]=function(){d.listen=false;setTimeout(function(){d.listenFlag=false;if(!d.listen){var e=a.getEditor(t.editorId);if(e){var i=e.GetIframeDoc(),n=i.getElementById("bx-mention-node");if(n){e.selection.SetAfter(n);if(d.leaveContent){e.util.ReplaceWithOwnChildren(n)}else{BX.remove(n)}}e.Focus()}}},100)};window["BXSocNetLogDestinationFormNameMent"+e]="mention"+(""+(new Date).getTime()).substr(5);window["BXSocNetLogDestinationDisableBackspace"]=null;var n=BX("bx-b-mention-"+e);if(!t.extranetUser&&typeof t.items.extranetRoot!="undefined"){t["items"]["departmentExtranet"]=BX.clone(t["items"]["department"]);for(var o in t["items"]["extranetRoot"]){if(t["items"]["extranetRoot"].hasOwnProperty(o)){t["items"]["departmentExtranet"][o]=t["items"]["extranetRoot"][o]}}t["items"]["departmentRelationExtranet"]=BX.SocNetLogDestination.buildDepartmentRelation(t["items"]["departmentExtranet"])}BX.SocNetLogDestination.init({name:window["BXSocNetLogDestinationFormNameMent"+e],searchInput:n,extranetUser:t.extranetUser,bindMainPopup:{node:n,offsetTop:"1px",offsetLeft:"12px"},bindSearchPopup:{node:n,offsetTop:"1px",offsetLeft:"12px"},callback:{select:window["BXfpdSelectCallbackMent"+e],openDialog:window["BXfpdOnDialogOpen"+e],closeDialog:window["BXfpdOnDialogClose"+e],openSearch:window["BXfpdOnDialogOpen"+e],closeSearch:window["BXfpdOnDialogClose"+e]},items:{users:t["items"]["mentionUsers"],groups:{},sonetgroups:{},department:typeof t["items"]["departmentExtranet"]!="undefined"?t["items"]["departmentExtranet"]:t["items"]["department"],departmentRelation:typeof t["items"]["departmentRelationExtranet"]!="undefined"?t["items"]["departmentRelationExtranet"]:t["items"]["departmentRelation"]},itemsLast:{users:t["itemsLast"]["mentionUsers"],sonetgroups:{},department:{},groups:{}},itemsSelected:{},destSort:typeof t["mentionDestSort"]!="undefined"&&t["mentionDestSort"]?t["mentionDestSort"]:{},departmentSelectDisable:true,obWindowClass:"bx-lm-mention",obWindowCloseIcon:false,useClientDatabase:!!t["useClientDatabase"],userNameTemplate:typeof t["userNameTemplate"]!="undefined"?t["userNameTemplate"]:"",showVacations:false,showSearchInput:BX.browser.IsMobile()});BX.ready(function(){var i=BX("bx-b-mention-"+e);if(BX.browser.IsIE()&&!BX.browser.IsIE9()){i.style.width="1px";i.style.marginRight="0"}BX.bind(i,"mousedown",function(n){if(d.listen!==true){var o=a.getEditor(t.editorId),s=o.GetIframeDoc();if(o.GetViewMode()=="wysiwyg"&&s){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=false;var r=o.selection.GetRange(),l=s.getElementById("bx-mention-node");if(l){BX.remove(l)}o.InsertHtml('<span id="bx-mention-node">'+o.INVISIBLE_SPACE+"</span>",r);setTimeout(function(){if(!BX.SocNetLogDestination.isOpenDialog()){BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+e],{bindNode:i})}var t=s.getElementById("bx-mention-node");if(t){r.setStart(t,0);if(t.firstChild&&t.firstChild.nodeType==3&&t.firstChild.nodeValue.length>0){r.setEnd(t,1)}else{r.setEnd(t,0)}o.selection.SetSelection(r)}o.Focus()},100)}else if(o.GetViewMode()=="code"){d.listen=true;d.listenFlag=true;d.text="";d.leaveContent=false;setTimeout(function(){if(!BX.SocNetLogDestination.isOpenDialog()){BX.SocNetLogDestination.openDialog(window["BXSocNetLogDestinationFormNameMent"+e],{bindNode:i})}},100)}BX.onCustomEvent(i,"mentionClick")}})})}})();
/* End */
;; /* /bitrix/components/bitrix/idea.search/templates/.default/script.js?1519813880385*/
; /* /bitrix/components/bitrix/idea/templates/.default/script.js?15198138808885*/
; /* /bitrix/components/bitrix/idea.category.list/templates/.default/script.js?15198138802642*/
; /* /bitrix/components/bitrix/main.post.form/templates/.default/script.min.js?151981385166416*/
