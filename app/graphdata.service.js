"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Roman on 10.08.2017.
 */
var core_1 = require("@angular/core");
var data_ts_1 = require("../data.ts");
var http_service_ts_1 = require("./http.service.ts");
var log_service_ts_1 = require("./log.service.ts");
var GraphDataService = (function () {
    function GraphDataService(httpService, logService) {
        this.httpService = httpService;
        this.logService = logService;
        this.rooms = [
            { name: "livingroom" },
            { name: "kitchen" },
            { name: "bedroom" },
            { name: "bathroom" },
            { name: "playroom" }
        ];
    }
    GraphDataService.prototype.getRooms = function () {
        return this.rooms;
    };
    //getRoomName(index: number = 1): Rooms[]{
    //return this.rooms[index - 1];
    //}
    GraphDataService.prototype.addRooms = function (name) {
        this.rooms.push(new data_ts_1.Rooms(name));
    };
    GraphDataService.prototype.generateData = function (seriesRooms, dataPoints) {
        if (seriesRooms === void 0) { seriesRooms = 1; }
        if (dataPoints === void 0) { dataPoints = 12; }
        this.logService.write("!-----Генерация данных");
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
    GraphDataService.prototype.getData = function () {
        var _this = this;
        this.logService.write("!-----Запрос данных в httpService");
        return this.httpService.requestData().subscribe(function (data) { return _this.test = data.json(); });
    };
    return GraphDataService;
}());
GraphDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_service_ts_1.HttpService !== "undefined" && http_service_ts_1.HttpService) === "function" && _a || Object, typeof (_b = typeof log_service_ts_1.LogService !== "undefined" && log_service_ts_1.LogService) === "function" && _b || Object])
], GraphDataService);
exports.GraphDataService = GraphDataService;
var _a, _b;
//# sourceMappingURL=graphdata.service.js.map