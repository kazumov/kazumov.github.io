/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.SidePanelView}
 */
krr.ui.SidePanelView = function () {
    var thisPanelView = this;
    var minWidth = 48;
    var maxWidth = 400;
    var visible;
    var ICON_CLOSE = "&#x2573;";// "x"
    var ICON_CLOSE_ = "&#x2716;";// "x"
    var ICON_OPEN = "&#x25b7;";// ">"
    var ICON_OPEN__ = "&#x27e9;";// "⟩"
    var ICON_OPEN_ = "&#x25ba;";// "⟩"


    var panel = document.createElement("div");
    panel.setAttribute("class", "dsp");
    var close = document.createElement("div");
    close.setAttribute("class", "close");
    close.innerHTML = ICON_CLOSE;
    var contentArea = document.createElement("div");
    contentArea.setAttribute("class", "content-area");
    contentArea.style.display = "none"; // initial state = invisible
    var navigator = document.createElement("div");
    navigator.setAttribute("class", "navigator");

    panel.appendChild(navigator);
    panel.appendChild(close);
    panel.appendChild(contentArea);


    var show = function () {
        krr.ui.fx.animate({
            element: panel,
            property: "width",
            from: minWidth + 1,
            to: maxWidth,
            suffix: "px",
            duration: 0.2,
            style: "easeOutBounce",
            onBefore: () => {
                contentArea.style.display = "block";
                navigator.style.display = "none";
            },
            onAfter: () => {
                visible = true;
                close.innerHTML = ICON_CLOSE;
                fireOnResize();
            },
            onChange: (v) => {
                fireOnResize();
            }});
    };

    var hide = function () {
        krr.ui.fx.animate({
            element: panel,
            property: "width",
            from: maxWidth,
            to: minWidth + 1,
            suffix: "px",
            duration: 0.2,
            style: "easeOutBounce",
            onBefore: () => {
                contentArea.style.display = "none";
            },
            onAfter: () => {
                visible = false;
                close.innerHTML = ICON_OPEN;
                navigator.style.display = "block";
                fireOnResize();
            },
            onChange: () => {
                fireOnResize();
            }});
    };

    var hideNoAnimation = function () {
        panel.style.width = minWidth + "px";
        visible = false;
        close.innerHTML = ICON_OPEN;
        fireOnResize();
    };

    var toggle = function () {
        if (visible) {
            hide();
        } else {
            show();
        }
    };

    var fireOnResize = () => {
        if (typeof this.onResize === "function") {
            var left = parseInt(window.getComputedStyle(panel, null).getPropertyValue("left"), 10);
            var width = parseInt(window.getComputedStyle(panel, null).getPropertyValue("width"), 10);
            this.onResize({width: width, left: left});
        }
    };

    this.isVisible = function () {
        return(visible);
    };

    this.element = panel;
    this.container = contentArea;
    this.onResize;

    Object.defineProperties(this, {
        "left": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("left"), 10));
            },
            set: function (value) {
                panel.style.left = value;
                fireOnResize();
            }
        },
        "width": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("width"), 10));
            },
            set: function (value) {
                panel.style.width = value;
                fireOnResize();
            }
        },
        "title": {
            get: function () {
                return(navigator.innerHTML);
            },
            set: function (value) {
                navigator.innerHTML = value;
            }
        }
    });

    hideNoAnimation();

    close.addEventListener("click", () => {
        toggle();
    });
};