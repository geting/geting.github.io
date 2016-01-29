/**
 * （默认首页）
 */
define(['./states', '../cons/cons'],
  function(stateModule, cons) {
    stateModule.config(
      ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
            .state("keyMonitor.visitIssue", {
              url: "/visitIssue",
              views: {
                  'keyMonitorContent@keyMonitor': {
                    templateUrl: cons.VIEW_PATH + 'keyMonitor/visitIssue.html',
                    controller: 'visitIssueController as visitIssue'
                  }
                }
            })
            
            .state("keyMonitor.joinIssue", {
              url: "/joinIssue",
              views: {
                  'keyMonitorContent@keyMonitor': {
                    templateUrl: cons.VIEW_PATH + 'keyMonitor/joinIssue.html',
                    controller: 'joinIssueController as joinIssue'
                  }
                }
            });
        }
      ])
  })
