/**
 * Created by Roman on 11.08.2017.
 */

import {NgModule} from '@angular/core';
import {GraphDataService} from './graphdata.service';
import {HttpModule}  from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AppComponent} from './app.component.ts';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, NgxChartsModule, FormsModule, HttpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);