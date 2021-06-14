import Rails from "@rails/ujs"
import "jquery"

// 이거 때매!!!!!!!! link_to delete 메서드 적용 안됐다!!!!
Rails.start()    

$(async function () {
    $('#playbtn').click(()=>$('#id01').show());
    $('.close').click(()=>$('#id01').hide());
    $('.cancelbtn').click(()=>$('#id01').hide());    
})
