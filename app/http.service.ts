/**
 * Created by Roman on 11.08.2017.
 */

import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {Response} from '@angular/http';
import { Test } from '../app/test.ts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {LogService} from './log.service.ts';
//import { MyAppModule } from './app.module.ts'

@Injectable()
export class HttpService{

    constructor(private http: Http, private logService: LogService){}

    requestData() {
        this.logService.write('!----- Отправка http запроса');
        return this.http.get('test.json');
        //return this.http.get('https://www.yandex.ru/');
        /*
        return this.http.get('../test.json')
            .map((resp:Response)=>{

                let usersList = resp.json().data;
                let users :Test[] = [];
                for(let index in usersList){
                    console.log(usersList[index]);
                    let user = usersList[index];
                    users.push({name: user.userName, age: user.userAge});
                }
                return users;
            })
            .catch((error: any)=> { return Observable.throw(error);}); */
    }
}

