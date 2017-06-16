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
  estimated: string = '2:00 minutes';
  lat: number = 33.7294;
  lng: number = 73.0931;
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
  handleMarkerEmitter(event) {
    // Estimate time
    console.log('cordinates');
    console.log(event.origin[0].toString());
    
    let origin = event.origin[0].toString() + ',' + event.origin[1].toString();
    //let origin = new google.maps.LatLng(event.origin[0], event.origin[1]);
    let destination = new google.maps.LatLng(event.destination[0], event.destination[1]);
    let directionService = new google.maps.DirectionsService();
    let request: google.maps.DirectionsRequest;
    request.origin = origin;
    request.destination = destination;
    request.travelMode = google.maps.TravelMode.DRIVING;

    directionService.route(request, function(response, status) {
      console.log('directionService');
      console.log(status);
     // if (status == 'OK') {
        console.log(response);
      //}
    });

    this.agentService.getAgents(event.origin[0], event.origin[1])
    .then( (data) => {
      console.log(data);
      this.agents = data;
    }).catch();
  }
}
