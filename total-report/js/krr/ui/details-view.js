/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.DetailsView}
 */
krr.ui.DetailsView = function () {
    var view = document.createElement("ul");
    var parts = {
        view: document.createElement("li"),
        navigator: document.createElement("div"),
        caption: document.createElement("h3"),
        container: document.createElement("ul")
    };
    var parameters = {
        view: document.createElement("li")
    };
    var menu = {
        view: document.createElement("li")
    };
    // assembling the PARTS section
    view.setAttribute("class", "dv");
    parts.view.setAttribute("class", "parts");
    parts.navigator.setAttribute("class", "nav");
    parts.caption.setAttribute("class", "caption");

    parts.caption.innerHTML = "PARTS";

    view.appendChild(parts.view);
    parts.view.appendChild(parts.navigator);
    parts.view.appendChild(parts.container);
    parts.navigator.appendChild(parts.caption);
    
    
    
    
    

    this.element = view;
    this.partsContainer = parts.container;
//    this.parametersContainer = parameters;
//    this.menuContainer = menu;
};

