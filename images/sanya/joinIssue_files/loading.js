define(['app','spinjs'],function(app,Spinner){
	app
	.directive('zhidaLoading',function(){
		return {
			restrict : 'A',
			replace : true,
			link : function($scope, $el, $attrs){
				var presets = {
					'12': { lines: 8, length: 1, width: 2, radius: 3 },
					'16': { lines: 8, length: 2, width: 2, radius: 4 },
					'24': { lines: 9, length: 3, width: 3, radius: 6 },
					'32': { lines: 9, length: 4, width: 4, radius: 8 },
					'40': { lines: 10, length: 6, width: 4, radius: 10 },
					'48': { lines: 10, length: 6, width: 5, radius: 13 },
					'64': { lines: 12, length: 10, width: 5, radius: 16 }
				}
				var opt = presets[$attrs['size']] || presets[16];
				opt['zIndex'] = 99;
				var spinner = new Spinner(opt).spin($el[0]);
			}
		}
	})
})