/**
 * Created by Roman on 11.08.2017.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
//import { HttpModule }  from '@angular/http';
var platform_browser_animations_1 = require("@angular/platform-browser-animations");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var app_ts_1 = require("./app.ts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, platform_browser_animations_1.BrowserAnimationsModule, ngx_charts_1.NgxChartsModule, forms_1.FormsModule, http_1.HttpModule],
        declarations: [app_ts_1.App],
        bootstrap: [app_ts_1.App]
    })
], AppModule);
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map