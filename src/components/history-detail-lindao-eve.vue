<template>
    <div class="containBox" id="containBox">
        <h2>昨天工作记录列表</h2>
        <div class="selectOption" style="width: 100%;height: 80px;">
			<button class="searchThis" @click="searchFn">搜索</button>
				回访时间 : <input style="width:170px" @change="
						debugger;
						if($event.target.value){
							createTimeFrom = new Date($event.target.value+` 00:00:00`).getTime();
							createTimeTo = createTimeFrom+(1*24*60*60-1)*1000;
						}else{
							createTimeFrom = '';
						createTimeTo = '';
						}
						searchFn()
				" type="date" />
			<button class="searchThis refresh" @click="resertFn">重置</button>
		</div>
		<div class="trackDetail">
			<ul v-for="(item,inx) in containBoxList" :key="inx">
				<li><span>{{item.customerName}}</span><span>{{item.customerWorkerName}}</span></li>
				<li><span>{{interst}}</span><span>{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span></li>
				<li>{{item.content}}</li>
			</ul>
		</div>
        <div class="box rt" id="box" ></div>
    </div>
</template>
<script>
// var totalNum='',customerId='',customerWorkerId=''
export default {
    name: 'containBox',
	data () {
		return {
            interst:"",
			containBoxList:[],
			createTimeFrom:'',
			createTimeTo:'',
			totalNum:'',
			customerId:'',
			customerWorkerId:'',

		}
    },
    activated(){
      $('#containBox .trackDetail').html('')
      this.customerId=GetQueryString('id')
        this.startFn()
	},
	methods:{
		resertFn(){
			Object.assign(this.$data, this.$options.data());
			this.startFn()
		},
		searchFn(){
			console.log(this.createTimeFrom)
			let from = this.moment(this.createTimeFrom).format('YYYY-MM-DD HH-mm-ss')
			let to = this.moment(this.createTimeTo).format('YYYY-MM-DD HH-mm-ss')
			console.log(from+'+'+to)
			this.totalNum = '';
			// this.customerId = '';
			this.customerWorkerId = '';
			this.containBoxList = []
			this.startFn()
		},
        startFn(){
			debugger
			let _this = this
            $.ajax({
				url: '/ling-dao/customer-worker-trace/customer-worker-trace-list-sum',
				type: 'GET',
				data: 'customerId=' + _this.customerId+'&createTimeFrom='+_this.createTimeFrom+'&createTimeTo='+_this.createTimeTo+'&userId='+localStorage.getItem('id'),
				async: false,
				success: function(res) {
					if (res.code == 0) {
						_this.totalNum=Math.ceil(res.data.itemCount/20)
						console.log(_this.totalNum)
					}
				},
			})

            $('#box').paging({
				initPageNo: 1, // 初始页码
				totalPages: _this.totalNum, //总页数
				//totalCount: '合计' + setTotalCount + '条数据', // 条目总数
				slideSpeed: 600, // 缓动速度。单位毫秒
				jump: true, //是否支持跳转
				callback: function(page) { // 回调函数
                    // memberList1(1,page);
                    _this.trackrelList(_this.customerId,_this.customerWorkerId,page)
                }
			})
        },
        // 跟踪记录列表
        trackrelList(customerId,customerWorkerId,pn) {
          console.log(111)
            let _this = this
			   	$.ajax({
			   		url: '/ling-dao/customer-worker-trace/customer-worker-trace-list',
			   		type: 'GET',
			   		data: 'customerId=' + customerId+'&customerWorkerId='+customerWorkerId+'&pn='+pn+'&ps=20'+
            '&createTimeFrom='+this.createTimeFrom+'&createTimeTo='+this.createTimeTo+'&userId='+localStorage.getItem('id'),
			   		async: true,
			   		success: function(res) {
			   			if (res.code == 0) {
			   				_this.interst=''

			   				if (res.data.itemList && res.data.itemList.length > 0) {

			   					$('#containBox .trackDetail').html('')
			   					for (var i in res.data.itemList) {
			   						if(res.data.itemList[i].level==1){
			   							_this.interst='暂不感兴趣'
			   						}else if(res.data.itemList[i].level==2){
			   							_this.interst='初步感兴趣'
			   						}else if(res.data.itemList[i].level==3){
			   							_this.interst='非常感兴趣'
			   						}else if(res.data.itemList[i].level==4){
			   							_this.interst='近期可考察'
			   						}else if(res.data.itemList[i].level==5){
			   							_this.interst='线上可签单'
                                    }
                                    _this.containBoxList.push(res.data.itemList[i])
                                    // _this.containBoxList[i].createTime = changeDateFormat(res.data.itemList[i].createTime)
			   						$('#containBox .trackDetail').append()
			   						$('#containBox .trackDetail').scrollTop($('#containBox .trackDetail')[0].scrollHeight);
			   					}
			   				}
			   			}
			   		}
			   	})
			   }
    }
}
</script>
<style scoped>
.containBox{
	width: 90%;
	margin: 20px auto 50px;
	min-width: 1200px;
}
.containBox h2{
	font-size: 28px;
	color: #333333;
	margin-left: 20px;
}
.trackDetail {
	width: 100%;
	height: auto;
	margin-bottom: 30px;
}
.trackDetail ul{
	margin: 0 0 0 20px;
	width: 100%;
	border-bottom: 1px solid #e5e5e5;
	padding: 15px 0;
}
.trackDetail ul li:nth-child(1) span:nth-child(1){
	font-size: 18px;
	line-height: 24px;
	color: #333333;
	display: inline-block;
}
.trackDetail ul li:nth-child(1) span:nth-child(2){
	margin-left: 15px;
	font-size: 16px;
	color: #666666;
	line-height: 24px;
	display: inline-block;
}
.trackDetail ul li:nth-child(2) span:nth-child(1){
	font-size: 16px;
	line-height: 24px;
	color: #333333;
	display: inline-block;
}
.trackDetail ul li:nth-child(2) span:nth-child(2){
	margin-left: 15px;
	font-size: 14px;
	color: #999999;
	line-height: 24px;
	display: inline-block;
}
.trackDetail ul li:nth-child(3){
	font-size: 14px;
	line-height: 25px;
	color: #666666;
}
.selectOption{
	margin-top: 20px;
	margin-left:20px;
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
.searchThis input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        margin-top: 7px
    }


</style>
