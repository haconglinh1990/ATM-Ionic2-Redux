import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListATM } from '../pages/list_atm/ListATM';
import { ATMDetail } from '../pages/atm_detail/ATMDetail';
import {ATMService} from "../providers/ATMService";
import {LocationService} from "../providers/LocationService";
// import {GoogleMap} from "../providers/GoogleMap";
import {ConnectivityService} from "../providers/ConnectivityService";
import {MapPage} from "../pages/map/Map";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "angular2-google-maps/core";

@NgModule({
  declarations: [
    MyApp,
    ListATM,
    ATMDetail,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCF95gCpZeInKyNMlHa7V1JbDwp62Yva_U', libraries: ['places']})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListATM,
    ATMDetail,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    ATMService, LocationService, GoogleMapsAPIWrapper, ConnectivityService]
})
export class AppModule {}
