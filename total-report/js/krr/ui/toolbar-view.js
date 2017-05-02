/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.ToolbarView}
 */
krr.ui.ToolbarView = function () {
    var arrows = {unicode: {left: "&#x25c0;", right: "&#x25b6;", class: {left: "slide left", right: "slide right"}}, awesome: {left: "", right: "", class: {left: "slide left fa fa-chevron-left", right: "slide left fa fa-chevron-right"}}},
            position = "none",
            scrollWithButtons = true,
            scrollWithSlider = true,
            fadeouts = true;
    var tb = document.createElement("div");
//    var slider = document.createElement("div");
    var left = document.createElement("div");
    left.innerHTML = arrows.unicode.left;
    var right = document.createElement("div");
    right.innerHTML = arrows.unicode.right;
    var commands = document.createElement("div");// ul
    var mask = document.createElement("div");
    var fadeoutLeft = document.createElement("div");
    var fadeoutRight = document.createElement("div");


    var t;
    for (var i = 0; i < 20; i++) {

        t = document.createElement("div");// li
        t.setAttribute("class", "command");
        commands.appendChild(t);
        t.innerHTML = "some command";

    }

    tb.appendChild(left);
    tb.appendChild(mask);
//    mask.appendChild(slider);
    mask.appendChild(commands);
    tb.appendChild(right);
    tb.appendChild(fadeoutLeft);
    tb.appendChild(fadeoutRight);

    left.setAttribute("class", arrows.unicode.class.left);
    right.setAttribute("class", arrows.unicode.class.right);
    mask.setAttribute("class", "mask mask-with-sliders");
//    slider.setAttribute("class", "slider");
    commands.setAttribute("class", "commands");
//    fadeoutLeft.setAttribute("class", "fadeout-left");
//    fadeoutRight.setAttribute("class", "fadeout-right");


//    var sliderLeft = () => {
//        return(parseInt(window.getComputedStyle(slider).getPropertyValue("left"), 10));
//    };
//    var sliderWidth = () => {
//        return(parseInt(window.getComputedStyle(slider).getPropertyValue("width"), 10));
//    };
//    var maskWidth = () => {
//        return(parseInt(window.getComputedStyle(mask).getPropertyValue("left"), 10));
//    };
    var checkFadeoutsVisibility = () => {
//        console.log(mask.scrollLeft, sliderWidth(), maskWidth());
//        console.log(mask.clientWidth, mask.scrollWidth, mask.scrollLeft);
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
//    var lastSliderLeft = slider.scrollLeft;
    mask.addEventListener("scroll", (e) => {
//        var l = e.target.scrollLeft;
//        console.log(e);
        checkFadeoutsVisibility();

//        doorCloser

//        if (l > lastSliderLeft) {
////            console.log("<-");
//        } else {
////            console.log("->");
//        }
//        lastSliderLeft = l;
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

    this.scrollWithArrows = true;
    this.scrollWithMouse = true;
    this.scrollWithFinger = true;
    this.arrowsFontAwesome = false;
    this.arrowsUnicode = true;
    this.fadeouts = true;



    this.position = position;// default position is "none"

    fadeoutRight.setAttribute("class", "fadeout-right");
};

