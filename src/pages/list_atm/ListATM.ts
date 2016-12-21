import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {LocationService} from "../../providers/LocationService";
import {ATMLocation} from "../../models/ATMLocation";
import {Geolocation, Geoposition, StatusBar, Splashscreen} from 'ionic-native';
import {MapPage} from "../map/Map";

@Component({
  selector: 'page-page1',
  templateUrl: 'list_atm.html'

})
export class ListATM {

  searchQuery: string = '';
  currentLocation: Geoposition;
  isLoading: boolean = false;
  atmLocations: ATMLocation[] =[];

  constructor(public navCtrl: NavController,
              private _locationService: LocationService,
              public platform: Platform) {

  }


  ionViewDidLoad(){
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.getCurrentLocation();
    });
  }

  private getCurrentLocation(){

    this.isLoading = true;

    let geoOption = { maximumAge: 30000, timeout: 50000, enableHighAccuracy: true };
    // let geoOption = {enableHighAccuracy: true };

    console.log("Before get Location first time !!!");
    Geolocation.getCurrentPosition(geoOption)
      .then((position: Geoposition) => {
        this.currentLocation = position;

        console.log("After get Location first time: " + position.coords.latitude + " + " + position.coords.longitude);
        this.fetchData(this.currentLocation, this.searchQuery);

      }, (err) => console.log(err))
      .catch((error) => {
      console.log('Error getting location', error);
    });

    // Geolocation.watchPosition(geoOption)
    //   .subscribe((positionUpdate: Geoposition) => {
    //     this.currentPosition = positionUpdate;
    //     this.fetchData(positionUpdate.coords.latitude, positionUpdate.coords.longitude, this.searchQuery);
    //     console.log("Watch Location first time");
    //   }, (err) => console.log(err));


    // this.fetchData(21.0129448, 105.81864979999999, this.searchQuery);

  }

  fetchData(currentLocation: Geoposition, searchQuery: string){

    this._locationService.getData(currentLocation, searchQuery)
      .subscribe((atmLocations: ATMLocation[]) =>{
        this.atmLocations = atmLocations;
        this.isLoading = false;
        // console.log("Loading" + this.isLoading);
      });
  };


  searchResult() {
    while (this.isLoading === false){
      this.isLoading = true;
      this.fetchData(this.currentLocation, this.searchQuery);
    }
  }



  mapDirection(atmLocation: ATMLocation){
    this.navCtrl.push(MapPage, {
      currentLocation: this.currentLocation,
      targetLocation: atmLocation,
      atmLocations: this.atmLocations
    });
  }
}
