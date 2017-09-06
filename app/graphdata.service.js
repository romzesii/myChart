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
var http_1 = require("@angular/http");
//import {HttpService} from './http.service.ts';
var log_service_ts_1 = require("./log.service.ts");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var GraphDataService = (function () {
    function GraphDataService(logService, http) {
        this.logService = logService;
        this.http = http;
        this.rooms = [
            { name: "livingroom" },
            { name: "kitchen" },
            { name: "bedroom" },
            { name: "bathroom" },
            { name: "playroom" }
        ];
        this.requestUrl = 'data.json';
        this.requestBtcUrl = 'http://localhost:1880/btc/v1/';
        this.requestDevUrl = 'http://localhost:5000/btc/v1/';
    }
    GraphDataService.prototype.getRooms = function () {
        return this.rooms;
    };
    //getRoomName(index: number = 1): Rooms[]{
    //return this.rooms[index - 1];
    //}
    GraphDataService.prototype.addRooms = function (name) {
        this.rooms = this.rooms.concat([name]);
    };
    GraphDataService.prototype.generateData = function (seriesRooms, dataPoints) {
        if (seriesRooms === void 0) { seriesRooms = this.rooms.length; }
        if (dataPoints === void 0) { dataPoints = 12; }
        this.logService.write("Генерация данных");
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
    GraphDataService.prototype.getData = function (req) {
        var headers = new http_1.Headers();
        //headers.append('Access-Control-Allow-Headers', 'Content-Type');
        //headers.append('Access-Control-Allow-Methods', 'GET');
        //headers.append('Access-Control-Allow-Origin', '*');
        this.logService.write('graphDataService...Отправка http запроса');
        //return this.http.get(this.requestBtcUrl, {headers: headers}).map((res:Response) => res.json());
        return this.http.get(this.requestBtcUrl.concat(req)).map(function (res) { return res.json(); });
        //return this.http.post(this.requestBtcUrl, req).map((res:Response) => res.json());
        // return this.http.get(this.requestUrl).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    };
    return GraphDataService;
}());
GraphDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof log_service_ts_1.LogService !== "undefined" && log_service_ts_1.LogService) === "function" && _a || Object, http_1.Http])
], GraphDataService);
exports.GraphDataService = GraphDataService;
var _a;
//# sourceMappingURL=graphdata.service.js.map