'use strict';
define(['angular', './controllers', 'common/helpers/responsePreHandler'],
  function(angular, controllerModule, responsePreHandler) {

    controllerModule.controller('AboutCtrl', whiteList2Model);

    whiteList2Model.$inject = ['$injector', 'monitorRequest', 'zhidaCommonTopicService'];

    function whiteList2Model($injector, monitorRequest, topicService) {
      var whiteList = this;
      whiteList.words = "this is about";
 

      monitorRequest.queryFailure({}).then(function(result) {
        var response = responsePreHandler.responsePreHandler(result, $injector);

      })


    }
  });
