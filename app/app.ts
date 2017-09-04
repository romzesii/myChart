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
@Component({
    selector: 'my-app',
    providers: [GraphDataService, LogService],
    template: `
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
  `
})
export class App implements OnDestroy {
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

    // line, area
    autoScale = true;
    private apiResponseSubscription:Subscription;

    constructor(private graphDataService:GraphDataService, private logService:LogService) {
        Object.assign(this, {single, multi});
        //this.rooms = rooms;
        //this.dataService.generateData(count);
    }

    //todo update data
    ngOnInit() {
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

    }

    ngOnDestroy() {
        if (this.apiResponseSubscription) {
            this.apiResponseSubscription.unsubscribe();
        }
    }
    requestData(){
        this.apiResponseSubscription = this.graphDataService.getData().subscribe((response) => {
            //console.debug(response);
            this.multi = response;
            this.logService.write(this.multi);
        });
    }

    updateData() {
        //this.logService.write('updateData()');
        console.log('------update data');
        if (!this.realTimeData) {
            return;
        }

        this.multi = this.graphDataService.generateData(5);
        this.logService.write(this.multi);
        //console.log(this.multi);
    }


    onSelect(event) {
        console.log(event);
        this.requestData();
        this.graphDataService.addRooms('lalala');

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
