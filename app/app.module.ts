/**
 * Created by Roman on 11.08.2017.
 */

import {NgModule} from '@angular/core';
import { HttpModule }  from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { HttpModule }  from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { App  } from './app.ts';

@NgModule({
    imports: [ BrowserModule, BrowserAnimationsModule, NgxChartsModule, FormsModule, HttpModule ],
    declarations: [ App ],
    bootstrap: [ App ]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);