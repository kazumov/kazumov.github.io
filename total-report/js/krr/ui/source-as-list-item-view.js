/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.SourceAsListItemView}
 */
krr.ui.SourceAsListItemView = function () {
    var view = document.createElement("li");
    view.setAttribute("class", "sali");
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var slider = document.createElement("div");
    slider.setAttribute("class", "slider");
    var caption = document.createElement("h3");
    caption.setAttribute("class", "caption");
    var del = document.createElement("div");
    del.setAttribute("class", "delete");
    del.innerHTML = "DELETE";
    var hold = document.createElement("div");
    hold.setAttribute("class", "selector");
    hold.innerHTML = "HOLD";
    view.appendChild(container);
    container.appendChild(del);
    container.appendChild(hold);
    container.appendChild(slider);
    slider.appendChild(caption);
    
    this.onDelete;
    this.onHold;
    
    this.setCaption = function (html) {
        caption.innerHTML = html;
    };

    hold.addEventListener("click", (e) => {
        if (this.onHold && this.onHold === 'function') {
            this.onHold();
        }
    });
    
    del.addEventListener("click", (e) => {
        if (this.onDelete && this.onDelete === 'function') {
            this.onDelete();
        }
    });
    
    this.highlight = function (){
        slider.style.backgroundColor = "rgb(80,80,80)";
    };
    this.unhighlight = function (){
        slider.style.backgroundColor = "rgb(60,60,60)";
    };
    
    
    this.element = view;

};