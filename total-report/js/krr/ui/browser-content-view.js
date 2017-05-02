/* global krr */

krr.ui.BrowserContentView = function (options) {
    if (!options) {
        throw "A variable options is undefined.";
    }
    if (!options.hasOwnProperty("application")) {
        throw "An option 'application' is undefined.";
    }
    var contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("class", "browser-content");

    var listSources = new krr.ui.ListView();
    
    
    
    contentWrapper.appendChild(listSources.element);

    this.element = contentWrapper;
    this.container = this.element;
    this.searchString = undefined;
    this.searchResultsContainer = undefined;
    this.sourcesContainer = listSources.container;
    
};

krr.ui.BrowserContentView.prototype.loadGroupContent = function (id, content, onReady) {
    this.groups[id].replaceContent(content);
};

krr.ui.BrowserContentView.prototype.removeGroupContent = function (id, content, onReady) {
    this.groups[id].removeContent(content);
};


