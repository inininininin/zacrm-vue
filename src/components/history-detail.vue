<template>
    <div class="containBox" id="containBox">
        <h2>昨天工作记录列表</h2>
                
        <div class="trackDetail">
            <ul v-for="(item,inx) in containBoxList" :key="inx">
				<li><span>{{item.customerName}}</span><span>{{item.customerWorkerName}}</span></li>
			   	<li><span>{{interst}}</span><span>{{item.createTime}}</span></li>
			   	<li>{{item.content}}</li>
			</ul>
        </div>
        <div class="box rt" id="box" ></div>
    </div>
</template>
<script>
var totalNum='',customerId='',customerWorkerId=''
export default {
    name: 'containBox',
	data () {
		return {
            interst:"",
            containBoxList:[]
		}
    },
    activated(){
        this.startFn()
	},
	methods:{
        startFn(){
			let _this = this
            $.ajax({
				url: '/my-customer-worker-trace/customer-worker-trace-list-sum',
				type: 'GET',
				// data: 'customerId=' + customerId+'&customerWorkerId='+customerWorkerId+'&pn='+pn+'&ps=15',
				async: true,
				success: function(res) {
					if (res.code == 0) {
						totalNum=Math.ceil(res.data.itemCount/20)
						console.log(totalNum)
					}
				},
            })
            $('#box').paging({
				initPageNo: 1, // 初始页码
				totalPages: totalNum, //总页数
				//totalCount: '合计' + setTotalCount + '条数据', // 条目总数
				slideSpeed: 600, // 缓动速度。单位毫秒
				jump: true, //是否支持跳转
				callback: function(page) { // 回调函数
                    // memberList1(1,page);
                    _this.trackrelList(customerId,customerWorkerId,page)
                }
			})
        },
        // 跟踪记录列表
        trackrelList(customerId,customerWorkerId,pn) {
            let _this = this
			   	$.ajax({
			   		url: '/my-customer-worker-trace/customer-worker-trace-list',
			   		type: 'GET',
			   		data: 'customerId=' + customerId+'&customerWorkerId='+customerWorkerId+'&pn='+pn+'&ps=20',
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
                                    _this.containBoxList[i].createTime = changeDateFormat(res.data.itemList[i].createTime)
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
	margin-left: 50px;
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
</style>