/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.ListItemView}
 * http://r.local/nb/interactive-contract/public_html/sandbox-ListItemView.html
 */
krr.ui.ListItemView = function () {
    var view = document.createElement("li");
    view.setAttribute("class", "krr-li-view");
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var slider = document.createElement("div");
    slider.setAttribute("class", "slider");
    var caption = document.createElement("h3");
    caption.setAttribute("class", "caption");
    var del = document.createElement("div");
    del.setAttribute("class", "delete fa fa-trash-o");
//    del.innerHTML = "DELETE"; 
    var hold = document.createElement("div");
    hold.setAttribute("class", "selector fa fa-check-square-o");
//    hold.innerHTML = "HOLD";
    view.appendChild(container);
    container.appendChild(del);
    container.appendChild(hold);
    container.appendChild(slider);
    slider.appendChild(caption);

    var beforeSlideGeometry = {dx: 0}; // geometry
    //desctop
    var beforeSlide = (e) => {
        beforeSlideGeometry.dx = e.clientX - (parseInt(window.getComputedStyle(slider, null).getPropertyValue("left")), 10);
        //console.log(before.dx);
    };
    var duringSlide = (e) => {
        var l = e.clientX - beforeSlideGeometry.dx;
        slider.style.left = l + "px";
    };
    var afterSlide = (e) => {
        krr.ui.fx.animate({element: slider, property: "left", to: 0, suffix: "px", duration: 0.5, style: "easeOutBounce"});//  easeOutQuint
    };
    slider.addEventListener('mousedown', (e) => {
        beforeSlide(e);
        function start(e) {
            duringSlide(e);
        }
        function stop(e) {
            window.removeEventListener('mousemove', start, false);
            window.removeEventListener('mouseup', stop, false);
            afterSlide(e);
        }
        window.addEventListener('mousemove', start, false);
        window.addEventListener('mouseup', stop, false);
    }, false);


    // ==========================
    // ipad
    var beforeFingerSlide = (e) => {
        this.onlog("before");
        beforeSlideGeometry.dx = e.targetTouches[0].pageX - (parseInt(window.getComputedStyle(slider, null).getPropertyValue("left")), 10);
        //console.log(before.dx);
    };
    var duringFingerSlide = (e) => {
        this.onlog("during");
        var l = e.targetTouches[0].pageX - beforeSlideGeometry.dx;
        slider.style.webkitTransform = 'translate(' + l + 'px, ' + 0 + 'px)';

//e.targetTouches[0].target.style.webkitTransform = 'translate(' + l + 'px, ' + 0 + 'px)';
        //slider.style.left = l + "px";
    };
    var afterFingerSlide = (e) => {
        this.onlog("after");
    };
    slider.addEventListener('touchstart', (e) => {
        beforeFingerSlide(e);
        function start(e) {
            duringFingerSlide(e);
        }
        function stop(e) {
            window.removeEventListener('touchmove', start, false);
            window.removeEventListener('touchend', stop, false);
            afterFingerSlide(e);
        }
        window.addEventListener('touchmove', start, false);
        window.addEventListener('touchend', stop, false);
    }, false);

    slider.addEventListener('touchmove', (e) => {
        this.onlog("touchmove");
    }, false);
    // ==========================




    slider.addEventListener('click', (e) => {
        this.onlog("click");
    }, false);

    this.onlog; // debug output
    this.onDelete;
    this.onHold;

    this.setCaption = function (html) {
        caption.innerHTML = html;
    };

    hold.addEventListener("click", (e) => {
        console.log("hold");
        if (this.onHold && this.onHold === 'function') {
            this.onHold();

        }
    });

    del.addEventListener("click", (e) => {
        console.log("delete");
        if (this.onDelete && this.onDelete === 'function') {
            this.onDelete();
        }
    });

    this.highlight = function () {
        slider.style.backgroundColor = "rgb(80,80,80)";
    };
    this.unhighlight = function () {
        slider.style.backgroundColor = "rgb(60,60,60)";
    };


    this.element = view;

};