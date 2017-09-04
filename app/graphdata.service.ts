/**
 * Created by Roman on 10.08.2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Rooms} from '../rooms.ts';
//import {HttpService} from './http.service.ts';
import {LogService} from './log.service.ts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Data} from './data.ts';

@Injectable()
export class GraphDataService{
    data: Data;
    private rooms: Rooms[] = [
        { name:"livingroom"},
        { name: "kitchen"},
        { name: "bedroom"},
        { name: "bathroom"},
        { name: "playroom"}
    ];
    private requestUrl = 'data.json';
    private requestBtcUrl = 'http://localhost:1880/btc';

    constructor(private logService: LogService, private http:Http){}

    getRooms(): Rooms[] {

        return this.rooms;
    }
    //getRoomName(index: number = 1): Rooms[]{
        //return this.rooms[index - 1];
    //}
    addRooms(name: string){

        this.rooms.push(new Rooms(name));
    }

    generateData(seriesRooms: number = 1, dataPoints: number = 12){
        this.logService.write("Генерация данных");
        const results = [];
        const domain: Date[] = [];

        for (let j = 0; j < dataPoints; j++){
            domain.push(new Date(2017, j, 1));
        }

        for (let i = 0; i < seriesRooms; i++){
            const series = {
                name: this.getRooms()[i].name,
                series: []
            };

            for (let j = 0; j < domain.length; j++){
                const value = Math.floor(50 + Math.random() * 50); // temperature from 50 to 100.
                const timestamp = domain[j];

                series.series.push({
                    value,
                    name: timestamp
                });
            }
            results.push(series);
        }
        //console.log(results);
        return results;
    }
    getData():Observable {
        const headers = new Headers();
        //headers.append('Access-Control-Allow-Headers', 'Content-Type');
        //headers.append('Access-Control-Allow-Methods', 'GET');
        //headers.append('Access-Control-Allow-Origin', '*');
        this.logService.write('graphDataService...Отправка http запроса');
        //return this.http.get(this.requestBtcUrl, {headers: headers}).map((res:Response) => res.json());
        return this.http.get(this.requestBtcUrl).map((res:Response) => res.json());
        // return this.http.get(this.requestUrl).map((res:Response) => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
