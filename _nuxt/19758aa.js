(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{352:function(t,e,r){var content=r(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(21).default)("eac2e80c",content,!0,{sourceMap:!1})},355:function(t,e,r){"use strict";r(352)},356:function(t,e,r){var o=r(20)(!1);o.push([t.i,".root[data-prpge]{height:100%;display:grid;grid-template-rows:180px auto auto;align-content:flex-start}.header[data-prpge]{height:100%;background:var(--theme-banner);display:grid;align-items:flex-end;grid-template-rows:1fr auto;padding:1.5rem;justify-items:center;grid-row-gap:.75rem;row-gap:.75rem}.light-theme .header[data-prpge]{background:var(--primary);color:#fff}.account-img[data-prpge]{height:96px;width:96px;position:relative}.account-img[data-prpge]:before{border:var(--ui-divide)}.light-theme .account-img[data-prpge]:before{border:.75px solid #fff;opacity:var(--t-caption)}.title[data-prpge]{font-size:1.25rem;font-weight:500}.greeting[data-prpge]{padding:1.5rem 1.5rem 1rem;color:var(--body-c);text-align:center}.form[data-prpge]{background:var(--theme-primary);box-shadow:var(--raise-light);padding:.25rem .5rem;border-radius:4px;max-width:660px;margin:1.5rem auto}.action[data-prpge]{margin:1rem auto 0;display:grid;grid-auto-flow:column;grid-column-gap:.5rem;-moz-column-gap:.5rem;column-gap:.5rem;padding:0 30px!important}.dark-theme .action[data-prpge]{color:var(--error)}",""]),t.exports=o},363:function(t,e,r){"use strict";r.r(e);r(11),r(9),r(10),r(12),r(8),r(13);var o=r(2);function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={name:"ProfilesPage",data:function(){return{form:{remember:null}}},beforeMount:function(){var t=localStorage.getItem("user");"string"==typeof t&&(t=JSON.parse(t)),this.form=t},render:function(t){var e,r,o,n=this,l={"data-prpge":""},div=function(e,r){return t("div",e,r)},d=function(e,r){return t("ui-icon",e,r)};return div({attrs:c({},l),staticClass:"root"},[div({attrs:c({},l),staticClass:"header"},[d({attrs:c(c({},l),{},{name:"camera"}),staticClass:"account-img fill-before"}),(r={attrs:c({},l),staticClass:"title"},o=[(null===(e=this.$store.state.user)||void 0===e?void 0:e.username)||"User"],t("h2",r,o))]),function(e,r){return t("h3",e,r)}({attrs:c({},l),staticClass:"greeting"},["Good "+this.$store.state.greeting]+","),div({attrs:c({},l),staticClass:"main"},[function(e,r){return t("ui-form",e,r)}({attrs:c({},l),staticClass:"form",props:{showSubmit:!1,name:"edit profile"}},[function(e,r){return t("ui-input",e,r)}({props:{label:"Remember me",id:"login-save-info",type:"switch",vmodel:this.form.remember,required:!1,validator:function(){return!0},topSlot:!1,hint:this.form.remember?"Your login info will be remembered on this device.":"You will need to login on your next visit."},on:{vmodel:function(t){n.form.remember=t,localStorage.setItem("user",JSON.stringify(n.form))}}})]),function(e,r){return t("ui-btn",e,r)}({attrs:c({},l),props:{simpleButton:!0,background:this.$theme.light?"error":void 0},staticClass:"action",on:{"!click":function(){n.$commit("UPDATE_",{value:null,path:"user"})}}},[d({attrs:c(c({},l),{},{name:"logOut"}),staticClass:"action-icon"}),"Logout"])])])}},d=(r(355),r(5)),component=Object(d.a)(l,undefined,undefined,!1,null,null,null);e.default=component.exports}}]);