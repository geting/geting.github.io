;
(function() {
  var vendorPath = '../common/bower_components';
  var common = '../common/scripts'
  require.config({
    baseUrl: './scripts/',
    skipDataMain: true,
    paths: {
      'angular': vendorPath + '/angular/angular',
      'angular-route': vendorPath + '/angular-route/angular-route',
      'angular-resource': vendorPath + '/angular-resource/angular-resource',
      'angular-animate': vendorPath + '/angular-animate/angular-animate',
      'angular-growl': vendorPath + '/angular-growl/build/angular-growl',
      'angular-cookies': vendorPath + '/angular-cookies/angular-cookies',
      'angular-sanitize': vendorPath + '/angular-sanitize/angular-sanitize.min',
      'ui.router': vendorPath + '/angular-ui-router/release/angular-ui-router.min',
      'angular-ui-validate': vendorPath + '/angular-ui-validate/dist/validate.min',
      'ui.bootstrap': vendorPath + '/angular-bootstrap/ui-bootstrap',
      'bindonce': vendorPath + '/angular-bindonce/bindonce',
      'jQuery': vendorPath + '/jquery/dist/jquery.min',
      'ng-clip': vendorPath + '/ng-clip/ng-clip',
      'app': 'app',
      'bootstrap': 'bootstrap',
      'spinjs': vendorPath + '/spin.js/spin',
      'common': common,
      'zhida-common-tpl': common + '/zhida-common-tpl',
      'zhida-common-bootstrap-tpl': common + '/zhida-common-bootstrap-tpl',
      'zhidabase-tpl': 'zhidabase-tpl'
    },
    shim: {
      'jQuery': {
        exports: 'jQuery'
      },
      'angular': {
        exports: 'angular',
        deps: ['jQuery']
      },
      'ui.router': {
        deps: ['angular']
      },
      'angular-animate': {
        deps: ['angular']
      },
      'angular-growl': {
        deps: ['angular-animate']
      },
      'angular-resource': {
        deps: ['angular']
      },
      'angular-cookies': {
        deps: ['angular']
      },
      'angular-sanitize': {
        deps: ['angular']
      },
      'angular-ui-validate': {
        deps: ['angular']
      },
      'bindonce': {
        deps: ['angular']
      },
      'zhida-common-tpl': {
        deps: ['angular']
      },
      'zhida-common-bootstrap-tpl': {
        deps: ['angular']
      },
      'ui.bootstrap': {
        deps: ['zhida-common-bootstrap-tpl']
      },
      'ng-clip': {
        deps: ['angular']
      },
      'spinjs': {},
      'angular-locale-zh-cn': {
        deps: ['angular']
      },
      'zhidabase-tpl': {
        deps: ['angular']
      },
      'angular-translate': {
        deps: ['angular']
      }
    }
  });
}());
