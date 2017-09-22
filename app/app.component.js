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
//import { DatePickerOptions, DateModel } from 'ng2-datepicker';
/*

 import { FormsModule } from '@angular/forms';
 //import { HttpModule }  from '@angular/http';
 import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
 import {NgxChartsModule} from '@swimlane/ngx-charts';


 //import { HttpService} from '../app/http.service.ts';
 //import { Response} from '@angular/http';

 //import { AppModule } from '../app/app.module.ts';
 */
//interface Topic {
//topicName: string;
//}
var AppComponent = (function () {
    function AppComponent(graphDataService, logService) {
        this.graphDataService = graphDataService;
        this.logService = logService;
        this.showTodayBtn = false;
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
        this.topic = '/kitchen/air/temperature';
        Object.assign(this, { single: rooms_ts_1.single, multi: rooms_ts_1.multi });
    }
    AppComponent.prototype.turnOnUpdateMode = function () {
        this.realTimeData = true;
    };
    AppComponent.prototype.turnOnRequestMode = function () {
        this.realTimeData = false;
    };
    AppComponent.prototype.requestByTopic = function (value) {
        console.log("\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E \u0442\u043E\u043F\u0438\u043A\u0443 " + value);
        this.requestData(value);
    };
    AppComponent.prototype.handleChangeTopic = function (value) {
        //this.topic = value.replace(/\s/g, '/');
        this.topic = value;
    };
    AppComponent.prototype.handleInput = function (event) {
        //this.topic = event.target.value;
    };
    AppComponent.prototype.onChangeTopics = function (name, isChecked) {
        if (isChecked) {
            this.logService.write('Add graphic ' + name);
            this.requestByTopic(name);
        }
        if (!isChecked) {
            this.logService.write('Remove graphic ' + name);
            var newMulti = this.multi.filter(function (item) {
                return item.name != name;
            });
            this.multi = newMulti;
        }
    };
    AppComponent.prototype.buildGraphic = function (data) {
        var newMulti = this.multi.concat(data[0]);
        this.multi = newMulti;
        console.log('построение графика' + this.multi);
    };
    //todo update data
    AppComponent.prototype.ngOnInit = function () {
        this.logService.write("Инициализация компонента App");
        setInterval(this.updateData.bind(this), 8000);
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.requestTopics();
    };
    AppComponent.prototype.ngOnDestroy = function () {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    };
    AppComponent.prototype.requestData = function (req) {
        var _this = this;
        if (this.fromDate && this.toDate && this.fromDate != '0,0,0' && this.toDate != '0,0,0') {
            req = req + '&from=' + this.fromDate + '&to=' + this.toDate;
        }
        this.apiResponseSubscription = this.graphDataService.getData(req).subscribe(function (response) {
            console.debug(response);
            //this.multi = response;
            _this.buildGraphic(response);
            console.log(response);
        });
    };
    AppComponent.prototype.requestTopics = function () {
        var _this = this;
        this.apiResponseSubscription = this.graphDataService.getTopics().subscribe(function (response) {
            console.log('The quantity of unique topics ' + response.length);
            //console.log(this.topicNames);
            var arr = [];
            for (var i = 0; i < response.length; i++) {
                //this.topicNames[i] = response[i];
                arr.push(response[i]);
            }
            _this.topicNames = arr;
            console.log(_this.topicNames);
        });
    };
    AppComponent.prototype.updateWithRange = function () {
        if (this.multi) {
            var newMulti = this.multi.slice();
            this.multi.length = 0;
            for (var _i = 0, newMulti_1 = newMulti; _i < newMulti_1.length; _i++) {
                var item = newMulti_1[_i];
                this.requestByTopic(item.name);
            }
        }
    };
    AppComponent.prototype.settingDateFrom = function (event) {
        console.log('setting up date range (From) for topic request' + event);
        console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        this.fromDate = event.date.year + ',' + event.date.month + ',' + event.date.day;
        if ((this.fromDate === '0,0,0' && this.toDate === '0,0,0') || (this.fromDate !== '0,0,0' && this.toDate !== '0,0,0')) {
            this.updateWithRange();
        }
    };
    AppComponent.prototype.settingDateTo = function (event) {
        console.log('setting up date range (To) for topic request');
        this.toDate = event.date.year + ',' + event.date.month + ',' + event.date.day;
        if ((this.fromDate === '0,0,0' && this.toDate === '0,0,0') || (this.fromDate !== '0,0,0' && this.toDate !== '0,0,0')) {
            this.updateWithRange();
        }
    };
    AppComponent.prototype.updateData = function () {
        //this.logService.write('updateData()');
        console.log('------update data');
        if (!this.realTimeData) {
            return;
        }
        this.multi = this.graphDataService.generateData();
        this.logService.write("\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0433\u0440\u0430\u0444\u0438\u043A\u0430 " + this.multi);
        //console.log(this.multi);
    };
    AppComponent.prototype.onSelect = function (event) {
        this.logService.write(event);
        //this.requestData();
        //this.graphDataService.addRooms('lalala'); //
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['../app/app.component.css'],
        providers: [graphdata_service_ts_1.GraphDataService, log_service_ts_1.LogService],
        template: "\n    <div class=\"container \">\n    <div class=\"app\" style=\"margin-bottom: 10px\">{{title}}{{realTimeData ? ' in update mode' : ' in request mode'}}</div>\n    <div class=\"row\">\n    <div class=\"col-md-8 col-sm-8 col-xs-12\">\n    <button (click)=\"turnOnUpdateMode()\" style=\"display: none\">Update/Generate</button>\n    <button (click)=\"turnOnRequestMode()\" style=\"display: none\">HTTP Request</button>\n    <button (click)=\"requestTopics()\">\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0442\u043E\u043F\u0438\u043A\u0438</button>\n    <button (click)=\"updateWithRange()\">\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043E \u0434\u0430\u0442\u0430\u043C</button>\n    <div style=\"display: none\">{{topic}}</div>\n    <div>\n        <input type=\"text\"\n            style=\"display: none\"\n            placeholder=\"/kitchen/air/temperature\"\n            #inputTopic\n            [ngModel] = \"topic\"\n            (ngModelChange)=\"handleChangeTopic($event)\">\n        <button (click)=\"requestByTopic(inputTopic.value)\" style=\"display: none\">\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E \u0442\u043E\u043F\u0438\u043A\u0443</button>\n    </div>\n    </div>\n        <div class=\"col-md-4 col-sm-4 col-sm-push-0 col-xs-12 \">\n            <date-picker (emitDate)=\"settingDateFrom($event)\">\u043E\u0442</date-picker>\n            <date-picker (emitDate)=\"settingDateTo($event)\"></date-picker>\n        </div>\n    </div>\n    <div class=\"row\">\n    <div class=\"col-md-12 col-sm-12\">\n    <ngx-charts-line-chart\n      [view]=\"view\"\n      [scheme]=\"colorScheme\"\n      [results]=\"multi\"\n      [gradient]=\"gradient\"\n      [xAxis]=\"showXAxis\"\n      [yAxis]=\"showYAxis\"\n      [legend]=\"showLegend\"\n      [timeline]=\"timeline\"\n      [showXAxisLabel]=\"showXAxisLabel\"\n      [showYAxisLabel]=\"showYAxisLabel\"\n      [xAxisLabel]=\"xAxisLabel\"\n      [yAxisLabel]=\"yAxisLabel\"\n      [autoScale]=\"autoScale\"\n      (select)=\"onSelect($event)\">\n    </ngx-charts-line-chart>\n    </div>\n    </div>\n        <div class=\"row\">\n            <div class=\"col-md-12 col-sm-12\">\n            <h5>\u0412\u0441\u0435 \u0442\u043E\u043F\u0438\u043A\u0438 \u0432 \u0431\u0430\u0437\u0435</h5>\n                <ol *ngFor=\"let item of topicNames; let i = index;\" class=\"topic\">\n                    {{i + 1}}: {{item}}\n                    <input type=\"checkbox\" (change)=\"onChangeTopics(item, $event.target.checked)\">\n                </ol>\n            </div>\n        </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof graphdata_service_ts_1.GraphDataService !== "undefined" && graphdata_service_ts_1.GraphDataService) === "function" && _a || Object, typeof (_b = typeof log_service_ts_1.LogService !== "undefined" && log_service_ts_1.LogService) === "function" && _b || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a, _b;
//# sourceMappingURL=app.component.js.map