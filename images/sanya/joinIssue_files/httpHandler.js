'use strict';

define([
  'angular',
  './services',
  '../cons/cons',
  'angular-growl',
  './topicService'
], function(angular, services, cons) {

  /**
   * 定义全局的http请求拦截器。
   * 可以通过app.config('zhidaCommonSettingProvider')来更改你需要配置的信息。例如注入crsfToken信息。
   * 可以拦截变更http的url。
   *   zhidaCommonSettingProvider.setProviderOptions({
   *     linkHandler: function(url){
   *       return url
   *     },
   *     httpOptionInterceptor: function(options){
   *       options.data.secToken = 'SEC_TOKEN';
   *     }
   *   })
   *
   *  通过successMessage可以自动弹出growl message提醒用户操作成功。
   *  通过submitMessage提醒用户操作已经提交。这种情况适用于那种请求比较慢的场景
   *  通过ignoreErrorHandler避免弹出错误信息对话框。
   *  通过注入SessionTimeout的Key决定什么情况下提醒用户操作超时。
   */

  var RESPONSE_CODE = cons.RESPONSE_CODE;
  var SHOW_RESPONSE_ERROR_MESSAGE = cons.SHOW_RESPONSE_ERROR_MESSAGE;

  var sessionTimeout = cons.COMMON_SESSION_TIMEOUT;


  services.constant('zhidaCommonConfig', {
      /**
       * 如果需要改写url可以注入改写的内容。
       * @param url
       * @returns {*}
       */
      linkHandler: function(url) {
        return url;
      },

      /**
       * HTTP options POST的扩展。可以自己定义POST请求的CSRF_TOKEN等信息.
       * @param options
       * @returns {*}
       */
      httpOptionInterceptor: function(options) {
        return options;
      },

      /**
       * interceptor function for options, can rewrite new property or setting other properties.
       * @param options
       */
      httpOptionWrapper: function(options) {
        return options;
      },

      /**
       * interceptor function for http response, can be used to handle custom global response error codes
       * @param  {Object} response http response
       * @return {false}          return false means to stop following response handlings in the "zhidaCommonHttpInterceptor"
       * @return {undefined/true/object/anything else} return anything else won't has any affect to the following response handlings in the "zhidaCommonHttpInterceptor"
       */
      httpResponseInterceptor: function(response) {
        return response;
      },


      responseSuccessCode: RESPONSE_CODE.SUCCESS,

      enableSessionTimeout: true,

      sessionTimeoutCode: RESPONSE_CODE.SESSION_TIMEOUT,

      sessionTimeoutLink: '',

      labels: {
        SESSION_TIMEOUT1: '您当前的会话已超时，请',
        SESSION_TIMEOUT2: '重新登录',
        RESPONSE_ERROR: '当前请求失败，建议您刷新页面或者稍后重试。'
      }

    }).provider('zhidaCommonSetting', ['zhidaCommonConfig', function(zhidaCommonConfig) {

      var defaultConfig = zhidaCommonConfig;

      return {
        setProviderOptions: function(options) {
          angular.extend(defaultConfig, options);
        },

        setGlobalLabels: function(labels) {
          if (defaultConfig) {
            defaultConfig.labels = labels;
          }
        },

        $get: function() {
          return defaultConfig;
        }
      }
    }]).config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('zhidaCommonHttpInterceptor');
    }])
    .config(['growlProvider', '$compileProvider', '$tooltipProvider', function(growlProvider, $compileProvider, $tooltipProvider) {
      growlProvider.onlyUniqueMessages(true);
      growlProvider.globalTimeToLive(3000);
      growlProvider.globalEnableHtml(true);
      // 避免IE下更改href属性生成unsafe的tag造成IE点击出错。
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
      // 避免Iframe整合的场景下当出现tooltip的场景有跳动。
      $tooltipProvider.options({
        animation: false
      });
    }])
    .factory('zhida.common.request', ['zhida.common.requestWrapper', 'growl', '$q', 'zhidaCommonTopicService', 'zhidaCommonSetting',
      function(requestWrapper, growl, $q, ossTopicService, zhidaCommonSetting) {
        function request(url, options) {
          options = options || {};
          var url = zhidaCommonSetting.linkHandler(url);
          if (options && options.method) {
            var requestMethod = options.method.toUpperCase();
            if (requestMethod == 'POST') {
              if (options.data == undefined) {
                options.data = {}
              }
              zhidaCommonSetting.httpOptionInterceptor(options);
            }
          } else {
            options.method = 'GET';
          }
          if (options && options.submitMessage) {
            growl.addSuccessMessage(options.submitMessage);
          }

          zhidaCommonSetting.httpOptionWrapper(options);

          return requestWrapper.sendRequestWithUrl(url, options).then(function(result) {
            var data = result.data;
            var config = result.config;
            if (config && data && data.code == RESPONSE_CODE.SUCCESS) {
              if (config.successMessage != undefined) {
                growl.addSuccessMessage(config.successMessage)
              }
            }
            return result;
          }, function(errorResponse) {
            if (options && options.ignoreErrorHandler && options.ignoreErrorHandler == true) {
              return $q.reject(errorResponse);
            } else {
              console.log(errorResponse);
            }
            if (errorResponse.status !== RESPONSE_CODE.HTTP_SUCCESS) {
              ossTopicService.publish(SHOW_RESPONSE_ERROR_MESSAGE, zhidaCommonSetting.labels.RESPONSE_ERROR);
            }
            return $q.reject(errorResponse);
          })
        }
        return {
          request: request
        }
      }
    ])
    .factory('zhidaCommonHttpInterceptor', ['$q', '$rootScope', 'zhidaCommonSetting', '$injector', function($q, $rootScope, zhidaCommonSetting, $injector) {
      return {
        'response': function(response) {
          var data = response.data;
          if (zhidaCommonSetting.enableSessionTimeout && data.code == zhidaCommonSetting.sessionTimeoutCode) {
            $rootScope.$emit(sessionTimeout, response);
            return $q.reject(response);
          } else {
            //对外提供responseInterceptor，如果该方法中执行完毕后显示返回false，则终止后续的response处理。
            if (zhidaCommonSetting.httpResponseInterceptor(response, $injector) === false) {
              return $q.reject(response);
            }
            return response || $q.when(response);
          }
        },

        'responseError': function(rejection) {
          return $q.reject(rejection)
        }
      }
    }])
    .run(['$rootScope', 'zhidaCommonTopicService', 'zhidaCommonSetting', function($rootScope, zhidaCommonTopicService, zhidaCommonSetting) {
      var labels = zhidaCommonSetting.labels;

      if ($rootScope.gConfig == undefined) {
        $rootScope.gConfig = {
          sessionTimeout: false
        };
      }
      $rootScope.$on(sessionTimeout, function(event, response) {
        var loginUrl = zhidaCommonSetting.sessionTimeoutLink + '?callback=' + encodeURIComponent(location.href);
        var message = labels.SESSION_TIMEOUT1 + '<a href=' + loginUrl + '>' + labels.SESSION_TIMEOUT2 + '</a>。';
        if ($rootScope.gConfig.sessionTimeout == false) {
          $rootScope.gConfig.sessionTimeout = true;
          setTimeout(function() {
            var sessionTimeoutPromise = zhidaCommonTopicService.publish(SHOW_RESPONSE_ERROR_MESSAGE, message, true);
            sessionTimeoutPromise.then(function(result) {
              window.location = loginUrl;
            })
          }, 0)
        }
      })
    }])
});
