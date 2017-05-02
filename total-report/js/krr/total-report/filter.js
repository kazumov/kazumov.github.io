/* global krr */
/**
 * Filter class
 *
 * Creates filter for search in a source object
 * - words in source
 * @param {Mixed} options
 * @returns {krr.TotalReport.Filter}
 */
krr.TotalReport.Filter = function (options) {
	if(!options){}
	if(options instanceof String){}
	if(options instanceof Object){}
};

/**
*
*/
krr.TotalReport.Filter.prototype.createFromString = function (string) {
};

krr.TotalReport.Filter.prototype.isApplicableTo = function (source) {
};

/**
* Reflective method for the krr.TotalReport.Source object
*/
krr.TotalReport.Source.prototype.meetsRequirements = function (filter){
	return(filter.isApplicableTo(this));
};
