import {Component, ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import { ListATM } from '../pages/list_atm/ListATM';
import {MapPage} from "../pages/map/Map";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListATM;

  constructor() {
  }

  goToMapPage(){
    this.nav.push(MapPage);
  }
}
