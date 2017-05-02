/* global krr */
krr.ui.MarkdownEditorView = function (){
    var view = document.createElement("div");
    view.setAttribute("class", "mde");
    var toolbar = document.createElement("div");
        toolbar.setAttribute("class", "tb");
    var editor = document.createElement("textarea");
    editor.setAttribute("class", "textarea");
    
    view.appendChild(toolbar);
    view.appendChild(editor);
    
    this.element = view;
};

