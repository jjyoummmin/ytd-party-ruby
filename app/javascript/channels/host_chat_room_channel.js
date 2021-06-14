import consumer from "./consumer"

const hostChatRoomChannel = (room_id, player) => {
  const $messages = $('#messages');
  const sn = document.getElementById('mySidenav');
  const {name, ishost} = $('#userinfo').data();
  console.log(name, ishost);

  return consumer.subscriptions.create({channel: "ChatRoomChannel", room_id, name, ishost }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("Connected to the chat room!");
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      console.log("received data!!!!!!!");
      // Called when there's incoming data on the websocket for this channel
      const type = data.type;

      if(type=='info message'){
        $messages.append(`<li class="info">${data.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='chat message'){
        $messages.append(`<li>${data.name} : ${data.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='sync host'){
        const state= player.getPlayerState();
        const time = player.getCurrentTime();
        this.to_one(data.sent_by, {type:'sync host', state, time});
      }else{
        console.log("ERROR : 잘못된 메세지 타입입니다.");
      }
    },
  
    to_all(body, sender) {
      this.perform('to_all', {room_id, body, sender})
    },  

    to_one(name, body, sender){
      this.perform('to_one', {name, body, sender})
    }
  });
}

export default hostChatRoomChannel;


