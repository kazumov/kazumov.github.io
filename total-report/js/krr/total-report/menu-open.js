/* global krr */
krr.TotalReport.MenuSourceAsListItem = function(options){
    var m = new krr.ui.MenuSourceAsListItemView();
                m.addCommand("Preview", () => {
                });
                m.addGroup("Edit:");
                m.addCommand("Parameters", () => {
                });
                m.addCommand("Document", () => {
                });
                m.addCommand("Resource 'Main Table'", () => {
                });
                m.addCommand("Resource 'Timeline'", () => {
                });
                m.addCommand("Resource 'Logo'", () => {
                });
                m.addCommand("Script", () => {
                });
                m.addCommand("Signatures", () => {
                });
                m.addGroup("Source:");
                m.addCommand("Clone", () => {
                });
                m.addCommand("Delete", () => {
                });
                m.addCommand("Make Template", () => {
                });
    this.element = m.element;
};

