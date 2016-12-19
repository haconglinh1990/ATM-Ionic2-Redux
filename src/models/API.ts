/**
 * Created by haconglinh on 12/8/16.
 */


export interface Location {
  lat: number;
  lng: number;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface OpeningHours {
  open_now: boolean;
  weekday_text: any[];
}

export interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface Result {
  geometry: Geometry;
  icon: string;
  id: string;
  name: string;
  opening_hours: OpeningHours;
  photos?: Photo[];
  place_id: string;
  reference: string;
  scope: string;
  types: string[];
  vicinity: string;
  rating?: number;
}

export interface RootObject {
  error_message?: string;
  html_attributions: string[];
  next_page_token?: string;
  results: Result[];
  status: string;
}
