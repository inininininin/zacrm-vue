(function (window, undefined) {
    $(function () {
        var socket, $win = $('body');
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

        $win.find('#refresh_clearcache').click(function () {
            $.yszrefresh();
        });

        $win.find('#btn_conn').attr('disabled', false);
        $win.find('#btn_close').attr('disabled', true);

        $win.find('#btn_conn').click(function () {
            $win.find('#btn_conn').attr('disabled', true);
            $win.find('#btn_close').attr('disabled', false);
            var url='ws://localhost?sid=789&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1'
            // 创建一个Socket实例
            socket = new WebSocket(url);
            showmessage('开始连接');
            // 打开Socket 
            socket.onopen = function (event) {
                // 发送一个初始化消息
				var msg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}';
				socket.send(msg);
                showmessage('连接成功');
            };
            // 监听消息
            socket.onmessage = function (eve) {
				console.log(eve.data)
                showmessage(eve.data, 'receive');
                var data = JSON.parse(eve.data)
                if (data.type == 704) {
					$win.find('#inp_send').val('');
				}




            };
            // 监听Socket的关闭
            socket.onclose = function (event) {
                showmessage('断开连接');
                $win.find('#btn_conn').attr('disabled', false);
                $win.find('#btn_close').attr('disabled', true);
            };
        });
        $win.find('#btn_close').click(function () {
            if (socket) {
                socket.close();
            }
        });
        $win.find('#btn_clear').click(function () {
             $('#div_msg').html('')
        })
        $win.find('#btn_send').click(function () {
            // if (socket && $win.find('#inp_send').val()) {
            //     socket.send($win.find('#inp_send').val());
            //     showmessage($win.find('#inp_send').val(), 'send');
            //     $win.find('#inp_send').val('');
            // }
            socket.send($win.find('#inp_send').val());
            showmessage($win.find('#inp_send').val(), 'send');
			var phoneNum=$('#inp_send').val()
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
			socket.send(msg);
        });
        $win.find('#inp_send').keyup(function () {
            // if (event.keyCode == 13) {
            //     $win.find('#btn_send').trigger('click');
            //     socket.send($win.find('#inp_send').val());
            //     showmessage($win.find('#inp_send').val(), 'send');
            //     var phoneNum=$('#inp_send').val()
            //     if(phoneNum&&phoneNum.substring(0,1)==1){
            //         phoneNum='0'+phoneNum
            //     }
            //     if(phoneNum&&phoneNum.split('-')){
            //         debugger
            //         phoneNum=phoneNum.split('-').join('')
            //         // phoneNum=phoneNum.split('-')[0]+phoneNum.split('-')[1]
            //     }
            //     console.log(phoneNum)
            //     var msg = '{"req":"HP_StartDial","rid":5,"para":{"Para":"'+phoneNum+'"}}';
            //     socket.send(msg);
            // }
			
        });
    });
})(window);