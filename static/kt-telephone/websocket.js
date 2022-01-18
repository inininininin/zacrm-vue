wsInit()

var ws;
function wsInit(val){
	//重连先关闭
	if(val=='reConn'){
		ws.close();
	}
	 //document.getElementById("txt-ok").innerText="";
	 //document.getElementById("txt-e").innerText="";
	if("WebSocket" in window) {
	//var serverInfo = document.getElementById("serverInfo").value;
    var serverInfo = 'ws://127.0.0.1:8800/'
	// 打开一个 web socket，全局共用一个
	ws = new WebSocket(serverInfo);
	//console.log("已连接"+serverInfo);
	ws.onopen = function() {
		setTimeout(function(){
            ws.send('{"cmd":"LINK"}');
		},100);
	};
	ws.onmessage = function(evt) {
			 //document.getElementById("recMsg").value += evt.data+ "\n";
					var data = JSON.parse(evt.data);
		//console.log(data);
		switch(data['cmd']) {
			// 服务端ping客户端
			case 'USB':
				ws.send('{"cmd":"USB","connected":"true","success":"true","message":"成功"}');
				break;
			case 'CORG':
				ws.send('{"cmd":"CORG","number":"10010","success":"true","message":"成功"}');
                $('#call').hide()
                $('#hangOff').show()
                number=data['number']
                callId=data['callId']
                $('.number').text(number)
                callStatus='on'
				break;
			case 'CALLING':
				ws.send('{"cmd":"CALLING","number":"10010","success":"true","message":"成功"}');
				break;
			case 'CBEGIN':
				ws.send('{"cmd":"CBEGIN","success":"true","message":"成功"}');
                
                if(timer)
                    clearInterval(timer)
                timerFunction()
                timer = setInterval(timerFunction,1000)
                function timerFunction(){
                    duration=duration||0
                    duration++;
                    $('#duration').text(duration)
                }
				break;
			case 'ALERT':
				ws.send('{"cmd":"ALERT","success":"true","message":"成功"}');
				break;	
			case 'CEND':
				ws.send('{"cmd":"CEND","success":"true","message":"成功"}');
                $('#call').show()
                $('#hangOff').hide()
                number='';
                $('.number').text('')
                canClear()
                if(timer)
                    clearInterval(timer)
                callStatus='off'
                duration=0
                $('#duration').text('')
				break;	
		}
      	
		                   
		};
		//出现错误
		ws.onerror = function(evt){
			//console.log(evt);
		}
		//连接断开
		ws.onclose = function(evt){
			//console.log(evt)
		}
	} else {
		// 浏览器不支持 WebSocket
		alert("您的浏览器不支持 WebSocket!");
	}
}