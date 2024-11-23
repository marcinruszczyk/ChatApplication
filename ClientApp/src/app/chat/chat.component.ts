import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  
  
  chatService = inject(ChatService);
  inputMessage = "";
  messages: any[] = [];
  router = inject(Router);
  loggedInUserName = sessionStorage.getItem("user");
  roomName = sessionStorage.getItem("room");
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

   ngOnInit(): void {
    this.chatService.messages$.subscribe(res=>{
       this.messages = res;
       console.log(this.messages);
     });
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    this.chatService.sendMessage(this.inputMessage)
    .then(()=>{
       this.inputMessage = '';
    }).catch((err)=>{
       console.log(err);
    })
  }

  leaveChat(){
    this.chatService.leaveChat()
    .then(()=>{
      this.router.navigate(['welcome']);
      setTimeout(() => {
        location.reload();
      },0);
    }).catch((err)=>{
      console.log(err);
    })
  }
}
