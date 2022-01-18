$('#delete').css('height','100%')
$('#clear').hide()

$('#call').show()
$('#hangOff').hide()


var number,callId,callStatus='off',duration=0,timer;
function call(number_){
    if(callStatus!='off')
        return
    if(number_){
        number=number_
        $('.number').text(number_)
        callStatus='on'
        $('#call').hide()
        $('#hangOff').show()
        ws.send('{"cmd":"autorecord","value":"1"}')
        ws.send('{"cmd":"ATD","number":"'+(number_||'')+'","callid":"'+(callId||'')+'"}')
    }
}

function setCallrecord(callRecordUrl,recordFileUrl,heartBeatUrl){
    ws.send(
        `{
            "cmd": "setCallrecord","pid": "","userWid":"",
            "callrecordUrl":"${callRecordUrl}",
            "recordFileUrl":"${recordFileUrl}",
            "heartbeatUrl":"${heartBeatUrl}"
        }`
    )
}

function hangOff(){
    callStatus='off'
    $('#call').show()
    $('#hangOff').hide()
    number='';
    $('.number').text('')
    ws.send('{"cmd":"ATH"}')
    canClear()
    duration=0
    $('#duration').text('')
}

function dial(key){
    $('.number').text($('.number').text()+key)
    $('.number').scrollLeft($('.number')[0].scrollWidth)
    if($('.number')[0].scrollWidth > $('.number')[0].clientWidth)
        $('.number').attr('title',$('.number').text())
    else
        $('.number').attr('title','')
    
    canClear()
}

function delete_(key){
    number = $('.number').text()
    $('.number').text(number.substr(0,number.length-1))
    if($('.number')[0].scrollWidth > $('.number')[0].clientWidth)
        $('.number').attr('title',$('.number').text())
    else
        $('.number').attr('title','')

    canClear()
}

function clear_(){
    $('.number').text('')
    $('.number').attr('title','')

    canClear()
}

function canClear(){
    number = $('.number').text()
    if(number.length>0){
        $('#delete').css('height','70%')
        $('#clear').show().css('height','30%')
    }else{
        $('#delete').css('height','100%')
        $('#clear').hide()
    }
}



