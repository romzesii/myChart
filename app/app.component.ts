/**
 * Created by Roman on 08.08.2017.
 */
//our root app component

import {Component, OnInit, OnDestroy} from '@angular/core';
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
interface Topic {
    topicName: string;
}
@Component({
    selector: 'my-app',
    styleUrls:['../app/app.component.css'],
    providers: [GraphDataService, LogService],
    template: `
    <div class="app">{{title}}{{realTimeData ? ' in update mode' : ' in request mode'}}</div>
    <button (click)="turnOnUpdateMode()">Update/Generate</button>
    <button (click)="turnOnRequestMode()">HTTP Request</button>
    <button (click)="requestTopics()">Запросить топики</button>
    <div>{{topic}}</div>
    <div>
        <input type="text"
            placeholder="i.e. kitchen floor temperature"
            #inputTopic
            [ngModel] = "topic"
            (ngModelChange)="handleChangeTopic($event)">
        <button (click)="requestByTopic(inputTopic.value)">Запрос по топику</button>
    </div>
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
    <div>
        <h5>Все топики в базе</h5>
        <ul>
            <ol *ngFor="let item of topicNames; let i = index;">
                {{i + 1}}: {{item.topicName}}
                    <input type="checkbox" (change)="onChange(item.topicName, $event.target.checked)">
            </ol>
        </ul>
    </div>
  `
})
export class AppComponent implements OnDestroy {

    title: string;
    topic: string;
    topicNames: Topic[] = [
        {topicName: '111'},
        {topicName: '222'}
    ];

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
    onChange(name:string, isChecked: boolean) {
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
        //this.rooms = rooms;
        //this.dataService.generateData(count);
    }

    //todo update data
    ngOnInit() {
        this.logService.write("Инициализация компонента App");
        setInterval(this.updateData.bind(this), 4000);
        //this.logService.write('requestData()');
        //this.requestData(); //

        //this.apiResponseSubscription = this.graphDataService.getData().subscribe((response) => {
            //console.debug(response);
            //this.multi = response;
            //console.log(this.multi);

        //});

        //this.httpService.getData().subscribe((data: Response) => this.test = data.json());
        //this.httpService.getData()

        //this.multi = this.graphDataService.getData(); //todo getData() method
        //console.log(this.httpService.getData().subscribe((data)=>this.test=data));

    }

    ngOnDestroy() {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    }

    requestData(req){
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
            for (let i = 0; i < response.length; i++){
                this.topicNames[i].topicName = response[i];
            }
        });
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
/*
 @NgModule({
 imports: [ BrowserModule, BrowserAnimationsModule, NgxChartsModule, FormsModule ],
 declarations: [ App ],
 bootstrap: [ App ]
 })
 export class AppModule {}
 */
