'use strict';
define(['./controllers', 'angular', 'app',
    '../cons/cons',
    '../services/dialog',
    '../services/topicService'
  ],
  function(controller, angular, app, cons) {

    app.provider('commonControllerConfig', function() {
      var defaultConfig = {
        labels: {
          DIALOG_TITLE: '错误提示',
          BTN_OK: '确定'
        }
      };

      return {

        setGlobalLabels: function(labels) {
          if (defaultConfig) {
            defaultConfig.labels = labels;
          }
        },

        $get: function() {
          return defaultConfig;
        }
      }
    });
    /**
     * 作为全局的异常拦截和Error对话框的弹窗。配合TopicService一起工作。
     */
    controller.controller('zhidaCommonController', ['$scope', '$rootScope', 'zhidaCommonTopicService',
      'zhidaDialog', 'commonControllerConfig',
      function($scope, $rootScope, zhidaCommonTopicService, zhidaDialog, commonControllerConfig) {

        var SHOW_RESPONSE_ERROR_MESSAGE = cons.SHOW_RESPONSE_ERROR_MESSAGE;

        var errorMessageDialogInstance;

        function openResponseMessageDialog(messageOptions) {
          var message = messageOptions;
          var gLabels = commonControllerConfig.labels;
          var deferred, iconClass;
          if (angular.isObject(messageOptions)) {
            message = messageOptions.message;
            if (message == undefined) {
              if (messageOptions.data) {
                message = messageOptions.data.message
              } else {
                message = '当前请求失败，请重试。'
              }
            }
            deferred = messageOptions.modalResultDeferred;
            iconClass = messageOptions.iconClass;
          }
          var errorButtons = [{
            result: true,
            label: gLabels.BTN_OK,
            cssClass: 'btn btn-primary'
          }];

          function promiseResult(deferred, result) {
            if (deferred) {
              deferred.resolve({
                buttonResult: result,
                messageOptions: messageOptions
              });
            }
            errorMessageDialogInstance = null;
          }

          var dialogInstance = zhidaDialog.showMessageDialogSimple(gLabels.DIALOG_TITLE, message, errorButtons, messageOptions);
          dialogInstance.result.then(function(result) {
            promiseResult(deferred, result);
          }, function(dismiss) {
            promiseResult(deferred, dismiss);
          })

          return errorMessageDialogInstance;

        }

        zhidaCommonTopicService.subscribe(SHOW_RESPONSE_ERROR_MESSAGE, function(event, messageOptions) {
          if (errorMessageDialogInstance != null) {
            errorMessageDialogInstance.close(false);
            errorMessageDialogInstance = null;
          }
          if (angular.isString(messageOptions)) {
            messageOptions = {
              message: messageOptions
            }
          }
          messageOptions.iconClass = 'icon-no-2';
          openResponseMessageDialog(messageOptions);
        })
      }
    ])
  });
