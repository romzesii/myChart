/**
 * Created by Roman on 18.09.2017.
 */
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {AppComponent} from "./app.component";
import {EventEmitter} from "events";
// other imports here...

@Component({
    selector: 'date-picker',
    template: `
    <!-- input box styling is bootstrap 3.3.7 -->
<form>
    <div class="input-group">
        <input class="form-control" style="float:none" placeholder="Select a date" ngx-mydatepicker name="mydate"
               [(ngModel)]="model" [options]="myOptions" #dp="ngx-mydatepicker" (dateChanged)="onDateChanged($event)"/>

        <span class="input-group-btn">
            <button type="button" class="btn btn-default btn-sm" (click)="dp.clearDate()">
                <i class="glyphicon glyphicon-remove"></i>
            </button>
            <button type="button" class="btn btn-default btn-sm" (click)="dp.toggleCalendar()">
                <i class="glyphicon glyphicon-calendar"></i>
            </button>
        </span>
    </div>
</form>

`
})
export class DatePickerComponent {

    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        minYear: 2017,
        maxYear: 2036,
        satHighlight: true,
        dayLabels: {su: 'Вс', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Сб'},
        monthLabels: { 1: 'Январь', 2: 'Февраль', 3: 'Март', 4: 'Апрель', 5: 'Май', 6: 'Июнь', 7: 'Июль', 8: 'Август', 9: 'Сентябрь', 10: 'Октябрь', 11: 'Ноябрь', 12: 'Декабрь' },
        todayBtnTxt: 'Сегодня',
        showTodayBtn: true
    };

    // Initialized to specific date (09.10.2018)
    //model: any = { date: { year: 2017, month: 1, day: 1 } };

    constructor() { }

    // optional date changed callback
    @Output() public emitDate: EventEmitter<any> = new EventEmitter<any>();
    onDateChanged(event: IMyDateModel) { //IMyDateModel
        console.log('>>> onDateFromChanged' + event);
        //console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        this.emitDate.emit(event);
    }
}