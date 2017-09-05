/**
 * Created by Roman on 08.08.2017.
 */
//our root app component
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
var core_1 = require("@angular/core");
var rooms_ts_1 = require("../rooms.ts");
var graphdata_service_ts_1 = require("./graphdata.service.ts");
var log_service_ts_1 = require("./log.service.ts");
/*

 import { FormsModule } from '@angular/forms';
 //import { HttpModule }  from '@angular/http';
 import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
 import {NgxChartsModule} from '@swimlane/ngx-charts';


 //import { HttpService} from '../app/http.service.ts';
 //import { Response} from '@angular/http';

 //import { AppModule } from '../app/app.module.ts';
 */
var AppComponent = (function () {
    function AppComponent(graphDataService, logService) {
        this.graphDataService = graphDataService;
        this.logService = logService;
        this.view = [700, 400];
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Day';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Temperature';
        this.update = 0;
        this.realTimeData = false;
        this.newTime = 0;
        this.timeline = false;
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
        // line, area
        this.autoScale = true;
        this.title = 'Line Chart by Roman';
        Object.assign(this, { single: rooms_ts_1.single, multi: rooms_ts_1.multi });
        //this.rooms = rooms;
        //this.dataService.generateData(count);
    }
    AppComponent.prototype.turnOnUpdateMode = function () {
        this.realTimeData = true;
    };
    AppComponent.prototype.turnOnRequestMode = function () {
        this.realTimeData = false;
    };
    AppComponent.prototype.requestByTopic = function (value) {
        console.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E \u0442\u043E\u043F\u0438\u043A\u0443 " + value);
    };
    //todo update data
    AppComponent.prototype.ngOnInit = function () {
        this.logService.write("Инициализация компонента App");
        setInterval(this.updateData.bind(this), 4000);
        this.logService.write('requestData()');
        this.requestData();
        //this.apiResponseSubscription = this.graphDataService.getData().subscribe((response) => {
        //console.debug(response);
        //this.multi = response;
        //console.log(this.multi);
        //});
        //this.httpService.getData().subscribe((data: Response) => this.test = data.json());
        //this.httpService.getData()
        //this.multi = this.graphDataService.getData(); //todo getData() method
        //console.log(this.httpService.getData().subscribe((data)=>this.test=data));
    };
    AppComponent.prototype.ngOnDestroy = function () {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    };
    AppComponent.prototype.requestData = function () {
        var _this = this;
        this.apiResponseSubscription = this.graphDataService.getData().subscribe(function (response) {
            //console.debug(response);
            _this.multi = response;
            _this.logService.write(_this.multi);
        });
    };
    AppComponent.prototype.updateData = function () {
        //this.logService.write('updateData()');
        console.log('------update data');
        if (!this.realTimeData) {
            return;
        }
        this.multi = this.graphDataService.generateData();
        this.logService.write(this.multi);
        //console.log(this.multi);
    };
    AppComponent.prototype.onSelect = function (event) {
        console.log(event);
        this.requestData();
        //this.graphDataService.addRooms('lalala'); //
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['../app/app.component.css'],
        providers: [graphdata_service_ts_1.GraphDataService, log_service_ts_1.LogService],
        template: "\n    <div class=\"app\">{{title}}{{realTimeData ? ' in update mode' : ' in request mode'}}</div>\n    <button (click)=\"turnOnUpdateMode()\">Update/Generate</button>\n    <button (click)=\"turnOnRequestMode()\">HTTP Request</button>\n    <div>\n        <input type=\"text\" #topic>\n        <button (click)=\"requestByTopic(topic.value)\">\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E \u0442\u043E\u043F\u0438\u043A\u0443</button>\n    </div>\n    <ngx-charts-line-chart\n      [view]=\"view\"\n      [scheme]=\"colorScheme\"\n      [results]=\"multi\"\n      [gradient]=\"gradient\"\n      [xAxis]=\"showXAxis\"\n      [yAxis]=\"showYAxis\"\n      [legend]=\"showLegend\"\n      [timeline]=\"timeline\"\n      [showXAxisLabel]=\"showXAxisLabel\"\n      [showYAxisLabel]=\"showYAxisLabel\"\n      [xAxisLabel]=\"xAxisLabel\"\n      [yAxisLabel]=\"yAxisLabel\"\n      [autoScale]=\"autoScale\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-line-chart>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof graphdata_service_ts_1.GraphDataService !== "undefined" && graphdata_service_ts_1.GraphDataService) === "function" && _a || Object, typeof (_b = typeof log_service_ts_1.LogService !== "undefined" && log_service_ts_1.LogService) === "function" && _b || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a, _b;
/*
 @NgModule({
 imports: [ BrowserModule, BrowserAnimationsModule, NgxChartsModule, FormsModule ],
 declarations: [ App ],
 bootstrap: [ App ]
 })
 export class AppModule {}
 */
//# sourceMappingURL=app.component.js.map