
; /* Start:"a:4:{s:4:"full";s:90:"/bitrix/components/bitrix/intranet.configs/templates/.default/script.min.js?15198138857954";s:6:"source";s:71:"/bitrix/components/bitrix/intranet.configs/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.namespace("BX.Bitrix24.Configs");BX.Bitrix24.Configs.LogoClass=function(){var e=function(e){this.ajaxPath=e};e.prototype.LogoChange=function(){BX("config-wait").style.display="inline-block";BX.ajax.submit(BX("configLogoPostForm"),function(e){try{var t=JSON.parse(e);if(t.error){BX("config_logo_error_block").style.display="block";var i=BX.findChild(BX("config_logo_error_block"),{class:"content-edit-form-notice-text"},true,false);i.innerHTML="<span class='content-edit-form-notice-icon'></span>"+t.error}else if(t.path){BX("config_logo_error_block").style.display="none";BX("logo_24_text").style.display="none";BX("logo_24_img").src=t.path;BX("logo_24_img").style.display="block";BX("config_logo_img").src=t.path;BX("config_logo_img_div").style.display="inline-block";BX("config_logo_delete_link").style.display="inline-block"}BX("config-wait").style.display="none"}catch(e){BX("config-wait").style.display="none";return false}})};e.prototype.LogoDelete=function(e){if(confirm(BX.message("LogoDeleteConfirm"))){BX("config-wait").style.display="inline-block";BX.ajax.post(this.ajaxPath,{client_delete_logo:"Y",sessid:BX.bitrix_sessid()},function(){BX("logo_24_img").src="";BX("logo_24_img").style.display="none";BX("logo_24_text").style.display="block";BX("config_logo_img_div").style.display="none";e.style.display="none";BX("config_error_block").style.display="none";BX("config-wait").style.display="none"})}};return e}();BX.Bitrix24.Configs.LiveFeedRightClass=function(){var e=function(e){this.arToAllRights=e};e.prototype.DeleteToAllAccessRow=function(e){var t=BX("RIGHTS_div",true);var i=BX.findParent(e,{tag:"div",className:"toall-right"},t);if(i)var o=i.getAttribute("data-bx-right");if(i&&o){BX.remove(i);var s=[];for(var a=0;a<this.arToAllRights.length;a++)if(this.arToAllRights[a]!=o)s[s.length]=this.arToAllRights[a];this.arToAllRights=BX.clone(s);var r=BX("livefeed_toall_rights_"+o);if(r)BX.remove(r)}};e.prototype.ShowToAllAccessPopup=function(e){var t=this;e=e||[];BX.Access.Init({other:{disabled:false,disabled_g2:true,disabled_cr:true},groups:{disabled:true},socnetgroups:{disabled:true}});var i={};for(var o=0;o<e.length;o++)i[e[o]]=true;BX.Access.SetSelected(i);BX.Access.ShowForm({callback:function(e){var i=BX("RIGHTS_div",true);var o=false;for(var s in e){o=BX.Access.GetProviderName(s);for(var a in e[s]){i.appendChild(BX.create("div",{attrs:{"data-bx-right":a},props:{className:"toall-right"},children:[BX.create("span",{html:(o.length>0?o+": ":"")+e[s][a].name+"&nbsp;"}),BX.create("a",{attrs:{href:"javascript:void(0);",title:BX.message("SLToAllDel")},props:{className:"access-delete"},events:{click:function(){t.DeleteToAllAccessRow(this)}}})]}));BX("configPostForm").appendChild(BX.create("input",{attrs:{type:"hidden"},props:{name:"livefeed_toall_rights[]",id:"livefeed_toall_rights_"+a,value:a}}));t.arToAllRights[t.arToAllRights.length]=e[s][a].id}}}})};return e}();BX.Bitrix24.Configs.ImGeneralChatClass=function(){var e=function(e){this.arToAllRights=e};e.prototype.DeleteToAllAccessRow=function(e){var t=BX("chat_RIGHTS_div",true);var i=BX.findParent(e,{tag:"div",className:"toall-right"},t);if(i)var o=i.getAttribute("data-bx-right");if(i&&o){BX.remove(i);var s=[];for(var a=0;a<this.arToAllRights.length;a++)if(this.arToAllRights[a]!=o)s[s.length]=this.arToAllRights[a];this.arToAllRights=BX.clone(s);var r=BX("imchat_toall_rights_"+o);if(r)BX.remove(r)}};e.prototype.ShowToAllAccessPopup=function(e){var t=this;e=e||[];BX.Access.Init({other:{disabled:false,disabled_g2:true,disabled_cr:true},groups:{disabled:true},socnetgroups:{disabled:true}});var i={};for(var o=0;o<e.length;o++)i[e[o]]=true;BX.Access.SetSelected(i);BX.Access.ShowForm({callback:function(e){var i=BX("chat_RIGHTS_div",true);var o=false;for(var s in e){o=BX.Access.GetProviderName(s);for(var a in e[s]){i.appendChild(BX.create("div",{attrs:{"data-bx-right":a},props:{className:"toall-right"},children:[BX.create("span",{html:(o.length>0?o+": ":"")+e[s][a].name+"&nbsp;"}),BX.create("a",{attrs:{href:"javascript:void(0);",title:BX.message("SLToAllDel")},props:{className:"access-delete"},events:{click:function(){t.DeleteToAllAccessRow(this)}}})]}));BX("configPostForm").appendChild(BX.create("input",{attrs:{type:"hidden"},props:{name:"imchat_toall_rights[]",id:"imchat_toall_rights_"+a,value:a}}));t.arToAllRights[t.arToAllRights.length]=e[s][a].id}}}})};return e}();BX.Bitrix24.Configs.IpSettingsClass=function(){var e=function(e){this.arCurIpRights=e};e.prototype.DeleteIpAccessRow=function(e){var t=e.parentNode.parentNode;BX.remove(e.parentNode);var i=BX.findChildren(t,{tagName:"div"},true);if(i.length<=0){var o=t.parentNode.getAttribute("data-bx-right");var s=[];for(var a=0;a<this.arCurIpRights.length;a++)if(this.arCurIpRights[a]!=o)s.push(this.arCurIpRights[a]);this.arCurIpRights=s;BX.remove(t.parentNode)}};e.prototype.ShowIpAccessPopup=function(e){var t=this;e=e||[];BX.Access.Init({other:{disabled:false,disabled_g2:true,disabled_cr:true},groups:{disabled:true},socnetgroups:{disabled:true}});var i={};for(var o=0;o<e.length;o++)i[e[o]]=true;BX.Access.SetSelected(i);BX.Access.ShowForm({callback:function(e){var i=false;for(var o in e){i=BX.Access.GetProviderName(o);for(var s in e[o]){var a=BX.create("tr",{attrs:{"data-bx-right":s},children:[BX.create("td",{html:(i.length>0?i+": ":"")+e[o][s].name+"&nbsp;",props:{className:"content-edit-form-field-name"}}),BX.create("td",{props:{className:"content-edit-form-field-input",colspan:2},children:[BX.create("div",{children:[BX.create("input",{attrs:{type:"text",name:"ip_access_rights_"+s+"[]",size:"30"},props:{},events:{click:function(){t.addInputForIp(this)}}}),BX.create("a",{attrs:{href:"javascript:void(0);",title:BX.message("SLToAllDel")},props:{className:"access-delete"},events:{click:function(){t.DeleteIpAccessRow(this)}}})]})]})]});BX("ip_add_right_button").parentNode.insertBefore(a,BX("ip_add_right_button"));t.arCurIpRights.push(s)}}}})};e.prototype.addInputForIp=function(e){var t=this;var i=e.parentNode;if(BX.nextSibling(i))return;var o=BX.clone(i);var s=BX.firstChild(o);s.value="";s.onclick=function(){t.addInputForIp(this)};BX.nextSibling(s).onclick=function(){t.DeleteIpAccessRow(this)};i.parentNode.appendChild(o)};return e}();BX.Bitrix24.Configs.Functions={init:function(){var e=BX("allow_livefeed_toall");var t=BX("DEFAULT_all");if(e&&t){BX.bind(e,"click",BX.delegate(function(e){t.style.display=this.checked?"":"none"},e))}var i=BX("RIGHTS_all");if(e&&i){BX.bind(e,"click",BX.delegate(function(e){i.style.display=this.checked?"":"none"},e))}if(BX("configLogoPostForm")&&BX("configLogoPostForm").client_logo){BX.bind(BX("configLogoPostForm").client_logo,"change",function(){B24ConfigsLogo.LogoChange()})}if(BX("config_logo_delete_link")){BX.bind(BX("config_logo_delete_link"),"click",function(){B24ConfigsLogo.LogoDelete(this)})}var o=BX("allow_general_chat_toall");var s=BX("chat_rights_all");if(o&&s){BX.bind(o,"click",function(){s.style.display=this.checked?"":"none"})}if(BX.type.isDomNode(BX("smtp_use_auth"))){BX.bind(BX("smtp_use_auth"),"change",BX.proxy(function(){this.showHideSmtpAuth()},this))}},submitForm:function(e){BX.addClass(e,"webform-button-wait webform-button-active");BX.submit(BX("configPostForm"))},otpSwitchOffInfo:function(e){if(!e.checked){BX.PopupWindowManager.create("otpSwitchOffInfo",e,{autoHide:true,offsetLeft:-100,offsetTop:15,overlay:false,draggable:{restrict:true},closeByEsc:true,closeIcon:{right:"12px",top:"10px"},content:'<div style="padding: 15px; width: 300px; font-size: 13px">'+BX.message("CONFIG_OTP_SECURITY_SWITCH_OFF_INFO")+"</div>"}).show()}},adminOtpIsRequiredInfo:function(e){BX.PopupWindowManager.create("adminOtpIsRequiredInfo",e,{autoHide:true,offsetLeft:-100,offsetTop:15,overlay:false,draggable:{restrict:true},closeByEsc:true,closeIcon:{right:"12px",top:"10px"},content:'<div style="padding: 15px; width: 300px; font-size: 13px">'+BX.message("CONFIG_OTP_ADMIN_IS_REQUIRED_INFO")+"</div>"}).show()}};
/* End */
;; /* /bitrix/components/bitrix/intranet.configs/templates/.default/script.min.js?15198138857954*/
