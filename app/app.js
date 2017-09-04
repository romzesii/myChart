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
var App = (function () {
    function App(graphDataService, logService) {
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
        Object.assign(this, { single: rooms_ts_1.single, multi: rooms_ts_1.multi });
        //this.rooms = rooms;
        //this.dataService.generateData(count);
    }
    //todo update data
    App.prototype.ngOnInit = function () {
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
    App.prototype.ngOnDestroy = function () {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    };
    App.prototype.requestData = function () {
        var _this = this;
        this.apiResponseSubscription = this.graphDataService.getData().subscribe(function (response) {
            //console.debug(response);
            _this.multi = response;
            _this.logService.write(_this.multi);
        });
    };
    App.prototype.updateData = function () {
        //this.logService.write('updateData()');
        console.log('------update data');
        if (!this.realTimeData) {
            return;
        }
        this.multi = this.graphDataService.generateData(5);
        this.logService.write(this.multi);
        //console.log(this.multi);
    };
    App.prototype.onSelect = function (event) {
        console.log(event);
        this.requestData();
        this.graphDataService.addRooms('lalala');
    };
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [graphdata_service_ts_1.GraphDataService, log_service_ts_1.LogService],
        template: "\n    <ngx-charts-line-chart\n      [view]=\"view\"\n      [scheme]=\"colorScheme\"\n      [results]=\"multi\"\n      [gradient]=\"gradient\"\n      [xAxis]=\"showXAxis\"\n      [yAxis]=\"showYAxis\"\n      [legend]=\"showLegend\"\n      [timeline]=\"timeline\"\n      [showXAxisLabel]=\"showXAxisLabel\"\n      [showYAxisLabel]=\"showYAxisLabel\"\n      [xAxisLabel]=\"xAxisLabel\"\n      [yAxisLabel]=\"yAxisLabel\"\n      [autoScale]=\"autoScale\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-line-chart>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof graphdata_service_ts_1.GraphDataService !== "undefined" && graphdata_service_ts_1.GraphDataService) === "function" && _a || Object, typeof (_b = typeof log_service_ts_1.LogService !== "undefined" && log_service_ts_1.LogService) === "function" && _b || Object])
], App);
exports.App = App;
var _a, _b;
/*
 @NgModule({
 imports: [ BrowserModule, BrowserAnimationsModule, NgxChartsModule, FormsModule ],
 declarations: [ App ],
 bootstrap: [ App ]
 })
 export class AppModule {}
 */
//# sourceMappingURL=app.js.map