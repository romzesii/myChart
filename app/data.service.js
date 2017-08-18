"use strict";
/**
 * Created by Roman on 10.08.2017.
 */
var data_ts_1 = require("../data.ts");
var DataService = (function () {
    function DataService(httpService) {
        this.httpService = httpService;
        this.rooms = [
            { name: "livingroom" },
            { name: "kitchen" },
            { name: "bedroom" },
            { name: "bathroom" },
            { name: "playroom" }
        ];
    }
    DataService.prototype.getRooms = function () {
        return this.rooms;
    };
    //getRoomName(index: number = 1): Rooms[]{
    //return this.rooms[index - 1];
    //}
    DataService.prototype.addRooms = function (name) {
        this.rooms.push(new data_ts_1.Rooms(name));
    };
    DataService.prototype.generateData = function (seriesRooms, dataPoints) {
        if (seriesRooms === void 0) { seriesRooms = 1; }
        if (dataPoints === void 0) { dataPoints = 12; }
        var results = [];
        var domain = [];
        for (var j = 0; j < dataPoints; j++) {
            domain.push(new Date(2017, j, 1));
        }
        for (var i = 0; i < seriesRooms; i++) {
            var series = {
                name: this.getRooms()[i].name,
                series: []
            };
            for (var j = 0; j < domain.length; j++) {
                var value = Math.floor(50 + Math.random() * 50); // temperature from 50 to 100.
                var timestamp = domain[j];
                series.series.push({
                    value: value,
                    name: timestamp
                });
            }
            results.push(series);
        }
        //console.log(results);
        return results;
    };
    DataService.prototype.getData = function () {
    };
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map