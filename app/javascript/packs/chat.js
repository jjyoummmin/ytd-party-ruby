const url = window.location.href;
const video_id = [...url.match(/(?<=&video_id=).+$/)][0];

let player;
window.onYouTubeIframeAPIReady = () => {
  (async function () {
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
  })();
}

$(function () {
    //각종 이벤트 핸들러 등록하기
    //두번이상 참조되는 dom들은 따로 상수화
    const $mySidenav = $('#mySidenav');
    const sn = document.getElementById('mySidenav');
    const $main = $('#main');
    const $chatopen = $('.chatopen');
    const $messages = $('#messages');
    const $input = $('#input');
    const $slider = $('#slider');
  
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
  
    $('#playBtn').on('click', playVideo);
    $('#pauseBtn').on('click', pauseVideo);
    $('#form').on('submit', sendMessage);
    $('#slider').on('input', (e) => changeTime(e.target))
    $('#volume').on('input', (e) => changeVolume(e.target))

    function moveSlider(){
        let fraction = player.getCurrentTime() / player.getDuration() * 100;
        $slider.val(fraction);
      }
    
      function playVideo() {
        player.playVideo();
        setInterval(moveSlider, 200)
      }
    
      function pauseVideo() {
        player.pauseVideo();
        clearInterval(moveSlider)
      }
    
    
      function changeTime(self) {
        console.log("changeTime");
        let goTo = player.getDuration() * (self.value / 100);
        self.value = goTo;
        player.seekTo(goTo, true);
      }
    
      function changeVolume(self){
        player.setVolume(+self.value);
      }
    
      function sendMessage(e){
        e.preventDefault();
        let msg =  $input.val();
        if(!msg) return;
        $input.val('');
        $messages.append(`<li class="me">${msg}</li>`);
        sn.scrollTo(0,sn.scrollHeight);
      }

})
