import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title: string = 'My first angular2-google-maps project';
   lat: number = 51.678418;
   lng: number = 7.809007;
   something:string ='';
   socket = null;
   constructor() {
     this.socket = io('http://localhost:4200');
     this.socket.on('locationUpdate',function(data){
       this.title = data;
     }.bind(this));
   }
   changeLocation(){
    this.socket.emit('location',this.something);
    this.something='';
   }
}
