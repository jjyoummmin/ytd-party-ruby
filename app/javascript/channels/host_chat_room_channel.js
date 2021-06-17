import consumer from "./consumer"

const hostChatRoomChannel = (room_id, player) => {
  const $messages = $('#messages');
  const sn = document.getElementById('mySidenav');
  const {email, ishost} = $('#userinfo').data();

  return consumer.subscriptions.create({channel: "ChatRoomChannel", room_id, email, ishost }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("Connected to the chat room!");
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      const {body, sender} = data;
      console.log(data.body.type);
      if(sender == email) return;

      // Called when there's incoming data on the websocket for this channel
      const type = body.type;

      if(type=='info message'){
        $messages.append(`<li class="info">${body.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='chat message'){
        $messages.append(`<li>${sender} : ${body.message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }
      else if(type=='sync host'){
        const state= player.getPlayerState();
        const time = player.getCurrentTime();
        console.log("SYNC HOST", body.sent_by, state, time, email)
        this.to_one(body.sent_by, {type:'sync host', state, time}, email);
      }else{
        console.log("ERROR : 잘못된 메세지 타입입니다.");
      }
    },
  
    to_all(body, sender) {
      this.perform('to_all', {room_id, body, sender})
    },  

    to_one(email, body, sender){
      this.perform('to_one', {email, body, sender})
    }
  });
}

export default hostChatRoomChannel;


