/**
 * Created by Roman on 10.08.2017.
 */
import {Rooms} from '../data.ts';
import { HttpService} from './http.service.ts';
export class DataService{

    private rooms: Rooms[] = [
        { name:"livingroom"},
        { name: "kitchen"},
        { name: "bedroom"},
        { name: "bathroom"},
        { name: "playroom"}
    ];
    constructor(private httpService: HttpService){}

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
    getData(){



    }
}
