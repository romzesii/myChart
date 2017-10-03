/**
 * Created by Roman on 08.08.2017.
 */
//our root app component

import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {single, multi} from '../rooms.ts';
import {GraphDataService} from './graphdata.service.ts';
import {LogService} from './log.service.ts';
//import {HttpService} from './http.service.ts';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {Data} from './data.ts';
import {Subscription} from 'rxjs';
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
@Component({
    selector: 'my-app',
    styleUrls:['../app/app.component.css'],
    providers: [GraphDataService, LogService],
    template: `
    <div class="container ">
    <div class="app" style="margin-bottom: 10px">{{title}}{{realTimeData ? ' in update mode' : ' in request mode'}}</div>
    <div class="row">
    <div class="col-md-8 col-sm-8 col-xs-12">
    <button (click)="turnOnUpdateMode()">Update/Generate</button>
    <button (click)="turnOnRequestMode()">HTTP Request</button>
    <button (click)="requestTopics()">Запросить топики</button>
    <button (click)="updateWithRange()">Обновить по датам</button>
    <label><input type="checkbox" (change)="onChangeZoom($event.target.checked)">Timeline</label>
    <div style="display: none">{{topic}}</div>
    <div>
        <input type="text"
            style="display: none"
            placeholder="/kitchen/air/temperature"
            #inputTopic
            [ngModel] = "topic"
            (ngModelChange)="handleChangeTopic($event)">
        <button (click)="requestByTopic(inputTopic.value)" style="display: none">Запрос по топику</button>
    </div>
    </div>
        <div class="col-md-4 col-sm-4 col-sm-push-0 col-xs-12 ">
            <date-picker (emitDate)="settingDateFrom($event)"></date-picker>
            <date-picker (emitDate)="settingDateTo($event)"></date-picker>
        </div>
    </div>
    <div class="row">
    <div class="col-md-12 col-sm-12">
    <ngx-charts-line-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="multi"
      [gradient]="gradient"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [timeline]="timeline"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [autoScale]="autoScale"
      (select)="onSelect($event)">
    </ngx-charts-line-chart>
    </div>
    </div>
        <div class="row">
            <div class="col-md-6 col-sm-6">
            <h3>Все топики в базе</h3>
                <ol *ngFor="let item of topicNamesPreview; let i = index;" class="topic">
                    {{i + 1}}: {{item}}
                    <input type="checkbox" (change)="onChangeTopics(item, $event.target.checked)" [(ngModel)]="topicPreviewState[i]">
                </ol>
            </div>
            <div class="col-md-3 col-sm-3">
            <h3>Tags</h3>
                <ol *ngFor="let tag of topicTags; let i = index;" class="topic">
                    {{i + 1}}
                    <button aria-pressed="false"
                    (click)="onChangeTags(tag, $event.target.getAttribute('aria-pressed'))"
                    id="tagcheck" type="button"
                    class="btn btn-default"
                    data-toggle="button">
                    {{tag}}
                    </button>
                </ol>
            </div>
            <!--<label *ngFor="let tag of topicTags; let i = index;" class="btn btn-primary" [(ngModel)]="checkButtonModel"  btnCheckbox>{{tag}}</label> -->
            
    </div>
  `
})
export class AppComponent implements OnInit {

    title: string;
    topic: string;
    topicPreviewState: any[] = [];
    topicNames: any[];
    topicNamesPreview: any[];
    topicTags: any[];
    topicTagsForSearch: any[] = [];
    showTodayBtn = false;

    fromDate: number;
    toDate: number;
    single:any[];
    multi:any[];
    dateData:any[];
    view:any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Day';
    showYAxisLabel = true;
    yAxisLabel = 'Temperature';
    update:number = 0;
    realTimeData:boolean = false;
    rooms:any[];
    newTime:number = 0;
    timeline = false;
    data:Observable<Data[]>;
    error:any;

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    onChangeTags(name:string, event: any) {
        console.log(name);
        console.log(event);
        if (event === 'false') {
            event = true;
            //this.topicTagsForSearch = tagSelected;
            let newTags = this.topicTagsForSearch.concat(name);
            this.topicTagsForSearch = newTags;
            //console.log(this.topicTagsForSearch);
            this.logService.write('Add tag ' + name);

        } else {
            event = false;
            let tagSelected = this.topicTagsForSearch.filter(function(item){
                return item != name;
            });
            this.topicTagsForSearch = tagSelected;
            //console.log(this.topicTagsForSearch);
            this.logService.write('Remove tag ' + name);
        }
        console.log(this.topicTagsForSearch);
        console.log(event);
        this.previewTopicsByTags();
    }

    previewTopicsByTags() {
        let _topicNamesPreview = [];
        if (this.topicTagsForSearch.length > 0) {
        for (let topic of this.topicNames) {
            let counter = 0;
                for (let item of this.topicTagsForSearch) {
                    if (topic.indexOf(item) === -1) {
                        console.log(`The item ${item} not found`;
                    )
                    } else {
                        console.log(`The item ${item} is found`);
                        counter++;
                    }
                }
                if (counter === this.topicTagsForSearch.length) {
                    _topicNamesPreview = _topicNamesPreview.concat(topic);
                    this.topicNamesPreview = _topicNamesPreview.slice();
                    console.log(this.topicNamesPreview);
                }
        }
    } else {
        this.topicNamesPreview = this.topicNames.slice();
            console.log(this.topicNamesPreview);
        }
    }

    turnOnUpdateMode(){
        this.realTimeData = true;

    }
    turnOnRequestMode(){
        this.realTimeData = false;
    }
    requestByTopic(value){
        console.log(`Запрос по топику ${value}`);
        this.requestData(value);
    }
    handleChangeTopic(value: string){
        //this.topic = value.replace(/\s/g, '/');
        this.topic = value;
    }
    handleInput(event: any){
        //this.topic = event.target.value;
    }
    onChangeZoom(isChecked: boolean){
        if (isChecked){
            this.logService.write('Timeline enabled');
            this.timeline = true;
        }
        if (!isChecked) {
            this.logService.write('Timeline disabled');
            this.timeline = false;
        }
    }
    onChangeTopics(name:string, isChecked: boolean) {
        if (isChecked){
            this.logService.write('Add graphic ' + name);
            this.requestByTopic(name);
        }
        if (!isChecked) {
            this.logService.write('Remove graphic ' + name);
            let newMulti = this.multi.filter(function(item){
                return item.name != name;
            });
            this.multi = newMulti;
        }
    }
    buildGraphic(data:any[]){
        let newMulti = this.multi.concat(data[0]);
        this.multi = newMulti;
        console.log('построение графика' + this.multi);
    }

    // line, area
    autoScale = true;
    private apiResponseSubscription:Subscription;

    constructor(private graphDataService:GraphDataService, private logService:LogService) {
        this.title  = 'Line Chart by Roman';
        this.topic = '/kitchen/air/temperature';
        Object.assign(this, {single, multi});

    }

    //todo update data
    ngOnInit() {
        this.logService.write("Инициализация компонента App");
        setInterval(this.updateData.bind(this), 8000);

        //var tagStateDefault = document.getElementById("tagcheck");

        //tagStateDefault.setAttribute('aria-pressed', false);

    }
    ngAfterViewInit() {
        this.requestTopics();
    }

    ngOnDestroy() {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    }

    requestData(req){
        if (this.fromDate > 0 && this.toDate > 0){
            req = req + '&from=' + this.fromDate + '&to=' + this.toDate;
        }
        this.apiResponseSubscription = this.graphDataService.getData(req).subscribe((response) => {
            console.debug(response);
            //this.multi = response;
            this.buildGraphic(response);
            console.log(response);
        });
    }

    requestTopics(){
        this.apiResponseSubscription = this.graphDataService.getTopics().subscribe((response) => {

            console.log('The quantity of unique topics ' + response.length);
            //console.log(this.topicNames);
            let arr = [];
            for (let i = 0; i < response.length; i++){
                //this.topicNames[i] = response[i];
                arr.push(response[i]);
            }
            this.topicNames = arr;
            console.log(this.topicNames);
            this.topicNamesPreview = this.topicNames.slice();
            this.drawTags();
        });
    }

    drawTags(){
        let newArr = this.topicNames.slice();
        let arr = [];
        for (let item of newArr) {
            let tags = item.split('/');
            arr = arr.concat(tags);
        }

        let tagsArr = new Set();
        for (let i = 0; i < arr.length; i++){
            if (arr[i] !== ''){
                tagsArr.add(arr[i]);
            }
        }

        //let tagsArr = Array.from(new Set(arr));
        this.topicTags = tagsArr;
        console.log(this.topicTags);
    }

    updateWithRange() {
        if (this.multi) {
            let newMulti = this.multi.slice();
            this.multi.length = 0;
            for (let item of newMulti){
                this.requestByTopic(item.name);
            }
        }
    }

    settingDateFrom(event){

        console.log('setting up date range (From) for topic request' + event);
        console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        console.log(event.epoc);
        this.fromDate = event.epoc * 1000;
        if((this.fromDate === 0 && this.toDate === 0) || (this.fromDate > 0 && this.toDate > 0)){
            this.updateWithRange();
        }

    }
    settingDateTo(event: any){

        console.log('setting up date range (To) for topic request');
        console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        console.log(event.epoc);
        this.toDate = event.epoc * 1000;
        if((this.fromDate === 0 && this.toDate === 0) || (this.fromDate > 0 && this.toDate > 0)){
            this.updateWithRange();
        }
    }


    updateData() {
        //this.logService.write('updateData()');
        console.log('------update data');
        if (!this.realTimeData) {
            return;
        }

        this.multi = this.graphDataService.generateData();
        this.logService.write(`Генерация графика ${this.multi}`);
        //console.log(this.multi);
    }


    onSelect(event) {

        this.logService.write(event);
        //this.requestData();
        //this.graphDataService.addRooms('lalala'); //

    }

}
