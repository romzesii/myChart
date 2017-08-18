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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
//import { MyAppModule } from './app.module.ts'
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.getData = function () {
        //return this.http.get('https://www.yandex.ru/');
        return this.http.get('../test.json')
            .map(function (resp) {
            var usersList = resp.json().data;
            var users = [];
            for (var index in usersList) {
                console.log(usersList[index]);
                var user = usersList[index];
                users.push({ name: user.userName, age: user.userAge });
            }
            return users;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map