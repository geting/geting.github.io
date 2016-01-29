define(['app', 'angular'], function(app, angular) {
  'use strict';

  app.provider('zhidaDialogConfig', function() {
    var defaultConfig = {
      defaultButtonConfig: [{
        result: true,
        label: '确定',
        cssClass: 'btn-primary'
      }, {
        result: false,
        label: '取消',
        cssClass: 'btn-default'
      }]
    };

    return {

      setButtonLabels: function(labels) {
        angular.forEach(defaultConfig.defaultButtonConfig, function(item, index) {
          item.label = labels[index]
        })
      },

      setProviderOptions: function(options) {
        angular.extend(defaultConfig, options);
      },

      $get: function() {
        return defaultConfig;
      }
    }
  })


  app.factory('zhidaDialog', ['$rootScope', '$modal', '$modalStack', 'zhidaDialogConfig',
    function($rootScope, $modal, $modalStack, zhidaDialogConfig) {

      var showDialog = function(dialogOptions) {
        var defaultOptions = {
          backdrop: 'static' //controls presence of a backdrop. Allowed values: true (default), false (no backdrop), 'static' - backdrop is present but modal window is not closed when clicking outside of the modal window.
            //
        }
        var options = angular.extend({}, defaultOptions, dialogOptions)
        var dialogInstance = $modal.open(options);
        return dialogInstance;
      };

      /**
       * wrapper for showDialog, show bootstrap dialog using url and callback function.
       * @param url String path of dialog template.
       * @param callback function inject function with parameter $scope.
       * @param passedObject: object. need be inject to the scope as one properties or parameters. It can be accessed by scope._passedObject
       * If you want to customize dialog class, using passedObject.windowClass properties.
       * @returns {}
       */
      var showDialogByUrl = function(url, callback, passedObject) {
        var modalInstance;
        var locChangeHandler;
        var options = {
          templateUrl: url,
          resolve: {
            passedObject: function() {
              return passedObject;
            }
          },
          controller: ['$scope', '$modalInstance', '$rootScope', '$modalStack', 'passedObject',
            function($scope, $modalInstance, $rootScope, $modalStack, passedObject) {

              locChangeHandler = $scope.$on('$locationChangeSuccess', function closeDialogOnLocationChangeSuccess() {
                if (modalInstance && $scope._dialogShow == true) {
                  $scope.close(false)
                }
              });
              var iconClass = 'icon-warning-2'
              if (passedObject != undefined && passedObject.iconClass) {
                iconClass = passedObject.iconClass;
              }
              var iconColor = 'text-warning';
              if (passedObject != undefined && passedObject.iconColor) {
                iconColor = passedObject.iconColor;
              }
              $scope.iconClass = iconClass + ' ' + iconColor;
              // $scope.iconColor = iconColor;
              $scope._passedObject = passedObject;
              $scope._dialogShow = true;
              $scope.close = function(result) {
                $scope._dialogShow = false;
                $modalInstance.close(result);
                modalInstance = null;
              };
              if (angular.isFunction(callback)) {
                callback($scope)
              }
            }
          ]
        }
        if (passedObject && passedObject.windowClass) {
          options.windowClass = passedObject.windowClass;
        }
        modalInstance = showDialog(options);

        var unbindHandler = function(result) {
          if (locChangeHandler) {
            locChangeHandler();
          }
          return result;
        }

        modalInstance.result.then(function(result) {
          return unbindHandler(result);
        }, function(dismiss) {
          return unbindHandler(dismiss);
        })
        return modalInstance;
      };

      /**
       * open one message dialog, use can pass the title
       * @param options
       * @param callback
       */
      var showMessageDialog = function(options, callback, passedObject) {
        var url = 'template/message.html';
        var defaultButtons = zhidaDialogConfig.defaultButtonConfig;
        callback = callback || options.callback;
        passedObject = passedObject || options.passedObject;
        var buttons = options.buttons || defaultButtons;

        var innerCallback = function(scope) {
          scope.title = options.title;
          scope.message = options.message;
          scope.buttons = buttons;

          scope.eventHandler = function(resultName) {
            scope.close(resultName);
          }

          if (angular.isFunction(callback)) {
            callback(scope);
          }
        }
        return showDialogByUrl(url, innerCallback, passedObject);
      }

      /**
       *
       * @param title: the title of the message box.
       * @param message: the content of message box can be html.
       * @param buttons: the buttons group for message box. !!!Make sure the result property unique.
       * @returns {Array|*|result|result|Object|result}
       */
      var showMessageDialogSimple = function(title, message, buttons, passedObject) {
        return showMessageDialog({
          title: title,
          message: message,
          buttons: buttons,
          passedObject: passedObject
        })
      }

      return {
        showDialog: showDialog,
        showDialogByUrl: showDialogByUrl,
        showMessageDialog: showMessageDialog,
        showMessageDialogSimple: showMessageDialogSimple
      };
    }
  ]);
})
