/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.ToolbarView}
 */
krr.ui.ToolbarView = function () {
    var position = "none";
    var tb = document.createElement("div");
    var commands = document.createElement("div");// ul
    var mask = document.createElement("div");
    var fadeoutLeft = document.createElement("div");
    var fadeoutRight = document.createElement("div");

    tb.appendChild(mask);
    mask.appendChild(commands);
    tb.appendChild(fadeoutLeft);
    tb.appendChild(fadeoutRight);

    mask.setAttribute("class", "mask mask-with-sliders");
    commands.setAttribute("class", "commands");


    var checkFadeoutsVisibility = () => {
        if (mask.scrollLeft > 1) {
            fadeoutLeft.setAttribute("class", "fadeout-left visible");
        } else {
            fadeoutLeft.setAttribute("class", "fadeout-left invisible");
        }

        if (mask.clientWidth + mask.scrollLeft < mask.scrollWidth) {
            fadeoutRight.setAttribute("class", "fadeout-right visible");
        } else {
            fadeoutRight.setAttribute("class", "fadeout-right invisible");
        }

    };
    mask.addEventListener("scroll", (e) => {
        checkFadeoutsVisibility();
    });



    Object.defineProperties(this, {"position": {
            set: (pos) => {
                var classes = {bottom: "tb bottom", top: "tb top", none: "tb"};
                if (classes.hasOwnProperty(pos)) {
                    position = pos;
                    tb.setAttribute("class", classes[pos]);
                }
            }, get: () => {
                return(position);
            }
        }});

    Object.defineProperties(this, {"element": {
            get: () => {
                return(tb);
            }
        }});

    Object.defineProperties(this, {"container": {
            get: () => {
                return(commands);
            }
        }});

    this.position = position;// default position is "none"
    fadeoutRight.setAttribute("class", "fadeout-right");
};

krr.ui.ToolbarView.prototype.addCommand = function (parameters) {
    if (!parameters) {
        throw "An argument is undefined";
    }
    if (!parameters.hasOwnProperty("type")) {
        throw "A property 'type' is undefined";
    }
    if (["icon", "text"].indexOf(parameters.type) === -1) {
        throw "A property 'type' have an unexpected value";
    }
    if (!parameters.hasOwnProperty("callback") || !(typeof parameters.callback === 'function')){
        throw "A property 'callback' is undefined or not a function";
    }
    var cmd = document.createElement("div");
    if (parameters.type === "text" && parameters.hasOwnProperty("caption")) {
        cmd.setAttribute("class", "command command-text");
        cmd.innerHTML = parameters.caption;
    } else if (parameters.type === "icon" && parameters.hasOwnProperty("icon")) {
        cmd.setAttribute("class", "command command-icon");
        cmd.innerHTML = "<i class=\"fa fa-" + parameters.icon + "\"></i>";
    }
    this.container.appendChild(cmd);
    cmd.addEventListener("click", parameters.callback);
};