/* global krr */
krr.TotalReport.ParametersEditor = function (options) {
    if (!options) {
        throw "An argument is undefined";
    }
    if (!options.hasOwnProperty("application")) {
        throw "A property 'applications' is undefined";
    }
    var sourceId;
    var partId;
    var edit = new krr.ui.ParametersEditorView();
    var toolbarContainer = edit.toolbarContainer;
    var textEditor = edit.editor;

    var appendInsertionCommand = function (caption, text) {
        var cmd = new krr.ui.EditorToolbarCommandView();
        cmd.command.innerHTML = caption;
        cmd.command.addEventListener("click", () => {
            textEditor.value = textEditor.value + "\n" + text;
        });
        toolbarContainer.appendChild(cmd.element);
    };


    var cmdAddString = new krr.ui.EditorToolbarCommandView("String", () => {
        textEditor.value = textEditor.value + "\n{\"parameter_id\": {\"value\": \"Propaganda\", \"type\": \"String\"}}";
    });

    appendInsertionCommand("Number", "{\"parameter_id\": {\"value\": 1, \"type\": \"Number\"}}");
    appendInsertionCommand("Text", "text");
    appendInsertionCommand("Date", "date");
    appendInsertionCommand("Amount", "amount");
    appendInsertionCommand("Date->Amount", "date->amount");
    appendInsertionCommand("Group->Date->Amount", "group->date->amount");

    /** @todo reformat json */

    /*
     * @todo add commands
     * @todo add listener
     * @todo add load/unload
     */
    
//    this.content = (text) => {
//        if (text) {
//            textEditor.value = text;
//        } else {
//            return(textEditor.value);
//        }
//    };
    
    options.application.twitter.subscribe((message)=>{
        if(message.type === "editPart"){
            textEditor.value = JSON.stringify(message.content, undefined, 4);
            sourceId = message.sourceId;
            partId = message.partId;
        }
    });
    
    this.element = edit.element;
//    this.content("test");
};