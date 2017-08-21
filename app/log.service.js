/**
 * Created by Roman on 18.08.2017.
 */
"use strict";
var LogService = (function () {
    function LogService() {
    }
    LogService.prototype.write = function (logMessage) {
        console.log(">>>");
        console.log(logMessage);
    };
    return LogService;
}());
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map