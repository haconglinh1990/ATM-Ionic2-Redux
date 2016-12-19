import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListATM } from '../pages/list_atm/ListATM';
import { ATMDetail } from '../pages/atm_detail/ATMDetail';
import {ATMService} from "../providers/ATMService";
import {LocationService} from "../providers/LocationService";
import {GoogleMap} from "../providers/GoogleMap";
import {ConnectionService} from "../providers/ConnectionService";
import {MapPage} from "../pages/map/Map";

@NgModule({
  declarations: [
    MyApp,
    ListATM,
    ATMDetail,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListATM,
    ATMDetail,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ATMService, LocationService, GoogleMap, ConnectionService]
})
export class AppModule {}
