define(['./services', 'angular', '../cons/cons'],
  function(serviceModule, angular, edasCons) {
    serviceModule.factory('monitorRequest', ['zhida.common.request', function(requestWrapper) {
      var sendRequest = requestWrapper.request;
      var xhrRequests = {

        queryTrend: function(options) {
          return sendRequest('/queryTrend.json', options);
        },
        queryFailure: function(options) {
          return sendRequest('/queryFailure.json', options);
        }


      }

      return xhrRequests;
    }])
  });
