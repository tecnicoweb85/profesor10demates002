;define(function(require){'use strict';var $=require('jquery'),i=require('underscore'),s=require('core/views/backbone-template-view'),a=require('core/theme-tpl-tags'),r=require('core/lib/hooks');return s.extend({className:'app-screen',initialize:function(e){this.setTemplate('page','single');i.bindAll(this,'render');this.item=e.item;this.global=e.hasOwnProperty('global')?e.global:'pages';this.item.on('change',this.render)},render:function(){var e={post:this.item.toJSON(),TemplateTags:a};e=r.applyFilters('template-args',e,['page',this.template_name,this]);var i=this.template(e);$(this.el).html(i);return this}})});