/* global krr */
krr.ui.ParametersEditorView = function (){
    var view = document.createElement("div");
    view.setAttribute("class", "pe");
    var toolbar = new krr.ui.EditorToolbarView();
    var textEditor = document.createElement("textarea");// temporary
    textEditor.setAttribute("class", "editor");// temporary
    
    view.appendChild(toolbar.element);
    view.appendChild(textEditor);
    
    this.element = view;
    this.toolbarContainer = toolbar.container;
    this.editor = textEditor;// temporary
};

