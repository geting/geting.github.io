define([
  'app',
  'angular',
  'ui.router',
  'ui.bootstrap'
], function(app, angular) {
  'use strict';

  // convert the param from json object to form data.
  var param = function(obj) {
    var query = '';
    var name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          innerObj = {};
          innerObj[name] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  /**
   * Fix IE8 without indexOf bug.
   */
  function indexOfFunctionForArray() {
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
          from += len;
        for (; from < len; from++) {
          if (from in this && this[from] === elt)
            return from;
        }
        return -1;
      };
    }
  }

  indexOfFunctionForArray();

  app.run(
      ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //                console.log('from state: ' + fromState.name + ' to state: ' + toState.name);
          });
          $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log('ERROR ' + error + ' . From state: ' + fromState.name + ' to state: ' + toState.name);
          });
        }
      ])
    .factory('zhidaHttpInterceptor', ['$q', function($q) {
      return {
        'requestError': function(rejection) {
          console.log('request error: ' + rejection)
          return $q.reject(rejection)
        },
        'request': function(config) {
          return config || $q.when(config)
        },
        'response': function(response) {
          return response || $q.when(response);
        },
        'responseError': function(rejection) {
          console.log('response error: ', rejection)
          return $q.reject(rejection)
        }
      }
    }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('zhidaHttpInterceptor');
    }])
    .config(['$provide', function($provide) {
      $provide.decorator("$exceptionHandler", ['$delegate', function($delegate) {
        return function(exception, cause) {
          $delegate(exception, cause);
          console.log(exception.message || exception);
        };
      }]);
    }])
    .factory('zhida.common.requestWrapper', ['$http', function($http) {
      /**
       *
       * @param optionsParams
       * if options.dataFormatter != null && dataFormatter == function, it will automatic invoked
       * and render the data to relative formatter.
       * @returns {*|Error|Prompt}
       */
      var sendRequest = function(optionsParams) {
        var defaultOptions = {
          method: 'GET'
        }

        var options = angular.extend({}, defaultOptions, optionsParams);
        var requestMethod = options.method.toUpperCase();
        if (requestMethod == 'POST') {
          options.headers = options.headers || {};
          options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
          if (options.data == undefined && options.params) {
            options.data = param(options.params);
            delete options.params;
          } else {
            options.data = param(options.data)
          }
        } else if (requestMethod == 'GET') {
          options.params = options.params || {};
          options.params.__preventCache = new Date().getTime();
        }

        var promise = $http(options).
        success(function(data, status, headers, config) {}).
        error(function(data, status, headers, config) {})
        if (angular.isFunction(options.dataFormatter)) {
          promise.then(function(data) {
            return options.dataFormatter.apply(null, [data]);
          })
        }
        return promise;
      }

      var sendRequestWithUrl = function(url, options) {
        options = options || {}
        options.url = url
        return sendRequest(options)
      }

      return {
        sendRequest: sendRequest,
        sendRequestWithUrl: sendRequestWithUrl
      }

    }])
});
