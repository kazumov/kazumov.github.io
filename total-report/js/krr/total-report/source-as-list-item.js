/* global krr */
krr.TotalReport.SourceAsListItem = function (options) {
    if (!options) {
        throw "An 'options' argument is undefined ";
    }
    if (!options.hasOwnProperty("application")) {
        throw "An 'application' parameter is undefined";
    }
    if (!options.hasOwnProperty("sourceId")) {
        throw "An 'sourceId' is undefined";
    }
    
    var sourceContent;
    var listItem = new krr.ui.SourceAsListItemView();
    listItem.element.addEventListener("click", () => {
        listItem.highlight();
        options.application.twitter.tweet({type: "sourceSelected", sourceId: options.sourceId, content: sourceContent});
    });
    var caption, parameters;

    options.application.twitter.subscribe((message) => {
        if (message.type === "sourceFromDatabase" && message.sourceId === options.sourceId) {
            sourceContent = message.content.content;
            parameters = sourceContent.parts.definition;
            caption = (parameters.hasOwnProperty("caption")) ? parameters.caption : "(No caption)";
            listItem.setCaption(parameters.caption);
        }
        if (message.type === "sourceSelected" && message.sourceId !== options.sourceId) {
            listItem.unhighlight();
        }
    });

    options.application.twitter.tweet({type: "needSourceFromDatabase", sourceId: options.sourceId});

    this.element = listItem.element;
};

