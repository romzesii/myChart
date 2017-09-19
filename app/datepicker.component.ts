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
            <button type="button" (click)="dp.clearDate()">
                <i></i>
            </button>
            <button type="button" (click)="dp.toggleCalendar()">
                <i></i>
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
        disableSince: {year: 2036, month: 1, day: 1}
    };

    // Initialized to specific date (09.10.2018)
    model: any = { date: { year: 2017, month: 1, day: 1 } };

    constructor() { }

    // optional date changed callback
    @Output() public emitDate: EventEmitter<any> = new EventEmitter<any>();
    onDateChanged(event) { //IMyDateModel
        console.log('>>> onDateFromChanged' + event);
        //console.log(event.date.year + ',' + event.date.month + ',' + event.date.day);
        this.emitDate.emit(event);
    }
}