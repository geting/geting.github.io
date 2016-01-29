'use strict';
/**
 * 常量配置, 采用require.js而非angularjs来实例化。
 * 提供更简单的调用方式和声明方式。
 *
 * 请遵循常量的命名规则
 */
define([], function() {

  return {
    /**
     * 主要的view 路径
     */
    VIEW_PATH: 'scripts/views/',
    /**
     * 主要的Partials view的路径
     */
    PARTIALS_PATH: 'scripts/partials/'
  };

})
