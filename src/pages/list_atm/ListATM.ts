import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ATMService} from "../../providers/ATMService";

@Component({
  selector: 'page-page1',
  templateUrl: 'list_atm.html',
  providers:[ATMService]
})
export class ListATM {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;



  constructor(public navCtrl: NavController, private _atmSV: ATMService) {

  }

}
