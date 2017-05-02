/* global krr */
krr.ui.EditorToolbarView = function () {
    var view = document.createElement("div");
        var slider = document.createElement("ul");
    var slideLeft = document.createElement("div");
    var slideRight = document.createElement("div");
    var frame = document.createElement("div");

    view.setAttribute("class", "tb");
    slider.setAttribute("class", "slider");
    slideLeft.setAttribute("class", "cmd-slide-l");
    slideRight.setAttribute("class", "cmd-slide-r");
    frame.setAttribute("class", "window");
    slideLeft.innerHTML = "&#x25c0;";
    slideRight.innerHTML = "&#x25b6;";


    view.appendChild(slideLeft);
    view.appendChild(frame);
    view.appendChild(slideRight);
    frame.appendChild(slider);


    var slide = (step) => {
        // slide...
        var left0 = parseInt(window.getComputedStyle(slider, null).getPropertyValue("left"), 10);
        var left1 = left0 + step;
        krr.ui.fx.animate({element: slider, property: "left", suffix: "px", from: left0, to: left1, duration: 0.2, onAfter: () => {
                // ... and bounse back
                var sliderWidth = parseInt(window.getComputedStyle(slider, null).getPropertyValue("width"), 10);
                var frameWidth = parseInt(window.getComputedStyle(frame, null).getPropertyValue("width"), 10);
                // if at the begining
                if (left1 > 1) {
                    krr.ui.fx.animate({element: slider, property: "left", suffix: "px", from: left1, to: 1, duration: 0.4});
                    return(0);
                }
                // if at the end
                if (( left1 + sliderWidth) < frameWidth) {
                    krr.ui.fx.animate({element: slider, property: "left", suffix: "px", from: left1, to: - (sliderWidth - frameWidth) - 2, duration: 0.4});
                }
            }});
    };

    slideLeft.addEventListener("click", () => {
        slide(-100);
    });
    slideRight.addEventListener("click", () => {
        slide(100);
    });

    this.element = view;
    this.container = slider;
};