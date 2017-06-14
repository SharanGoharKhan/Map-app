import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MapModel } from './map.model';
export class MapService {
  mapModel: MapModel;
  private url = 'http://localhost:3000';  
  private socket;
  messagesChanged = new Subject<MapModel>();
    // constructor() {
    //     this.socket = io(this.url);
    //     this.socket.on('message', (data) => {
    //         this.mapModel = new MapModel(+data.lat, +data.lng);
    //         this.messagesChanged.next(this.mapModel);
    //   });
    // } 
}
