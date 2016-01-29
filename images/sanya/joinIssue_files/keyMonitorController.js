'use strict';
define(['angular', '../controllers', 'common/helpers/responsePreHandler'],
  function(angular, controllerModule, responsePreHandler) {

    controllerModule.controller('keyMonitorController', keyMonitorController);

    keyMonitorController.$inject = ['$injector', 'monitorRequest'];

    function keyMonitorController($injector, monitorRequest) {
      var pageCtrl = this;
      pageCtrl.menus = [{
        'state': 'total',
        'name': '整体状况',
        'subMenus': [{
          'state': 'keyMonitor.visitIssue',
          'name': '渠道访问问题',
          'icon': 'icon1'
        }, {
          'state': 'keyMonitor.joinIssue',
          'name': '接入问题',
          'icon': 'icon2'
        }, {
          'state': 'keyMonitor.qualityIssue',
          'name': '质量问题',
          'icon': 'icon4'
        }]
      }, {
        'state': 'list',
        'name': '重点监控列表',
        'subMenus': [{
          'state': 'keyMonitor.visitIssue',
          'name': '在线重点监控列表',
          'icon': 'icon1'
        }, {
          'state': 'keyMonitor.visitIssue',
          'name': '重点监控待上线列表',
          'icon': 'icon2'
        }, {
          'state': 'keyMonitor.visitIssue',
          'name': '重点监控已下线列表',
          'icon': 'icon3'
        }]
      }];
    }
  });
