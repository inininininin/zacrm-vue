<template>
  	<div id="index" class="index">
    	<a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a>
		<input type="" name="" id="inp_send"  hidden="">
		<button id="btn_conn" hidden="">发送</button>
		<div class="mainbox">
			<div class="topselect">
				<div style="width: 100%;height: 80px;">
					<h2 class="peoname"></h2><span class="shuju" style="margin: 0 10px;"></span> <a class="addHos" href="addHos.html"
					 target="_blank">新增医院</a> 

					 <a href="javascript:;" class="loginout" style="float: right;line-height: 80px;margin-left: 20px;">退出登录</a>
					 <a class="lookBefore" href="historyDetail.html" target="_blank">查看昨日工作记录</a>
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
						</tr>
					</thead>
					<tbody class="tbody">
						<tr v-for="(item,inx) in tableList" :key="inx">
							<td>{{item.pn}}</td>
							<td class="enterHos">
								<a :href="'addHos.html?id=' + item.customerId"  target="_blank">
									{{item.name || ""}}
								</a>
							</td>
							<td>{{item.paiBanCustomerWorkerName ||""}}</td>
							<td>{{item.tel}}</td>
							<td>{{item.paiBanCustomerWorkerVerifyWay ||""}}</td>
							<td>{{item.updateTime}}</td>
						</tr>
					</tbody>
				</table>
				<div class="box rt" id="box"></div>
			</div>
		</div>
		<div class="phoneNow">
			<div></div>
			<div>
				
				<p><span class="phoneNumber"></span>正在通话中. . .</p>
				<div class="phoneEnd" id="btn_close">
					<img src="image/phoneEnd.png" alt="">
					<span>挂断电话</span>
				</div>
			</div>
		</div>
 	</div>
</template>

<script>
var kw = '',
	level = '',
	nature = '',
	area1Id = '',
	area2Id = '',
	area3Id = '',
	ps = 15,
	urgent = '',
	pn = 1,
	totalNum = '',
	provinceList, cityList, townList, cityItem, townItem
export default {
	name: 'HelloWorld',
	data () {
		return {
			tableList:[]
		}
	},
	activated(){
		this.start();		
	},
	methods:{
		start(){
			let _this =this
			debugger
			$('#index .lastHis').click(function() {
				$.ajax({
					url: '/cache/get',
					type: 'get',
					data: 'name=' + $('#index .peoname').html(),
					async: true,
					success: function(res) {
						if (res.code == 0) {
							console.log(JSON.parse(res.data.value))
							var data = JSON.parse(res.data.value)
							kw = data.kw
							level = data.level
							nature = data.nature
							area1Id = data.area1Id
							area2Id = data.area2Id
							urgent = data.urgent
							pn = data.page
							totalNum = data.totalNum
							$('#index .keyword').val(kw)
							$('#index .urgentLevel').val(level || urgent)
							$('#index .nature').val(nature)
							$('#index .province').val(area1Id)
							$('#index .city').val(area2Id)
							console.log(data.page)
							// $('.keyword').val(kw)
							$('#index #box').paging({
								initPageNo: pn, // 初始页码
								totalPages: totalNum, //总页数
								//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
								slideSpeed: 600, // 缓动速度。单位毫秒
								jump: true, //是否支持跳转
								callback: function(page) { // 回调函数
									// memberList1(1,page);
									var nature = $('.nature').val()
									pn = page
									console.log(pn)
									_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
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
						$('#index .peoname').html(res.data.nickname)
						//         window.location.href='index.html'
					} else {
						
						setTimeout(function() {
							location.href = 'login.html'
						}, 1000)
					}
				}
			})
			$('#index table').on('click', 'tr .enterHos', function() {
				$(this).parent().parent().find('.a29905').addClass('a29902').removeClass('a29905')
				$(this).parent().addClass('a29905').removeClass('a29902')
				var param = {
					'page': pn,
					'level': level,
					'nature': nature,
					'kw': kw,
					'area1Id': area1Id,
					'area2Id': area2Id,
					'urgent': urgent,
					'totalNum': totalNum
				}
				$.ajax({
					url: '/cache/set',
					type: 'post',
					data: 'name=' + $('#index .peoname').html() + '&value=' + JSON.stringify(param),
					async: true,
					success: function(res) {
						if (res.code == 0) {

						}
					}
				})

			})
			// 搜索
			debugger
			$('#index .searchThis').click(function() {
				kw = $('#index .keyword').val()
				debugger
				_this.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			debugger
			$('#index .urgentLevel').change(function() {
				if ($(this).val() == '') {
					urgent = ''
					level = ''
				} else if ($(this).val() == 0) {
					urgent = 1
					level = ''
				} else {
					urgent = ''
					level = $(this).val()
				}
debugger
				_this.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			debugger
			$('#index .nature').change(function() {
				nature = $(this).val()
				debugger
				_this.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			debugger
			$.getJSON("js/area.json", function(res) {
				provinceList = res
				// $('.province').html('<option value="">-请选择-</option>')
				$.each(res, function(i, field) {

					$('#index .province').append('<option value="' + field.value + '">' + field.label + '</option>')
					// $("span").append(field.name + "," + field.goods);
				});
			});
			debugger

			$('#index .province').change(function() {
				let provinceText = $(this).val();
				$.each(provinceList, function(i, item) {
					if (provinceText == item.value) {
						cityItem = i;
					}
				});
				cityList = provinceList[cityItem]
				$('#index .city').html('<option value="">-市-</option>')
				$('#index .town').html('<option value="">-区-</option>')
				$.each(cityList.children, function(i, item) {
					$('#index .city').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				area1Id = $(this).val()
				area2Id = ''
				debugger
				_this.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			debugger
			$('#index .city').change(function() {
				let cityText = $(this).val();
				$.each(cityList.children, function(i, item) {
					if (cityText == item.value) {
						townItem = i;
					}
				});
				townList = cityList.children[townItem]
				$('#index .town').html('<option value="">-区-</option>')
				$.each(townList.children, function(i, item) {
					$('#index .town').append('<option value="' + item.value + '">' + item.label + '</option>')
				})
				area2Id = $(this).val()
				debugger
				_this.lastPageNo()
				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			$('#index .town').change(function(){
				area3Id = $(this).val()
			})
			debugger
			_this.lastPageNo();
			// 清空全部搜索条件
			$('#index .refresh').click(function() {
				$('#index .keyword').val('')
				$('#index .province').val('')
				$('#index .city').val('')
				$('#index .town').val('')
				$('#index .nature').val('')
				$('#index .urgentLevel').val('')
				kw = ''
				nature = ''
				area1Id = ''
				area2Id = ''
				area3Id=''
				urgent = ''
				level = ''
				debugger
				_this.lastPageNo()


				// lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
				$('#index #box').paging({
					initPageNo: 1, // 初始页码
					totalPages: totalNum, //总页数
					//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
					slideSpeed: 600, // 缓动速度。单位毫秒
					jump: true, //是否支持跳转
					callback: function(page) { // 回调函数
						// memberList1(1,page);
						var nature = $('#index .nature').val()
						pn = page
						_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
					}
				})
			})
			$('#index .loginout').click(function(){
				$.ajax({
					type:"post",
					url:"/logout",
					data:"",
					success:function (data){
						_this.$router.push({path:'/login'})
								// location.href='login.html'
					}
				})
			})
			$('#index table').on('click','tr td:nth-child(4)',function(){
				
				if($(this).attr('tel')==''||$(this).attr('tel')==null||$(this).attr('tel')==undefined){
					
				}else{
					//anjie($(this).attr('tel'))
					 //tTimeout(function(){
					 	$('#index #inp_send').val($(this).attr('tel'))
					 	$('#index .phoneNumber').html($(this).html())
					 	$('#index #btn_conn').click()
					 //2000)
					
				}
				
			})
		},
		getDateDiff(dateTimeStamp) {
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
		lastPage(pn, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level) {
			let _this = this
				$.ajax({
					url: '/my-customer/customer-list',
					type: 'GET',
					data: 'kw=' + kw + '&level=' + level + '&pn=' + pn + '&ps=' + ps + '&nature=' + nature + '&area1Id=' + area1Id +
						'&area2Id=' + area2Id + '&area3Id=' + area3Id + '&urgent=' + urgent,
					async: true,
					success: function(res) {
						if (res.code == 0) {
							$('#index .tbody').html('')
							if (res.data.itemList && res.data.itemList.length > 0) {
								for (var i in res.data.itemList) {
									var tel=''
									if(res.data.itemList[i].tel){
										tel=res.data.itemList[i].tel.substring(0, 3) + "****"+res.data.itemList[i].tel.substring(8,res.data.itemList[i].tel.length)
									}
									_this.tableList.push({
										pn:i+1,
										name:res.data.itemList[i].name,
										paiBanCustomerWorkerName:res.data.itemList[i].paiBanCustomerWorkerName,
										tel:res.data.itemList[i].tel,
										paiBanCustomerWorkerVerifyWay:res.data.itemList[i].paiBanCustomerWorkerVerifyWay,
										updateTime:_this.getDateDiff(res.data.itemList[i].updateTime)
									})
								}
							}
						}
					}
				})
			},
		lastPageNo() {
			debugger;
			let _this = this
			$.ajax({
				url: '/my-customer/customer-list-sum',
				type: 'GET',
				data: 'kw=' + kw + '&level=' + level + '&nature=' + nature + '&area1Id=' + area1Id + '&area2Id=' + area2Id +
					'&area3Id=' + area3Id + '&urgent=' + urgent,
				async: true,
				success: function(res) {
					if (res.code == 0) {
						totalNum = Math.ceil(res.data.itemCount / ps)
						$('#index .shuju').html('( 共' + res.data.itemCount + '条数据 )')
						debugger;
						console.log($('#index #box'))
						$('#index #box').paging({
							initPageNo: 1, // 初始页码
							totalPages: totalNum, //总页数
							//totalCount: '合计' + setTotalCount + '条数据', // 条目总数
							slideSpeed: 600, // 缓动速度。单位毫秒
							jump: true, //是否支持跳转
							callback: function(page) { // 回调函数
								// memberList1(1,page);
								var nature = $('#index .nature').val()
								pn = page
								_this.lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
							}
						})
					}
				}
			})
		}
	}		
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  width: 100%;
  height: 100%;
}
.mainbox{
	width: 80%;
	min-width: 1200px;
	margin: 0 auto;
}
.topselect{
	width: 100%;
	
}
.selectOption{
	width: 100%;
	height: 80px;
	line-height:80px;
	font-size: 16px;
	color: #333333;
}
.topselect h2{
	display: inline-block;
	margin: 0;
	line-height: 80px;
	font-size: 30px;
}

.addHos{
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
	text-decoration: none;
}
.lookBefore{
	float: right;
	line-height: 80px;
}

.lastHis{
	float: right;
	font-size: 16px;
	cursor: pointer;
	color: #337ab7;
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
.tableBox{
	width: 100%;
	height: auto;
}
.tableBox table{
	width: 100%;
	height: auto;
	
}
.tableBox table thead tr th,.tableBox table tbody tr td{
	height: 40px;
	line-height: 40px;
	width: auto;
	text-align: center;
}
.tableBox table tbody tr td{
	padding: 0 10px;
	border: 1px solid #e5e5e5;
	
}
.tableBox table tbody tr td:nth-child(2){
	cursor: pointer;
	text-align: left;
}
.tableBox table tbody tr td:nth-child(4){
	cursor: pointer;
}

/* .selectOption .province,.selectOption  .city,.selectOption  .town{
	width: 100px;
	margin-right: 5px;
}
 */

.a29905{
	background: rgba(229,229,229,0.5);
}
.a29902{
	background: rgba(229,229,229,0.2);
}


.phoneNow{
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
.phoneNow>div:nth-child(1){
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
}
.phoneNow p{
	position: fixed;
	z-index: 10;
	width: 100%;
	font-size: 18px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	text-align: center;
	top: 35%;
	color: #fff;
	
}
.phoneNow .phoneEnd{
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
.phoneNow .phoneEnd img{
	width: 24px;
	height: 24px;
}
.phoneNow .phoneEnd span{
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
</style>
