import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MapModel } from './map.model';
export class ChatService {
  mapModel: MapModel;
  private url = 'http://localhost:3000';  
  private socket;
  messagesChanged = new Subject<MapModel>();
//   sendMessage(message){
//     this.socket.emit('add-message', message);    
//   }
    constructor() {
        console.log("constructor called");
        this.socket = io(this.url);
        this.socket.on('message', (data) => {
            console.log(data);
            this.mapModel = new MapModel(+data.lat,+data.lng);
            this.messagesChanged.next(this.mapModel);
            // this.lat = +data.lat;
            // this.lng = +data.lng;    
      });
    } 
  getMessages() {
    // let observable = new Observable(observer => {
    //   this.socket = io(this.url);
    //   this.socket.on('message', (data) => {
    //     observer.next(data);
    //     this.messagesChanged.next(data);    
    //   });
    //   return () => {
    //     this.socket.disconnect();
    //   };  
    // })     
    // return observable;
  }  
}