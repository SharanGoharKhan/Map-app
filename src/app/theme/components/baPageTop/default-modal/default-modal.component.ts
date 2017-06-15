import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgmMap } from '@agm/core';
import {} from '@types/googlemaps';
import { AgentService } from './agent.service';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {
  @ViewChild('pickupInput') pickupInput: ElementRef;
  @ViewChild('dropInput') dropInput: ElementRef;
  @ViewChild('map') map: AgmMap;
  lat: number = 33.7294;
  lng: number =  73.0931;
  zoom: number = 12;
  autocomplete_pickup: google.maps.places.Autocomplete;
  autocomplete_dropup: google.maps.places.Autocomplete;
  origin: google.maps.LatLng;
  destination: google.maps.LatLng;
  agents= [];
  errorMessage;

  constructor(private activeModal: NgbActiveModal, private agentService: AgentService) {
  }
  ngOnInit() {
    this.autocomplete_pickup = new google.maps.places.Autocomplete(this.pickupInput.nativeElement, {
      componentRestrictions: {
        country: 'pk'
      }
    });
    this.autocomplete_dropup = new google.maps.places.Autocomplete(this.dropInput.nativeElement, {
      componentRestrictions: {
        country: 'pk'
      }
    });

    this.autocomplete_pickup.addListener('place_changed', () => {
      this.origin = this.autocomplete_pickup.getPlace().geometry.location;
    });
    this.autocomplete_dropup.addListener('place_changed', () => {
      this.destination = this.autocomplete_dropup.getPlace().geometry.location;
    });
  }

  closeModal() {
    this.activeModal.close();
  }
  getDirection() {
    // let directionDisplay = new google.maps.DirectionsRenderer();
    // let directionService = new google.maps.DirectionsService();
    // google.maps.TravelMode.
    // let geoencoder = new google.maps.Geocoder();
    // GoogleMap
    // directionDisplay.setMap(this.map);
    // google.maps.directionstr

    // console.log("Place 1: " + this.autocomplete_pickup.getPlace().name);
    // console.log("Place 2:" + this.autocomplete_dropup.getPlace().name);
  }
  handleMarkerEmitter(event) {
    console.log('handled Marker Emitter: ' + JSON.stringify(event));
    this.agentService.getAgents(event.lat, event.lng)
    .then( (data) => {
      console.log(data);
      this.agents = data;
    }).catch();
    // .subscribe(
    //   agents => this.agents,
    //   error => this.errorMessage = <any>error
    // );
    // console.log(this.agents);
  }
}
