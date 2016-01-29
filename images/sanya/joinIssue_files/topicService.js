define(['./services'], function(serviceModule) {
  var topicService = {};
  serviceModule.factory('zhidaCommonTopicService', ['$rootScope', '$q', function($rootScope, $q) {
    function publish(channelId, content, needModalResult) {
      if (needModalResult === true) {
        var deferred = $q.defer();
        if (angular.isString(content)) {
          content = {
            message: content,
            modalResultDeferred: deferred
          }
        } else {
          content.modalResultDeferred = deferred;
        }
        $rootScope.$emit(channelId, content)
        return deferred.promise;
      }
      $rootScope.$emit(channelId, content)
    }

    function subscribe(channelId, handler) {
      return $rootScope.$on(channelId, handler)
    }

    topicService = {
      publish: publish,
      subscribe: subscribe
    }
    return topicService;
  }])
  return topicService;
})
