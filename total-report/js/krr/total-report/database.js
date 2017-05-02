/* global krr */
/**
 * Database class
 * 
 * Interface to PHP storage system (file, MySQL, etc)
 * 
 * @param {Object} options
 * @returns {krr.TotalReport.Database}
 */
krr.TotalReport.Database = function (options) {
    if (!options || !options.storageUrl) {
        throw "Storage URL is undefined.";
    }
    if (!options.application) {
        throw "An option 'application' is undefined";
    }
    this.storageUrl = options.storageUrl;
    this.application = options.application;
    this.twitter = options.application.twitter;
    this.twitter.subscribe((message) => {
        if (message.type === "sourceDocumentUpdated" || message.type === "sourceUploadToDatabase" || message.type === "sourceDocumentCreated") {
            if (!message.sourceId) {
                throw "A message 'sourceId' parameter is undefined";
            }
            if (!message.content) {
                throw "A message 'content' parameter is undefined";
            }
            this.upload(message.sourceId, message.content);
        }
        if (message.type === "sourceDocumentDeleted") {
            /** @todo delete */
        }
        if (message.type === "needSourceFromDatabase") {
            if(!message.hasOwnProperty("sourceId")){throw "A 'sourceId' parameter is undefined ";}
            this.get(message.sourceId);
        }
    });
};

/**
 * Uploads source to database
 * @param {String} id
 * @param {krr.TotalReport.Source} source
 */
krr.TotalReport.Database.prototype.upload = function (id, source) {
    if (!id) {
        throw "The 'id' parameter is undefined.";
    }
    if (!source) {
        throw "The 'source' parameter is undefined.";
    }
    var twitter = this.twitter;
    var preparedToUploadSource = source;
    var request = new XMLHttpRequest();
    request.addEventListener("load", function (e) {
        twitter.tweet({type: "sourceUploaded", sourceId: id});
    });
    request.addEventListener("error", function (e) {
        twitter.tweet({type: "error", content: "Can not upload the source to database: " + request.statusText});
    });
    request.open("POST", this.storageUrl, true);
    request.responseType = "json";
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(
            {
                action: "upload",
                id: id,
                content: preparedToUploadSource
            }
    ));
};

/**
 * Returns the content of the source document.
 * @param {String} id                       - The source UUID in database
 */
krr.TotalReport.Database.prototype.get = function (id) {
    if (!id) {
        throw "The 'id' parameter is undefined.";
    }
    var twitter = this.twitter;
    var app = this.application;
    var request = new XMLHttpRequest();
    request.addEventListener("load", function (e) {
        var rawSource = JSON.parse(request.response.content);
        var source = new krr.TotalReport.Source({id: id, application: app});
        source.content = rawSource;
        twitter.tweet({type: "sourceFromDatabase", sourceId: id, content: source});
    });
    request.addEventListener("error", function (e) {
        twitter.tweet({type: "error", content: "Can not get the source from database: " + request.statusText});
    });
    request.open("POST", this.storageUrl, true);
    request.responseType = "json";
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(
            {
                action: "get",
                id: id
            }
    ));
};

/**
 * Gets array of sources ID's from the database
 */
krr.TotalReport.Database.prototype.list = function () {
    var request = new XMLHttpRequest();
    var twitter = this.twitter;
    request.addEventListener("load", function (e) {
        twitter.tweet({type: "sourcesArrayFromDatabase", content: request.response.list});
    });
    request.addEventListener("error", function (e) {
        twitter.tweet({type: "error", content: "Can not get the list of sources in database: " + request.statusText});
    });
    request.open("POST", this.storageUrl, true);
    request.responseType = "json";
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(
            {
                action: "list"
            }
    ));
};