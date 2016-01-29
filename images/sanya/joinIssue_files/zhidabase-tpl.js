angular.module('zhidabase.tpl', ['scripts/views/about.html', 'scripts/views/keyMonitor/keyMonitor.html', 'scripts/views/keyMonitor/visitIssue.html']);

angular.module("scripts/views/about.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/views/about.html",
    "<p>{{about.words}}</p><div zhida-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/views/keyMonitor/keyMonitor.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/views/keyMonitor/keyMonitor.html",
    "<div id=\"wrapper\"><div id=\"sidebar\"><div class=\"left-main-nav\" ng-repeat-start=\"menu in keyMonitor.menus\">{{menu.name}}</div><ul class=\"left-nav-list\" ng-repeat-end ng-repeat=\"subMenu in menu.subMenus\"><li class=\"list {%if $directory=='question'&&$controller=='visit'&&$function=='index'%}on{%/if%}\"><a ui-sref=\"{{subMenu.state}}({})\" class=\"\"><em class=\"icon\" ng-class=\"subMenu.icon\"></em>{{subMenu.name}}</a></li></ul></div><div id=\"container\" ui-view=\"keyMonitorContent\"></div></div>");
}]);

angular.module("scripts/views/keyMonitor/visitIssue.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/views/keyMonitor/visitIssue.html",
    "<div class=\"jumbotron\" style=\"margin-top:80px\">{{visitIssue.response}} <span class=\"text-muted\" source-text=\"aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnn\" zhida-truncate-text></span></div>");
}]);
