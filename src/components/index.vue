<template>
    <div id="index" class="index">
		<input type='' id='userName' hidden=''>
		<span class="record1" hidden=""></span>
		<span class="record2" hidden=""></span>
		<span class="record3" hidden=""></span>	
		<a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a>
		<input type="" name="" id="inp_send"  hidden="">
		<button id="btn_conn" hidden="">发送</button>
		<div class="mainbox">
			<div class="topselect">
				<div style="width: 100%;height: 80px;">
					<h2 class="peoname"></h2><span class="shuju" style="margin: 0 10px;"></span>
                    <router-link :to="{path:'/add-hos',query:{time:new Date().getTime()}}" class="addHos" >
						新增医院
					</router-link>
                    <!-- <a class="addHos" href="addHos.html"target="_blank">新增医院</a>  -->
					 <a href="javascript:;" class="loginout" style="float: right;line-height: 80px;margin-left: 20px;">退出登录</a>
					 <router-link :to="{path:'/history-detail'}"  class="lookBefore">
						查看昨日工作记录
					 </router-link>
					 <!-- <a class="lookBefore" href="historyDetail.html">查看昨日工作记录</a> -->
					 <span class="lastHis" style="float: right;line-height: 80px;margin-right: 20px;">上次浏览记录</span>
				</div>
				<div class="selectOption" style="width: 100%;height: 80px;">
					<button class="searchThis">搜索</button><input type="text" class="keyword" placeholder="关键字" /> 
					<select class="urgentLevel">
						<option value="">-级别-</option>
						<option value="0">加急客户</option>
						<option value="1">暂不感兴趣</option>
						<option value="2">初步感兴趣</option>
						<option value="3">非常感兴趣</option>
						<option value="4">近期可考察</option>
						<option value="5">线上可签单</option>
					</select>
					<select class="address province">
						<option value="">-省-</option>
					</select>
					<select class="address city">
						<option value="">-市-</option>
					</select>
					<select class="address town">
						<option value="">-区-</option>
					</select>
					<select class="nature">
						<option value="" selected>-性质-</option>
						<option value="1">民营医院</option>
						<option value="2">公立医院</option>
					</select>
					回访时间 : <input style="width:170px" @change="
							debugger;
							if($event.target.value){
								toRevisitTimeFrom = new Date($event.target.value+` 00:00:00`).getTime();
								toRevisitTimeTo = toRevisitTimeFrom+(1*24*60*60-1)*1000;
							}else{
								toRevisitTimeFrom = '';
								toRevisitTimeTo = '';
							}
							lastPageNo()
					" type="date" />
					<button class="searchThis refresh">重置</button>
				</div>
			</div>

			<div class="tableBox">
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>医院名称</th>
							<th>拍板人</th>
							<th>固定电话</th>
							<th>拍板人验证</th>
							<th>近期跟踪时间</th>
							<th>回访时间</th>
						</tr>
					</thead>
					<tbody class="tbody">
						<!--<td></td>
						<td></td>
						<td></td>
						<td tel='15077822798'>15077822798</td
						<td></td>
						<td></td>-->
					</tbody>
				</table>
				<div class="box rt" id="box"></div>
			</div>
		</div>
		<div class="seccion">ver : {{$version}}  ser : {{$store.state.serVersion}}</div>
    </div>
</template>
<script>
export default {
	name: 'index',
	data () {
		return {
			kw : '',
			level : '',
			nature : '',
			area1Id : '',
			area2Id : '',
			area3Id : '',
			ps : 15,
			urgent : '',
			pn : 1,
            totalNum : '',
            provinceList : undefined,
            cityList : undefined,
            townList : undefined,
            cityItem : undefined,
            townItem : undefined,
			query:'',
			toRevisitTimeFrom:'',
			toRevisitTimeTo:'',
		}
	},
	activated(){
		let thisValue = this
		
		
        // 跳转上次最后一条数据
        if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
            $('#index .lastHis').unbind("click").click(function() {
				$.ajax({
					url: '/cache/get',
					type: 'get',
					data: 'name=' + $('.peoname').html(),
					async: true,
					success: function(res) {
						if (res.code == 0) {
							console.log(JSON.parse(res.data.value))
							var data = JSON.parse(res.data.value)
							thisValue.kw = data.kw
							thisValue.level = data.level
							thisValue.nature = data.nature
							thisValue.area1Id = data.area1Id
							thisValue.area2Id = data.area2Id
							thisValue.urgent = data.urgent
							thisValue.pn = data.page
							thisValue.totalNum = data.totalNum
							$('#index .keyword').val(thisValue.kw)
							$('#index .urgentLevel').val(thisValue.level || thisValue.urgent)
							$('#index .nature').val(thisValue.nature)
							$('#index .province').val(thisValue.area1Id)
							$('#index .city').val(thisValue.area2Id)
							// console.log(data.page)
							// $('.keyword').val(thisValue.kw)
							$('#index #box').paging({
								initPageNo: thisValue.pn, // 初始页码
								totalPages: thisValue.totalNum, //总页数
								//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
								slideSpeed: 600, // 缓动速度。单位毫秒
								jump: true, //是否支持跳转
								callback: function(page) { // 回调函数
									// memberList1(1,page);
									var nature = $('#index .nature').val()
									thisValue.pn = page
									console.log(thisValue.pn)
									thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
								}
							})

						}
					}
				})
            })
        $.ajax({
				url: '/login-refresh',
				
				type: 'POST',
				async: true,
				success: function(res) {
					if (res.code == 0) {
						localStorage.setItem('nickname',res.data.nickname)
						$('#index .peoname').html(res.data.nickname)
						$('#index #userName').val(res.data.nickname)
						//         window.location.href='index.html'
					} else {
						
						setTimeout(function() {
                            thisValue.$router.push({path:'/login'})
                            // location.href='/#/login'
                            // location.href=location.pathname
							// location.href = 'login.html'
						}, 1000)
					}
				}
            })
        thisValue.lastPageNo()
        $('#index table').on('click', 'tr .enterHos', function() {
				$(this).parent().parent().find('.a29905').addClass('a29902').removeClass('a29905')
				$(this).parent().addClass('a29905').removeClass('a29902')
				var param = {
					'page': thisValue.pn,
					'level': thisValue.level,
					'nature': thisValue.nature,
					'kw': thisValue.kw,
					'area1Id': thisValue.area1Id,
					'area2Id': thisValue.area2Id,
					'urgent': thisValue.urgent,
					'totalNum': thisValue.totalNum
				}
				$.ajax({
					url: '/cache/set',
					type: 'post',
					data: 'name=' + $('.peoname').html() + '&value=' + JSON.stringify(param),
					async: true,
					success: function(res) {
						if (res.code == 0) {

						}
					}
				})

            })
        //点击进入详情页
			// $('body').on('click','tbody .enterHos',function(){
			//  // self.location.href='login.html'
			//   window.location.href='login.html'
			// // window.open ("login.html", "", "height=100, width=100,top=0, left=0,toolbar=no,menubar=no, scrollbars=no, resizable=no, location=n o,status=no")
            // })
        // 搜索
			$('#index .searchThis').unbind("click").click(function() {
				thisValue.kw = $('#index .keyword').val()
				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, thisValue.nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
			})
        $('#index .urgentLevel').change(function() {
				if ($(this).val() == '') {
					thisValue.urgent = ''
					thisValue.level = ''
				} else if ($(this).val() == 0) {
					thisValue.urgent = 1
					thisValue.level = ''
				} else {
					thisValue.urgent = ''
					thisValue.level = $(this).val()
				}

				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps,thisValue.kw, thisValue.nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
            })
        $('#index .nature').change(function() {
				thisValue.nature = $(this).val()
				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('.nature').val()
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
            })
        // 省市区三级联动
		// TODO 后期待优化
		$.getJSON("./assets/js/area.json", function(res) {
			thisValue.provinceList = res
			// $('#index .province').html('<option value="">-请选择-</option>')
			$.each(res, function(i, field) {
				$('#index .province').append('<option value="' + field.value + '">' + field.label + '</option>')
				// $("span").append(field.name + "," + field.goods);
			});
        });
        $('#index .province').change(function() {
				let provinceText = $(this).val();
				$.each(thisValue.provinceList, function(i, item) {
					if (provinceText == item.value) {
						thisValue.cityItem = i;
					}
				});
				thisValue.cityList = thisValue.provinceList[thisValue.cityItem]
				$('#index .city').html('<option value="">-市-</option>')
				$('#index .town').html('<option value="">-区-</option>')
				$.each(thisValue.cityList.children, function(i, item) {
					$('#index .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				thisValue.area1Id = $(this).val()
				thisValue.area2Id = ''
				thisValue.area3Id = ''
				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
        })
        $('#index .city').change(function() {
				let cityText = $(this).val();
				$.each(thisValue.cityList.children, function(i, item) {
					if (cityText == item.value) {
						thisValue.townItem = i;
					}
				});
				thisValue.townList = thisValue.cityList.children[thisValue.townItem]
				$('#index .town').html('<option value="">-区-</option>')
				$.each(thisValue.townList.children, function(i, item) {
					$('#index .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				thisValue.area2Id = $(this).val()
				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
            })
        $('#index .town').change(function(){
			
			thisValue.area3Id = $(this).val()
			thisValue.lastPageNo()
			$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
		})
		$('#index').on('click','.tbody .xiugaiTimeFn',function(e){
			
			$(this).parent().attr('id')


		})
        // 清空全部搜索条件
			$('#index .refresh').unbind("click").click(function() {
				$('#index .keyword').val('')
				$('#index .province').val('')
				$('#index .city').val('')
				$('#index .town').val('')
				$('#index .nature').val('')
				$('#index .urgentLevel').val('')
				thisValue.kw = ''
				thisValue.nature = ''
				thisValue.area1Id = ''
				thisValue.area2Id = ''
				thisValue.area3Id=''
				thisValue.urgent = ''
				thisValue.level = ''
				thisValue.toRevisitTimeFrom = ''
				thisValue.toRevisitTimeTo = ''
				thisValue.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: thisValue.totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						thisValue.pn = page
						thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
					}
				})
            })
        // window.onbeforeunload = function()
		// {
		// //  这是用来设定一个时间, 时间到了, 就会执行一个指定的 method。
		//     // setTimeout(onunloadcancel, 10);
		// 	$.ajax({
		// 		type:"post",
		// 		url:"/logout",
		// 		data:"",
		// 		success:function (data){
		
		// 		}
		// 	})
		//     return "真的离开?";
		// }
		// window.onunloadcancel = function()
		// {
		//     alert("取消离开");
        // }
        $('#index .loginout').unbind("click").click(function(){
			$.ajax({
				type:"post",
				url:"/logout",
				data:"",
				success:function (data){
                    // location.href='/#/login'
                    location.href=location.pathname
							// location.href='login.html'
				}
			})
        })
        $('#index table').on('click','tr td:nth-child(4)',function(){
				debugger
				if($(this).attr('tel')==''||$(this).attr('tel')==null||$(this).attr('tel')==undefined){
					
				}else{
                    debugger
					//anjie($(this).attr('tel'))
					 //tTimeout(function(){
					 	$('#inp_send').val($(this).attr('tel'))
					 	$('.phoneNumber').html($(this).html())
					 	$('#btn_conn').click()
					 //2000)
					
				}
				
			})
            


		}


			
    },
    methods:{
        lastPage(pn, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level) {
            let thisValue = this
				$.ajax({
					url: '/my-customer/customer-list',
					type: 'GET',
					data: 'kw=' + kw + '&level=' + level + '&pn=' + pn + '&ps=' + ps + '&nature=' + nature + '&area1Id=' + area1Id +
						'&area2Id=' + area2Id + '&area3Id=' + area3Id + '&urgent=' + urgent+ '&toRevisitTimeFrom=' + thisValue.toRevisitTimeFrom+ '&toRevisitTimeTo=' + thisValue.toRevisitTimeTo,
					async: true,
					success: function(res) {
						console.dir(res)
						if (res.code == 0) {
							$('#index .tbody').html('')
							if (res.data.itemList && res.data.itemList.length > 0) {
								for (var i in res.data.itemList) {
									var tel=''
									if(res.data.itemList[i].tel){
										tel=res.data.itemList[i].tel.substring(0, 3) + "****"+res.data.itemList[i].tel.substring(8,res.data.itemList[i].tel.length)
									}
									let toRevisitTime = '';
									if(res.data.itemList[i].toRevisitTime){
										toRevisitTime = thisValue.moment(res.data.itemList[i].toRevisitTime).format('YYYY-MM-DD')	;
									}else{
										toRevisitTime = ''
									}
                                    $('#index .tbody').append('<tr id=' + res.data.itemList[i].customerId +'><td>'+(parseInt(i)+1+((pn-1)*15))+
                                    '</td><td class="enterHos"><a href="#/add-hos?id=' + res.data.itemList[i].customerId +'">'
                                    + (res.data.itemList[i].name || "") + '</a></td><td>' + (res.data.itemList[i].paiBanCustomerWorkerName ||
											"") + '</td><td tel="'+(res.data.itemList[i].tel || "")+'">' + (tel || "") + '</td><td>' + (res.data.itemList[i].paiBanCustomerWorkerVerifyWay ||
											"") + '</td><td>' + thisValue.getDateDiff(res.data.itemList[i].updateTime) + '</td><td class="xiugaiTimeFn">' +
											 toRevisitTime + '</td></tr>')
									
                                }
							}
						}
					}
				})
		},
        lastPageNo() {
            let thisValue = this
				$.ajax({
					url: '/my-customer/customer-list-sum',
					type: 'GET',
					data: 'kw=' + thisValue.kw + '&level=' + thisValue.level + '&nature=' + thisValue.nature + '&area1Id=' + thisValue.area1Id + '&area2Id=' + thisValue.area2Id +
						'&area3Id=' + thisValue.area3Id + '&urgent=' + thisValue.urgent,
					async: true,
					success: function(res) {
						if (res.code == 0) {
							thisValue.totalNum = Math.ceil(res.data.itemCount / thisValue.ps)
							$('#index .shuju').html('( 共' + res.data.itemCount + '条数据 )')
							$('#index #box').paging({
								initPageNo: 1, // 初始页码
								totalPages: thisValue.totalNum, //总页数
								//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
								slideSpeed: 600, // 缓动速度。单位毫秒
								jump: true, //是否支持跳转
								callback: function(page) { // 回调函数
									// memberList1(1,page);
									var nature = $('#index .nature').val()
									thisValue.pn = page
									thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
								}
							})
							
						}
					}
				})
		},
        // 时间转换
        getDateDiff(dateTimeStamp) {
			if(!dateTimeStamp)
				return ''
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
            }
        
    }
}
</script>
<style scoped>
.seccion{
	width: 100%;
	height: 30px;
	line-height: 30px;
	text-align: center;
	margin-top: 90px;
	color: #a9a0a0;

}
</style>