var socket;
var callState;
var phone = [];
(function (window, undefined) {
    $(function () {
        var $win = $('body');
        showmessage = function (msg, type) {
            var datetime = new Date();
            var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
            if (type) {
                var $p = $('<div>').appendTo($win.find('#div_msg'));
                var $type = $('<span>').text('[' + tiemstr + ']' + type + '：').appendTo($p);
                var $msg = $('<span>').addClass('thumbnail').css({ 'margin-bottom': '5px' }).text(msg).appendTo($p);
            } else {
                var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({ 'font-size': '12px' }).appendTo($win.find('#div_msg'));
            }
        };

		newSocket()

        $win.find('#refresh_clearcache').click(function () {
            $.yszrefresh();
        });

        $win.find('#btn_conn').attr('disabled', false);
        $win.find('.btn_close').attr('disabled', true);
			function getNow(s) {
			return s < 10 ? '0' + s: s;
			}
		function shijian(){
			
			
			var myDate = new Date();             
			
			var year=myDate.getFullYear();        //获取当前年
			var month=myDate.getMonth()+1;   //获取当前月
			var date=myDate.getDate();            //获取当前日
			
			
			var h=myDate.getHours();              //获取当前小时数(0-23)
			var m=myDate.getMinutes();          //获取当前分钟数(0-59)
			var s=myDate.getSeconds();
			
			var now=year+'-'+getNow(month)+"-"+getNow(date)+"-"+getNow(h)+'-'+getNow(m)+"-"+getNow(s);
			console.log(now)
			return now
		}
		function newSocket(openCallback){
			var url='ws://localhost?sid=789&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1'
			// var url = 'ws://localhost?sid='+parseInt((1.1+Math.random())*1000)+'&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1';//$win.find('#inp_url').val();
			socket = new WebSocket(url);
//          $win.find('#btn_conn').attr('disabled', true);
//          $win.find('.btn_close').attr('disabled', false);
		// 创建一个Socket实例
		
	   
		
//          showmessage('开始连接');
		// 打开Socket 
		socket.onopen = function (event) {
			debugger
			// 发送一个初始化消息
//              showmessage('连接成 功');
			if(!callState){
				var msg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}';
				socket.send(msg);
			
				if(openCallback)
					openCallback()
			}
		};
	   // 监听消息
		socket.onmessage = function(eve) {
			console.log(eve.data)
			if(eve.data){
				var data = JSON.parse(eve.data)
				console.log(data.type)
				if(data.type==703){
					$(".phoneNow").css('display','block')
				}
				if(data.rid==9){
					console.log('aaa1')
					$(".record1").attr('sendType',data.rid)
				}
				if(data.rid==16){
					console.log('aaa2')
					$(".record2").attr('sendType',data.rid)
				}
				if(data.rid==17){
					console.log('aaa3')
					$(".record3").attr('sendType',data.rid)
				}
				if (data.type == 704) {
					$('.phoneNow').css('display', 'none').attr('sendType',data.type)
					
					socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
					phone = []
					phonelinkName=''
					$('#phoneNow div p').html('  正在通话中...')
					// socket.close();
					callState = false
				}
				if (data.type == 707) {
					callState = true;
					phone.push(data.data.lParam)
					console.log(phone.join(''))
					$('#phoneNow div p').html('姓名:'+phonelinkName+'<br>号码:'+phone.join('')+'  正在通话中...')
				}
			}
			
			// callState = data.type
			// if(eve.data=='{"ret":0,"rid":9,"data":{"Ret":"0"}}'){
			// 	console.log('aaa4')
			// 	$(".record4").attr('sendType',eve.data)
			// }
		
		};
		// 监听Socket的关闭
		socket.onclose = function (event) {
			callState = false
			debugger
			socket = null;
//              showmessage('断开连接');
			console.log('断开连接')
			
			//socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
			phone= []
			$('#phoneNow div p').html('正在通话中...')
			$('#phoneNow').css('display','none')

			$win.find('#btn_conn').attr('disabled', false);
			$win.find('.btn_close').attr('disabled', true);
			
//              $('body').on('click','.mainbox .aClose',function(){
//              	alert('12121')
//              })
		};
		
		socket.onerror = function(event){
			console.log('error')
		}
		}
		var phonelinkName=''
        $win.find('#btn_conn').click(function () {
			debugger
            if(!socket){
			// console.log(111111111111111111111111)

			newSocket(dialog)
        }else{
			debugger
			if(!callState){
				dialog()

			}
		}
            
        

        
        });
        
        	$(window).bind('beforeunload', function (){
				debugger
        		$win.find('.mainbox').append('<a class="aClose" href="Webshell://hello" ></a>')
                $('.aClose')[0].click()
//				return '2131312';
				$('#phoneNow').css('display','none')
				phone = []
				$('#phoneNow div p').html('正在通话中...')
				if(socket){
					socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
					phone= []
					$('#phoneNow div p').html('正在通话中...')
		        setTimeout(function(){
		        	socket.close();	
		        },500)
				}
	});
        $win.find('.btn_close').click(function () {
			debugger
			callState = false
			$('#phoneNow').css('display','none')
			var  initMsg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
			if(socket&&initMsg){
				debugger
				
			
				socket.send(initMsg);
				socket.send('{"req":"HP_StopRecordFile","rid":17,"para":{}}')
				phone = []
				$('#phoneNow div p').html('正在通话中...')
				console.log($win.find('.record3').attr('sendType'))
				$(".record1").attr('sendType','')
				
				var int=window.setInterval(setTimeOut,500);
				function setTimeOut(){
					console.log($win.find('.record3').attr('sendType'))
					if(socket&&$win.find('.record3').attr('sendType')==17){
						
						// console.log(11111)
						socket.send(' {"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"0"}}')
						$(".phoneNow").attr('sendType','')
						$(".record1").attr('sendType','')
						$(".record2").attr('sendType','')
						$(".record3").attr('sendType','')
						// $win.find('.phoneNow').attr('sendType','')
						// $win.find('.recore1').attr('sendType','')
						// $win.find('.recore2').attr('sendType','')
						// $win.find('.record3').attr('sendType','')
						window.clearInterval(int)
						// 上传视频接口
						// $.ajax({
						//  url:'/my-dialog/create-dialog',
						//  type:'post',
						// })
						// }
						
						// socket.close();
	
					}
				}
			}







		    //if (socket) {
		    	// console.log(initMsg)
				// 结束录音并且关闭录音端口
				// socket.send('{"req":"HP_StopRecordFile","rid":17,"para":{}}')
				// socket.send(' {"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"0"}}')
				// socket.send( initMsg);
		    //    setTimeout(function(){
		    //    	 socket.close();
		    //    },500)
			   
			   // $.ajax({
				  //  url:'/upload-file',
				  //  type:'post',
			   // })
		    //}
		});
//      $win.find('.btn_close').click(function () {
//      	console.log('123456')
//          if (socket) {
//          	console.log('123456789')
//          	debugger
//          	var msg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
//          	socket.send(msg);
//          	
//              socket.close();
//              $('#phoneNow').css('display','none')
//          }
//      });
        $win.find('#btn_send').click(function () {
			debugger
            var msg = $win.find('#inp_send').val();
            if (socket && msg) {
                socket.send(msg);
                showmessage(msg, 'send');
                $win.find('#inp_send').val('');
            }
        });
        $win.find('#inp_send').keyup(function () {
			debugger
            if (event.ctrlKey && event.keyCode == 13) {
                $win.find('#btn_send').trigger('click');
            }
        });

        $win.find('#btn_clear').click(function () {
			debugger
            $win.find('#div_msg').empty();
        }); 

        function dialog(){
			debugger
            if(socket)
                socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}')

				setTimeout(function(){
					phone = []
					$('#phoneNow').css('display','block')
					$('#phoneNow div p').html('正在通话中...')
					console.log(phone)
					var phoneNum=$('#inp_send').val()
					 phonelinkName=$('#inp_send').attr('linkName')
					console.log(phoneNum,phoneNum.substring(0,1))
					if(phoneNum&&phoneNum.substring(0,1)==1){
						phoneNum='0'+phoneNum
					}
					if(phoneNum&&phoneNum.split('-')){
						debugger
						phoneNum=phoneNum.split('-').join('')
						// phoneNum=phoneNum.split('-')[0]+phoneNum.split('-')[1]
					}
					console.log(phoneNum)
					var msg = '{"req":"HP_StartDial","rid":5,"para":{"Para":"'+phoneNum+'"}}';
					// console.log(msg)
					// if (socket && msg) 
						// socket.send(msg);
					if (socket && msg) {
						socket.send(msg);
						socket.send('{"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"1"}}')

						var int=window.setInterval(setTimeOut,500);
						function setTimeOut(){
							console.log('s')
							if(socket&&$win.find('.record1').attr('sendType')==9){
								debugger
								window.clearInterval(int)
								$win.find('.record1').attr('sendType','')
									var musicName=$('#userName').val()+shijian()
									console.log('{"req":"HP_StartRecordFile","rid":16,"para":{"Para":"D:\\\\record\\\\'+musicName+'.wav"}}')
									debugger
									// {"req":"HP_StartRecordFile","rid":16,"para":{"Para":"C:\\record\\sound.wav"}}
									socket.send('{"req":"HP_StartRecordFile","rid":16,"para":{"Para":"D:\\\\record\\\\'+musicName+'.wav"}}')
							}
						}
					}

				},1000)

        }
    });



})(window);


