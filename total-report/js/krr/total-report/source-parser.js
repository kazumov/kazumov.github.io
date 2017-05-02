/* global krr */
/**
 * SourceParser class
 * 
 * Parses source from database, separates parts, extracts parameters, 
 * preproceses variables, anchors, indexes, links to anchors
 * 
 * @param {String} source - multipart MIME text source 
 */
krr.TotalReport.SourceParser = function (source) {
    if (!source) {
        var source = "";
    }

    var evaluateSource = function () {
        parts.evaluatedSource = parts.source.replace(/\{\{([^}]+)\}\}/g, function (match, parameter) {
            if (!parts.parameters[parameter]) {
                error_index = error_index + 1;
                var errorId = error_index;
                errors.push({error: "Undefined parameter " + parameter,
                    reference: errorId
                });
                return("REFERENCE_ERROR_" + errorId);
            } else {
                return(parts.parameters[parameter]);
            }
        });
    };

    var theParser = this;
    evaluateSource();

    this.preview = function () {
        return(parts.evaluatedSource);
    };
};


