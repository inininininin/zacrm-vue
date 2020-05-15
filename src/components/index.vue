<template>
  <div class="index">
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
					 <span class="lastHis" @click="lastHisFn" style="float: right;line-height: 80px;margin-right: 20px;">上次浏览记录</span>
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
						<td></td>
						<td></td>
						<td></td>
						<td tel='15077822798'>15077822798</td>
						<td></td>
						<td></td>
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
import '../../src/assets/page/jquery-1.11.1.min.js'
import '../../src/assets/page/paging.js'
export default {
  name: 'HelloWorld',
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
				layer:''
    }
  },
  activated(){
    this.getData();
	this.lastPageNo();
	var layer;
			layui.use('layer', function() {
				layer = layui.layer;
			});
  },
  methods:{
    lastHisFn(){
      $.ajax({
					url: '/cache/get',
					type: 'get',
					data: 'name=' + $('.peoname').html(),
					async: true,
					success: function(res) {
						if (res.code == 0) {
							console.log(JSON.parse(res.data.value))
							var data = JSON.parse(res.data.value)
							kw = data.kw
							this.level = data.level
							this.nature = data.nature
							this.area1Id = data.area1Id
							this.area2Id = data.area2Id
							this.urgent = data.urgent
							pn = data.page
							totalNum = data.totalNum
							$('.keyword').val(kw)
							$('.urgentLevel').val(level || urgent)
							$('.nature').val(nature)
							$('.province').val(area1Id)
							$('.city').val(area2Id)
							console.log(data.page)
							// $('.keyword').val(kw)
							$('#box').paging({
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
									lastPage(page, ps, kw, nature, area1Id, area2Id, area3Id, urgent, level)
								}
							})

						}
					}
				})
    },
    getData(){
      $.ajax({
				url: '/login-refresh',
				type: 'POST',
				async: true,
				success: function(res) {
					if (res.code == 0) {
						$('.peoname').html(res.data.nickname)
						//         window.location.href='index.html'
					} else {
						
						setTimeout(function() {
							location.href = 'login.html'
						}, 1000)
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
