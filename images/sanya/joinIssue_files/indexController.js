/**
 * common controller
 */
define(['angular', './controllers', '../cons/cons', 'common/helpers/responsePreHandler'],
  function(angular, controllerModule, cons, responsePreHandler) {

    var edasCommonController = ['$scope', '$controller', '$injector', '$state', '$stateParams', 'monitorRequest',
      function($scope, $controller, $injector, $state, $stateParams, monitorRequest) {
        angular.extend(this, $controller('zhidaCommonController', {
          $scope: $scope
        }));
        var pageCtrl = this;
        pageCtrl.topMenus = [{
          'state': 'home',
          'name': '首页'
        }, {
          'state': 'keyMonitor',
          'name': '重点监控'
        }, {
          'state': 'problemDetec',
          'name': '问题定位'
        }, {
          'state': 'auditData',
          'name': '机审数据'
        }, {
          'state': 'more',
          'name': '更多',
          'subMenus': [{
            'state': 'blackWhiteList',
            'name': '封禁黑白名单'
          }, {
            'state': 'perference',
            'name': '管理中心'
          }]
        }];

        monitorRequest.queryTrend({}).then(function(result) {
          var response = responsePreHandler.responsePreHandler(result, $injector);
          pageCtrl.response = response;
          pageCtrl.userName = "getingting";
        });



      }
    ];

    controllerModule.controller('indexController', edasCommonController);

  })
