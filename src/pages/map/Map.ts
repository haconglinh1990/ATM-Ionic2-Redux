import {Component, ViewChild, ElementRef} from '@angular/core';
import {Platform, NavParams} from 'ionic-angular';
// import {GoogleMap} from 'ionic-native';
import {ATMLocation} from "../../models/ATMLocation";
import {Geoposition} from "ionic-native";

/*
 Generated class for the Map page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;

  currentLatLng: any;
  targetLatLng: any;
  currentLocation: Geoposition;
  targetLocation: ATMLocation;
  atmLocations: ATMLocation[] =[];
  apiKey: string = "AIzaSyCF95gCpZeInKyNMlHa7V1JbDwp62Yva_U";

  constructor(private navParams: NavParams,
              public platform: Platform) {
  }

  ionViewDidLoad(){
    this.platform.ready().then(() => {
      this.getPosition();
      this.loadMap();
    });
  }

  private getPosition(){
    this.currentLocation = this.navParams.get('currentLocation');
    this.targetLocation = this.navParams.get('targetLocation');
    this.atmLocations = this.navParams.get('atmLocations');
    this.currentLatLng = new google.maps.LatLng(this.currentLocation.coords.latitude, this.currentLocation.coords.longitude);
    this.targetLatLng = new google.maps.LatLng(this.targetLocation.positionLat, this.targetLocation.positionLong);
  }

  private loadMap() {
    let mapOptions = {
      center: this.currentLatLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker();
    this.direction();
  }

  private addMarker(){
    for(let location of this.atmLocations){
      if(location !== this.targetLocation) {
        let latLng = new google.maps.LatLng(location.positionLat, location.positionLong);
        let marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: latLng,
          title: location.name
        });

        google.maps.event.addListener( marker, 'click', ()=>{
          console.log("marker Click");
          this.targetLatLng = new google.maps.LatLng(location.positionLat, location.positionLong);
          this.direction();
        });

        marker.setMap(this.map);
      }
    }
  }

  private direction(){
    let request = {
      origin: this.currentLatLng,
      destination: this.targetLatLng,
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC
    };
    let directionsDisplay = new google.maps.DirectionsRenderer();
    let directionsService = new google.maps.DirectionsService();

    directionsDisplay.setMap(this.map);
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }
}
