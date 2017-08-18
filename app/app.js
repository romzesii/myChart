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
var data_ts_1 = require("../data.ts");
var data_service_ts_1 = require("./data.service.ts");
var http_service_ts_1 = require("./http.service.ts");
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
    function App(dataService, httpService) {
        this.dataService = dataService;
        this.httpService = httpService;
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
        this.realTimeData = true;
        this.newTime = 0;
        this.timeline = true;
        this.test = [];
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
        // line, area
        this.autoScale = true;
        Object.assign(this, { single: data_ts_1.single, multi: data_ts_1.multi });
        //this.rooms = rooms;
        //this.dataService.generateData(count);
    }
    //todo update data
    App.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(this.updateData.bind(this), 4000);
        //console.log(this.httpService.getData());
        //this.httpService.getData().subscribe((data)=>this.test=data);
        this.httpService.getData()
            .subscribe(function (data) { return _this.test = data; }, function (error) { _this.error = error; console.log(error); });
        //console.log(this.httpService.getData().subscribe((data)=>this.test=data));
    };
    App.prototype.updateData = function () {
        console.log('--------updateData()');
        if (!this.realTimeData) {
            return;
        }
        /*
        let date = new Date();
        date.setMonth(date.getMonth() + this.newTime);
        this.newTime++;
        for (const series of this.dateData) {
            series.series.push({
                name: date,
                value: Math.floor(50 + Math.random() * 50)
            });
        }
        */
        //this.dateData = [...this.dateData];
        //this.multi = generateData(4);
        this.multi = this.dataService.generateData(5);
        console.log(this.multi);
        //let newData = {};
        //newData.name = new Date(2017, this.update, 1);
        //newData.value = randTemp;
        //this.multi[0]['series'].push(newData);
        //this.update++;
        //console.log(this.multi);
    };
    App.prototype.onSelect = function (event) {
        console.log(event);
    };
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [data_service_ts_1.DataService, http_service_ts_1.HttpService],
        template: "\n    <ngx-charts-line-chart\n      [view]=\"view\"\n      [scheme]=\"colorScheme\"\n      [results]=\"multi\"\n      [gradient]=\"gradient\"\n      [xAxis]=\"showXAxis\"\n      [yAxis]=\"showYAxis\"\n      [legend]=\"showLegend\"\n      [timeline]=\"timeline\"\n      [showXAxisLabel]=\"showXAxisLabel\"\n      [showYAxisLabel]=\"showYAxisLabel\"\n      [xAxisLabel]=\"xAxisLabel\"\n      [yAxisLabel]=\"yAxisLabel\"\n      [autoScale]=\"autoScale\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-line-chart>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof data_service_ts_1.DataService !== "undefined" && data_service_ts_1.DataService) === "function" && _a || Object, typeof (_b = typeof http_service_ts_1.HttpService !== "undefined" && http_service_ts_1.HttpService) === "function" && _b || Object])
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