/**
 * Created by haconglinh on 12/15/16.
 */
export class ATMLocation{
  name: string;
  address: string;
  distance: number;
  urlImage: string;
  constructor(obj?: any) {
    this.name              = obj && obj.name             || null;
    this.address           = obj && obj.address          || null;
    this.distance          = obj && obj.distance         || null;
    this.urlImage          = obj && obj.urlImage         || null;
  }
}
