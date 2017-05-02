/* global krr, HTMLElement */

/**
 * Animates the changing of the style property
 * 
 * @param {HTMLElement} element
 * @param {String} property
 * @param {Number} from_value
 * @param {Number} to_value
 * @param {String} suffix
 * @param {Number} duration
 * @param {Function(void)} afterAnimation
 */
krr.ui.fx.animateChangeStyleProperty = function (element, property, from_value, to_value, suffix, duration, afterAnimation) {
    var quad = function (progress) {
        return (Math.pow(progress, 2));
    };
    var start = new Date;
    var interval = setInterval(function () {
        var timePassed = new Date - start;
        var progress = timePassed / (duration * 1000);
        if (progress > 1) {
            progress = 1;
        }
        element.style[property] = from_value + (to_value - from_value) * quad(progress) + suffix;
        if (progress === 1) {
            clearInterval(interval);
            if (afterAnimation) {
                afterAnimation();
            }
        }
    }, 10);
};
/**
 * Animates a defined in parameters style property of the HTMLElement
 * @param {Object} parameters
 * @type {HTMLElement} parameters.element
 * @type {String} parameters.property
 * @type {Number} [parameters.from = <current style property value>]
 * @type {Number} [parameters.to = 0]
 * @type {String} [parameters.suffix = ""]
 * @type {Function} [parameters.onBefore = undefined]
 * @type {Function} [parameters.onChange = undefined]
 * @type {Function} [parameters.onAfter = undefined]
 * @type {Number} [parameters.duration = 1.0]
 * @type {String} [parameters.style = "easeInQuad"]         An animation function name
 * @returns {krr.ui.fx.animate | void}
 */
krr.ui.fx.animate = function (parameters) {
    if (!parameters) {
        throw new TypeError("An argument is undefined.");
    }

    var EasingFunctions = {
        // no easing, no acceleration
        linear: function (t) {
            return t;
        },
        // accelerating from zero velocity
        easeInQuad: function (t) {
            return t * t;
        },
        // decelerating to zero velocity
        easeOutQuad: function (t) {
            return t * (2 - t);
        },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        // accelerating from zero velocity 
        easeInCubic: function (t) {
            return t * t * t;
        },
        // decelerating to zero velocity 
        easeOutCubic: function (t) {
            return (--t) * t * t + 1;
        },
        // acceleration until halfway, then deceleration 
        easeInOutCubic: function (t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        // accelerating from zero velocity 
        easeInQuart: function (t) {
            return t * t * t * t;
        },
        // decelerating to zero velocity 
        easeOutQuart: function (t) {
            return 1 - (--t) * t * t * t;
        },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) {
            return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        // accelerating from zero velocity
        easeInQuint: function (t) {
            return t * t * t * t * t;
        },
        // decelerating to zero velocity
        easeOutQuint: function (t) {
            return 1 + (--t) * t * t * t * t;
        },
        // acceleration until halfway, then deceleration 
        easeInOutQuint: function (t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        },
        // elastic bounce effect at the beginning
        easeInElastic: function (t) {
            return (.04 - .04 / t) * Math.sin(25 * t) + 1;
        },
        // elastic bounce effect at the end
        easeOutElastic: function (t) {
            return .04 * t / (--t) * Math.sin(25 * t);
        },
        // elastic bounce effect at the beginning and end
        easeInOutElastic: function (t) {
            return (t -= .5) < 0 ? (.01 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
        },
        easeInSin: function (t) {
            return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
        },
        easeOutSin: function (t) {
            return Math.sin(Math.PI / 2 * t);
        },
        easeInOutSin: function (t) {
            return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
        },
        easeInExpo: function (t) {
            if (t === 0) {
                return 0;
            }
            return Math.pow(2, 10 * (t - 1));
        },
        easeOutExpo: function (t) {
            if (t === 1) {
                return 1;
            }
            return (-Math.pow(2, -10 * t) + 1);
        },
        easeInOutExpo: function (t) {
            if (t === 0 || t === 1) {
                return t;
            }
            var scaledTime = t * 2;
            var scaledTime1 = scaledTime - 1;
            if (scaledTime < 1) {
                return 0.5 * Math.pow(2, 10 * (scaledTime1));
            }
            return 0.5 * (-Math.pow(2, -10 * scaledTime1) + 2);
        },
        easeOutBounce: function (t) {
		if ( t < (1/2.75)) {
			return (7.5625*t*t);
		} else if (t < (2/2.75)) {
			return (7.5625*(t-=(1.5/2.75))*t + .75);
		} else if (t < (2.5/2.75)) {
			return (7.5625*(t-=(2.25/2.75))*t + .9375);
		} else {
			return (7.5625*(t-=(2.625/2.75))*t + .984375);
		}
	}
    };


    var element = (parameters.hasOwnProperty("element") && (parameters.element instanceof HTMLElement)) ? parameters.element : (() => {
        throw new TypeError("A parameter 'element' is not a DOMElement");
    })(),
            property = (parameters.hasOwnProperty("property") && typeof parameters.property === "string") ? parameters.property : (() => {
        throw new TypeError("A parameter 'property' is not a CSSProperty name");
    })(),
            fromValue = (parameters.hasOwnProperty("from") && typeof parameters.from === "number") ? parameters.from : parseInt(window.getComputedStyle(element).getPropertyValue(property), 10),
            toValue = (parameters.hasOwnProperty("to") && typeof parameters.to === "number") ? parameters.to : 0,
            suffix = (parameters.hasOwnProperty("suffix") && typeof parameters.suffix === "string") ? parameters.suffix : "",
            duration = (parameters.hasOwnProperty("duration") && typeof parameters.duration === "number") ? parameters.duration : 1.0,
            beforeAnimation = (parameters.hasOwnProperty("onBefore") && typeof parameters.onBefore === "function") ? parameters.onBefore : undefined,
            duringAnimation = (parameters.hasOwnProperty("onChange") && typeof parameters.onChange === "function") ? parameters.onChange : undefined,
            afterAnimation = (parameters.hasOwnProperty("onAfter") && typeof parameters.onAfter === "function") ? parameters.onAfter : undefined,
            fn = (parameters.hasOwnProperty("style") && typeof parameters.style === "string" && EasingFunctions.hasOwnProperty(parameters.style)) ? EasingFunctions[parameters.style] : EasingFunctions.easeInQuad;

    var start = new Date;
    var interval = setInterval(function () {
        var timePassed = new Date - start;
        var progress = timePassed / (duration * 1000);
        if (progress > 1) {
            progress = 1;
        }
        element.style[property] = fromValue + (toValue - fromValue) * fn(progress) + suffix;
        if (duringAnimation) {
            duringAnimation(progress);
        }
        if (progress === 1) {
            clearInterval(interval);
            if (afterAnimation) {
                afterAnimation();
            }
        }
    }, 10);
    if (beforeAnimation) {
        beforeAnimation();
    }
};