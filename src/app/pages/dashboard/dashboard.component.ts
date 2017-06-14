import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MapService } from './map.service';
import * as io from 'socket.io-client';
import { MapModel } from './map.model';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, OnDestroy {
   title: string = 'My first angular2-google-maps project';
   socket;
   messages = [];
   recieveMessages: Subscription;
   message;
   dummyMessage;
   lat: number = 51.673858;
   lng: number = 7.815982;
   zoom = 12;
   mapModel: MapModel;
  constructor(private mapService: MapService) {}
    ngOnInit() {
      // this.recieveMessages = this.mapService.messagesChanged
      // .subscribe(
      //   (result: MapModel) => {
      //     this.lat = result.lat;
      //     this.lng = result.lng;
      //   }
      // );
    }
    ngOnDestroy() {
      this.recieveMessages.unsubscribe();
    }

}
