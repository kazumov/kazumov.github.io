/* global krr */
/**
 * @param {Object} options
 * @type    {String}    options.url     - url of storage interface
 * @returns {krr.TotalReport.Application}
 */
krr.TotalReport.Application = function (options) {
    //var theApplicationWindow = new krr.ui.WebAppication({application: this});
    var layout = new krr.ui.LayoutView();
//    this.browserContainer = layout.browserContainer;
    this.reportContainer = layout.reportContainer;
    this.editorContainer = layout.editorContainer;
    this.detailsContainer = layout.detailsContainer;
    this.editorTitle = layout.editorTitle;
    this.hideEditor = function () {
        layout.editorElement.style.display = "none";
    };
    this.showEditor = function () {
        layout.editorElement.style.display = "block";
    };
    this.twitter = new krr.TotalReport.Twitter();

    /** @todo different editors for different parts */
    var parametersEditor = new krr.TotalReport.ParametersEditor({application: this});
    layout.editorContainer.appendChild(parametersEditor.element);

    /** @todo implement multiple databases */
    this.db = new krr.TotalReport.Database({application: this, storageUrl: options.url});
    this.db.list();// initial reading list of sources from the database

//    this.theBrowser = new krr.TotalReport.Browser({application: this});

    var browser = new krr.ui.BrowserContentView({application: this});
    layout.browserContainer.appendChild(browser.element);
    
    var details = new krr.TotalReport.Details({application: this});
    layout.detailsContainer.appendChild(details.element);
    
    var sources = {}, source, sourceView;
    this.twitter.subscribe((message) => {
        // builds list of sources
        if (message.type === "sourcesArrayFromDatabase") {
            for (var i = 0; i < message.content.length; i++) {
                if (sources[message.content[i]]) {// source exists
                    // refresh from database
                    sources[message.content[i]].refresh();
                }
                var id = message.content[i];
                var sourceView = new krr.TotalReport.SourceAsListItem({sourceId: id, application: this});
                sources[id] = {};
                sources[id]["view"] = sourceView;
                browser.sourcesContainer.appendChild(sources[id].view.element);
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
    this.twitter.tweet({type: "needSourcesListFromDatabase"});





};

window.onload = function (e, undefined) {
    krr.TotalReport.Application({url: "files.php"});
};