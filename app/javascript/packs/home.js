import "jquery"

$(async function () {
    $('#playbtn').click(()=>$('#id01').show());
    $('.close').click(()=>$('#id01').hide());
    $('.cancelbtn').click(()=>$('#id01').hide());    
})
