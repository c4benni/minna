(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{354:function(t,e,o){var content=o(360);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(21).default)("1b7833da",content,!0,{sourceMap:!1})},359:function(t,e,o){"use strict";o(354)},360:function(t,e,o){var r=o(20)(!1);r.push([t.i,'.root[data-hpge]{padding:1rem 0}.br-sm .root[data-hpge],.br-xs .root[data-hpge]{padding-bottom:0}.root[data-hpge]>.root[data-asn]:first-of-type .title{display:flex!important;justify-content:space-between;align-items:center}.account-count[data-hpge]{font-size:.9rem;opacity:var(--t-subtitle);font-weight:500}.account-card-wrap[data-hpge]{display:grid;grid-template-columns:repeat(var(--length),min(calc(100vw - 3rem),500px)) .75rem;-moz-column-gap:1rem;grid-column-gap:1rem;column-gap:1rem;padding:0 0 0 1.5rem;overflow-x:auto;overflow-y:hidden;overflow:auto hidden;-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory;isolation:isolate;filter:var(--ds-light)}.account-card-wrap[data-hpge]:after{content:"";width:.75rem}.account-card-wrap[data-hpge]>.root{scroll-snap-align:center}#ui-root.md-up .account-card-wrap[data-hpge]>.root{scroll-snap-align:start;scroll-margin-left:1.5rem;scroll-snap-margin-left:1.5rem}',""]),t.exports=r},366:function(t,e,o){"use strict";o.r(e);o(11),o(9),o(10),o(12),o(8),o(13);var r=o(2),main=(o(23),o(0));function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={name:"RootPage",data:function(){return{selfName:"RootPage",renderedComponents:["AccountCard","HomeFaveActions","HomeUpdates"]}},head:function(){return{title:"Home page"}},computed:c(c({},main.o.computed),{},{accounts:function(){return this.$store.state.accounts}}),watch:c({},main.o.watch),beforeCreate:function(){this.$commit("UPDATE_",{path:"headerText",value:"Home"})},mounted:function(){main.o.mounted.call(this)},methods:c({},main.o.methods),render:function(t){var e,o,r=this,n={"data-hpge":""},div=function(e,o){return t("div",e,o)};return div({attrs:c({},n),staticClass:"root"},[(e={attrs:{title:"Accounts",useHeaderSlots:!0},scopedSlots:{appendHeader:function(){return e={attrs:c({},n),staticClass:"account-count"},o="".concat(r.accounts.length," accounts"),t("p",e,o);var e,o}}},o=[div({attrs:c({},n),staticClass:"account-card-wrap hide-scrollbar",style:{"--length":this.accounts.length}},this.accounts.map((function(e,o){return r={key:o,props:c({},e)},t("accountCard",r,n);var r,n})))],t("app-section",e,o)),function(e){return t("homeFaveActions",e)}(),function(e){return t("homeUpdates",e)}()])}},d=(o(359),o(5)),component=Object(d.a)(l,undefined,undefined,!1,null,null,null);e.default=component.exports}}]);