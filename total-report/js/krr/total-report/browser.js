/* global krr */


/**
 * 
 * @param {Object} options
 *      {krr.TotalReport.Application} options.parent
 *      {krr.TotalReport.Data} data
 * @returns {krr.TotalReport.Browser}
 */
krr.TotalReport.Browser = function (options) {
    if (!options || !options.application) {
        throw "An option 'application' is undefined";
    }
//    var parent = options.application.container;
    var panel = new krr.ui.ParkedControlPanel({application: options.application});
    var content = new krr.ui.BrowserContentView({application: options.application});
    panel.setContent(content.element);
    // reading the list of sources from database
    var sources = {}, source, sourceView;
    options.application.twitter.subscribe((message) => {
        // builds list of sources
        if (message.type === "sourcesArrayFromDatabase") {
            for (var i = 0; i < message.content.length; i++) {
                if (sources[message.content[i]]) {// source exists
                    // refresh from database
                    sources[message.content[i]].refresh();
                }
                var id = message.content[i];
                var sourceView = new krr.TotalReport.SourceAsListItem({sourceId: id, application: options.application});
                sources[id] = {};
                sources[id]["view"] = sourceView;
                content.sourcesContainer.appendChild(sources[id].view.element);
            }
        }
        
        if (message.type === "a") {
        }
        if (message.type === "a") {
        }
        if (message.type === "a") {
        }
    }
    );
    options.application.twitter.tweet({type: "needSourcesListFromDatabase"});





};