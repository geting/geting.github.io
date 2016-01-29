define(['../cons/cons', '../services/topicService'], function(cons) {
  var RESPONSE_CODE = cons.RESPONSE_CODE;
  var SHOW_RESPONSE_ERROR_MESSAGE = cons.SHOW_RESPONSE_ERROR_MESSAGE;

  /**
   * 预处理HTTP请求，如果HTTP请求错误。将错误信息以Error Dialog显示，同时返回dialog关闭的promise做异步处理。
   * @param response
   * @param $injector
   * @param withoutContent
   * @returns {*}
   */
  var responsePreHandler = function(response, $injector, withoutContent, noPublish) {
    if (response.status == RESPONSE_CODE.HTTP_SUCCESS) {
      var result = response.data;
      if (result.code == RESPONSE_CODE.SUCCESS) {
        if (withoutContent == true) {
          return result;
        } else {
          return result.content;
        }
      } else {
        if (noPublish == true) {
          return;
        }
        var resultPromise;
        if ($injector) {
          $injector.invoke(['zhidaCommonTopicService', function(zhidaCommonTopicService) {
            resultPromise = zhidaCommonTopicService.publish(SHOW_RESPONSE_ERROR_MESSAGE, result, true);
          }]);
        } else {
          resultPromise = result.content;
        }
        return resultPromise
      }
    }
  }

  /**
   *
   * @param response
   * @param $injector
   */
  var responsePreHandlerNoDialog = function(response, $injector, withoutContent) {
    if (response.status == RESPONSE_CODE.HTTP_SUCCESS) {
      var result = response.data;
      if (result.code == RESPONSE_CODE.SUCCESS) {
        if (withoutContent == true) {
          return result;
        } else {
          return result.content;
        }
      } else {
        if ($injector) {
          $injector.invoke(['$q', function($q) {
            var deferred = $q.defer();
            return deferred.promise;
          }])
        }
      }
    }
  }

  return {
    responsePreHandler: responsePreHandler,
    responsePreHandlerNoDialog: responsePreHandlerNoDialog
  }
});
