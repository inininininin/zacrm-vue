$('#delete').css('height','100%')
$('#clear').hide()

$('#call,#barCall').show()
$('#hangOff,#barHangOff').hide()
showBar()

var number,callId,callStatus='off',duration=0,timer,pid=1,userWid,callRecordUrl,recordFileUrl,heartBeatUrl;
function showPad(){
    $('#bar').hide()
    $('#pad').show()

    if(window.parent!==window){
        var iframes = window.parent.document.getElementsByTagName('iframe')
        for (const i in iframes) {
            if(iframes[i].contentWindow===window){
                var initialHeight = iframes[i].initialHeight;
                iframes[i].style['height'] = initialHeight
                break;
            }
        }
    }
}
function showBar(){
    $('#bar').show()
    $('#pad').hide()
    debugger
    if(window.parent!==window){
        var iframes = window.parent.document.getElementsByTagName('iframe')
        for (const i in iframes) {
            if(iframes[i].contentWindow===window){
                iframes[i].initialHeight = iframes[i].style['height']
                iframes[i].style['height'] = '50px'
                break;
            }
        }
    }
}

function barNumberInput(){
    number=$('#barNumber').val()
    $('.number').text(number)
    isNumberOverflow()
    canClear()
}

function call(number_){
    if(callStatus!='off')
        return
    if(number_){
        number=number_
        // $('.number').text(number_)
        // $('#barNumber').val(number_)
        // callStatus='on'
        // $('#call,#barCall').hide()
        // $('#hangOff,#barHangOff').show()
        ws.send('{"cmd":"autorecord","value":"1"}')
        ws.send('{"cmd":"ATD","number":"'+(number_||'')+'","callid":"'+(callId||'')+'"}')
    }
}

function setCallbackUrl(pid,userWid,callRecordUrl,recordFileUrl,heartBeatUrl){
    ws.send(
        `{
            "cmd": "setCallrecord","pid": ${pid},"userWid":${userWid},
            "callrecordUrl":"${callRecordUrl}",
            "recordFileUrl":"${recordFileUrl}",
            "heartbeatUrl":"${heartBeatUrl}"
        }`
    )
}

function hangOff(){
    // callStatus='off'
    // $('#call,#barCall').show()
    // $('#hangOff,#barHangOff,#barDuration').hide()
    // number='';
    // $('.number').text(number)
    // $('#barNumber').val(number)
    // canClear()
    // duration=0
    // $('#duration,#barDuration').text('')
    ws.send('{"cmd":"ATH"}')
}

function dial(key){
    number=''+number+key
    $('.number').text(number)
    $('#barNumber').val(number)
    $('.number').scrollLeft($('.number')[0].scrollWidth)
    isNumberOverflow()
    canClear()
}

function delete_(key){
    number = number.substr(0,number.length-1)
    $('.number').text(number)
    $('#barNumber').val(number)
    isNumberOverflow()
    canClear()
}

function clear_(){
    number=''
    $('.number').text(number)
    $('#barNumber').val(number)
    $('.number').attr('title',number)

    canClear()
}

function canClear(){
    if(number.length>0){
        $('#delete').css('height','70%')
        $('#clear').show().css('height','30%')
    }else{
        $('#delete').css('height','100%')
        $('#clear').hide()
    }
}

function isNumberOverflow(){
    if($('.number')[0].scrollWidth > $('.number')[0].clientWidth)
        $('.number').attr('title',$('.number').text())
    else
        $('.number').attr('title','')
}

