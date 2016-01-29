'use strict';
define(['angular', '../controllers', 'common/helpers/responsePreHandler'],
  function(angular, controllerModule, responsePreHandler) {

    controllerModule.controller('visitIssueController', visitIssueController);

    visitIssueController.$inject = ['$injector', 'monitorRequest'];

    function visitIssueController($injector, monitorRequest) {
      var pageCtrl = this;

      monitorRequest.queryTrend({
        params:{},
        successMessage: "更新成功"
      }).then(function(result) {
        var response = responsePreHandler.responsePreHandler(result, $injector);
        pageCtrl.response = response;
      });
    }
  });
