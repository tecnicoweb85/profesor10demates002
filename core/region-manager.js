;define(function(require){'use strict';var $=require('jquery'),c=require('underscore'),i=require('backbone'),n=require('core/app'),r=require('core/lib/hooks'),t=require('core/app-utils');i.View.prototype.close=function(){if(this.onClose){this.onClose()};this.unbind();this.remove()};var a=(function(i,$,g){var h=null,f=null,P='#app-layout',l=null,R='#app-header',c=null,T='#app-content-wrapper',d='#app-menu',s=null,o={};var u=g.extend({},i.Events);o.on=function(e,n){u.on(e,n)};o.off=function(e,n){u.off(e,n)};o.handleNavigationInterception=function(){if(n.getParam('use-html5-pushstate')){var e=!0;e=r.applyFilters('auto-prevent-page-reload',e,[]);if(e){$('body').on('click','a',H)}}};var H=function(e){var o=$(e.currentTarget),r=o.attr('href').trim();if(t.isInternalUrl(r)&&r!=='#'){e.preventDefault();var i=t.extractRouteFromUrlPath(r);n.router.navigate(i,{trigger:!0})}};o.buildHead=function(n){if(h===null){require(['core/views/head'],function(e){h=new e();h.render();n()})}else{n()}};o.buildLayout=function(n){if(f===null){require(['core/views/layout'],function(e){f=new e({el:P});if(!f.isRendered()){f.render()};n()})}else{n()}};o.buildHeader=function(n){if(f.containsHeader()){if(l===null){require(['core/views/header'],function(e){l=new e({el:R,do_if_template_exists:function(e){if(f.containsHeader()){e.render()};n()},do_if_no_template:function(){n()}})})}else{n()}}else{n()}};o.buildMenu=function(t,i){i=(i!=undefined&&i);if(s===null||i){require(['core/views/menu'],function(e){var c=$(d).length?{el:d}:{};s=new e(c);s.resetAll();var o=[];n.navigation.each(function(e,t){var r=n.components.get(e.get('component_id'));if(r){o.push({id:r.get('id'),label:r.get('label'),type:r.get('type'),link:n.getScreenFragment('component',{component_id:r.get('id')}),options:e.get('options')})}});o=r.applyFilters('menu-items',o,[n.navigation]);g.each(o,function(e){var n=e.options?e.options:{};s.addItem(e.id,e.type,e.label,e.link,n)});b(i);t()})}else{t()}};var b=function(e){if(s){if($(d).length&&(!$(d).html().length||(e!=undefined&&e))){s.render();u.trigger('menu:rendered',n.getCurrentScreenData(),s);t.log('Render menu',{menu_view:s,force_reload:e})}}else{if($(d).html().length){$(d).empty()}}};o.getMenuView=function(){return s};var v=function(){if(l&&l.templateExists()&&f.containsHeader()){l.render();t.log('Render header',{header_view:l});if(l.containsMenu()){b(!0)};u.trigger('header:rendered',n.getCurrentScreenData(),l)}},C=function(e){if(e){if(e.is_static){}else{if(e.close){e.close()}}}},D=function(e){var i=!1,s=n.getParam('custom-screen-rendering');if(!e.is_static||!$(e.el).html().length){if(e.is_static!=undefined&&e.is_static){i=!0;t.log('Open static view',{screen_data:n.getCurrentScreenData(),view:e})}else{t.log('Open view',{screen_data:n.getCurrentScreenData(),view:e})};e.render()}else{t.log('Re-open existing static view',{view:e})};var o=$(T);if(s){r.doActions('screen-transition',[o,$('div:first-child',o),$(e.el),n.getPreviousScreenMemoryData(),n.getCurrentScreenData()]).done(function(){v();u.trigger('screen:showed',n.getCurrentScreenData(),c,i)}).fail(function(){v();u.trigger('screen:showed:failed',n.getCurrentScreenData(),c,i)})}else{o.empty().append(e.el);v();u.trigger('screen:showed',n.getCurrentScreenData(),c,i)};if(e.onShow){e.onShow()}},F=function(e){var t=n.getParam('custom-screen-rendering');if(c){if(!t){C(c)}};c=e;D(c)},m={};var w=function(e){return e.fragment+'-'+String(e.item_id)},y=function(e){var n=w(e);return m.hasOwnProperty(n)?m[n]:null},k=function(e,n){m[w(e)]=n},p=function(e,t){var r=n.getQueriedScreen();u.trigger('screen:leave',n.getCurrentScreenData(),r,c);n.addQueriedScreenToHistory(t);if(e.is_static){k(r,e)};F(e)},S=function(n,t,a,c){var i=function(e){e.is_static=a;c(e)};switch(n){case'single':require(['core/views/single'],function(e){i(new e(t))});break;case'page':require(['core/views/page'],function(e){i(new e(t))});break;case'posts-list':require(['core/views/archive'],function(e){i(new e(t))});break;case'hooks':require(['core/views/custom-component'],function(e){i(new e(t))});break;case'comments':require(['core/views/comments'],function(e){i(new e(t))});break;case'custom-page':require(['core/views/custom-page'],function(e){i(new e(t))});break;default:var o=r.applyFilters('custom-view','',[n]);if(o.length){require([o],function(e){i(new e(t))})};break}};o.show=function(e,t,i){n.setQueriedScreen(i);var c=n.getQueriedScreen(),s=r.applyFilters('redirect',!1,[c,n.getCurrentScreenData()]);if(s){return};var o=r.applyFilters('is-static-screen',!1,[c]);if(o){var a=y(c);if(a!==null){a.checkTemplate(function(){p(a)})}else{S(e,t,o,function(e){e.checkTemplate(function(){p(e)})})}}else{S(e,t,o,function(e){e.checkTemplate(function(){p(e)})})}};o.getCurrentView=function(){return c};return o})(i,$,c);return a});