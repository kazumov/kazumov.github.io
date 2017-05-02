/* global krr */
krr.ui.EditorToolbarCommandView = function(){
        var cmd = document.createElement("li");
        cmd.setAttribute("class", "command");
        var caption = document.createElement("span");
        caption.setAttribute("class", "caption");
        
        cmd.appendChild(caption);
        
        this.element = cmd;
        this.command = caption;
};
