<template>
    <div id="add-hos">
        <input type='' id='userName' hidden=''>
		<span class="record1" hidden=""></span>
		<span class="record2" hidden=""></span>
		<span class="record3" hidden=""></span>
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
					<div class="huifangClass">
						回访时间：
						<input type="date" :value="toRevisitTime">
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
									<div class="line-1 lookHis showInputBox" ></div>
								</td>
								<td>
									<div class="line-1 lookHis" ></div>
								</td>
								<td>
									<div class="line-1 lookHis showInputBoxTel" ></div>
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

						</tbody>
					</table>
					<div class="addNewRel">新增<i style="margin-left: 5px;" class="layui-icon">&#xe608;</i></div>
					<div class="supplyNewRel" style="display: none;"><button style="background: #409eff;width: 100%;height: 100%;border: 0;color: #fff;font-size: 18px;">完成<i
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
				<div><span>电话1:</span><input class="phoneInput1" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<div><span>电话2:</span><input class="phoneInput2" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<div><span>电话3:</span><input class="phoneInput3" maxlength="13" type="text"><i class="layui-icon closeThis">&#xe640;</i></div>
				<span>完成</span>
			</div>
			<div class="addphoeShow">
				<i class="layui-icon closeAdd">&#x1006;</i>
				<div><span>电话1:</span>
					<p class="phoneps phonep1"></p>
				</div>
				<div><span>电话2:</span>
					<p class="phoneps phonep2"></p>
				</div>
				<div><span>电话3:</span>
					<p class="phoneps phonep3"></p>
				</div>
				<span>编辑电话</span>
			</div>
		</div>
		<!-- <div class="phoneNow">
			<div></div>
			<div>
				<p>正在通话中. . .</p>
				<div class="phoneEnd" id="btn_close">
					<img src="../assets/img/phoneEnd.png" alt="">
					<span>挂断电话</span>
				</div>
			</div>
		</div> -->
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
	name: 'index',
	data () {
		return {
            query:'',
            provinceList : undefined,
            cityList : undefined,
            townList : undefined,
            cityItem : undefined,
            townItem : undefined,
            nickname : '',
            paiBanCustomerWorkerId : '',
            timerMove : '',
            customerId:'',
            levelLs : '',
            customerWorkerIdLs : '',
            // 修改相关人员信息
            modifyVal : '',
            time : '',
            customerWorkerIdZz : '',
            timeIs : '',
			toRevisitTime:'',
		}
	},
	activated(){
		debugger
		let thisValue = this
		let a = JSON.stringify(this.$route.query)
		debugger
        if(this.query != a){
			Object.assign(this.$data, this.$options.data());
			this.query = JSON.stringify(this.$route.query);
			console.log(this.query)
			$('.closeAdd div input').val('')
			$('.hosname').val('')
			$('.hostel').val('')
			$('.province').val('')
			debugger




			$('.city').val('')
			$('.town').val('')
			$('.hosnature').val('')
			$('.hosIntro').val('')
			$('.telName').val('')
			$('.telValue').val('')
			// $('#add-hos .showInputBoxTel').removeAttr('tel1')
			// $('#add-hos .showInputBoxTel').removeAttr('tel2')
			// $('#add-hos .showInputBoxTel').removeAttr('tel3')
			$('#add-hos .province').html('<option value="">-请选择-</option>')
			$('#add-hos .city').html('<option value="">-请选择-</option>')
			$('#add-hos .town').html('<option value="">-请选择-</option>')
			// $('.province').html('')
			// $('.city').html('')
			// $('.town').html('')
			// $('#add-hos .province').html('<option value="">-请选择-</option>')
			// $('#add-hos .city').html('<option value="">-请选择-</option>')
			// $('#add-hos .town').html('<option value="">-请选择-</option>')
			// $(".province").find("option").remove();
			// $(".city").find("option").remove();
			// $(".town").find("option").remove();

			$('#add-hos .trackDetail').html('')



			$('#add-hos .showIs').css('display', 'none')
			$('#add-hos .addHos').attr('disabled',false);
			$('#add-hos .addHos').css('display', 'inline-block')
			$('#add-hos .modifyHos').css('display', 'none')
			$('#add-hos .tbody').html('')
			$('#add-hos .linePhoneList').html('')
			$('#add-hos .addNewTel').css('display','none')
			$('#add-hos .nameLink').html('')
			$('#add-hos .lookHis').html('')
			// $('#add-hos .showInputBox').html('')

			$('#add-hos .phonep1').html('')
			$('#add-hos .phonep2').html('')
			$('#add-hos .phonep3').html('')

			$('.phoneInput1').val('')
			$('.phoneInput2').val('')
			$('.phoneInput3').val('')

			$('#add-hos .addphoen').css('display', 'none')
			$('#add-hos .addphoeShow').css('display', 'none')
			$('#add-hos .addphoeShow .phonep1').html('')
			$('#add-hos .addphoeShow .phonep2').html('')
			$('#add-hos .addphoeShow .phonep3').html('')
			$('#add-hos .showInputBox').attr('phone1',"").attr('phone2',"").attr('phone3',"")
			$('#add-hos .showInputBoxTel').attr('tel1',"").attr('tel2',"").attr('tel3',"")
			$('.addphoeShow .phoneInput1').val('')
			$('.addphoeShow .phoneInput2').val('')
			$('.addphoeShow .phoneInput3').val('')



			$('#add-hos .enterHos div').html('')
			$('#add-hos .trackName').html('')
            // 省市区三级联动
			// TODO 后期待优化

			$.ajax({
				url: './assets/js/area.json',
				type: 'get',
				async: false,
				success: function(res) {
					thisValue.provinceList = res;
					debugger
					$('#add-hos .province').html('<option value="">-请选择-</option>')
									$('#add-hos .city').html('<option value="">-请选择-</option>')
									$('#add-hos .town').html('<option value="">-请选择-</option>')
					$.each(res, function(i, field) {
						$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
					});
				}
            })
            // $.getJSON("./assets/js/area.json", function(res) {
			// 	thisValue.provinceList = res
			// 	// $('#add-hos .province').html('<option value="">-请选择-</option>')
			// 	$.each(res, function(i, field) {

			// 		$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
			// 		// $("#add-hos span").append(field.name + "," + field.goods);
			// 	});
            // });
            $('#add-hos .province').change(function() {
				let provinceText = $(this).val();
				$.each(thisValue.provinceList, function(i, item) {
					if (provinceText == item.value) {
						thisValue.cityItem = i;
						// return thisValue.cityItem
					}
				});
				thisValue.cityList = thisValue.provinceList[thisValue.cityItem]
				$('#add-hos .city').html('<option value="">-请选择-</option>')
				$('#add-hos .town').html('<option value="">-请选择-</option>')
				$.each(thisValue.cityList.children, function(i, item) {
					// addele(city,item.name)
					$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				// todo 要改的
				// $.ajax({
				// 	url: '/alter-my-info',
				// 	type: 'get',
				// 	async: false,
				// 	success: function(res) {
				// 		thisValue.provinceList = res
				// 		$.each(res, function(i, field) {
				// 			$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
				// 		});
				// 	}
				// })


            })
            $('#add-hos .city').change(function() {
				let cityText= $(this).val();
				$.each(thisValue.cityList.children, function(i, item) {
					if (cityText == item.value) {
						thisValue.townItem = i;
						// return thisValue.cityItem
					}
				});
				thisValue.townList = thisValue.cityList.children[thisValue.townItem]
				$('#add-hos .town').html('<option value="">-请选择-</option>')
				$.each(thisValue.townList.children, function(i, item) {
					// addEle(city,item.name)
					$('#add-hos .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
            thisValue.nickname=localStorage.getItem('nickname');
            $('#add-hos #userName').val(thisValue.nickname)
            // 新增医院电话
			$('#add-hos .addNewTel').unbind("click").click(function(){
				$('#add-hos .addNewTelBox').css('display','block')
            })
            $('#add-hos #submit_newTel').unbind("click").click(function(){
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
						thisValue.modifyHosTel(telNameTitle,telName,telValueTitle,telValue,0)
						thisValue.removeTel()
					}

				}else{
					// if($(this).attr('typeId')&&$(this).attr('typeId').split('Remark')){
					// 	var telNameTitle=$(this).attr('typeId');
					// 	var telValueTitle=$(this).attr('typeId').split('Remark')[0];
					// }else{
					// 	var telNameTitle=$(this).attr('typeId')+'Remark';
					// 	var telValueTitle=$(this).attr('typeId');
					// }
					var telNameTitle=$(this).attr('typeId')+'Remark';
					var telValueTitle=$(this).attr('typeId');
					var type=telValueTitle.substring(telValueTitle.length-1,telValueTitle.length)
					console.log(telNameTitle,telValueTitle,type)
					$('#submit_newTel').attr('typeId','')
					thisValue.modifyHosTel(telNameTitle,telName,telValueTitle,telValue,type)
					thisValue.removeTel()
				}
            })
            $('.linePhoneList').off("click",'div .modifyThisTel').on('click','div .modifyThisTel',function(){
				$('#add-hos .addNewTelBox').css('display','block')
				$('#add-hos .telName').val($(this).parent().children().eq(0).html().substring(0,$(this).parent().children().eq(0).html().length-1)||'')
				$('#add-hos .telValue').val($(this).parent().children().eq(1).html()||'')
				var telNameTitle=$(this).parent().attr('typeId')+'Remark';
				var telValueTitle=$(this).parent().attr('typeId');
				$('#add-hos #submit_newTel').attr('typeId',telValueTitle)
            })
            $('#add-hos .closeAddThis').unbind("click").click(function(){
				$('#add-hos .addNewTelBox').css('display','none')
				thisValue.removeTel()
            })
            //打电话
			$('#add-hos .linePhoneList').off("click",'div .phoneThisTel').on('click','div .phoneThisTel',function(){
				var linkName=$(this).parent().children().eq(0).html().substring(0,$(this).parent().children().eq(0).html().length-1)
				$('#inp_send').val($(this).parent().children().eq(1).html()||'').attr('linkName',linkName||'')
				$('#btn_conn').click()
            })
            if ($('#add-hos .hostel').val() == '' || $('.hostel').val() == null || $('.hostel').val() == undefined) {
				$('#add-hos .linkHos').css('display', 'none')
			} else {
				$('#add-hos .linkHos').css('display', 'inline-block')
            }
            $('.hostel').change(function() {
				if ($(this).val() != '') {
					$('#add-hos .linkHos').css('display', 'inline-block')
				} else {
					$('#add-hos .linkHos').css('display', 'none')
				}
            })
            $('#add-hos .linkHos').unbind("click").click(function() {
				// console.log($(this).parent().parent())
				$('#inp_send').val($('.hostel').val()).attr('linkName',$(this).parent().find('.hosname').val())
				$('#btn_conn').click()
            })
            $('#add-hos .phoneps').unbind("click").click(function() {
				$('#inp_send').val($(this).html()).attr('linkName',$(this).parent().parent().children().eq(0).children().html())
				$('#btn_conn').click()
				// lineFriends($(this).html())
            })
            $('#add-hos .closeThis').unbind("click").click(function() {
				$(this).parent().find('input').val('')
            })
            $('#add-hos .addphoen span').unbind("click").click(function() {
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
							addpaibanPhone(thisValue.customerId, phones1,phones2,phones3)
						} else {
							$('#add-hos .jsModify').attr('tel1',(phones1||"")).attr('tel2',(phones2||"")).attr('tel3',(phones3||""))
							addpaibanTel(thisValue.customerId, phones1,phones2,phones3)
						}
					}else{
						if ($('#add-hos .addphoeShow').attr('type') == 1) {
							$('#add-hos .jsModify').attr('phone1',(phones1||"")).attr('phone2',(phones2||"")).attr('phone3',(phones3||""))
							// addRelPhone(thisValue.customerId, phones1,phones2,phones3)
						} else {
							$('#add-hos .jsModify').attr('tel1',(phones1||"")).attr('tel2',(phones2||"")).attr('tel3',(phones3||""))
							// addRelTel(thisValue.customerId, phones1,phones2,phones3)
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
							// $('.jsModify').removeClass('jsModify')
						},
					})
				}
            })
            $('#add-hos .addphoeShow span').unbind("click").click(function() {
				$('#add-hos .addphoeShow').css('display', 'none')
				var s = $('#add-hos .phonep1').html()
				$('#add-hos .phoneInput1').val($('#add-hos .phonep1').html())
				$('#add-hos .phoneInput2').val($('#add-hos .phonep2').html())
				$('#add-hos .phoneInput3').val($('#add-hos .phonep3').html())
				$('#add-hos .addphoen').css('display', 'block')
            })
            $('#add-hos .closeAdd').unbind("click").click(function() {
				$('#add-hos .addphoeShow').css('display', 'none')
				$('#add-hos .addphoen').css('display', 'none')
				$('#add-hos .phonep1').html('')
				$('#add-hos .phonep2').html('')
				$('#add-hos .phonep3').html('')
            })


			debugger;
			thisValue.customerId = GetQueryString('id')
			thisValue.$nextTick(()=>{

				if (GetQueryString('id')) {
					$('#add-hos .addNewTel').css('display','inline-block')
					debugger
					thisValue.hosDetail(GetQueryString('id'))
					thisValue.relList(GetQueryString('id'))
					$('#add-hos .addHos').css('display', 'none')
					$('#add-hos .modifyHos').css('display', 'inline-block')
					$('#add-hos .showIs').css('display', 'block')
				}else{
					$.getJSON("./assets/js/area.json", function(res) {
					thisValue.provinceList = res
					// $('.province').html('<option value="">-请选择-</option>')
					debugger
					$('#add-hos .province').html('<option value="">-请选择-</option>')
					$('#add-hos .city').html('<option value="">-请选择-</option>')
					$('#add-hos .town').html('<option value="">-请选择-</option>')
					$.each(res, function(i, field) {
						$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
						// $("span").append(field.name + "," + field.goods);
					});
				});
				}
			})

            $('#add-hos .showTips').off('mouseleave').on('mouseleave', function() {
				setTimeout(function() {
					$('#add-hos .showTips').css('display', 'none')
					$('#add-hos .showTips  div').html('')
				}, 1000)
            })
            $('#add-hos .showTips').hover(function() {
				clearTimeout(thisValue.timerMove)
            })
            // 查看相关人员信息修改历史
            $('#add-hos .showTips a').unbind("click").click(function() {
				$('#add-hos .showTips').css('display', 'none')
				$('#add-hos .showTips  div').html('')
				clearTimeout(thisValue.time);
				//执行延时
				thisValue.time = setTimeout(function() {
					$.ajax({
						url: '/my-customer-worker-snapshot-list',
						type: 'GET',
						data: 'customerWorkerId=' + thisValue.customerWorkerIdLs,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								$('#add-hos .contentThis').html('')

								// var content='<div class="thiscontent">111</div>'
								for (var i in res.data.itemList) {
									if (thisValue.levelLs == 0) {

										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].name || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisValue.levelLs == 1) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].post || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisValue.levelLs == 2) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].phone || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisValue.levelLs == 3) {
										$('#add-hos .contentThis').append('<div>' + (res.data.itemList[i].verifyWay || "") + '<span>（更新时间：' +
											changeDateFormat(res.data.itemList[i].updateTime) + '）</span></div>')
									}
									if (thisValue.levelLs == 4) {
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
            $('#add-hos .tbodyPaiban').off('dblclick', 'tr td').on('dblclick', 'tr td', function() {

				if ($(this).children().attr('type') && $(this).children().attr('type') == 'text') {
					thisValue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisValue.time)
				} else if ($(this).index() == 2 || $(this).index() == 4) {
					// 弹出输入框
					// $('.addphoeShow').attr('id','')

					// $('.addphoeShow').css('display','block').attr('id',$(this).parent().attr('relId'))
					// $('table').find('.jsModify').removeClass('jsModify')
					// $(this).children().addClass('jsModify')
					// var phones=$(this).children().html().split(',')

					// for(var i in phones){
					// 	var num=parseInt(i)+1
					// 	$('#add-hos .phonep'+num).html(phones[i])
					// }
				} else {
					debugger
					thisValue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisValue.time)
					// $(this).html('<input type="text"  class="modifyThis" onchange="modifyOver('+$(this).parent().attr("relId")+',this)" value="'+$(this).children().html()+'"/>')
					$(this).html('<input type="text" level="' + $(this).index() + '"  class="modifyThisPaiban"  value="' + $(this).children()
						.html() + '"/>')
					$('#add-hos .modifyThisPaiban').focus()
				}
            })
            $('#add-hos table').off('blur', 'tr .modifyThisPaiban').on('blur', 'tr .modifyThisPaiban', function() {
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
				if (thisValue.paiBanCustomerWorkerId == '' || thisValue.paiBanCustomerWorkerId == null || thisValue.paiBanCustomerWorkerId == undefined) {
					var _this = $(this)
					// var show = "show('" + _this.val() + "')"
					$.ajax({
						url: '/my-customer-worker/create-customer-worker',
						type: 'post',
						data: 'customerId=' + thisValue.customerId + param,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								thisValue.paiBanCustomerWorkerId = res.data.customerWorkerId
								_this.parent().parent().attr('relId', thisValue.paiBanCustomerWorkerId)
								$.ajax({
									url: '/my-customer/update-customer',
									type: 'post',
									data: 'customerId=' + thisValue.customerId + '&paiBanCustomerWorkerId=' + thisValue.paiBanCustomerWorkerId,
									async: true,
									success: function(res) {
										if (res.code == 0) {
											if (level == 0) {
												_this.parent().html('<div class="line-1">' +
													_this.val() + '</div>')
											} else if (level == 2) {
												_this.parent().html('<div class="line-1 lookHis showInputBox">' + _this.val() + '</div>')
											} else if (level == 4) {
												_this.parent().html('<div class="line-1 lookHis showInputBoxTel" >' + _this.val() + '</div>')
											} else {
												_this.parent().html('<div class="line-1 lookHis" >' + _this.val() + '</div>')
											}
										} else {
											layer.msg(res.codeMsg)
										}
									}
								})
							} else {
								$('#add-hos .addHos').attr('disabled',false);
								layer.msg(res.codeMsg)
							}
						}
					})
				} else {
					var customerWorkerId = $(this).parent().parent().attr('relid')
					// var show = "show('" + $(this).val() + "')"
					var _this = $(this)
					$.ajax({
						url: '/my-customer-worker/update-customer-worker',
						type: 'post',
						data: 'customerWorkerId=' + customerWorkerId + param,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								if (level == 0) {
									_this.parent().html('<div class="line-1">' + _this
										.val() + '</div>')
								} else if (level == 2) {
									_this.parent().html('<div class="line-1 lookHis showInputBox" >' + _this.val() + '</div>')
								} else if (level == 4) {
									_this.parent().html('<div class="line-1 lookHis showInputBoxTel" >' + _this.val() + '</div>')
								} else {
									_this.parent().html('<div class="line-1 lookHis">' +
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
					thisValue.closePopWindow()
					$('#add-hos .phonep1').html('')
					$('#add-hos .phonep2').html('')
					$('#add-hos .phonep3').html('')
					clearTimeout(thisValue.time)
				} else if ($(this).index() == 2 || $(this).index() == 4) {
					// 弹出输入框
					// $('.addphoeShow').attr('id','')

					// $('.addphoeShow').css('display','block').attr('id',$(this).parent().attr('relId'))
					// $('table').find('.jsModify').removeClass('jsModify')
					// $(this).children().addClass('jsModify')
					// var phones=$(this).children().html().split(',')

					// for(var i in phones){
					// 	var num=parseInt(i)+1
					// 	$('.phonep'+num).html(phones[i])
					// }
				} else {
					thisValue.closePopWindow()
					$('.phonep1').html('')
					$('.phonep2').html('')
					$('.phonep3').html('')
					clearTimeout(thisValue.time)
					$(this).html('<input type="text" level="' + $(this).index() + '"  class="modifyThis"  value="' + $(this).children()
						.html() + '"/>')
					$('#add-hos .modifyThis').focus()
				}
				// $(this).html('<input type="text"  class="modifyThis" onchange="modifyOver('+$(this).parent().attr("relId")+',this)" value="'+$(this).children().html()+'"/>')

            })
            $('#add-hos table').off('blur', 'tr .modifyThis').on('blur', 'tr .modifyThis', function() {
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
				// var show = "show('" + $(this).val() + "')"
				var _this = $(this)
				$.ajax({
					url: '/my-customer-worker/update-customer-worker',
					type: 'post',
					data: 'customerWorkerId=' + customerWorkerId + param,
					async: true,
					success: function(res) {
						if (level == 0) {
							_this.parent().html('<div class="line-1" >' + _this.val() +
								'</div>')
						} else {
							_this.parent().html('<div class="line-1 lookHis">' +
								_this.val() + '</div>')
						}

					},
				})
            })
            $('#add-hos .trackDetail').scrollTop($('.trackDetail')[0].scrollHeight);
            // for(var i=0;i<6;i++){
			// 	$('.tbody').append('<tr><td class="enterHos"><a href="javascript:;">丁洁</a></td><td>科室副主任</td><td>15265742542</td><td>和院长有关系</td><td>025-65485412</td></tr>')
			// }
			// 新增相关人员
			$('#add-hos .addNewRel').unbind("click").click(function() {
				// var show = "show('')"
				$('.tbody').append('<tr>' +
					'<td class="enterHos"><input type="text"/></td>' +
					'<td><input type="text"/></td>' +
					'<td><div class="line-1 lookHis showInputBox" ></div></td>' +
					'<td><input type="text"/></td>' +
					'<td><div class="line-1 lookHis showInputBoxTel" ></div></td></tr>')
				$(this).css('display', 'none')
				$('#add-hos .supplyNewRel').css('display', 'block')
			})
			// 提交相关人员

			// TODO 新增相关人员
            $('#add-hos .supplyNewRel button').unbind("click").click(function() {
				$(this).attr('disabled', true)
				var name = $('#add-hos .tbody').children('tr:last-child').find(':input:eq(0)').val()
        console.log(name)
        // return
				var post = $('#add-hos .tbody').children('tr:last-child').find(':input:eq(1)').val()
				// var phone = $('#add-hos .tbody').find(':input:eq(2)').val()
				var phone = $('#add-hos .tbody').children('tr:last-child').find('.showInputBox').html()
				var verifyWay = $('#add-hos .tbody').children('tr:last-child').find(':input:eq(2)').val()
				var tel = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').html()
				var phone1=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone1')||""
				var phone2=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone2')||""
				var phone3=$('#add-hos .tbody').children('tr:last-child').find('.showInputBox').attr('phone3')||""
				var tel1 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel1')||""
				var tel2 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel2')||""
				var tel3 = $('#add-hos .tbody').children('tr:last-child').find('.showInputBoxTel').attr('tel3')||""
				// var tel = $('.tbody').find(':input:eq(3)').val()
				var paiBan = ''
				var _this = $(this)
				if (name == '') {
					layer.msg('请填写相关人员姓名')
					$('#add-hos .supplyNewRel button').attr('disabled', false)
				} else {
					if (thisValue.customerId == '' || thisValue.customerId == null || thisValue.customerId == undefined) {
						layer.msg('请先点击医院提交信息按钮')
						$('#add-hos .supplyNewRel button').attr('disabled', false)
					} else {
						$.ajax({
							url: '/my-customer-worker/create-customer-worker',
							type: 'post',
							data: 'name=' + name + '&tel1=' + tel1+ '&tel2=' + tel2+ '&tel3=' + tel3 + '&post=' + post + '&paiBan=' + paiBan + '&verifyWay=' + verifyWay +
								'&phone1=' + phone1 +'&phone2=' + phone2 +'&phone3=' + phone3 + '&customerId=' + thisValue.customerId,
							async: true,
							success: function(res) {
								if (res.code == 0) {
									layer.msg('新增成功')
                  $('#add-hos .tbody').children("tr:last-child").remove()
									// window.history.refresh()
									// var show1 = "show('" + phone + "')"
									// var show2 = "show('" + verifyWay + "')"
									// var show3 = "show('" + tel + "')"

									$('#add-hos .tbody').append('<tr relId="' + res.data.customerWorkerId +
										'"><td class="enterHos"><div class="line-1">' + name + '</div></td>' +
										'<td><div class="line-1 lookHis">' + post + '</div></td>' +
										'<td><div class="line-1 lookHis showInputBox" phone1="'+phone1+'"  phone2="'+phone2+'"  phone3="'+phone3+'">' +
										phone +
										'</div></td>' +
										'<td><div class="line-1 lookHis">' + verifyWay +
										'</div></td>' +
										'<td><div class="line-1 lookHis showInputBoxTel"  tel1="'+tel1+'"  tel2="'+tel2+'"  tel3="'+tel3+'">' + tel +
										'</div></td></tr>')
									// _this.parent().css('display', 'none')
                  $('#add-hos .supplyNewRel').css('display', 'none')
									$('#add-hos .supplyNewRel button').attr('disabled', false)
									$('#add-hos .addNewRel').css('display', 'block')
								}
							}
						})
					}

				}
			})
            // 查看某人对应追踪
			$('#add-hos tbody').off('click', 'tr .enterHos').on('click', 'tr .enterHos', function() {
				// console.log()
				$('#add-hos .tableBoxLf').find('.enterHos').parent().css('background', '#fff')
				// $(this).parent().parent().parent().parent().find('.enterHos').parent().css('background','#fff')
				$(this).parent().css('background', 'rgba(229,229,229,0.5)')
				thisValue.customerWorkerIdZz = $(this).parent().attr('relId')
				$('#add-hos .trackName').html(`<span style="color:red;">${$(this).children().html()}</span>` + '的跟踪记录')
				thisValue.trackrelList(thisValue.customerId, thisValue.customerWorkerIdZz, 1)
            })
            // 提交追踪
			$('#add-hos .sendTrack').unbind("click").click(function() {
				var interst = $("input[name='interst']:checked").val();
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
				console.log($("#quickIs").is(":checked"))
				if (thisValue.customerWorkerIdZz == '' || thisValue.customerWorkerIdZz == null || thisValue.customerWorkerIdZz == undefined) {
					layer.msg('请选择追踪人员')
				} else if (interst == '' || interst == null || interst == undefined) {
					layer.msg('请选择感兴趣程度')
				} else {
					$.ajax({
						url: '/my-customer/update-customer',
						type: 'post',
						data: 'customerId=' + thisValue.customerId + '&urgent=' + quickIs,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								$("#quickIs").attr('checked',false)
							} else {
								layer.msg(res.codeMsg)
							}
						}
					})

					$.ajax({
						url: '/my-customer-worker-trace/create-customer-worker-trace',
						type: 'post',
						data: 'customerWorkerId=' + thisValue.customerWorkerIdZz + '&content=' + encodeURIComponent(content) + '&level=' + interst,
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

			$('#add-hos .modifyHos').unbind("click").click(function() {
				$('#add-hos .modifyHos').attr('disabled',true);
				thisValue.modifyNewHos()
            })
            // TODO 新增医院
			// /my-customer/create-customer
			$('#add-hos .addHos').unbind("click").click(function() {
				$('#add-hos .addHos').attr('disabled', true);

				thisValue.addNewHos()
            })
            thisValue.trackrelList(thisValue.customerId, '', 1)
            // 跟踪记录
			$('#add-hos .lookAllTrack').unbind("click").click(function() {

				$('#add-hos .trackName').html('所有人的跟踪记录')
				thisValue.trackrelList(thisValue.customerId, '', 1)
            })
            // $('body').unbind("click").click(function(e){
			// 	console.log(e.target.id)
			// 	if (e.target.id.length) {
			// 	                thisValue.closePopWindow()
			// 	            }

            // })

            $('#add-hos .province').change(function() {
				let provinceText = $(this).val();
				$.each(thisValue.provinceList, function(i, item) {
					if (provinceText == item.value) {
						thisValue.cityItem = i;
						// return thisValue.cityItem
					}
				});
				thisValue.cityList = thisValue.provinceList[thisValue.cityItem]
				$('#add-hos .city').html('<option value="">-市-</option>')
				$('#add-hos .town').html('<option value="">-区-</option>')
				$.each(thisValue.cityList.children, function(i, item) {
					// addele(city,item.name)
					$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
            $('#add-hos .city').change(function() {
				let cityText = $(this).val();
				$.each(thisValue.cityList.children, function(i, item) {
					if (cityText == item.value) {
						thisValue.townItem = i;
						// return thisValue.cityItem
					}
				});
				thisValue.townList = thisValue.cityList.children[thisValue.townItem]
				$('#add-hos .town').html('<option value="">-区-</option>')
				$.each(thisValue.townList.children, function(i, item) {
					// addEle(city,item.name)
					$('#add-hos .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
            })
            // 点击弹出修改号码
			$('#add-hos tbody').off("click", 'tr .showInputBox').on('click', 'tr .showInputBox', function(){
				clearTimeout(thisValue.timeIs)
				var thisHtml = $(this).html()
				var thisLinkName=$(this).parent().parent().find('.enterHos').children().html()
				var _this_=$(this)
				thisValue.closePopWindow()
				thisValue.timeIs = setTimeout(function() {
					if (thisHtml && thisHtml.split(',').length == 1) {
						$('#inp_send').val(_this_.attr('phone1')||_this_.attr('phone2')||_this_.attr('phone3')||"").attr('linkName',thisLinkName)
						// $('#inp_send').val(thisHtml)
						$('#btn_conn').click()
					} else {
						$('#inp_send').attr('linkName',thisLinkName)
						$('#add-hos .addphoeShow').attr('id', '')
						$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 1)
						$('#add-hos table').find('.jsModify').removeClass('jsModify')
						_this_.addClass('jsModify')
						// if()
						// var phones = thisHtml.split(',')
						// for (var i in phones) {
						// 	var num = parseInt(i) + 1
						// 	$('.phonep' + num).html(phones[i])
						// }
						$('#add-hos .phonep1').html(_this_.attr('phone1')||'')
						$('#add-hos .phonep2').html(_this_.attr('phone2')||'')
						$('#add-hos .phonep3').html(_this_.attr('phone3')||'')
					}
				}, 300)
            })
            $('#add-hos tbody').off("dblclick", 'tr .showInputBox').on('dblclick', 'tr .showInputBox', function() {
				clearTimeout(thisValue.timeIs)
				var thisHtml = $(this).html()
				var _this_=$(this)
				thisValue.closePopWindow()
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
					// 	$('.phonep' + num).html(phones[i])
					// }
					$('.phonep1').html(_this_.attr('phone1')||'')
					$('.phonep2').html(_this_.attr('phone2')||'')
					$('.phonep3').html(_this_.attr('phone3')||'')
				}
            })
            $('#add-hos tbody').off("click",'tr .showInputBoxTel').on('click', 'tr .showInputBoxTel', function() {
				thisValue.closePopWindow()
				var thisHtml = $(this).html()
				var thisLinkName=$(this).parent().parent().find('.enterHos').children().html()
				var _this_=$(this)
				clearTimeout(thisValue.timeIs)
				thisValue.timeIs = setTimeout(function() {
					if (thisHtml && thisHtml.split(',').length == 1) {
						// lineFriends($(this).html())
						$('#inp_send').val(_this_.attr('tel1')||_this_.attr('tel2')||_this_.attr('tel3')||"").attr('linkName',thisLinkName)
						$('#btn_conn').click()
					} else {
						$('#inp_send').attr('linkName',thisLinkName)
						$('#add-hos .addphoeShow').attr('id', '')
						$('#add-hos .addphoeShow').css('display', 'block').attr('id', _this_.parent().parent().attr('relId')).attr('type', 2)
						$('#add-hos table').find('.jsModify').removeClass('jsModify')
						_this_.addClass('jsModify')
						// var phones = thisHtml.split(',')
						// for (var i in phones) {
						// 	var num = parseInt(i) + 1
						// 	$('.phonep' + num).html(phones[i])
						// }

						$('#add-hos .phonep1').html(_this_.attr('tel1')||'')
						$('#add-hos .phonep2').html(_this_.attr('tel2')||'')
						$('#add-hos .phonep3').html(_this_.attr('tel3')||'')
						// alert(_this_.attr('tel1'))
					}
				}, 300)
            })
            $('#add-hos tbody').on('dblclick', 'tr .showInputBoxTel', function() {
				clearTimeout(thisValue.timeIs)
				thisValue.closePopWindow()
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
		}
		$('.trackName').unbind("click").click(function() {
				debugger
				$('.trackName').html('所有人的跟踪记录')
				thisValue.trackrelList(thisValue.customerId, '', 1)
			})

    },
    methods:{
        modifyHosTel(telNameTitle,telName,telValueTitle,telValue,type){
            let thisValue = this
				var param=telNameTitle+'='+telName+'&'+telValueTitle+'='+ telValue
				console.log(param)
				$.ajax({
					url: '/my-customer/update-customer',
					type: 'post',
					data: param+ '&customerId=' + thisValue.customerId,
					async: true,
					success: function(res) {
						if (res.code == 0) {
							layer.msg('操作成功')
							if(type==0){
								$('.linePhoneList').append('<div typeId='+telValueTitle+'>'+
								'<span>'+telName+':</span>'+
								'<span>'+telValue+'</span>'+
								'<img class="phoneThisTel"  src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}else{
								$('.linePhoneList').children().eq(type-1).html('<span>'+telName+':</span>'+
								'<span>'+telValue+'</span>'+
								'<img class="phoneThisTel"  src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">').attr('typeId',telValueTitle)

								// html('<div typeId='+telNameTitle+'>'+
								// '<span>'+telName+':</span>'+
								// '<span>'+telValue+'</span>'+
								// '<img class="phoneThisTel"  src="./image/connent.png" alt="">'+
								// '<img class="modifyThisTel" src="./image/edit.svg" alt="">'+
								// // '<img src="./image/delete.svg" alt="">'+
								// '</div>')
							}

							// window.history.refresh()
						}
					}
				})
        },
        removeTel(){
            let thisValue = this
			$('#add-hos .telName').val('')
			$('#add-hos .telValue').val('')
			$('#add-hos .submit_newTel').attr('typeId','')
			$('#add-hos .addNewTelBox').css('display','none')
        },
   //      show(val) {
   //          let thisValue = this
			// // clearTimeout(thisValue.timerMove)
			// // if(val==null||val==''||val==undefined){
			// // 	val=''
			// // }
			// // $('#add-hos .showTips').html(val).css('display', 'block')
   //      },
   //      showhidden() {
   //          let thisValue = this
			// thisValue.timerMove = setTimeout(function() {
			// 	$('#add-hos .showTips').css('display', 'none')
			// 	$('#add-hos .showTips  div').html('')
			// }, 1000)
   //      },
        modifyNewHos() {
            let thisValue = this
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
				let toRevisitTime = $('#add-hos .huifangClass input').val()
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
							'&brief=' + encodeURIComponent(hosIntro) + '&customerId=' + thisValue.customerId+ '&toRevisitTime=' + toRevisitTime,
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
            let thisValue = this
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
				// var toRevisitTime = $('#add-hos .huifangClass').val()
				debugger
				let toRevisitTime = new Date($('#add-hos .huifangClass input').val()).getTime()
				console.log(toRevisitTime)
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
							'&brief=' + encodeURIComponent(hosIntro)+'&toRevisitTime=' + toRevisitTime,
						async: true,
						success: function(res) {
							if (res.code == 0) {
								layer.msg('操作成功')
								thisValue.$router.replace({path:'/add-hos',query:{id:res.data.customerId}})
								// location.href = '#/add-hos?id=' + res.data.customerId
								thisValue.customerId = res.data.customerId
								$('#add-hos .addHos').attr('disabled', false);
								// window.history.refresh()
							} else {
							$('#add-hos .addHos').attr('disabled',false);

								layer.msg(res.codeMsg)
							}
						}
					})
				}
            },
        // TODO 新增追踪记录
			// TODO 查询追踪记录
			// TODO 修改相关人员信息

			// 新增医院方法
			// addHos(){
			// 	$.ajax({
			// 		url:'/my-customer/create-customer',
			// 		type:'post',
			// 		data:'name='+name+'&tel='+tel+'&nature='+nature+'&area1Id='+area1Id+'&area2Id='+area2Id+'&area3Id='+area3Id+'&area1Name='+area1Name+'&area2Name='+area2Name+'&area3Name='+area3Name+'&hosIntro='+hosIntro,
			// 		async:false,
			// 		success:function(res){
			// 			if(res.code==0){
			// 				layer.msg('添加成功')
			// 				window.history.refresh()
			// 			}
			// 		}
			// 	})
            // },
        // 医院详情列表
		hosDetail(customerId) {
            let thisValue = this
				$.ajax({
					url: '/my-customer/customer',
					type: 'GET',
					data: 'customerId=' + customerId,
					async: false,
					success: function(res) {
						if (res.code == 0) {
							debugger
							// moment(Time.confirmStart).format('YYYY-MM-DD')
							thisValue.toRevisitTime = thisValue.moment(res.data.toRevisitTime).format('YYYY-MM-DD')
							console.log(thisValue.toRevisitTime)
							document.title = res.data.name + " - " + document.title
							$('#add-hos .hosname').val(res.data.name)
							$('#add-hos .hosIntro').val(res.data.brief)
							$('#add-hos .hostel').val(res.data.tel)
							$('#add-hos .hosnature').val(res.data.nature)
							if (res.data.tel != '' && res.data.tel != null && res.data.tel != undefined) {
								$('#add-hos .linkHos').css('display', 'inline-block')
							}
							thisValue.paiBanCustomerWorkerId = res.data.paiBanCustomerWorkerId
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
							// let connent = require('../assets/img/connent.png')
							if(res.data.tel1){
								$('#add-hos .linePhoneList').append('<div typeId="tel1">'+
								'<span>'+res.data.tel1Remark+':</span>'+
								'<span>'+res.data.tel1+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel2){
								$('#add-hos .linePhoneList').append('<div typeId="tel2">'+
								'<span>'+res.data.tel2Remark+':</span>'+
								'<span>'+res.data.tel2+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel3){
								$('#add-hos .linePhoneList').append('<div typeId="tel3">'+
								'<span>'+res.data.tel3Remark+':</span>'+
								'<span>'+res.data.tel3+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel4){
								$('#add-hos .linePhoneList').append('<div typeId="tel4">'+
								'<span>'+res.data.tel4Remark+':</span>'+
								'<span>'+res.data.tel4+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'"  alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel5){
								$('#add-hos .linePhoneList').append('<div typeId="tel5">'+
								'<span>'+res.data.tel5Remark+':</span>'+
								'<span>'+res.data.tel5+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel6){
								$('#add-hos .linePhoneList').append('<div typeId="tel6">'+
								'<span>'+res.data.tel6Remark+':</span>'+
								'<span>'+res.data.tel6+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel7){
								$('#add-hos .linePhoneList').append('<div typeId="tel7">'+
								'<span>'+res.data.tel7Remark+':</span>'+
								'<span>'+res.data.tel7+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel8){
								$('#add-hos .linePhoneList').append('<div typeId="tel8">'+
								'<span>'+res.data.tel8Remark+':</span>'+
								'<span>'+res.data.tel8+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+'require(../assets/img/edit.svg)'+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							if(res.data.tel9){
								$('#add-hos .linePhoneList').append('<div typeId="tel9">'+
								'<span>'+res.data.tel9Remark+':</span>'+
								'<span>'+res.data.tel9+'</span>'+
								'<img class="phoneThisTel" src="'+require('../assets/img/connent.png')+'" alt="">'+
								'<img class="modifyThisTel" src="'+require('../assets/img/edit.svg')+'" alt="">'+
								// '<img src="./image/delete.svg" alt="">'+
								'</div>')
							}
							// TODO 后期待优化
							$.ajax({
								url: './assets/js/area.json',
								type: 'get',
								async: false,
								success: function(res) {
									thisValue.provinceList = res
									// $('.province').html('<option value="">-请选择-</option>')
									debugger
									$('#add-hos .province').html('<option value="">-请选择-</option>')
									$('#add-hos .city').html('<option value="">-请选择-</option>')
									$('#add-hos .town').html('<option value="">-请选择-</option>')
									$.each(res, function(i, field) {
										$('#add-hos .province').append('<option value="' + field.value + '">' + field.label + '</option>')
										// $("span").append(field.name + "," + field.goods);
									});
								}
							})
							if (res.data.area1Id) {
								$('#add-hos .province').val(res.data.area1Id)
								// setTimeout(function(){
								// 	$('.province').val(res.data.area1Id)
								// },200)
								let provinceText = res.data.area1Id;

								$.each(thisValue.provinceList, function(i, item) {
									if (provinceText == item.value) {
										thisValue.cityItem = i;
										// return thisValue.cityItem
									}
								});
								thisValue.cityList = thisValue.provinceList[thisValue.cityItem]
								$('#add-hos .city').html('<option value="">-市-</option>')
								$('#add-hos .town').html('<option value="">-区-</option>')
								$.each(thisValue.cityList.children, function(i, item) {
									// addele(city,item.name)
									$('#add-hos .city').append('<option value="' + item.value + '">' + item.label + '</option>')
									if (res.data.area2Id) {
										$('#add-hos .city').val(res.data.area2Id)
										let cityText = res.data.area2Id;
										$.each(thisValue.cityList.children, function(i, item) {
											if (cityText == item.value) {
												thisValue.townItem = i;
												// return thisValue.cityItem
											}
										});
										thisValue.townList = thisValue.cityList.children[thisValue.townItem]
										$('#add-hos .town').html('<option value="">-区-</option>')
										$.each(thisValue.townList.children, function(i, item) {
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
            let thisValue = this
				$.ajax({
					url: '/my-customer-worker/customer-worker-list',
					type: 'GET',
					data: 'customerId=' + customerId,
					async: true,
					success: function(res) {
						if (res.code == 0) {
                $('.addNewRel').css('display','block')
                 $('.supplyNewRel').css('display','none')
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
									if (res.data.itemList[i].customerWorkerId != thisValue.paiBanCustomerWorkerId) {
										// var show1 = "show('" + res.data.itemList[i].phone + "')"
										// var show2 = "show('" + res.data.itemList[i].verifyWay + "')"
										// var show3 = "show('" + res.data.itemList[i].tel + "')"

										// if(phoneAll){
										// 	var phoneAll=phoneAll.substring(0, 3) + "****"+phoneAll.substring(8,phoneAll.length)
										// }
										// if(telAll){
											// 	var telAll=telAll.substring(0, 3) + "****"+telAll.substring(8,telAll.length)
										// }
										var phoneAll = phoneAll
										var telAll=telAll
										$('#add-hos .tbody').append('<tr relId="' + res.data.itemList[i].customerWorkerId +
											'"><td class="enterHos"><div class="line-1">' + (res.data.itemList[i].name || "") + '</div></td>' +
											'<td><div class="line-1 lookHis">' + (res.data.itemList[i].post || "") + '</div></td>' +
											'<td><div class="line-1 lookHis showInputBox" phone1="'+(res.data.itemList[i].phone1||"")+'" phone2="'+(res.data.itemList[i].phone2||"")+'" phone3="'+(res.data.itemList[i].phone3||"")+'" >' +
											// (res.data.itemList[i].phone || "") +
											phoneAll+
											'</div></td>' +
											'<td><div class="line-1 lookHis" >' + (res.data.itemList[
												i].verifyWay || "") +
											'</div></td>' +
											'<td><div class="line-1 lookHis showInputBoxTel" tel1="'+(res.data.itemList[i].tel1||"")+'" tel2="'+(res.data.itemList[i].tel2||"")+'" tel3="'+(res.data.itemList[i].tel3||"")+'">'+telAll+// + (res.data.itemList[i].tel || "") +
											'</div></td></tr>')
									}else{
										// if(phoneAll){
										// 	var phoneAll=phoneAll.substring(0, 3) + "****"+phoneAll.substring(8,phoneAll.length)
										// }
										// if(telAll){
										// 	var telAll=telAll.substring(0, 3) + "****"+telAll.substring(8,telAll.length)
										// }
										var phoneAll=phoneAll
										var telAll=telAll
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
            let thisValue = this
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
								// res.data.itemList = res.data.itemList
								for (var i in res.data.itemList.reverse()) {
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
									$('#add-hos .trackDetail').scrollTop($('.trackDetail')[0].scrollHeight);
								}
							}
						}
					}
				})
            },
        // 时间转换
		getDateDiff(dateTimeStamp) {
            let thisValue = this
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
            let thisValue = this
			$('#add-hos .phonep1').html('')
			$('#add-hos .phonep2').html('')
			$('#add-hos .phonep3').html('')
			$('#add-hos .addphoeShow').css('display', 'none')
			$('#add-hos .addphoen').css('display', 'none')
        },
    },
}
</script>
<style scoped>
.huifangClass{
	width:auto
}
.huifangClass input{
	width:180px!important;
	padding:10px 10px!important;
	height: auto!important;
}
</style>
