/**
 * Created by haconglinh on 12/8/16.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {NavController} from "ionic-angular";
import {BASE_API} from "../ultils/Constant";
import {RootObject} from "../models/API";

@Injectable()
export class ATMService{

  constructor(private _http: Http, private nav: NavController){

  }

  public getListATM():Observable<RootObject>{

    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.0280149,105.776591&radius=5000&type=atm&key=AIzaSyAnsboAkwpEceSlixe4JrGKEOlhhWw1iTo";

    return this._http.get(url)
      .map((response: Response) => <RootObject> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch((error) => {
        this._checkResponse(error);
        return Observable.throw(error);
      })
  }


  private _checkResponse(error:any) {
    switch (error.status) {
      case 419:
        alert('Your session expired! Please log in again!');
        //this.auth.logout();
        this.nav.push(['Login']);
        break;
    }
  }

}
