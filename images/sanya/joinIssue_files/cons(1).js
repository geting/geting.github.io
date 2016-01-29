'use strict';
/**
 * 常量配置, 采用require.js而非angularjs来实例化。
 * 提供更简单的调用方式和声明方式。
 *
 * 请遵循常量的命名规则
 */
define([], function() {
  var RESPONSE_CODE = {
    /**
     * 控制台公共的返回成功的代码。
     */
    SUCCESS: '200',
    /**
     * Session timeout 的值。可以通过覆盖的方法避免。
     */
    SESSION_TIMEOUT: '-99',

    NEED_LOGIN: '-100',

    HTTP_SUCCESS: 200
  }

  return {
    /**
     * 主要的view 路径
     */
    VIEW_PATH: 'scripts/views/',
    /**
     * 主要的Partials view的路径
     */
    PARTIALS_PATH: 'scripts/partials/',
    /**
     * 公共的弹出error Message的Event名称
     */
    SHOW_RESPONSE_ERROR_MESSAGE: 'showResponseErrorMessage',

    RESPONSE_CODE: RESPONSE_CODE,

    /**
     * 全局的Session Timeout 事件。
     */
    COMMON_SESSION_TIMEOUT: 'zhidaConsoleSessionTimeout'
  };

})
