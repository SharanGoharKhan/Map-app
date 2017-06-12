import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Control }  from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { ChatService } from './chat.service';
import * as io from 'socket.io-client';
import { MapModel } from './map.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //  meessageRecieved:string ='';
  //  url:string  = 'http://localhost:3000';
  //  sentMessage:string;
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
   constructor(private chatService:ChatService) {}
   ngOnInit() {
    // this.recieveMessages = this.chatService.getMessages().subscribe(message => {
    //   this.messages.push(message);
    // })
    // this.dummyMessage = this.chatService.getMessages();
    // this.recieveMessages = this.chatService.messagesChanged
    // .subscribe(
    //   (msg:any)=>{
    //     console.log(msg);
    //     this.messages.push(msg);
    //   }
    // )
    this.recieveMessages = this.chatService.messagesChanged
    .subscribe(
      (result:MapModel)=>{
        this.lat = result.lat;
        this.lng = result.lng;
      }
    )
    // this.socket = io('http://localhost:3000');
    // this.socket.on('message', (data) => {
    //     console.log(data);
    //     this.lat = +data.lat;
    //     this.lng = +data.lng;    
    //   });
  }
  //  sendMessage(message){
  //    this.sentMessage=message.value;
  //    this.chatService.sendMessage(this.sentMessage);
  //    this.sentMessage = '';
     
  //  }
  //  getMessage(){
  //   let observable = new Observable(observer =>{
  //     this.socket = io(this.url);
  //     this.socket.on('message'),(data)=> {
  //       observer.next(data);
  //     }
  //   });
  //  }
  ngOnDestroy() {
    this.recieveMessages.unsubscribe();
  }
}
