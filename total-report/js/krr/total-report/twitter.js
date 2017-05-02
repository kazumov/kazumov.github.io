/* global krr */
/**
 * The internal events sharing system
 * @returns {krr.TotalReport.EventsTwitter}
 */
krr.TotalReport.Twitter = function () {
    this.listeners = {};
};

/**
 * Adds subscriber
 * @param {function(Object)} listener   - A callback function
 * @returns {Function} callback function for unsubscribe
 */
krr.TotalReport.Twitter.prototype.subscribe = function (listener) {
    if (!(typeof listener === 'function')) {
        throw {id: 1001, description: "The listener is not a callback function as expected."};
    }
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    this.listeners[id] = listener;
    return(() => {
        delete this.listeners[id];
    });
};
/**
 * Shares event between subscribers
 * @param {Object} message
 */
krr.TotalReport.Twitter.prototype.tweet = function (message) {
    if(!message){
        throw "Message is empty. Nothing to share.";
    }
    if(!message.hasOwnProperty("type") || !(typeof message.type === "string")){
        throw "Message should have a 'type' parameter type of String";
    }
    //console.log("Just twitted message: ", message.type, " to " , (Object.keys(this.listeners)).length, " subscribers.");
    var listenerId;
    for (listenerId in this.listeners) {
        this.listeners[listenerId](message);
    }
};
/*
krr.TotalReport.Dispatcher.prototype.stringHash = function (inputString) {
    var hash = 0, i, chr;
    if (inputString.length === 0)
        return hash;
    for (i = 0; i < inputString.length; i++) {
        chr = inputString.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return(hash);
};

krr.TotalReport.Dispatcher.prototype.arrayHash = function (inputArray) {
    return(stringHash(JSON.stringify(inputArray)));
};
*/