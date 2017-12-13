/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var bemPrefixRegex= /^--|__/;

	function bemClassNames (prefix, prefixRegex) {
		var regex = prefixRegex;
		var prfx = prefix || '';
		if (regex && !regex instanceof RegExp) {
			throw Error('regex argument not a RegExp');
		}
		if (!regex) {
			regex = bemPrefixRegex;
		}

		function classNames () {
			var classes = [];

			function pushClass(key) {
				if (regex.test(key)) {
					key = prfx + key;
				}
				classes.push(key);
			}

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					pushClass(arg);
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						pushClass(inner);
					}
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							pushClass(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		return classNames;
	}




	if (typeof module !== 'undefined' && module.exports) {
		bemClassNames.default = bemClassNames;
		module.exports = bemClassNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('bem-classnames', [], function () {
			return bemClassNames;
		});
	} else {
		window.bemClassNames = bemClassNames;
	}
}());
