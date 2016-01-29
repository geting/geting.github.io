'use strict';

define(['app', 'angular'], function(app, angular) {
  /**
   * 将特殊字符转成html标签
   * @param element
   * @param value
   * @returns {*|Progress|XMLList|String}
   */
  function htmlDecode(value) {
    return angular.element('<div/>').html(value).text();
  }

  /**
   * 将html的特殊字符<>转换为html。
   * @param element
   * @param value
   * @returns {*}
   */
  function htmlEncode(value) {
    return angular.element('<div/>').text(value).html();
  }
  /**
   * truncate long text and append with ..., it will only show if the length is bigger than the passed attribute textLength.
   * and substring the long text with a popover property.
   * <span class="text-muted" source-text="{{text}}" zhida-truncate-text></span>
   */
  app.provider('zhidaTruncateTextConfig', function() {
      var defaultConfig = {
        copyText: false,
        textLength: 12
      };

      return {
        config: function(conf) {
          if (conf) {
            defaultConfig.copyText = conf.copyText;
            defaultConfig.textLength = conf.textLength;
          }
        },

        $get: function() {
          return defaultConfig;
        }
      }
    })
    .directive('zhidaTruncateText', ['$compile', '$sanitize', 'zhidaTruncateTextConfig',
      function($compile, $sanitize, zhidaTruncateTextConfig) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            var textLength = attrs.textLength || 12;
            if (!attrs.textLength) {
              textLength = zhidaTruncateTextConfig.textLength
            }
            var copyText = attrs.copyText || false;
            if (copyText != true && copyText != 'true') {
              var copyTextConfig = zhidaTruncateTextConfig.copyText;
              copyText = copyTextConfig;
            }
            var trigger = attrs.trigger || 'mouseenter';
            var popoverPlacement = attrs.popoverPlacement || 'top';
            attrs.$observe('sourceText', function(sourceText) {
              if (sourceText) {
                sourceText = sourceText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                var encodeSourceText = htmlDecode(sourceText);
                if (encodeSourceText.length > textLength) {
                  var subStrText = encodeSourceText.substr(0, textLength);
                  if (subStrText.length < encodeSourceText.length) {
                    subStrText += '...'
                  }
                  subStrText = htmlEncode(subStrText);
                  sourceText = sourceText.replace(/["]/g, '&quot;');

                  element.html('<span popover-trigger="' + trigger + '" popover-placement="' + popoverPlacement +
                      '"  popover="' + sourceText + '">' + subStrText + '</span>');
   
                  $compile(element.contents())(scope);
                } else {
                  element.text(encodeSourceText);
                }
              }
            })
          }
        }
      }
    ])
});
