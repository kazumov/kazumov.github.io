/* global krr */
krr.ui.ListView = function () {
    var list = document.createElement("ul");
    list.setAttribute("class", "list");
    this.element = list;
    this.container = this.element;
};