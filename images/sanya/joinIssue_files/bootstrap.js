/**
 * bootstrap file for application.
 */
define([
  'angular',
  'app',
  'initConfig',
  './controllers/_base',
  './states/_base',
  './directives/_base',
  './services/_base',
  './filters/_base',
  'common/services/_base',
  'common/controllers/_base',
  'common/directives/_base'
], function(angular) {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['zhidabaseApp']);
  });
});
