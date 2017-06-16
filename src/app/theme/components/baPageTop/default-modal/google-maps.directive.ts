import { Directive, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Directive({
  selector: '[appGoogleMaps]'
})
export class GoogleMapsDirective implements OnInit, OnChanges {
  @Input('origin') origin: google.maps.LatLng;
  @Input('destination') destination: google.maps.LatLng;
  markerPickup: google.maps.Marker;
  markerDropup: google.maps.Marker;
  map;
  @Output() pickupMarkerEmitter = new EventEmitter();
  directionRenderer;
  directionService;

 ngOnInit() {
 }

 ngOnChanges(change: SimpleChanges) {
   // place marker if origin is not first change
   if (change.origin && !change.origin.isFirstChange()) {
      this.markerPickup = new google.maps.Marker();
      this.markerPickup.setPosition(this.origin);
      this.markerPickup.setMap(this.map);
   }
   // place marker if destination is not first change
    if (change.destination && !change.destination.isFirstChange()) {
      this.markerDropup = new google.maps.Marker();
      this.markerDropup.setPosition(this.destination);
      this.markerDropup.setMap(this.map);
    }
    if (this.markerPickup && this.markerDropup) {
      let directionRequest: google.maps.DirectionsRequest = {};
      directionRequest.origin = this.origin;
      directionRequest.destination = this.destination;
      directionRequest.travelMode = google.maps.TravelMode.DRIVING;
      this.directionService.route(directionRequest, (directionResult: google.maps.DirectionsResult) => {
        this.directionRenderer.setMap(this.map);
        this.directionRenderer.setDirections(directionResult);
        let ltLng = { origin: [], destination: [] };
        ltLng.origin.push(this.markerPickup.getPosition().lat());
        ltLng.origin.push(this.markerPickup.getPosition().lng());
        ltLng.destination.push(this.markerPickup.getPosition().lat());
        ltLng.destination.push(this.markerPickup.getPosition().lng());
        this.pickupMarkerEmitter.next(ltLng);
      });

    }
   
   
 }

  constructor(private _apiWrapper: GoogleMapsAPIWrapper) {
    this.directionRenderer = new google.maps.DirectionsRenderer();
    this.directionService = new google.maps.DirectionsService();

    this._apiWrapper.getNativeMap().then((map) => {
      this.map = map;
    });
  }
}
