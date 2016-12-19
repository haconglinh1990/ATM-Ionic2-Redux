import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocationService} from "../../providers/LocationService";
import {ATMLocation} from "../../models/ATMLocation";
import {Geolocation, Geoposition} from 'ionic-native';

@Component({
  selector: 'page-page1',
  templateUrl: 'list_atm.html'

})
export class ListATM {

  searchQuery: string = '';
  currentPosition: Geoposition;
  isLoading: boolean = false;
  atmLocations: ATMLocation[] =[];

  constructor(public navCtrl: NavController,
              private _locationService: LocationService) {
  }

  ionViewDidLoad() {
    this.getCurrentLocation();
  }

  private getCurrentLocation(){
    let geoOption = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    this.isLoading = true;
    Geolocation.getCurrentPosition(geoOption)
      .then((position: Geoposition) => {
        this.currentPosition = position;
        // this.fetchData(position, this.searchQuery);
        // console.log("get Location first time");
      }, (err) => console.log(err));

    Geolocation.watchPosition(geoOption)
      .subscribe((positionUpdate: Geoposition) => {
        this.currentPosition = positionUpdate;
        this.fetchData(positionUpdate, this.searchQuery);
        console.log("Watch Location first time");
      }, (err) => console.log(err));
  }

  fetchData(position: Geoposition, searchQuery: string){
    this._locationService.getData(position.coords.latitude, position.coords.longitude, searchQuery)
      .subscribe((atmLocations: ATMLocation[]) =>{
        this.atmLocations = atmLocations;
        this.isLoading = false;
        // console.log("Loading" + this.isLoading);
      });
  };


  searchResult() {
    while (this.isLoading === false){
      this.isLoading = true;
      this.fetchData(this.currentPosition, this.searchQuery);
    }
  }
}
