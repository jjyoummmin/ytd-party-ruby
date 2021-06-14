import consumer from "./consumer"


const guestChatRoomChannel = (room_id, player) => {
  const $slider = $('#slider');
  const $messages = $('#messages');
  const sn = document.getElementById('mySidenav');
  const {name, ishost} = $('#userinfo').data();
  console.log(name, ishost);

  return consumer.subscriptions.create({ channel: "ChatRoomChannel", room_id, name, ishost }, {
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
      if(sender == name) return;

      const type = body.type;
      if (type == 'play') {
        player.playVideo();
      }
      else if (type == 'pause') {
        player.pauseVideo();
      }
      else if (type == 'slider') {
        $slider.val(body);
      }
      else if (type == 'update') {
        $slider.val(body.goTo);
        player.seekTo(body.goTo, true);
      }
      else if (type == 'info message') {
        $messages.append(`<li class="info">${body.message}</li>`);
        sn.scrollTo(0, sn.scrollHeight);
      }
      else if (type == 'chat message') {
        $messages.append(`<li>${sender} : ${body.message}</li>`);
        sn.scrollTo(0, sn.scrollHeight);
      }
      else if (type == 'sync host') {
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