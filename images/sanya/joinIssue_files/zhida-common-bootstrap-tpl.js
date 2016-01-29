angular.module('zhida.common.bootstrap.tpl', ['template/message.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/popover/popover.html']);

angular.module("template/message.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/message.html",
    "<div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">{{ title }}</h5></div><div class=\"modal-body clearfix\"><div class=\"col-sm-1 text-center\"><span class=\"text-size-32\" ng-class=\"iconClass\"></span></div><div class=\"col-sm-11 breakall\"><p ng-bind-html=\"message\"></p></div></div><div class=\"modal-footer\"><button ng-repeat=\"btn in buttons\" ng-click=\"eventHandler(btn.result)\" class=\"btn\" ng-class=\"btn.cssClass\">{{ btn.label }}</button></div></div>");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" class=\"modal fade in {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\"><div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div></div>");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\"><div class=\"arrow\"></div><div class=\"popover-inner\"><h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3><div class=\"popover-content\" ng-bind=\"content\"></div></div></div>");
}]);
