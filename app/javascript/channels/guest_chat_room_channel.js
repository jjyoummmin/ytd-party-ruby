import consumer from "./consumer"


const guestChatRoomChannel = (room_id, player) => {
  console.log("PLAYER", player)

  const $slider = $('#slider');
  const $messages = $('#messages');
  const sn = document.getElementById('mySidenav');
  const {email, ishost} = $('#userinfo').data();

  return consumer.subscriptions.create({ channel: "ChatRoomChannel", room_id, email, ishost }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("Connected to the chat room!");
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      const {body, sender} = data;

      // 자기 자신이 보낸 메세지면 끝내기
      if(sender == email) return;

      const type = body.type;
      if (type == 'play') {
        console.log("PLAY");
        player.playVideo();
      }
      else if (type == 'pause') {
        console.log("PAUSE")
        player.pauseVideo();
      }
      else if (type == 'slider') {
        console.log("SLIDER")
        $slider.val(body.value);                         
      }
      else if (type == 'update') {
        console.log("UPDATE")
        $slider.val(body.goTo);
        player.seekTo(body.goTo, true);
      }
      else if (type == 'info message') {
        $messages.append(`<li class="info">${body.message}</li>`);
        sn.scrollTo(0, sn.scrollHeight);
      }
      else if (type == 'chat message') {
        $messages.append(`<li>${body.name} : ${body.message}</li>`);
        sn.scrollTo(0, sn.scrollHeight);
      }
      else if (type == 'sync host') {
        console.log("SYNC HOST GUEST", body.state, body.time)
        if (body.state == 1 || body.state == 3) {
          player.seekTo(body.time, true);
          player.playVideo();
        }
      } else {
        console.log("ERROR : 잘못된 메세지 타입입니다.");
      }
    },

    to_all(body, sender) {
      this.perform('to_all', { room_id, body, sender })
    },
  });
}

export default guestChatRoomChannel;