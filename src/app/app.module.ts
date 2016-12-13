import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListATM } from '../pages/list_atm/ListATM';
import { ATMDetail } from '../pages/atm_detail/ATMDetail';
import {ATMService} from "../providers/ATMService";

@NgModule({
  declarations: [
    MyApp,
    ListATM,
    ATMDetail
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListATM,
    ATMDetail
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ATMService]
})
export class AppModule {}
