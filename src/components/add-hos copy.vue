<template>
    <div id="add-hos">
        <a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a>
		<input type="" name="" id="inp_send" hidden="">
		<button id="btn_conn" hidden="">发送</button>

		<div class="thiscontent" style="display: none;">
			<div class="contentThis"></div>
		</div>
		<div class="mainbox">
			<div class="topselect">

				<h2 class="title">医院基本信息</h2> <button class="addHos" href="javascript:;">确认新增</button><button style="display: none;"
				 class="modifyHos" href="javascript:;">确认修改</button>
				<div class="selectOption">
					<span>医院名称 : </span><input class="hosname" type="text" placeholder="" />
					<!-- onkeyup="value=value.replace(/[^\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" -->
					<span>固定电话 : </span><input class="hostel" placeholder="" type='text' onkeyup="value=value.replace(/[^\d\-\d]/g,'')"
					 maxlength=20 />
					 
					 
					<!-- <i class="linkHos" style="margin-right: 15px;margin-left: -10px;display: none;cursor: pointer;" class="layui-icon">&#xe678;</i> -->
					<img src="../assets/img/connent.png" class="linkHos" style="margin-right: 15px;margin-left: -20px;display: none;cursor: pointer;width: 20px;height: 20px;">
					<!-- <span class="linkHos" style="margin-right: 20px;font-size: 14px;color: #337ab7;cursor: pointer;">联系医院</span> -->
					<span>区域 : </span>
					<select class="address province">
						<option value="">-省-</option>
					</select>
					<select class="address city">
						<option value="">-市-</option>
					</select>
					<select class="address town">
						<option value="">-区-</option>
					</select>
					<span>性质 : </span>
					<select class="hosnature">
						<option value="1" selected>民营医院</option>
						<option value="2">公立医院</option>
						
					</select>
					<button class="addNewTel">新增电话</button>
					<div class="linePhoneList">
						
						
					</div>
					<div class="hosIntroBox">
						<span>简介 : </span>
						<textarea class="hosIntro" rows="3" cols="20"></textarea>
					</div>
				</div>
			</div>
			<div class="showIs" style="display: none;">
				<div class=" addPeople">
					<h2>相关人员</h2>
				</div>
				<div class=" tableBoxLf">
					<table cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<th>拍板人</th>
								<th>职务</th>
								<th>手机</th>
								<th>如何确认</th>
								<th>固话</th>
							</tr>
						</thead>
						<tbody class="tbodyPaiban">
							<tr class="paibanren">
								<td class="enterHos">
									<div class="line-1 nameLink"></div>
								</td>
								<td>
									<div class="line-1 lookHis"></div>
								</td>
								<td>
									<div class="line-1 lookHis showInputBox" onmouseover="show('')" onmouseleave="showhidden()"></div>
								</td>
								<td>
									<div class="line-1 lookHis" onmouseover="show('')" onmouseleave="showhidden()"></div>
								</td>
								<td>
									<div class="line-1 lookHis showInputBoxTel" onmouseover="show('')" onmouseleave="showhidden()"></div>
								</td>
							</tr>
						</tbody>
					</table>
					<table cellpadding="0" cellspacing="0" style="margin-top: 40px;">
						<thead>
							<tr>
								<th>关联人</th>
								<th>职务</th>
								<th>手机</th>
								<th>如何确认</th>
								<th>固话</th>
							</tr>
						</thead>
						<tbody class="tbody">
                            <tr>
					            <td class="enterHos">
                                    <input type="text"/>
                                </td>
					            <td><input type="text"/></td>
					            <td>
                                    <div class="line-1 lookHis showInputBox" onmouseover="show" onmouseleave="showhidden()"></div>
                                </td>
					            <td>
                                    <input type="text"/>
                                </td>
                                <td>
                                    <div class="line-1 lookHis showInputBoxTel" onmouseover="show" onmouseleave="showhidden()"></div>
                                </td>
                            </tr>





                            <!-- <tr relId="res.data.itemList[i].customerWorkerId"  v-for="(item,inx) in tableList" :key="inx">
                                <td class="enterHos">
                                    <div class="line-1">{{item.name}}</div>
                                </td>
								<td>
                                    <div class="line-1 lookHis">res.data.itemList[i].post || ""</div>
                                </td>
								<td>
                                    <div class="line-1 lookHis showInputBox" :phone1="item.phone1" :phone2="item.phone2" :phone3="item.phone3">
										{{item.phoneAll}}
									</div>
                                </td>
								<td>
                                    <div class="line-1 lookHis" onmouseover="' + show2 +'" onmouseleave="showhidden()">
                                        {{item.verifyWay}}
									</div>
                                </td>
								<td>
                                    <div class="line-1 lookHis showInputBoxTel" :tel1="item.tel1" :tel2="item.tel2" ：tel3="item.tel3">
                                        {{item.telAll}}
									</div>
                                </td>
                            </tr> -->
						</tbody>
					</table>
					<div class="addNewRel">新增<i style="margin-left: 5px;" class="layui-icon">&#xe608;</i></div>
					<div class="supplyNewRel" style="display: none;"><button style="background: #FFFFFF;width: 100%;height: 100%;border: 0;">完成<i
							 style="margin-left: 5px;" class="layui-icon">&#x1005;</i></button></div>
				</div>
				<div class="tableBoxRt">

					<div><button class="lookAllTrack " style="float: left;height: 35px;line-height: 32px;margin-top: 2px;display:none;">查看所有人</button>
						<h2 class="trackName">所有人的跟踪记录</h2>
					</div>
					<div class="trackDetail muti">
						<!-- <ul>
							<li><span>感兴趣</span><span>2020-4-20 15：23</span></li>
							<li>这个医院的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。</li>
						</ul>
						<ul>
							<li><span>感兴趣</span><span>2020-4-20 15：23</span></li>
							<li>这个医院的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。。</li>
						</ul>
						<ul>
							<li><span>感兴趣</span><span>2020-4-20 15：23</span></li>
							<li>这个医院的人都很热情，很感兴趣。这的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。</li>
						</ul>
						<ul>
							<li><span>感兴趣</span><span>2020-4-20 15：23</span></li>
							<li>这个医院的人都很热情，很感兴趣。这的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。</li>
						</ul>
						<ul>
							<li><span>感兴趣</span><span>2020-4-20 15：23</span></li>
							<li>这个医院的人都很热情，很感兴趣。这的人都很热情，很感兴趣。这个医院的人都很热情，很感兴趣。</li>
						</ul> -->
					</div>
					<textarea class="talkShow" rows="" cols="" placeholder="请输入追踪记录"></textarea>
					<div class="selectQuick">
						<div><label><input type="checkbox" id="quickIs" name="quick" >加急</label></div>
						<div><label><input type="radio" name="interst" value="1">暂不感兴趣</label>
							<label><input type="radio" name="interst" value="2">初步感兴趣</label>
							<label><input type="radio" name="interst" value="3">非常感兴趣</label>
							<label><input type="radio" name="interst" value="4">近期可考察</label>
							<label><input type="radio" name="interst" value="5">线上可签单</label></div>
					</div>
					<div class="sendTrack">发送<i style="margin-left: 5px;" class="layui-icon">&#xe609;</i> </div>

				</div>
				<div style="clear: both;"></div>


			</div>

			<div class="showTips" style="display: none;cursor: pointer;">
				<a href="javascript:;" style="color: #FFFFFF;">历史</a>
				<div></div>
			</div>


			<div class="addphoen">
				<i class="layui-icon closeAdd">&#x1006;</i>
				<div><text>电话1:</text><input class="phoneInput1" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<div><text>电话2:</text><input class="phoneInput2" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<div><text>电话3:</text><input class="phoneInput3" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<span>完成</span>
			</div>
			<div class="addphoeShow">
				<i class="layui-icon closeAdd">&#x1006;</i>
				<div><text>电话1:</text>
					<p class="phoneps phonep1"></p>
				</div>
				<div><text>电话2:</text>
					<p class="phoneps phonep2"></p>
				</div>
				<div><text>电话3:</text>
					<p class="phoneps phonep3"></p>
				</div>
				<span>编辑电话</span>
			</div>
		</div>
		<div class="phoneNow">
			<div></div>
			<div>
				<p>正在通话中. . .</p>
				<div class="phoneEnd" id="btn_close">
					<img src="../assets/img/phoneEnd.png" alt="">
					<span>挂断电话</span>
				</div>
			</div>
		</div>
		<div class="addNewTelBox">
			<div></div>
			<div id="addNewTelMid">
				<div><p>新增/修改号码</p><i class="layui-icon closeAddThis">&#x1006;</i></div>
				<div class='divBox'><span>名称备注:</span><input class="telName" type="text"></div>
				<div class='divBox'><span>电话号码:</span><input class="telValue" type="text"></div>
				<button type="button" id='submit_newTel' typeId=''>提交</button>
			</div>
		</div>
    </div>
</template>
<script>
export default {
    name: 'add-hos',
	data () {
		return {
            provinceList:undefined,
            cityList:undefined,
            townList:undefined,
            cityItem:undefined,
            townItem:undefined,
            paiBanCustomerWorkerId:'',
            timerMove:'',
            customerId :GetQueryString('id'),
            levelLs:'',
            customerWorkerIdLs:'',
            modifyVal:'',
            time:'',
            customerWorkerIdZz:'',
            // 点击弹出修改号码
            timeIs : '',
            provinceText:undefined,
            cityText:undefined,
            tableList:[]
		}
    },
    activated(){
        let thisVue=this
        // 省市区三级联动
			// TODO 后期待优化
			$.ajax({
				url: './assets/js/area.json',
				type: 'get',
				async: false,
				success: function(res) {
					thisVue.provinceList = res
					$.each(res, function(i, field) {
						$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
					});
				}
            })
            
        $('#add-hos .province').change(function() {
				thisVue.provinceText = $(this).val();
				$.each(thisVue.provinceList, function(i, item) {
					if (thisVue.provinceText == item.value) {
						thisVue.cityItem = i;
						// return thisVue.cityItem
					}
				});
				thisVue.cityList = thisVue.provinceList[thisVue.cityItem]
				$('#add-hos .city').html('<option value="">-请选择-</option>')
				$('#add-hos .town').html('<option value="">-请选择-</option>')
				$.each(thisVue.cityList.children, function(i, item) {
					// addele(city,item.name)
					$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				// todo 要改的
				// $.ajax({
				// 	url: '/alter-my-info',
				// 	type: 'get',
				// 	async: false,
				// 	success: function(res) {
				// 		thisVue.provinceList = res
				// 		$.each(res, function(i, field) {
				// 			$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
				// 		});
				// 	}
				// })
				
				
            })
        $('#add-hos .city').change(function() {
				thisVue.cityText = $(this).val();
				$.each(thisVue.cityList.children, function(i, item) {
					if (thisVue.cityText == item.value) {
						thisVue.townItem = i;
						// return thisVue.cityItem
					}
				});
				thisVue.townList = thisVue.cityList.children[thisVue.townItem]
				$('#add-hos .town').html('<option value="">-请选择-</option>')
				$.each(thisVue.townList.children, function(i, item) {
					// addEle(city,item.name)
					$('#add-hos .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
        // 新增医院电话
			$('#add-hos .addNewTel').click(function(){
				$('#add-hos .addNewTelBox').css('display','block')
            })
        $('#add-hos #submit_newTel').click(function(){
				var telName=$('#add-hos .telName').val()
				var telValue=$('#add-hos .telValue').val()
				if($(this).attr('typeId')==''){
					var numberSec=$('#add-hos .linePhoneList').children().length;
					if(numberSec>=9){
						layer.msg('当前最多新增9个号码！如有更多需求！请联系软件部')
						return
					}else{
						var telNameTitle='tel'+(numberSec+1)+'Remark';
						var telValueTitle='tel'+(numberSec+1);
						thisVue.modifyHosTel(telNameTitle,telName,telValueTitle,telValue,0)
						thisVue.removeTel()
					}
					
				}else{
					var telNameTitle=$(this).attr('typeId')+'Remark';
					var telValueTitle=$(this).attr('typeId');
					var type=telValueTitle.substring(telValueTitle.length-1,telValueTitle.length)
					console.log(type)
					$('#add-hos #submit_newTel').attr('typeId','')
					thisVue.modifyHosTel(telNameTitle,telName,telValueTitle,telValue,type)
					thisVue.removeTel()
				}
            })
        $('#add-hos .linePhoneList').on('click','div .modifyThisTel',function(){
				$('#add-hos .addNewTelBox').css('display','block')
				$('#add-hos .telName').val($(this).parent().children().eq(0).html().substring(0,$(this).parent().children().eq(0).html().length-1)||'')
				$('#add-hos .telValue').val($(this).parent().children().eq(1).html()||'')
				var telNameTitle=$(this).parent().attr('typeId')+'Remark';
				var telValueTitle=$(this).parent().attr('typeId');
				$('#add-hos #submit_newTel').attr('typeId',telValueTitle)
            })
        $('#add-hos .closeAddThis').click(function(){
				$('#add-hos .addNewTelBox').css('display','none')
				thisVue.removeTel()
            })
        //打电话
			$('#add-hos .linePhoneList').on('click','div .phoneThisTel',function(){
				$('#add-hos #inp_send').val($(this).parent().children().eq(1).html()||'')
				$('#add-hos #btn_conn').click()
            })
        if ($('#add-hos .hostel').val() == '' || $('#add-hos .hostel').val() == null || $('#add-hos .hostel').val() == undefined) {
				$('#add-hos .linkHos').css('display', 'none')
			} else {
				$('#add-hos .linkHos').css('display', 'inline-block')
            }
        $('#add-hos .hostel').change(function() {
				if ($(this).val() != '') {
					$('#add-hos .linkHos').css('display', 'inline-block')
				} else {
					$('#add-hos .linkHos').css('display', 'none')
				}
            })
        $('#add-hos .linkHos').click(function() {
				$('#add-hos #inp_send').val($('#add-hos .hostel').val())
				$('#add-hos #btn_conn').click()
            })
        $('#add-hos .phoneps').click(function() {

				$('#add-hos #inp_send').val($(this).html())
				$('#add-hos #btn_conn').click()
				// lineFriends($(this).html())
            })
        $('#add-hos .closeThis').click(function() {
				$(this).parent().find('input').val('')
            })
        $('#add-hos .addphoen span').click(function() {
				$('#add-hos .addphoen').css('display', 'none')
				$('#add-hos .phonep1').html($('#add-hos .phoneInput1').val())
				$('#add-hos .phonep2').html($('#add-hos .phoneInput2').val())
				$('#add-hos .phonep3').html($('#add-hos .phoneInput3').val())
				$('#add-hos .addphoeShow').css('display', 'block')
				if ($('#add-hos .phoneInput1').val() != '' && $('#add-hos .phoneInput1').val() != null && $('#add-hos .phoneInput1').val() != undefined) {
					var phoneInput1 = $('#add-hos .phoneInput1').val()
					var  phones1=$('#add-hos .phoneInput1').val()
				} else {
					var phoneInput1 = ''
					var  phones1=''
				}
				if ($('#add-hos .phoneInput2').val() != '' && $('#add-hos .phoneInput2').val() != null && $('#add-hos .phoneInput2').val() != undefined) {
					if (phoneInput1 == '') {
						var phoneInput2 = $('#add-hos .phoneInput2').val()
					} else {
						var phoneInput2 = ',' + $('#add-hos .phoneInput2').val()
					}
					var  phones2=$('#add-hos .phoneInput2').val()
				} else {
					var phoneInput2 = ''
						var  phones2=''
				}
				if ($('#add-hos .phoneInput3').val() != '' && $('#add-hos .phoneInput3').val() != null && $('#add-hos .phoneInput3').val() != undefined) {
					if (phoneInput1 == '' && phoneInput2 == '') {
						var phoneInput3 = $('#add-hos .phoneInput3').val()
					} else {
						var phoneInput3 = ',' + $('#add-hos .phoneInput3').val()
					}
				var  phones3=$('#add-hos .phoneInput3').val()
				} else {
					var phoneInput3 = ''
					var  phones3=''
				}
				var id = $('#add-hos .addphoeShow').attr('id')
				var phones = phoneInput1 + phoneInput2 + phoneInput3
				if (id == '' || id == null || id == undefined) {
					
					$('#add-hos .jsModify').html(phoneInput1 + phoneInput2 + phoneInput3)
					if ($('#add-hos .jsModify').parent().parent().attr('class') == 'paibanren') {
						if ($('#add-hos .addphoeShow').attr('type') == 1) {
							$('#add-hos .jsModify').attr('phone1',(phones1||"")).attr('phone2',(phones2||"")).attr('phone3',(phones3||""))
							addpaibanPhone(thisVue.customerId, phones1,phones2,phones3)
						} else {
							$('#add-hos .jsModify').attr('tel1',(phones1||"")).attr('tel2',(phones2||"")).attr('tel3',(phones3||""))
							addpaibanTel(thisVue.customerId, phones1,phones2,phones3)
						}
					}else{
						if ($('#add-hos .addphoeShow').attr('type') == 1) {
							$('#add-hos .jsModify').attr('phone1',(phones1||"")).attr('phone2',(phones2||"")).attr('phone3',(phones3||""))
							// addRelPhone(thisVue.customerId, phones1,phones2,phones3)
						} else {
							$('#add-hos .jsModify').attr('tel1',(phones1||"")).attr('tel2',(phones2||"")).attr('tel3',(phones3||""))
							// addRelTel(thisVue.customerId, phones1,phones2,phones3)
						}
					}
				} else {
					if ($('#add-hos .addphoeShow').attr('type') == 1) {
						var params = '&phone1=' + phones1+'&phone2=' + phones2+'&phone3=' + phones3
							$('#add-hos .jsModify').attr('phone1',(phones1||"")).attr('phone2',(phones2||"")).attr('phone3',(phones3||""))
					} else {
						
						var params = '&tel1=' + phones1+'&tel2=' + phones2+'&tel3=' + phones3
						$('#add-hos .jsModify').attr('tel1',(phones1||"")).attr('tel2',(phones2||"")).attr('tel3',(phones3||""))
					}
					$.ajax({
						url: '/my-customer-worker/update-customer-worker',
						type: 'post',
						data: 'customerWorkerId=' + id + params,
						async: true,
						success: function(res) {
							$('#add-hos .jsModify').html(phoneInput1 + phoneInput2 + phoneInput3)
							// $('#add-hos .jsModify').removeClass('jsModify')
						},
					})
				}



            })
        $('#add-hos .addphoeShow span').click(function() {
				$('#add-hos .addphoeShow').css('display', 'none')
				var s = $('#add-hos .phonep1').html()
				$('#add-hos .phoneInput1').val($('#add-hos .phonep1').html())
				$('#add-hos .phoneInput2').val($('#add-hos .phonep2').html())
				$('#add-hos .phoneInput3').val($('#add-hos .phonep3').html())
				$('#add-hos .addphoen').css('display', 'block')
            })
        $('#add-hos .closeAdd').click(function() {
				$('#add-hos .addphoeShow').css('display', 'none')
				$('#add-hos .addphoen').css('display', 'none')
				$('#add-hos .phonep1').html('')
				$('#add-hos .phonep2').html('')
				$('#add-hos .phonep3').html('')
            })
        if (GetQueryString('id')) {
            debugger
				$('#add-hos .addNewTel').css('display','inline-block')
				thisVue.hosDetail(GetQueryString('id'))
				thisVue.relList(GetQueryString('id'))
				$('#add-hos .addHos').css('display', 'none')
				$('#add-hos .modifyHos').css('display', 'inline-block')
				$('#add-hos .showIs').css('display', 'block')
            }
        $('#add-hos .showTips').on('mouseleave', function() {
				setTimeout(function() {
					$('#add-hos .showTips').css('display', 'none')
					$('#add-hos .showTips  div').html('')
				}, 1000)
            })
        $('#add-hos .showTips').hover(function() {
				clearTimeout(thisVue.timerMove)
            })
        $('#add-hos .showTips a').click(function() {
				$('#add-hos .showTips').css('display', 'none')
				$('#add-hos .showTips  div').html('')
				clearTimeout(thisVue.time);
				//执行延时
				thisVue.time = setTimeout(function() {
					$.ajax({
						url: '/my-customer-worker-snapshot-list',
						type: 'GET',
						data: 'customerWorkerId=' + thisVue.customerWorkerIdLs,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								$('#add-hos .contentThis').html('')

								// var content='<div class="thiscontent">111</div>'
								for (var i in res.data.itemList) {
									if (thisVue.levelLs == 0) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].name || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisVue.levelLs == 1) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].post || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisVue.levelLs == 2) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].phone || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisVue.levelLs == 3) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].verifyWay || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisVue.levelLs == 4) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].tel || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}

								}
								layer.open({
									type: 1,
									content: $('#add-hos .thiscontent').html() //这里content是一个普通的String
								});
							}
						}
					})
					//do function在此处写单击事件要执行的代码
				}, 300);

            })
        $('#add-hos .tbodyPaiban').on('dblclick', 'tr td', function() {

				if ($(this).children().attr('type') && $(this).children().attr('type') == 'text') {
					thisVue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisVue.time)
				} else if ($(this).index() == 2 || $(this).index() == 4) {
					// 弹出输入框
					// $('#add-hos .addphoeShow').attr('id','')

					// $('#add-hos .addphoeShow').css('display','block').attr('id',$(this).parent().attr('relId'))
					// $('#add-hos table').find('.jsModify').removeClass('jsModify')
					// $(this).children().addClass('jsModify')
					// var phones=$(this).children().html().split(',')

					// for(var i in phones){
					// 	var num=parseInt(i)+1
					// 	$('#add-hos .phonep'+num).html(phones[i])
					// }
				} else {
					thisVue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisVue.time)
					// $(this).html('<input type="text"  class="modifyThis" onchange="modifyOver('+$(this).parent().attr("relId")+',this)" value="'+$(this).children().html()+'"/>')
					$(this).html('<input type="text" level="' + $(this).index() + '"  class="modifyThisPaiban"  value="' + $(this).children()
						.html() + '"/>')
					$('#add-hos .modifyThisPaiban').focus()
					showhidden()
				}
            })
        $('#add-hos table').on('blur', 'tr .modifyThisPaiban', function() {
				var level = $(this).attr('level')
				if (level == 0) {
					var param = '&name=' + $(this).val()
				}
				if (level == 1) {
					var param = '&post=' + $(this).val()
				}
				if (level == 2) {
					var param = '&phone=' + $(this).val()
				}
				if (level == 3) {
					var param = '&verifyWay=' + $(this).val()
				}
				if (level == 4) {
					var param = '&tel=' + $(this).val()
				}
				if (thisVue.paiBanCustomerWorkerId == '' || thisVue.paiBanCustomerWorkerId == null || thisVue.paiBanCustomerWorkerId == undefined) {
					var _this = $(this)
					var show = "show('" + _this.val() + "')"
					$.ajax({
						url: '/my-customer-worker/create-customer-worker',
						type: 'post',
						data: 'customerId=' + thisVue.customerId + param,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								thisVue.paiBanCustomerWorkerId = res.data.customerWorkerId
								_this.parent().parent().attr('relId', thisVue.paiBanCustomerWorkerId)
								$.ajax({
									url: '/my-customer/update-customer',
									type: 'post',
									data: 'customerId=' + thisVue.customerId + '&paiBanCustomerWorkerId=' + thisVue.paiBanCustomerWorkerId,
									async: true,
									success: function(res) {
										if (res.code == 0) {
											if (level == 0) {
												_this.parent().html('<div class="line-1" onmouseover="' + show + '" onmouseleave="showhidden()">' +
													_this.val() + '</div>')
											} else if (level == 2) {
												_this.parent().html('<div class="line-1 lookHis showInputBox" onmouseover="' + show +
													'" onmouseleave="showhidden()">' + _this.val() + '</div>')
											} else if (level == 4) {
												_this.parent().html('<div class="line-1 lookHis showInputBoxTel" onmouseover="' + show +
													'" onmouseleave="showhidden()">' + _this.val() + '</div>')
											} else {
												_this.parent().html('<div class="line-1 lookHis" onmouseover="' + show +
													'" onmouseleave="showhidden()">' + _this.val() + '</div>')
											}
										} else {
											layer.msg(res.codeMsg)
										}
									}
								})
							} else {
								layer.msg(res.codeMsg)
							}
						}
					})
				} else {
					var customerWorkerId = $(this).parent().parent().attr('relid')
					var show = "show('" + $(this).val() + "')"
					var _this = $(this)
					$.ajax({
						url: '/my-customer-worker/update-customer-worker',
						type: 'post',
						data: 'customerWorkerId=' + customerWorkerId + param,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								if (level == 0) {
									_this.parent().html('<div class="line-1" onmouseover="' + show + '" onmouseleave="showhidden()">' + _this
										.val() + '</div>')
								} else if (level == 2) {
									_this.parent().html('<div class="line-1 lookHis showInputBox" onmouseover="' + show +
										'" onmouseleave="showhidden()">' + _this.val() + '</div>')
								} else if (level == 4) {
									_this.parent().html('<div class="line-1 lookHis showInputBoxTel" onmouseover="' + show +
										'" onmouseleave="showhidden()">' + _this.val() + '</div>')
								} else {
									_this.parent().html('<div class="line-1 lookHis" onmouseover="' + show + '" onmouseleave="showhidden()">' +
										_this.val() + '</div>')
								}
							} else {
								layer.msg(res.codeMsg)
							}
						},
					})
				}

            })
        $('#add-hos .tbody').on('dblclick', 'tr td', function() {

				if ($(this).children().attr('type') && $(this).children().attr('type') == 'text') {
					thisVue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisVue.time)
				} else if ($(this).index() == 2 || $(this).index() == 4) {
					// 弹出输入框
					// $('#add-hos .addphoeShow').attr('id','')

					// $('#add-hos .addphoeShow').css('display','block').attr('id',$(this).parent().attr('relId'))
					// $('#add-hos table').find('.jsModify').removeClass('jsModify')
					// $(this).children().addClass('jsModify')
					// var phones=$(this).children().html().split(',')

					// for(var i in phones){
					// 	var num=parseInt(i)+1
					// 	$('#add-hos .phonep'+num).html(phones[i])
					// }
				} else {
					thisVue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisVue.time)
					$(this).html('<input type="text" level="' + $(this).index() + '"  class="modifyThis"  value="' + $(this).children()
						.html() + '"/>')
					$('#add-hos .modifyThis').focus()
					thisVue.showhidden()
				}
				// $(this).html('<input type="text"  class="modifyThis" onchange="modifyOver('+$(this).parent().attr("relId")+',this)" value="'+$(this).children().html()+'"/>')

            })
        $('#add-hos table').on('blur', 'tr .modifyThis', function() {
				var level = $(this).attr('level')
				if (level == 0) {
					var param = '&name=' + $(this).val()
				}
				if (level == 1) {
					var param = '&post=' + $(this).val()
				}
				if (level == 2) {
					var param = '&phone=' + $(this).val()
				}
				if (level == 3) {
					var param = '&verifyWay=' + $(this).val()
				}
				if (level == 4) {
					var param = '&tel=' + $(this).val()
				}
				var customerWorkerId = $(this).parent().parent().attr('relid')
				var show = "show('" + $(this).val() + "')"
				var _this = $(this)
				$.ajax({
					url: '/my-customer-worker/update-customer-worker',
					type: 'post',
					data: 'customerWorkerId=' + customerWorkerId + param,
					async: true,
					success: function(res) {
						if (level == 0) {
							_this.parent().html('<div class="line-1" onmouseover="' + show + '" onmouseleave="showhidden()">' + _this.val() +
								'</div>')
						} else {
							_this.parent().html('<div class="line-1 lookHis" onmouseover="' + show + '" onmouseleave="showhidden()">' +
								_this.val() + '</div>')
						}

					},
				})
            })
        $('#add-hos .trackDetail').scrollTop($('#add-hos .trackDetail')[0].scrollHeight);
        // 新增相关人员
			$('#add-hos .addNewRel').click(function() {
				var show = "show('')"
				// $('#add-hos .tbody').append('<tr>' +
				// 	'<td class="enterHos"><input type="text"/></td>' +
				// 	'<td><input type="text"/></td>' +
				// 	'<td><div class="line-1 lookHis showInputBox" onmouseover="' + show +
				// 	'" onmouseleave="showhidden()"></div></td>' +
				// 	// '<td><input type="tel"/></td>' +
				// 	'<td><input type="text"/></td>' +
				// 	'<td><div class="line-1 lookHis showInputBoxTel" onmouseover="' + show +
				// 	'" onmouseleave="showhidden()"></div></td></tr>')
				// '<td><input type="tel showInputBoxTel"/></td></tr>')
				$(this).css('display', 'none')
				$('#add-hos .supplyNewRel').css('display', 'block')
            })
        // TODO 新增相关人员

			$('#add-hos .supplyNewRel button').click(function() {
				$(this).attr('disabled', 'true')
				var name = $('#add-hos .tbody').find(':input:eq(0)').val()
				var post = $('#add-hos .tbody').find(':input:eq(1)').val()
				// var phone = $('#add-hos .tbody').find(':input:eq(2)').val()
				var phone = $('#add-hos .tbody').children('tr:last-child').find('.showInputBox').html()
				var verifyWay = $('#add-hos .tbody').find(':input:eq(2)').val()
				var tel = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').html()
				var phone1=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone1')||""
				var phone2=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone2')||""
				var phone3=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone3')||""
				var tel1 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel1')||""
				var tel2 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel2')||""
				var tel3 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel3')||""
				// var tel = $('#add-hos .tbody').find(':input:eq(3)').val()
				var paiBan = ''
				var _this = $(this)
				if (name == '') {
					layer.msg('请将相关人员姓名')
					$('#add-hos .supplyNewRel button').attr('disabled', false)
				} else {
					if (thisVue.customerId == '' || thisVue.customerId == null || thisVue.customerId == undefined) {
						layer.msg('请先点击医院提交信息按钮')
						$('#add-hos .supplyNewRel button').attr('disabled', false)
					} else {
						$.ajax({
							url: '/my-customer-worker/create-customer-worker',
							type: 'post',
							data: 'name=' + name + '&tel1=' + tel1+ '&tel2=' + tel2+ '&tel3=' + tel3 + '&post=' + post + '&paiBan=' + paiBan + '&verifyWay=' + verifyWay +
								'&phone1=' + phone1 +'&phone2=' + phone2 +'&phone3=' + phone3 + '&customerId=' + thisVue.customerId,
							async: true,
							success: function(res) {
								if (res.code == 0) {
									// layer.msg('添加成功')
									// window.history.refresh()
									var show1 = "show('" + phone + "')"
									var show2 = "show('" + verifyWay + "')"
									var show3 = "show('" + tel + "')"
									$('#add-hos .tbody').children("tr:last-child").remove()
									$('#add-hos .tbody').append('<tr relId="' + res.data.customerWorkerId +
										'"><td class="enterHos"><div class="line-1">' + name + '</div></td>' +
										'<td><div class="line-1 lookHis">' + post + '</div></td>' +
										'<td><div class="line-1 lookHis showInputBox" phone1="'+phone1+'"  phone2="'+phone2+'"  phone3="'+phone3+'" onmouseover="' + show1 + '" onmouseleave="showhidden()">' +
										phone +
										'</div></td>' +
										'<td><div class="line-1 lookHis" onmouseover="' + show2 + '" onmouseleave="showhidden()">' + verifyWay +
										'</div></td>' +
										'<td><div class="line-1 lookHis showInputBoxTel"  tel1="'+tel1+'"  tel2="'+tel2+'"  tel3="'+tel3+'" onmouseover="' + show3 +
										'" onmouseleave="showhidden()">' + tel +
										'</div></td></tr>')
									_this.parent().css('display', 'none')
									$('#add-hos .supplyNewRel button').attr('disabled', false)
									$('#add-hos .addNewRel').css('display', 'block')
								}
							}
						})
					}

				}



            })
        // 查看某人对应追踪
			$('#add-hos tbody').on('click', 'tr .enterHos', function() {
				$('#add-hos .tableBoxLf').find('.enterHos').parent().css('background', '#fff')
				// $(this).parent().parent().parent().parent().find('.enterHos').parent().css('background','#fff')
				$(this).parent().css('background', 'rgba(229,229,229,0.5)')
				thisVue.customerWorkerIdZz = $(this).parent().attr('relId')
				$('#add-hos .trackName').html(`<span style="color:red;">${$(this).children().html()}</span>` + '的跟踪记录')
				thisVue.trackrelList(thisVue.customerId, thisVue.customerWorkerIdZz, 1)
            })
        // 提交追踪
			$('#add-hos .sendTrack').click(function() {
				var interst = $("#add-hos input[name='interst']:checked").val();
				if (interst == 1) {
					var interstName = '暂不感兴趣'
				} else if (interst == 2) {
					var interstName = '初步感兴趣'
				} else if (interst == 3) {
					var interstName = '非常感兴趣'
				} else if (interst == 4) {
					var interstName = '近期可考察'
				} else if (interst == 5) {
					var interstName = '线上可签单'
				}
				var nowtime = Date.parse(new Date())
				var content = $('#add-hos .talkShow').val()
				var quickIs = $("#add-hos #quickIs").is(":checked")
				if(quickIs===true){
					quickIs=1
				}else{
					quickIs=0
				}
				console.log($("#add-hos #quickIs").is(":checked"))
				if (thisVue.customerWorkerIdZz == '' || thisVue.customerWorkerIdZz == null || thisVue.customerWorkerIdZz == undefined) {
					layer.msg('请选择追踪人员')
				} else if (interst == '' || interst == null || interst == undefined) {
					layer.msg('请选择感兴趣程度')
				} else {
					$.ajax({
						url: '/my-customer/update-customer',
						type: 'post',
						data: 'customerId=' + thisVue.customerId + '&urgent=' + quickIs,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								$("#add-hos #quickIs").attr('checked',false)
							} else {
								layer.msg(res.codeMsg)
							}
						}
					})

					$.ajax({
						url: '/my-customer-worker-trace/create-customer-worker-trace',
						type: 'post',
						data: 'customerWorkerId=' + thisVue.customerWorkerIdZz + '&content=' + content + '&level=' + interst,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								$('#add-hos .trackDetail').append('<ul>' +
									'<li><span>' + ($('#add-hos .trackName span').html()||"") + '</span><span>' + interstName + '</span><span>' +
									changeDateFormat(nowtime) + '</span></li>' +
									'<li>' + content + '</li>' +
									'</ul>')
								$('#add-hos .trackDetail').scrollTop($('#add-hos .trackDetail')[0].scrollHeight);
								$('#add-hos .talkShow').val('')
								$('#add-hos .quickIs').attr("checked", false)
								$("#add-hos input[name='interst']").removeAttr("checked");

							} else {
								layer.msg(res.codeMsg)
							}
						}
					})
				}
            })
        // 修改医院

			$('#add-hos .modifyHos').click(function() {
				$('#add-hos .modifyHos').attr('disabled', "true");
				thisVue.modifyNewHos()
            })
        // TODO 新增医院
			// /my-customer/create-customer
			$('#add-hos .addHos').click(function() {
				$('#add-hos .addHos').attr('disabled', "true");

				thisVue.addNewHos()
            })
        thisVue.trackrelList(thisVue.customerId, '', 1)
			// 跟踪记录
			$('#add-hos .lookAllTrack').click(function() {
				
				$('#add-hos .trackName').html('所有人的跟踪记录')
				thisVue.trackrelList(thisVue.customerId, '', 1)
			})
			
			// $('#add-hos body').click(function(e){
			// 	console.log(e.target.id)
			// 	if (e.target.id.length) {
			// 	                thisVue.closePopWindow()
			// 	            }
				
            // })
        $.getJSON("./assets/js/area.json", function(res) {
				thisVue.provinceList = res
				// $('#add-hos .province').html('<option value="">-请选择-</option>')
				$.each(res, function(i, field) {

					$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
					// $("#add-hos span").append(field.name + "," + field.goods);
				});
			});

			$('#add-hos .province').change(function() {
				thisVue.provinceText = $(this).val();
				$.each(thisVue.provinceList, function(i, item) {
					if (thisVue.provinceText == item.value) {
						thisVue.cityItem = i;
						// return thisVue.cityItem
					}
				});
				thisVue.cityList = thisVue.provinceList[thisVue.cityItem]
				$('#add-hos .city').html('<option value="">-市-</option>')
				$('#add-hos .town').html('<option value="">-区-</option>')
				$.each(thisVue.cityList.children, function(i, item) {
					// addele(city,item.name)
					$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
        $('#add-hos .city').change(function() {
				thisVue.cityText = $(this).val();
				$.each(thisVue.cityList.children, function(i, item) {
					if (thisVue.cityText == item.value) {
						thisVue.townItem = i;
						// return thisVue.cityItem
					}
				});
				thisVue.townList = thisVue.cityList.children[thisVue.townItem]
				$('#add-hos .town').html('<option value="">-区-</option>')
				$.each(thisVue.townList.children, function(i, item) {
					// addEle(city,item.name)
					$('#add-hos .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
        $('#add-hos tbody').on('click', 'tr .showInputBox', function(){
				clearTimeout(thisVue.timeIs)
				var thisHtml = $(this).html()
				var _this_=$(this)
				thisVue.closePopWindow()
				thisVue.timeIs = setTimeout(function() {
					if (thisHtml && thisHtml.split(',').length == 1) {
						$('#add-hos #inp_send').val(_this_.attr('phone1')||_this_.attr('phone2')||_this_.attr('phone3')||"")
						// $('#add-hos #inp_send').val(thisHtml)
						$('#add-hos #btn_conn').click()
					} else {
						$('#add-hos .addphoeShow').attr('id', '')
						$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 1)
						$('#add-hos table').find('.jsModify').removeClass('jsModify')
						_this_.addClass('jsModify')
						// if()
						// var phones = thisHtml.split(',')
						// for (var i in phones) {
						// 	var num = parseInt(i) + 1
						// 	$('#add-hos .phonep' + num).html(phones[i])
						// }
						$('#add-hos .phonep1').html(_this_.attr('phone1')||'')
						$('#add-hos .phonep2').html(_this_.attr('phone2')||'')
						$('#add-hos .phonep3').html(_this_.attr('phone3')||'')
					}
				}, 300)
            })
        $('#add-hos tbody').on('dblclick', 'tr .showInputBox', function() {
				clearTimeout(thisVue.timeIs)
				var thisHtml = $(this).html()
				var _this_=$(this)
				thisVue.closePopWindow()
				if (thisHtml && thisHtml.split(',').length == 1) {
					$('#add-hos .addphoeShow').attr('id', '')
					$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 1)
					$('#add-hos table').find('.jsModify').removeClass('jsModify')
					_this_.addClass('jsModify')
					$('#add-hos .phonep1').html(_this_.attr('phone1')||_this_.attr('phone2')||_this_.attr('phone3')||'')
				} else {
					$('#add-hos .addphoeShow').attr('id', '')
					$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 1)
					$('#add-hos table').find('.jsModify').removeClass('jsModify')
					_this_.addClass('jsModify')
					// var phones = thisHtml.split(',')
					// for (var i in phones) {
					// 	var num = parseInt(i) + 1
					// 	$('#add-hos .phonep' + num).html(phones[i])
					// }
					$('#add-hos .phonep1').html(_this_.attr('phone1')||'')
					$('#add-hos .phonep2').html(_this_.attr('phone2')||'')
					$('#add-hos .phonep3').html(_this_.attr('phone3')||'')
				}
            })
        $('#add-hos tbody').on('click', 'tr .showInputBoxTel', function() {
				thisVue.closePopWindow()
				var thisHtml = $(this).html()
				
				var _this_=$(this)
				clearTimeout(thisVue.timeIs)
				thisVue.timeIs = setTimeout(function() {
					if (thisHtml && thisHtml.split(',').length == 1) {
						// lineFriends($(this).html())		
						$('#add-hos #inp_send').val(_this_.attr('tel1')||_this_.attr('tel2')||_this_.attr('tel3')||"")
						$('#add-hos #btn_conn').click()
					} else {
						$('#add-hos .addphoeShow').attr('id', '')
						$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 2)
						$('#add-hos table').find('.jsModify').removeClass('jsModify')
						_this_.addClass('jsModify')
						// var phones = thisHtml.split(',')
						// for (var i in phones) {
						// 	var num = parseInt(i) + 1
						// 	$('#add-hos .phonep' + num).html(phones[i])
						// }
						
						$('#add-hos .phonep1').html(_this_.attr('tel1')||'')
						$('#add-hos .phonep2').html(_this_.attr('tel2')||'')
						$('#add-hos .phonep3').html(_this_.attr('tel3')||'')
						// alert(_this_.attr('tel1'))
					}
				}, 300)
            })
        $('#add-hos tbody').on('dblclick', 'tr .showInputBoxTel', function() {
				clearTimeout(thisVue.timeIs)
				thisVue.closePopWindow()
				var _this_=$(this)
				var thisHtml = $(this).html()
				if (thisHtml && thisHtml.split(',').length == 1) {
					$('#add-hos .addphoeShow').attr('id', '')
					$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 2)
					$('#add-hos table').find('.jsModify').removeClass('jsModify')
					_this_.addClass('jsModify')
					$('#add-hos .phonep1').html(_this_.attr('tel1')||_this_.attr('tel2')||_this_.attr('tel3')||"")
				} else {
					$('#add-hos .addphoeShow').attr('id', '')
					$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 2)
					$('#add-hos table').find('.jsModify').removeClass('jsModify')
					_this_.addClass('jsModify')
					// var phones = thisHtml.split(',')
					// for (var i in phones) {
					// 	var num = parseInt(i) + 1
					// 	$('#add-hos .phonep' + num).html(phones[i])
					// }
					$('#add-hos .phonep1').html(_this_.attr('tel1')||'')
					$('#add-hos .phonep2').html(_this_.attr('tel2')||'')
					$('#add-hos .phonep3').html(_this_.attr('tel3')||'')
				}
			})
	},
    methods:{
        modifyHosTel(telNameTitle,telName,telValueTitle,telValue,type){
            let thisVue=this
				var param=telNameTitle+'='+telName+'&'+telValueTitle+'='+ telValue
				console.log(param)
				$.ajax({
					url: '/my-customer/update-customer',
					type: 'post',
					data: param+ '&customerId=' + thisVue.customerId,
					async: true,
					success: function(res) {
						if (res.code == 0) {
							layer.msg('操作成功')
							if(type==0){
								$('#add-hos .linePhoneList').append('<div typeId='+telNameTitle+'>'+
								'<span>'+telName+':</span>'+
								'<span>'+telValue+'</span>'+
								'<img class="phoneThisTel"  src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}else{
								$('#add-hos .linePhoneList').children().eq(type-1).html('<span>'+telName+':</span>'+
								'<span>'+telValue+'</span>'+
								'<img class="phoneThisTel"  src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">').attr('typeId',telNameTitle)
								
								// html('<div typeId='+telNameTitle+'>'+
								// '<span>'+telName+':</span>'+
								// '<span>'+telValue+'</span>'+
								// '<img class="phoneThisTel"  src="./assets/img/connent.png" alt="">'+
								// '<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// // '<img src="./assets/img/delete.svg" alt="">'+
								// '</div>')
							}
							
							// window.history.refresh()
						}
					}
				})
            },
            removeTel(){
                let thisVue=this
				$('#add-hos .telName').val('')
				$('#add-hos .telValue').val('')
				$('#add-hos .submit_newTel').attr('typeId','')
				$('#add-hos .addNewTelBox').css('display','none')
            },
        show(val) {
            let thisVue=this
				// clearTimeout(thisVue.timerMove)
				// if(val==null||val==''||val==undefined){
				// 	val=''
				// }
				// $('#add-hos .showTips').html(val).css('display', 'block')	
            },
        showhidden() {
            let thisVue=this
				thisVue.timerMove = setTimeout(function() {
					$('#add-hos .showTips').css('display', 'none')
					$('#add-hos .showTips  div').html('')
				}, 1000)
            },
        modifyNewHos() {
            let thisVue=this
				var name = $('#add-hos .hosname').val()
				var tel = $('#add-hos .hostel').val()
				var nature = $('#add-hos .hosnature  option:selected').val()
				var hosIntro = $('#add-hos .hosIntro').val()
				var area1Id = $('#add-hos .province option:selected').val()
				var area1Name = $('#add-hos .province option:selected').text()
				var area2Id = $('#add-hos .city option:selected').val()
				var area2Name = $('#add-hos .city option:selected').text()
				var area3Id = $('#add-hos .town option:selected').val()
				var area3Name = $('#add-hos .town option:selected').text()
				// if (area1Id == '' || area2Id == '' || area3Id == '') {
				// 	layer.msg('请选择医院所在地区')
				// } else if (nature == '') {
				// 	layer.msg('请选择医院性质')
				// } else 
				if (name == '') {
					layer.msg('请填写医院名')
					$('#add-hos .modifyHos').attr('disabled', false);
				} else {
					$.ajax({
						url: '/my-customer/update-customer',
						type: 'post',
						data: 'name=' + name + '&tel=' + tel + '&nature=' + nature + '&area1Id=' + area1Id + '&area2Id=' + area2Id +
							'&area3Id=' + area3Id + '&area1Name=' + area1Name + '&area2Name=' + area2Name + '&area3Name=' + area3Name +
							'&brief=' + hosIntro + '&customerId=' + thisVue.customerId,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								layer.msg('操作成功')

								$('#add-hos .modifyHos').attr('disabled', false);
								// window.history.refresh()
							}
						}
					})
				}
        },
        addNewHos() {
            let thisVue=this
				var name = $('#add-hos .hosname').val()
				var tel = $('#add-hos .hostel').val()
				var nature = $('#add-hos .hosnature  option:selected').val()
				var hosIntro = $('#add-hos .hosIntro').val()
				var area1Id = $('#add-hos .province option:selected').val()
				var area1Name = $('#add-hos .province option:selected').text()
				var area2Id = $('#add-hos .city option:selected').val()
				var area2Name = $('#add-hos .city option:selected').text()
				var area3Id = $('#add-hos .town option:selected').val()
				var area3Name = $('#add-hos .town option:selected').text()
				if (name == '') {

					layer.msg('请填写医院名')
					$('#add-hos .addHos').attr('disabled', false);
					// }
					// if (area1Id == '' || area2Id == '' || area3Id == '') {
					// 	layer.msg('请选择医院所在地区')
					// } else if (nature == '') {
					// 	layer.msg('请选择医院性质')
					// } else if (name == '' || tel == '') {
					// 	layer.msg('请填写医院名和固话')
				} else {
					$.ajax({
						url: '/my-customer/create-customer',
						type: 'post',
						data: 'name=' + name + '&tel=' + tel + '&nature=' + nature + '&area1Id=' + area1Id + '&area2Id=' + area2Id +
							'&area3Id=' + area3Id + '&area1Name=' + area1Name + '&area2Name=' + area2Name + '&area3Name=' + area3Name +
							'&brief=' + hosIntro,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								layer.msg('操作成功')

                                thisVue.$router.push({path:'add-hos',query:{id:res.data.customerId}})
								thisVue.customerId = res.data.customerId
								$('#add-hos .addHos').attr('disabled', false);
								// window.history.refresh()
							} else {
								layer.msg(res.codeMsg)
							}
						}
					})
				}
            },
        // 医院详情列表
        hosDetail(customerId) {
            let thisVue=this
				$.ajax({
					url: '/my-customer/customer',
					type: 'GET',
					data: 'customerId=' + customerId,
					async: false,
					success: function(res) {
						if (res.code == 0) {
							document.title = res.data.name + " - " + document.title
							$('#add-hos .hosname').val(res.data.name)
							$('#add-hos .hosIntro').val(res.data.brief)
							$('#add-hos .hostel').val(res.data.tel)
							$('#add-hos .hosnature').val(res.data.nature)
							if (res.data.tel != '' && res.data.tel != null && res.data.tel != undefined) {
								$('#add-hos .linkHos').css('display', 'inline-block')
							}
							thisVue.paiBanCustomerWorkerId = res.data.paiBanCustomerWorkerId
							$('#add-hos .paibanren').attr('relId', res.data.paiBanCustomerWorkerId || '')
							if (res.data.paiBanCustomerWorkerName) {
								$('#add-hos .paibanren').children().eq(0).children().html(res.data.paiBanCustomerWorkerName)
								$('#add-hos .tbodyPaiban tr').attr('relId', res.data.paiBanCustomerWorkerId)
							}
							if (res.data.paiBanCustomerWorkerPost) {
								$('#add-hos .paibanren').children().eq(1).children().html(res.data.paiBanCustomerWorkerPost)
							}
							if (res.data.paiBanCustomerWorkerPhone) {
								$('#add-hos .paibanren').children().eq(2).children().html(res.data.paiBanCustomerWorkerPhone)
							}
							if (res.data.paiBanCustomerWorkerVerifyWay) {
								$('#add-hos .paibanren').children().eq(3).children().html(res.data.paiBanCustomerWorkerVerifyWay)
							}
							if (res.data.paiBanCustomerWorkerTel) {
								$('#add-hos .paibanren').children().eq(4).children().html(res.data.paiBanCustomerWorkerTel)
							}
							if(res.data.tel1){
								$('#add-hos .linePhoneList').append('<div typeId="tel1">'+
								'<span>'+res.data.tel1Remark+':</span>'+
								'<span>'+res.data.tel1+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel2){
								$('#add-hos .linePhoneList').append('<div typeId="tel2">'+
								'<span>'+res.data.tel2Remark+':</span>'+
								'<span>'+res.data.tel2+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel3){
								$('#add-hos .linePhoneList').append('<div typeId="tel3">'+
								'<span>'+res.data.tel3Remark+':</span>'+
								'<span>'+res.data.tel3+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel4){
								$('#add-hos .linePhoneList').append('<div typeId="tel4">'+
								'<span>'+res.data.tel4Remark+':</span>'+
								'<span>'+res.data.tel4+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel5){
								$('#add-hos .linePhoneList').append('<div typeId="tel5">'+
								'<span>'+res.data.tel5Remark+':</span>'+
								'<span>'+res.data.tel5+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel6){
								$('#add-hos .linePhoneList').append('<div typeId="tel6">'+
								'<span>'+res.data.tel6Remark+':</span>'+
								'<span>'+res.data.tel6+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel7){
								$('#add-hos .linePhoneList').append('<div typeId="tel7">'+
								'<span>'+res.data.tel7Remark+':</span>'+
								'<span>'+res.data.tel7+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg'+'" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel8){
								$('#add-hos .linePhoneList').append('<div typeId="tel8">'+
								'<span>'+res.data.tel8Remark+':</span>'+
								'<span>'+res.data.tel8+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel9){
								$('#add-hos .linePhoneList').append('<div typeId="tel9">'+
								'<span>'+res.data.tel9Remark+':</span>'+
								'<span>'+res.data.tel9+'</span>'+
								'<img class="phoneThisTel" src="./assets/img/connent.png" alt="">'+
								'<img class="modifyThisTel" src="./assets/img/edit.svg" alt="">'+
								// '<img src="./assets/img/delete.svg" alt="">'+
								'</div>')
							}
							// TODO 后期待优化
							$.ajax({
								url: './assets/js/area.json',
								type: 'get',
								async: false,
								success: function(res) {
									thisVue.provinceList = res
									// $('#add-hos .province').html('<option value="">-请选择-</option>')
									$.each(res, function(i, field) {

										$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
										// $("#add-hos span").append(field.name + "," + field.goods);
									});
								}
							})
							if (res.data.area1Id) {
								$('#add-hos .province').val(res.data.area1Id)
								// setTimeout(function(){
								// 	$('#add-hos .province').val(res.data.area1Id)
								// },200)
								thisVue.provinceText = res.data.area1Id;
								$.each(thisVue.provinceList, function(i, item) {
									if (thisVue.provinceText == item.value) {
										thisVue.cityItem = i;
										// return thisVue.cityItem
									}
								});
								thisVue.cityList = thisVue.provinceList[thisVue.cityItem]
								$('#add-hos .city').html('<option value="">-市-</option>')
								$('#add-hos .town').html('<option value="">-区-</option>')
								$.each(thisVue.cityList.children, function(i, item) {
									// addele(city,item.name)
									$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
									if (res.data.area2Id) {
										$('#add-hos .city').val(res.data.area2Id)
										thisVue.cityText = res.data.area2Id;
										$.each(thisVue.cityList.children, function(i, item) {
											if (thisVue.cityText == item.value) {
												thisVue.townItem = i;
												// return thisVue.cityItem
											}
										});
										thisVue.townList = thisVue.cityList.children[thisVue.townItem]
										$('#add-hos .town').html('<option value="">-区-</option>')
										$.each(thisVue.townList.children, function(i, item) {
											// addEle(city,item.name)
											$('#add-hos .town').append('<option value="' + item.value + '">' + item.label + '</option>')
											$('#add-hos .town').val(res.data.area3Id)
										})
									}

								})

							}

						}
					}
				})
            },
        // 相关人员列表
			relList(customerId) {
                let thisVue=this
				$.ajax({
					url: '/my-customer-worker/customer-worker-list',
					type: 'GET',
					data: 'customerId=' + customerId,
					async: true,
					success: function(res) {
						if (res.code == 0) {

							if (res.data.itemList && res.data.itemList.length > 0) {
								$('#add-hos .tbody').html('')
								for (var i in res.data.itemList) {
									var phoneAll='',telAll=''
									if(res.data.itemList[i].phone1){
										if(phoneAll!=''){
											phoneAll= phoneAll+','+res.data.itemList[i].phone1
										}else{
											phoneAll=res.data.itemList[i].phone1
										}	
									}
									if(res.data.itemList[i].phone2){
										if(phoneAll!=''){
										phoneAll= phoneAll+','+res.data.itemList[i].phone2
										}else{
											phoneAll=res.data.itemList[i].phone2
										}	
									}
									if(res.data.itemList[i].phone3){
										if(phoneAll!=''){
										phoneAll= phoneAll+','+res.data.itemList[i].phone3
										}else{
											phoneAll=res.data.itemList[i].phone3
										}	
									}
									
									if(res.data.itemList[i].tel1){
										if(telAll!=''){
											telAll= telAll+','+res.data.itemList[i].tel1
										}else{
											telAll= res.data.itemList[i].tel1
										}
									}
									if(res.data.itemList[i].tel2){
										if(telAll!=''){
										telAll= telAll+','+res.data.itemList[i].tel2
										}else{
											telAll= res.data.itemList[i].tel2
										}
									}
									if(res.data.itemList[i].tel3){
										if(telAll!=''){
										telAll= telAll+','+res.data.itemList[i].tel3
										}else{
											telAll= res.data.itemList[i].tel3
										}
									}
									if (res.data.itemList[i].customerWorkerId != thisVue.paiBanCustomerWorkerId) {
										var show1 = "show('" + res.data.itemList[i].phone + "')"
										var show2 = "show('" + res.data.itemList[i].verifyWay + "')"
										var show3 = "show('" + res.data.itemList[i].tel + "')"
										
										if(phoneAll){
											var phoneAll=phoneAll.substring(0, 3) + "****"+phoneAll.substring(8,phoneAll.length)
										}
										if(telAll){
											var telAll=telAll.substring(0, 3) + "****"+telAll.substring(8,telAll.length)
                                        }
                                        // thisVue.tableList.push(res.data.itemList[i])
										$('#add-hos .tbody').append('<tr relId="' + res.data.itemList[i].customerWorkerId +
											'"><td class="enterHos"><div class="line-1">' + (res.data.itemList[i].name || "") + '</div></td>' +
											'<td><div class="line-1 lookHis">' + (res.data.itemList[i].post || "") + '</div></td>' +
											'<td><div class="line-1 lookHis showInputBox" phone1="'+(res.data.itemList[i].phone1||"")+'" phone2="'+(res.data.itemList[i].phone2||"")+'" phone3="'+(res.data.itemList[i].phone3||"")+'" >' +
											// (res.data.itemList[i].phone || "") +
											phoneAll+
											'</div></td>' +
											'<td><div class="line-1 lookHis" onmouseover="' + show2 +'" onmouseleave="showhidden()">' + (res.data.itemList[
												i].verifyWay || "") +
											'</div></td>' +
											'<td><div class="line-1 lookHis showInputBoxTel" tel1="'+(res.data.itemList[i].tel1||"")+'" tel2="'+(res.data.itemList[i].tel2||"")+'" tel3="'+(res.data.itemList[i].tel3||"")+'">'+telAll+// + (res.data.itemList[i].tel || "") +
											'</div></td></tr>')
									}else{
										if(phoneAll){
											var phoneAll=phoneAll.substring(0, 3) + "****"+phoneAll.substring(8,phoneAll.length)
										}
										if(telAll){
											var telAll=telAll.substring(0, 3) + "****"+telAll.substring(8,telAll.length)
										}
										$('#add-hos .paibanren .showInputBox').html(phoneAll).attr('phone1',(res.data.itemList[i].phone1||"")).attr('phone2',(res.data.itemList[i].phone2||"")).attr('phone3',(res.data.itemList[i].phone3||""))
										$('#add-hos .paibanren .showInputBoxTel').html(telAll).attr('tel1',(res.data.itemList[i].tel1||"")).attr('tel2',(res.data.itemList[i].tel2||"")).attr('tel3',(res.data.itemList[i].tel3||""))
									}

								}
							}
						}
					}
				})
            },
        // 跟踪记录列表
			trackrelList(customerId, customerWorkerId, pn) {
                let thisVue=this
				if (customerWorkerId){
					$('#add-hos .lookAllTrack').show()
				}else{
					$('#add-hos .lookAllTrack').hide()
				}
				$.ajax({
					url: '/my-customer-worker-trace/customer-worker-trace-list',
					type: 'GET',
					data: 'customerId=' + customerId + '&customerWorkerId=' + customerWorkerId + '&pn=' + pn + '&ps=15',
					async: true,
					success: function(res) {
						if (res.code == 0) {
							var interst = ''
							if (pn = 1) {
								$('#add-hos .trackDetail').html('')
							}
							if (res.data.itemList && res.data.itemList.length > 0) {
								for (var i in res.data.itemList) {
									if (res.data.itemList[i].level == 1) {
										interst = '暂不感兴趣'
									} else if (res.data.itemList[i].level == 2) {
										interst = '初步感兴趣'
									} else if (res.data.itemList[i].level == 3) {
										interst = '非常感兴趣'
									} else if (res.data.itemList[i].level == 4) {
										interst = '近期可考察'
									} else if (res.data.itemList[i].level == 5) {
										interst = '线上可签单'
									}
									$('#add-hos .trackDetail').append('<ul>' +
										'<li><span>' + (res.data.itemList[i].customerWorkerName||"") + '</span><span>' + interst + '</span><span>' +
										changeDateFormat(res.data.itemList[i].createTime) +
										'</span></li>' +
										'<li>' + res.data.itemList[i].content + '</li>' +
										'</ul>')
									$('#add-hos .trackDetail').scrollTop($('#add-hos .trackDetail')[0].scrollHeight);
								}
							}
						}
					}
				})
            },
        // 时间转换
			getDateDiff(dateTimeStamp) {
                let thisVue=this
				var result;
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				if (monthC >= 1) {
					if (monthC <= 12)
						result = "" + parseInt(monthC) + "月前";
					else {
						result = "" + parseInt(monthC / 12) + "年前";
					}
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
            },
        closePopWindow() {
            let thisVue=this
				$('#add-hos .phonep1').html('')
				$('#add-hos .phonep2').html('')
				$('#add-hos .phonep3').html('')
				$('#add-hos .addphoeShow').css('display', 'none')
				$('#add-hos .addphoen').css('display', 'none')
            },
        
   //methods end
        
     }
}
</script>

<style scoped>
.mainbox{
	width: 90%;
	min-width: 1200px;
	margin: 0 auto 100px;
}
.topselect{
	width: 100%;
	/* padding: 0 50px; */
}
.selectOption{
	width: 100%;
	height: auto;
	font-size: 16px;
	color: #333333;
}
.topselect h2,.addPeople h2{
	display: inline-block;
	margin: 0;
	line-height: 80px;
	font-size: 25px;
}
.addHos,.modifyHos,.lookAllTrack{
	width: 100px;
	height: 40px;
	border-radius: 5px;
	border: 1px solid #e5e5e5;
	display: inline-block;
	/* float: right; */
	font-size: 16px;
	line-height: 40px;
	margin-top: 20px;
	margin-left: 30px;
	text-align: center;
	background: #409eff;
	    color: #FFFFFF;
}
.selectOption input{
	width: 150px;
	height: 38px;
	border-radius: 4px;
	outline: none;
	border:1px solid #e5e5e5;
	margin-right:15px;
	padding: 0 10px;

}
.selectOption button{
	width: 80px;
	height: 38px;
	border-radius: 4px;
	line-height: 38px;
	outline: none;
	border:1px solid #e5e5e5;
	margin-right:15px;
	background:#409eff;
	color: #FFFFFF;
	vertical-align: middle;
	margin-top: -3px;
}

.selectOption select{
	width: 140px;
	height: 38px;
	border-radius: 4rpx;
	outline: none;
	margin-right:15px;
	border:1px solid #e5e5e5;
}
.selectOption .province,.selectOption  .city,.selectOption  .town{
	width: 100px;
	margin-right: 5px;
}
.selectOption input,.selectOption .area{
	display: inline-block;
	margin-right: 30px;
}
.hosIntroBox span{
	display: block;
}
.hosIntroBox textarea{
	box-sizing: border-box;
	    width: 45%;
	    min-width: 540px;
	/* width: 1010px; */
	height: 100px;
	/* overflow-y: scroll; */
	overflow:auto;
	/* overflow-x: hidden; */
	font-size: 16px;
	line-height: 30px;
	padding: 0 15px;
	resize: none;
}

.selectOption span{
	line-height: 60px;
}
.addPeople{
	width: 100%;
	/* padding: 0 50px; */
	min-width: 1200px;
}


.tableBoxLf{
	display: inline-block;
	width: 45%;
	min-width: 540px;
	height: auto;
	float: left;
}
.tableBoxLf table{
	box-sizing: border-box;
	width: 100%;
	height: auto;
	word-wrap: break-word; word-break: break-all;table-layout: fixed
}
.tableBoxLf table thead tr th,.tableBoxLf table tbody tr td{
	height: 40px !important;
	line-height: 40px;
	width: 20% !important;
	text-align: center;
	overflow: hidden;
}
.tableBoxLf table tbody tr{
	height: 40px !important;
}
.tableBoxLf table tbody tr td div{
	width: 100%;
	height: 40px;
	overflow: hidden;
}
.tableBoxLf table tbody tr td{
	border: 1px solid #e5e5e5;
	cursor: pointer;
}
/* .tableBoxLf table tbody tr td:nth-child(1),.tableBoxLf table tbody tr td:nth-child(3),.tableBoxLf table tbody tr td:nth-child(4),.tableBoxLf table tbody tr td:nth-child(5){
	cursor: pointer;
} */

.tableBoxLf table tbody tr td input{
	width: 100%;
	padding: 0 10px;
	border: 0;
	text-align: center;
}
.addNewRel,.supplyNewRel{
	cursor: pointer;
	box-sizing: border-box;
	width: 100%;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	height: 40px;
	border-left: 1px solid #e5e5e5;
	border-right: 1px solid #e5e5e5;
	border-bottom: 1px solid #e5e5e5;
}

.tableBoxRt{
	display: inline-block;
	width: 52%;
	height: 560px;
	margin-left: 3%;
	min-width: 624px;
	box-sizing: border-box;
	border: 1px solid #e5e5e5;
	float: left;
	margin-top: -185px;
}
.tableBoxRt >div:nth-child(1){
	width: 100%;
	height: 40px;
	text-align: center;
	line-height: 40px;
	border-bottom: 1px solid #e5e5e5;
	position: relative;
}
.tableBoxRt >div:nth-child(1)  h2{
	width: 100%;
	position: absolute;
	left: 0;
	height: 40px;
	text-align: center;
	line-height: 40px;
	border-bottom: 1px solid #e5e5e5;
}
.lookAllTrack{
	font-size: 16px;
	cursor: pointer;
	margin-left: 15px;
	display: inline-block;
	position: absolute;
	left: 15px;
	z-index: 3;
}

.trackDetail{
	width: 100%;
	padding: 10px;
	height: 300px;
	overflow-y: scroll;
	border-bottom: 1px solid #E5E5E5;
	
}
.muti::-webkit-scrollbar{
	width:0px;
	/* border-radius: 5px; */
}
.muti::-webkit-scrollbar-track{
	background-color:#e5e5e5;
	/* border-radius: 5px; */
}
.muti::-webkit-scrollbar-thumb{
	background-color:#e5e5e5;
	/* border-radius: 5px; */
}
.muti::-webkit-scrollbar-thumb:hover {
	background-color:#e5e5e5;
	/* border-radius: 5px; */
}
.muti::-webkit-scrollbar-thumb:active {
	background-color:#e5e5e5;
	/* border-radius: 5px; */
}

.trackDetail ul{
	width: 80%;
	/* margin-left: 15px; */
	margin-top: 10px;
}
.trackDetail ul li{
	font-size: 16px;
	line-height: 25px;
	color: #333333;
}
.trackDetail ul li:nth-child(1) span:nth-child(1){
	color: #666666;
	display: inline-block;
	margin-right: 15px;
	font-size: 14px;
}
.trackDetail ul li:nth-child(1) span:nth-child(2){
	color: #999999;
	display: inline-block;
	margin-right: 15px;
	font-size: 14px;
}
.trackDetail ul li:nth-child(1) span:nth-child(3){
	color: #999999;
	display: inline-block;
	margin-right: 15px;
	font-size: 14px;
}
.talkShow{
	width: 100%;
	padding: 10px;
	height: 100px;
	resize: none;
	border: 0;
	border-bottom: 1px solid #e5e5e5;
	outline: none;
}
.selectQuick{
	width: 100%;
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #e5e5e5;
}
.selectQuick>div{
	display: inline-block;
	font-size: 15px;
	color: #333;
}
.selectQuick>div input{
	margin-right: 5px;
	
}
.selectQuick>div label{
	margin-left: 8px;
	color: #666666;
}
.selectQuick>div:nth-child(1){
	margin-left: 20px;
}
.selectQuick>div:nth-child(2){
	margin-left: 25px;
}
.sendTrack{
	cursor: pointer;
	width: 90px;
	height: 35px;
	border-radius: 2px;
	background: #ffcd00;
	color: #333333;
	line-height: 35px;
	text-align: center;
	border: 0;
	float: right;
	margin-top: 10px;
	margin-right: 15px;
}


/* 弹窗 */
.showTips{
	width: 120px;
	height: 90px;
	padding: 15px;
	line-height: 25px;
	font-size: 16px;
	color: #333333;
	position: fixed;
	/* left: 60%;
	top: 50%;
	margin-top: -100px;
	margin-left: -150px; */
	z-index: 2;
	/* background: #fff; */
	color: #fff;
	border: 1px solid #e5e5e5;
	background: rgba(0,0,0,0.5);
	border-radius: 10px;
	font-size: 14px;
}
.contentThis{
	line-height: 25px;
	font-size: 14px;
	padding: 0 15px;
}


.addphoen,.addphoeShow{
	display: none;
	position: fixed;
	width: 260px;
	height: 210px;
	border-radius: 5px;
	right: 500px;
	top: 180px;
	background: #FFFFFF;
	border: 1px solid #333;
	z-index: 3;
}
.addphoen>div,.addphoeShow>div{
	line-height: 40px;
	
}
.addphoen>i,.addphoeShow>i{
	margin: 10px;
	display: block;
	margin-left: 220px;
	cursor: pointer;
}
.addphoen text,.addphoeShow text{
	display: inline-block;
	margin: 0 10px;
}
.addphoen>div i,.addphoeShow>div i{
	margin-left: 15px;
	cursor: pointer;
}
.addphoen input{
	width: 150px;
	height: 35px;
	border-radius: 4px;
	border: 1px solid #e5e5e5;
	outline: 0;
	padding: 0 10px;
	font-size: 14px;
}
.addphoen span,.addphoeShow span{
	display: block;
	width: 70px;
	height: 30px;
	border-radius: 5px;
	border: 1px solid #e5e5e5;
	margin:10px auto;
	text-align: center;
	line-height: 30px;
	cursor: pointer;
}
.addphoeShow p{
	display: inline-block;
	cursor: pointer;
	border-bottom: 1px solid #e5e5e5;
}


#phoneNow{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
	display: none;
	/* background: rgba(0,0,0,0.2); */
	/* background: #000000; */
	/* opacity: 0.2; */
}
#phoneNow>div:nth-child(1){
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
}
#phoneNow p{
	position: fixed;
	z-index: 10;
	width: 100%;
	font-size: 18px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	text-align: center;
	top: 35%;
	color: #fff;
	
}
#phoneNow .phoneEnd{
	position: fixed;
	width: 250px;
	height: 60px;
	background: #ffffff;
	border-radius: 5px;
	color: #bd0000;
	font-size: 20px;
	z-index: 10;
	top: 42%;
	left: 50%;
	margin-left: -125px;
	text-align: center;
	cursor: pointer;
	line-height: 60px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#phoneNow .phoneEnd img{
	width: 24px;
	height: 24px;
}
#phoneNow .phoneEnd span{
	color: #E2403F;
	margin-left:5px;
	font-size: 22px;
	line-height: 40px;
	cursor: pointer;
	display: inline-block;
	width: 100px;
	height: 40px;
	border: 1px solid #fff;
	border-radius: 5px;
	background: #ffffff;
}

/* 动态添加科室电话 */
.linePhoneList>div{
	display: inline-block;
	/* width: 350px; */
	margin-right: 20px;
	line-height: 60px;
	padding-right: 30px;
	border-right:1px solid #e5e5e5;
	color: #666666;
}
.linePhoneList>div span{
	display: inline-block;
	margin-right: 15px;
}
.linePhoneList img{
	width: 20px;
	height: 20px;
	cursor: pointer;
	margin-right: 10px;
}
.addNewTel{
	width: 60px;
	height: 30px !important;
	line-height: 30px !important;
	font-size: 14px;
	border-radius: 5px;
	border: 1px solid #e5e5e5;
	display: none;
	/* background: #EEEEEE !important; */
}
</style>