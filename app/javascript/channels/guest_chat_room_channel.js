import consumer from "./consumer"

const $slider = $('#slider');
const $messages = $('#messages');
const sn = document.getElementById('mySidenav');

const guestChatRoomChannel = (room_id, player) => {
  return consumer.subscriptions.create({channel: "ChatRoomChannel", room_id }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("Connected to the chat room!");
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      const type = data.type;
      if(type=='play'){
        player.playVideo();
      }
      else if(type=='pause'){
        player.pauseVideo();
      }
      else if(type=='slider'){
        $slider.val(data);
      }
      else if(type=='update'){
        $slider.val(data.goTo);
        player.seekTo(data.goTo, true);
      }
      else if(type=='info message'){
        $messages.append(`<li class="info">${data.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='chat message'){
        $messages.append(`<li>${data.name} : ${data.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='sync host'){
          if(data.state ==1 || data.state==3){
            player.seekTo(data.time,true);
            player.playVideo();
          }
      }else{
        console.log("ERROR : 잘못된 메세지 타입입니다.");
      }
    },
  
    to_all(body) {
      this.perform('to_all', {room_id, body})
    },  
  });
}

export default guestChatRoomChannel;