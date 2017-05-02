/* global krr */
/**
 * 
 * @returns {krr.ui.SourceEditorPartView}
 */
krr.ui.PartView = function () {
    var panel = document.createElement("div");
    panel.setAttribute("class", "sep");
    var navigator = document.createElement("div");
    navigator.setAttribute("class", "nav");
    var container = document.createElement("div");
    container.setAttribute("class", "container");

    panel.appendChild(navigator);
    panel.appendChild(container);

    this.element = panel;
    this.container = container;

    Object.defineProperties(this, {
        "left": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("left"), 10));
            },
            set: function (value) {
                panel.style.left = value;
            }
        },
        "width": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("width"), 10));
            },
            set: function (value) {
                panel.style.width = value;
            }
        },
        "top": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("top"), 10));
            },
            set: function (value) {
                panel.style.top = value;
            }
        },
        "height": {
            get: function () {
                return(parseInt(window.getComputedStyle(panel, null).getPropertyValue("height"), 10));
            },
            set: function (value) {
                panel.style.height = value;
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



};