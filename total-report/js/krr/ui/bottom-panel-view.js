/* global krr */
krr.ui.BottomPanelView = function () {
    var thisPanelView = this;
    var minHeight = 48;
    var maxHeight = 400;
    var visible;
    var ICON_CLOSE = "&#x2573;";// "x"
    var ICON_CLOSE_ = "&#x2716;";// "x"
    var ICON_OPEN = "&#x25b3;";// "^"

    var panel = document.createElement("div");
    panel.setAttribute("class", "bp");
//    var caption = document.createElement("div");
//    caption.setAttribute("class", "caption");
    var close = document.createElement("div");
    close.setAttribute("class", "close");
    close.innerHTML = ICON_CLOSE;
    var contentArea = document.createElement("div");
    contentArea.setAttribute("class", "content-area");
    var navigator = document.createElement("div");
    navigator.setAttribute("class", "navigator");

    panel.appendChild(navigator);
//    panel.appendChild(caption);
    panel.appendChild(close);
    panel.appendChild(contentArea);


    var show = function () {
        krr.ui.fx.animate({
            element: panel,
            property: "height",
            from: minHeight + 1,
            to: maxHeight,
            suffix: "px",
            duration: 0.2,
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
            property: "height",
            from: maxHeight,
            to: minHeight + 1,
            suffix: "px",
            duration: 0.2,
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
        panel.style.height = minHeight + "px";
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
            var height = parseInt(window.getComputedStyle(panel, null).getPropertyValue("height"), 10);
            this.onResize({left: left, width: width, height: height});
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
        "height": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("height"), 10));
            },
            set: function (value) {
                panel.style.height = value;
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
    fireOnResize();
    close.addEventListener("click", () => {
        toggle();
    });

};

