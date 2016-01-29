define([
  'angular',
  'angular-cookies',
  'ui.router',
  'ui.bootstrap',
  'angular-animate',
  'angular-growl',
  'angular-ui-validate',
  'angular-sanitize',
  'zhida-common-tpl',
  'zhida-common-bootstrap-tpl',
  'zhidabase-tpl',
  'bindonce'
], function(angular) {
  'use strict';
  return angular.module('zhidabaseApp', ['ui.router', 'ui.bootstrap',
    'zhida.common.bootstrap.tpl', 'zhidabase.tpl',
    'ui.validate', 'ngSanitize', 'ngAnimate', 'ngCookies', 'angular-growl', 
    'zhidaCommonControllers', 'zhidaCommonServices', 'zhidaCommonDirectives',
    'controllers', 'states', 'directives', 'zhidaServices', 'zhidaFilters'
  ]);
});
