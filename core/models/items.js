;define(function(require){'use strict';var e=require('backbone'),l=e.Model.extend({defaults:{id:''}});var n=e.Collection.extend({model:l,localStorage:null,initialize:function(l,t){t=t||{};var o=t.global?t.global:'no-global';this.localStorage=new e.LocalStorage('Items-'+o)},saveAll:function(){this.map(function(e){e.save()})},resetAll:function(){var t=this.length;for(var e=t-1;e>=0;e--){this.at(e).destroy()};this.reset()}});var o=e.Collection.extend({model:l,});return{Item:l,Items:n,ItemsSlice:o}});