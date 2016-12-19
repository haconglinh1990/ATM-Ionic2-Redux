import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { GoogleMap} from 'ionic-native';

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

  map: GoogleMap;

  apiKey: string = "AIzaSyCF95gCpZeInKyNMlHa7V1JbDwp62Yva_U";

  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });

  }

  // ionViewDidLoad(){
  //   this.loadMap();
  // }
  loadMap(){

    let latLng = new google.maps.LatLng(21.0126281, 105.8185222);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //
    // let location = new GoogleMapsLatLng(21.0126281, 105.8185222);
    //
    // this.map = new GoogleMap('map', {
    //   'backgroundColor': 'white',
    //   'controls': {
    //     'compass': true,
    //     'myLocationButton': true,
    //     'indoorPicker': true,
    //     'zoom': true
    //   },
    //   'gestures': {
    //     'scroll': true,
    //     'tilt': true,
    //     'rotate': true,
    //     'zoom': true
    //   },
    //   'camera': {
    //     'latLng': location,
    //     'tilt': 30,
    //     'zoom': 15,
    //     'bearing': 50
    //   }
    // });
    //
    // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    //   console.log('Map is ready!');
    // });


  }



}
