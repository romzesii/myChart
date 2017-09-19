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
// other imports here...
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.myOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            minYear: 2017,
            maxYear: 2036,
            satHighlight: true,
            disableSince: { year: 2036, month: 1, day: 1 }
        };
        // Initialized to specific date (09.10.2018)
        this.model = { date: { year: 2017, month: 1, day: 1 } };
        // optional date changed callback
        this.emitDate = new core_1.EventEmitter();
    }
    DatePickerComponent.prototype.onDateChanged = function (event) {
        console.log('>>> onDateFromChanged' + event);
        //console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        this.emitDate.emit(event);
    };
    return DatePickerComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerComponent.prototype, "emitDate", void 0);
DatePickerComponent = __decorate([
    core_1.Component({
        selector: 'date-picker',
        template: "\n    <!-- input box styling is bootstrap 3.3.7 -->\n<form>\n    <div class=\"input-group\">\n        <input class=\"form-control\" style=\"float:none\" placeholder=\"Select a date\" ngx-mydatepicker name=\"mydate\"\n               [(ngModel)]=\"model\" [options]=\"myOptions\" #dp=\"ngx-mydatepicker\" (dateChanged)=\"onDateChanged($event)\"/>\n\n        <span class=\"input-group-btn\">\n            <button type=\"button\" (click)=\"dp.clearDate()\">\n                <i></i>\n            </button>\n            <button type=\"button\" (click)=\"dp.toggleCalendar()\">\n                <i></i>\n            </button>\n        </span>\n    </div>\n</form>\n\n"
    }),
    __metadata("design:paramtypes", [])
], DatePickerComponent);
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map