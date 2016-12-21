import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {RootObject, Result} from "../models/API";
import {ATMLocation} from "../models/ATMLocation";
import {Geoposition} from "ionic-native";

/*
 Generated class for the LocationService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LocationService {

  baseUrlPlace: string = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  baseUrlImage: string = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=";
  radius: number = 50000;
  apiKey2: string = "AIzaSyAnsboAkwpEceSlixe4JrGKEOlhhWw1iTo";
  apiKey: string = "AIzaSyBsosxQolMICwQGG1StZoUd2qkhxqXZ1gs";
  next_page_token: string;
  isLoading: boolean = false;

  constructor(private _http: Http) {
  }

  public getData(currentPosition: Geoposition, searchQuery: string): Observable<ATMLocation[]> {
    let urlFirstData = this.baseUrlPlace +
        "location=" + currentPosition.coords.latitude +
        "," + currentPosition.coords.longitude +
        "&radius=" + this.radius +
        "&type=atm" + "&keyword=" + searchQuery +
        "&key=" + this.apiKey;
    //
    // console.log(urlFirstData);
    return this._http.get(urlFirstData)
      .map((response: Response) => {
        this.next_page_token = response.json().next_page_token;
        return (<RootObject> response.json()).results
          .map((result: Result) => {
            // console.log(result.photos);
            return this.mapDataToATMLocation(result, currentPosition);
          }).sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          })
      })
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch((error) => {
        return Observable.throw(error);
      });
  }

  private mapDataToATMLocation(result: Result, currentPosition: Geoposition): ATMLocation{

    if(result.photos){
      // console.log(this.baseUrlImage + result.photos[0].photo_reference + "&key=" + this.apiKey);
      return new ATMLocation({
        name: result.name,
        address: result.vicinity,
        positionLat: result.geometry.location.lat,
        positionLong: result.geometry.location.lng,
        distance: this.distanceBetweenTwoPoint(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
          result.geometry.location.lat,
          result.geometry.location.lng),
        urlImage: this.baseUrlImage + result.photos[0].photo_reference + "&key=" + this.apiKey
      });
    }else {
      return new ATMLocation({
        name: result.name,
        address: result.vicinity,
        positionLat: result.geometry.location.lat,
        positionLong: result.geometry.location.lng,
        distance: this.distanceBetweenTwoPoint(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
          result.geometry.location.lat,
          result.geometry.location.lng),
        urlImage: "https://sohanews.sohacdn.com/thumb_w/660/2016/atm-1467601526645-0-13-978-1930-crop-1467601567798.jpg"
      });
    }
  }


  private distanceBetweenTwoPoint(lat1: number, lon1: number, lat2: number, lon2: number) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1151.5
    return dist.toFixed(2)
  }
}
