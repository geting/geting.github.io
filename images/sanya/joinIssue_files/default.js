/**
 * （默认首页）
 */
define(['./states', '../cons/cons'],
  function(stateModule, cons) {
    stateModule.config(
      ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider
            .otherwise('/keyMonitor/visitIssue');

          $stateProvider
            .state("keyMonitor", {
              url: "/keyMonitor",
              controller: 'keyMonitorController as keyMonitor',
              templateUrl: cons.VIEW_PATH + 'keyMonitor/keyMonitor.html'
            })

            .state("problemDetec", {
              url: "/problemDetec",
              controller: 'AboutCtrl as about',
              templateUrl: cons.VIEW_PATH + 'about.html'
            });
        }
      ])
  })
