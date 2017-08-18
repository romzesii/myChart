/**
 * Created by Roman on 09.08.2017.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);