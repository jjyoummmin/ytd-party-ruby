import hostChatRoomChannel from "../channels/host_chat_room_channel";
import guestChatRoomChannel from "../channels/guest_chat_room_channel";

const url = window.location.href;
const video_id = [...url.match(/(?<=&video_id=).+$/)][0];
const room_id = [...url.match(/(?<=\?room_id=)[^&]+/)][0];

let player;
let chatRoomChannel;
let playing = false;
let interval;

window.onYouTubeIframeAPIReady = () => {
  console.log("ytd-ready");
  player = new YT.Player('player', {
    height: '480px',
    width: '100%',
    videoId: video_id,
    playerVars: {
      autoplay: 0,                
      modestbranding: 1,          
      controls: 0,                 
      disablekb: 1,               
      enablejsapi: 1,              
    },
  });
}

$(function () {
    const {name, ishost} = $('#userinfo').data();
    const $mySidenav = $('#mySidenav');
    const sn = document.getElementById('mySidenav');
    const $main = $('#main');
    const $chatopen = $('.chatopen');
    const $messages = $('#messages');
    const $input = $('#input');
    const $slider = $('#slider');

    console.log("소켓 연결 한다")
    chatRoomChannel = ishost ? hostChatRoomChannel(room_id, player) : guestChatRoomChannel(room_id, player);

    $('.chatopen').click((e) => {
      $mySidenav.width('300px');
      $main.css({ marginRight: "330px" });
      $(e.target).addClass('hide');
    })
  
    $('.closebtn').click(() => {
      $mySidenav.width('0px');
      $main.css({ marginRight: "0" });
      $chatopen.removeClass('hide');
    })
  
    $('#form').on('submit', sendMessage);
    $('#volume').on('input', (e) => changeVolume(e.target))

    if(ishost){
      $('#playBtn').on('click', playVideo);
      $('#pauseBtn').on('click', pauseVideo);
      $('#slider').on('input', (e) => changeTime(e.target))
    }



      function moveSlider(){
        let fraction = player.getCurrentTime() / player.getDuration() * 100;
        $slider.val(fraction);
        chatRoomChannel.to_all({type: "slider", value : fraction}, name)
      }
    
      function playVideo() {
        if(playing) return;
        playing = true;
        chatRoomChannel.to_all({type: "play"}, name)
        player.playVideo();
        interval = setInterval(moveSlider, 2000)
      }
    
      function pauseVideo() {
        if(!playing) return;
        playing = false;
        chatRoomChannel.to_all({type: "pause"}, name)
        player.pauseVideo();
        clearInterval(interval)
      }
    
    
      function changeTime(self) {
        console.log("changeTime");
        let goTo = player.getDuration() * (self.value / 100);
        chatRoomChannel.to_all({type: "update", goTo}, name)
        player.seekTo(goTo, true);
      }
    
      function changeVolume(self){
        player.setVolume(+self.value);
      }
    
      function sendMessage(e){
        e.preventDefault();
        let message =  $input.val();
        if(!message) return;
        chatRoomChannel.to_all({type: "chat message", message}, name)
        $input.val('');
        $messages.append(`<li class="me">${message}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }

})
