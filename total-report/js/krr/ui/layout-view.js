/* global krr */
/**
 * @version "Coder"
 * @version 0.2
 * @returns {krr.ui.LayoutView}
 */
krr.ui.LayoutView = function () {
    var container = document.createElement("div");
    container.setAttribute("class", "app");

    var browser = new krr.ui.SidePanelView();
    var details = new krr.ui.SidePanelView();
    var report = new krr.ui.BottomPanelView();
    var part = new krr.ui.PartView();
    //var editorParameters = new krr.ui.ParametersEditorView();
    /** @todo content editor */

    var transformPartView = () => {
        part.top = "0px";
        part.left = details.left + details.width + "px";
        part.width = "calc(100% - " + part.left + "px)";
        part.height = "calc(100% - " + report.height + "px)";
    };

    browser.title = "SOURCES LIST";
    details.title = "DETAILS";
    report.title = "REPORT";
    part.title = "PART";

    container.appendChild(browser.element);
    container.appendChild(details.element);
    container.appendChild(report.element);
    container.appendChild(part.element);
    //part.parametersEditorContainer.appendChild(editorParameters.element);
    /** @todo content editor */

    document.body.appendChild(container);//?

    browser.onResize = (g) => {
        details.left = g.width + g.left + "px";
        report.left = g.width + g.left + details.width + "px";
        report.width = "calc(100% - " + (details.left + details.width) + "px)";
        transformPartView();
    };

    details.onResize = (g) => {
        report.left = g.width + g.left + "px";
        report.width = "calc(100% - " + (g.left + g.width) + "px)";
        transformPartView();
    };

    report.onResize = (g) => {
        transformPartView();
    };

    this.browserContainer = browser.container;
    this.detailsContainer = details.container;
    this.reportContainer = report.container;
    this.editorElement = part.element;
    this.editorContainer = part.container;
    this.editorTitle = part.navigator;
    // editor title
    // editor buttons
    // editor textareas...


    details.left = browser.left + browser.width + "px";
    report.left = details.left + details.width + "px";
    transformPartView();

    this.addPropertyEditorCommand = function (html, onClick) {
        var cmd = new krr.EditorToolbarCommand();
        cmd.caption = html;
        cmd.onClick = onClick;
    };
};