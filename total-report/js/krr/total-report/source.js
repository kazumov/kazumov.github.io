/* global krr */
/* global marked */

/** 
 * krr.TotalReport.Source class 
 * @param {Object} options - unique identifier
 */
krr.TotalReport.Source = function (options) {
    if(!options){
        throw "An options argument is undifined";
    }
    if(!options.hasOwnProperty("application")){
        throw "An application parameter is undefined";
    }
    this.options = options;
    if (!options.id) {// create new source
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        //console.log(id);
    } else {
        this.id = options.id;
        //theData.source(this.id, function(jsonString){
        /** @todo read string, convert to properties */
        //});
    }

    /**
     * @type {krr.TotalReport.Source.Parts}
     */
    this.content = {
        parts: {
            definition: {},
            document: {},
            signatures: {},
            resources: {}
        }
    };
    this.upload = function () {
        this.options.application.twitter.tweet({type: "sourceUploadToDatabase", content: this.content, sourceId: this.id});
    };

};

krr.TotalReport.Source.prototype.caption = function (caption) {
    if (!caption) {
        return(this.content.parts.definition["caption"]);
    }
    this.content.parts.definition["caption"] = caption;
};

krr.TotalReport.Source.prototype.encoding = function (encoding) {
    if (!encoding) {
        return(this.content.parts.definition["encoding"]);
    }
    this.content.parts.definition["encoding"] = encoding;
};

krr.TotalReport.Source.prototype.templates = function (templates) {
    if (!templates) {
        return(this.content.parts.definition["templates"]);
    }
    this.content.parts.definition["templates"] = templates;
};

krr.TotalReport.Source.prototype.PMIDocumentType = function (documentType) {
    if (!documentType) {
        return(this.content.parts.definition["PMIDocumentType"]);
    }
    this.content.parts.definition["PMIDocumentType"] = documentType;
};

krr.TotalReport.Source.prototype.variable = function (arguments) {
    if (!arguments.formula) {
        return(this.content.parts.definition[arguments.id]);
    }
    this.content.parts.definition[arguments.id] = {value: arguments.value, formula: arguments.formula, type: arguments.type};
};

krr.TotalReport.Source.prototype.project = function (project) {
    if (!project) {
        return(this.content.parts.definition['project']);
    }
    this.content.parts.definition['project'] = project;
};

krr.TotalReport.Source.prototype.markdown = function (md) {
    if (!md) {
        return(this.content.parts.document['content']);
    }
    this.content.parts.document['encoding'] = "utf-8";
    this.content.parts.document['contentType'] = "markdown";
    this.content.parts.document['markdownDialect'] = "generic";
    this.content.parts.document['content'] = md;
};


krr.TotalReport.Source.prototype.toHTML = function () {
    var thisSource = this;
    var html = "";
    var evaluateMarkdown = function (md) {
        var parameters = thisSource.content.parts.definition;
        /** @todo pretend all parameters evaluated and now have the String type */
        var evaluatedMarkdown = md.replace(/[{]{2,3}\s*([a-z_0-9.]+)\s*[}]{2,3}/gi, function (match, parameterName) {
            if (!parameters[parameterName]) {
                parameters[parameterName] = "[ ERROR: Parameter " + parameterName + " is undefined ]";
            }
            return(parameters[parameterName]);
        });
        return(evaluatedMarkdown);
    };

    var markdownToHTML = function (md) {
//        var html = "";
        return(marked(md, {
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        }));


        /** @todo pretend all lines of text are <p>paragraphs</p> */
//        var lines = md.split("\n");
//        lines.forEach(function(line){
//            html = html + "\n<p>" + line + "</p>";
//        });
//        return(html);
    };

    if (this.content.parts.document['contentType'] === "markdown") {
        var evaluatedMarkdown = evaluateMarkdown(this.content.parts.document['content']);
        return(markdownToHTML(evaluatedMarkdown));
    }
    return("<p>Nothing to return %(</p>");
};

krr.TotalReport.Source.prototype.refreshFromDatabase = function(){
    var app = this.options.application;
    var id = this.id;
    app.twitter.tweet({type: "getSource", sourceId: id});
};
