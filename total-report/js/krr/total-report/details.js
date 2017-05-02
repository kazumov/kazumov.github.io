/* global krr */
krr.TotalReport.Details = function (options) {
    if (!options) {
        throw "A class constructor argument is undefined";
    }
    if (!options.hasOwnProperty("application")) {
        throw "An parameter 'application' is undefined";
    }

    var sourceId;
    var view = new krr.ui.DetailsView();
    var partButton;

    options.application.twitter.subscribe((message)=>{
        if(message.type === "sourceSelected"){
            sourceId = message.sourceId;
            var parts = message.content.parts;
            view.partsContainer.innerHTML = "";// clean list
            for(var partId in parts){
                partButton = document.createElement("li");
                partButton.xData = {sourceId: sourceId, partId: partId, content: parts[partId]};
                view.partsContainer.appendChild(partButton);
                partButton.innerHTML = partId;
                partButton.addEventListener("click", function(){
                    options.application.twitter.tweet({type: "editPart", sourceId: this.xData.sourceId, partId: this.xData.partId, content: this.xData.content});
//                    console.log(this.xData.partId);
                });
            }
        }
    });
    
    this.element = view.element;
};

// @todo fix RESOURCE definiton in the loop
// create part object