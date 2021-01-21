<template>
  <div id="index" class="index">
    <input type='' id='userName' hidden=''>
    <span class="record1" hidden=""></span>
    <span class="record2" hidden=""></span>
    <span class="record3" hidden=""></span>
    <a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a>
    <input type="" name="" id="inp_send" hidden="">
    <button id="btn_conn" hidden="">发送</button>
    <div class="mainbox">
      <div class="topselect">
        <div style="width: 100%;height: auto;">
          <!-- <h2 class="peoname">{{nickname}}</h2><span class="shuju" style="margin: 0 10px;"></span> -->
          <!--  <router-link :to="{path:'/add-hos',query:{time:new Date().getTime()}}" class="addHos" >
						新增医院
					</router-link> -->
          <!-- <a class="addHos" href="addHos.html"target="_blank">新增医院</a>  -->
          <a href="javascript:;" class="loginout" style="float: right;line-height: 80px;margin-left: 20px;">退出登录</a>
          <router-link :to="{path:'/history-detail-lindao'}" class="lookBefore">
            查看昨日工作记录
          </router-link>
          <!-- <a class="lookBefore" href="historyDetail.html">查看昨日工作记录</a> -->
          <!-- <span class="lastHis" style="float: right;line-height: 80px;margin-right: 20px;">上次浏览记录</span> -->
        </div>
        <div class="leader_name">
          <span>昵称：{{nicknameThis}}</span>
          <span style="margin-right: 20px;">跟踪总量：{{traceTotalNumber}}</span>
          <el-button nature='0' @click='selectHos($event,"")'>所有医院：{{totalCountHos}}个</el-button>
          <el-button nature='1' @click='selectHos($event,1)'>民营医院：{{totalCountHos1}}个</el-button>
          <el-button nature='2' @click='selectHos($event,2)'>公立医院：{{totalCountHos2}}个</el-button>
        </div>
      </div>
      <div class="selectRoleAll">
        <p>筛选条件：
          <span v-if='nature==0'>所有医院</span>
          <span v-if='nature==1'>民营医院</span>
          <span v-if='nature==2'>公立医院</span>
          <span v-if='paiBanCustomerWorkerHas==1' style="color: #333;">- 院长</span>
          <span v-if='paiBanCustomerWorkerPhoneHas==1'>- 有号码</span>
          <span v-if='paiBanCustomerWorkerLevelname!=0'>- {{paiBanCustomerWorkerLevelname}}</span>
          <span v-if='paiBanCustomerWorkerUrgent==1'>- 加急 / </span>
          <span v-if='zhuRenCustomerWorkerHas==1' style="color: #333;">- 主任</span>
          <span v-if='zhuRenCustomerWorkerPhoneHas==1'>- 有号码</span>
          <span v-if='zhuRenCustomerWorkerLevelname!=0'>- {{zhuRenCustomerWorkerLevelname}}</span>
          <span v-if='zhuRenCustomerWorkerUrgent==1'>- 加急</span>
          <!-- <el-button @click='selectFilterFn()' style="margin-left:15px">确认筛选</el-button> -->
          <el-button @click='selectHospiatlNumFilterFn()' style="margin-left:15px">确认筛选</el-button>
           <el-button @click='lookrecordlist()' style="float:right;margin-right:15px">通话记录汇总</el-button>
        </p>
      </div>
      <div class="selectAllThis">
        <div class="lineOneThis">
          <span>人员类型：</span>
          <el-checkbox v-model="checked1" @change='yuanzhang'>院长</el-checkbox>
        </div>
        <div class="lineOneThis" v-if='show1'>
          <span>院长是否有号码：</span>
          <el-radio-group v-model="PhoneHasyuanzhang" @change="selectPhoneyuanzhang">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">有号码</el-radio>
            <!-- <el-radio :label="2">无号码</el-radio> -->
          </el-radio-group>
        </div>
        <div class="lineOneThis" v-if='show2'>
          <span>院长级别：</span>
          <el-radio-group v-model="urgentyuanzhang" @change='yuanzhanglevel'>
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">暂不感兴趣</el-radio>
            <el-radio :label="2">初步感兴趣</el-radio>
            <el-radio :label="3">非常感兴趣</el-radio>
            <el-radio :label="4">近期可考察</el-radio>
            <el-radio :label="5">线上可签单</el-radio>
          </el-radio-group>
        </div>
        <div class="lineOneThis" v-if='show2'>
          <span>院长是否加急：</span>
          <el-checkbox v-model="checked3" @change='yuanzhangjj'>加急</el-checkbox>
        </div>
        <div class="lineOneThis">
          <span>人员类型：</span>
          <el-checkbox v-model="checked2" @change='zhuren'>主任</el-checkbox>
        </div>
        <div class="lineOneThis" v-if='show3'>
          <span>主任是否有号码：</span>
          <el-radio-group v-model="PhoneHaszhuren" @change="selectPhonezhuren">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">有号码</el-radio>
            <!-- <el-radio :label="2">无号码</el-radio> -->
          </el-radio-group>
        </div>
        <div class="lineOneThis" v-if='show4'>
          <span>主任级别：</span>
          <el-radio-group v-model="urgentzhuren" @change='zhurenlevel'>
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">暂不感兴趣</el-radio>
            <el-radio :label="2">初步感兴趣</el-radio>
            <el-radio :label="3">非常感兴趣</el-radio>
            <el-radio :label="4">近期可考察</el-radio>
            <el-radio :label="5">线上可签单</el-radio>
          </el-radio-group>
        </div>
        <div class="lineOneThis" v-if='show4'>
          <span>主任是否加急：</span>
          <el-checkbox v-model="checked4" @change='zhurenjj'>加急</el-checkbox>
        </div>
      </div>
      <div>
        <p style="font-size: 20px;color: #333333;line-height: 40px;margin:0;">搜索结果：{{totalCountHosSelect}}家医院</p>
      </div>

      <div class="tableBox" style="display: none;">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>所属人姓名</th>
              <th>医院名称</th>
              <th>拍板人</th>
              <th>拍板人手机号码</th>
              <th>拍板人验证</th>
              <th>医院信息更新时间</th>
            </tr>
          </thead>
          <tbody class="tbody">
          </tbody>
        </table>
        <div class="box rt" id="box"></div>
      </div>
    </div>
    <div class="time">
      <span>时间选择：</span>
      <input type="text" id="layDateDate" v-model="layuiDate" class="layui-input" readonly style="cursor: pointer;display:inline">
      <el-button @click='selectDayFilterFn()' style="margin-left:15px">生成图表</el-button>
    </div>
    <div style="min-width: 1230px;height:400px;margin:30px auto 0px" v-if="echartsDayShowData">
      <div id="main" style="min-width: 1200px;height:400px;margin-left:0px auto"></div>
    </div>
    <div class="time">
      <span>时间选择：</span>
      <input type="text" id="layDateMonth" v-model="layuiData" class="layui-input" readonly style="cursor: pointer;display:inline">
      <el-button @click='selectFilterFn()' style="margin-left:15px">生成图表</el-button>
    </div>
    <div style="min-width: 1230px;height:400px;margin:30px auto 0px" v-if="echartsShowData">
      <div id="main2" style="min-width: 1200px;height:400px;margin-left:0px auto"></div>
    </div>
    <div class="seccion">ver : {{$version}} ser : {{$store.state.serVersion}}</div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'index',
    data () {
    	return {
    		nature:"",
    		paiBanCustomerWorkerHas: '',
    		paiBanCustomerWorkerPhoneHas: '',
    		paiBanCustomerWorkerUrgent: '',
    		paiBanCustomerWorkerLevel: '',
    		zhuRenCustomerWorkerHas: '',
    		zhuRenCustomerWorkerPhoneHas:'',
    		zhuRenCustomerWorkerUrgent: '',
    		zhuRenCustomerWorkerLevel: '',
    		paiBanCustomerWorkerLevelname:'',
    		zhuRenCustomerWorkerLevelname:'',
    		nicknameThis:'',
    		totalCount: '',
    		totalCountHos: '',
    		totalCountHos1: '',
    		totalCountHos2: '',
    		show1: false,
    		show2: false,
    		show3:false,
    		show4:false,
    		peopleType: '', //是院长还是主任
    		phoneIfyuanzhang: '', //院长是否有号码
    		phoneIfzhuren: '', //主任是否有号码
    		PhoneHasyuanzhang: '',
    		PhoneHaszhuren:'',
    		urgentyuanzhang:'',
    		urgentzhuren:'',
    		checked1:false,
    		checked2:false,
    		checked3:false,
    		checked4:false,
    		traceTotalNumber:'',//跟踪总量
    		totalCountHosSelect:'',
        layuiData:'',
        layuiDate:'',
        echartsShowData : false,
        echartsDayShowData : false,
    		lineData:{
          title: {
            text: ''
          },
          text: "数据正在载入...",
          tooltip: {},
          legend: {
            data:['客户量','追踪数']
          },
          
          xAxis: { 
            name:'时间：日',
            axisLabel:{ 
              interval:0  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推           
            },
            boundaryGap: false,
            data: []
          },
          yAxis: {
            name:'单位：个',
          },
          label: {
            show: true,
          },
          toolbox:{
            show   : true,
            feature: {
              dataView : {show: true, readOnly: false},
              magicType  : {show: true, type: ['bar', 'line']},
              restore    : {show: false},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '客户量',
              type: 'line',
              color: ['#37A2DA'],
              data: []
            },
            {
              name: '追踪数',
              type: 'line',
              color: ['#fb5858'],
              data: []
            },
          ]
      },
      createTimeState : '',
      dayData:{
        
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data:['客户量','拍板人']
        },
        
        xAxis: { 
          name:'时间：小时',
          axisLabel:{ 
            interval:0  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推           
          },
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name:'单位：个',
        },
        label: {
          show: true,
        },
        toolbox:{
          show   : true,
          feature: {
            dataView : {show: true, readOnly: false},
            magicType  : {show: true, type: ['line', 'bar']},
            restore    : {show: false},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
              name: '客户量',
              type: 'line',
              color: ['#37A2DA'],
              data: []
          },
          {
              name: '拍板人',
              type: 'line',
              color: ['red'],
              data: []
          }
        ]
      },
      nowTime : '',
      nowDayTime : '',
      query:'',
  	}
  },
  activated() {

      let thisValue = this
      Object.assign(this.$data, this.$options.data());
      this.$common.loginRefresh();
      if (localStorage.getItem('id')) {
        this.cookie = 'loginId=' + localStorage.getItem('id')
        console.log(this.cookie, localStorage.getItem('id'))
      }

      // this.getData()
      this.getDataNumber()
      this.getDataNumberHos()
      this.getDataNumberHos(1)
      this.getDataNumberHos(2)
      this.traceNumber()
      // thisValue.chartsFn()
      let nowYear = new Date().getFullYear();
      let nowMOunth = new Date().getMonth() + 1;
      let nowDate = new Date().getDate();
      if (nowMOunth < 10) {
        nowMOunth = '0' + nowMOunth
      }
      if (nowDate < 10) {
        nowDate = '0' + nowDate
      }
      thisValue.layuiData = nowYear + '-' + nowMOunth;
      thisValue.layuiDate = nowYear + '-' + nowMOunth + '-' + nowDate;
      thisValue.$nextTick(() => {
        // let nowMOunth = new Date().getMonth();
        // let nowYear = new Date().getFullYear();
        layui.use('laydate', function() {
          // console.dir(layui.laydate)
          layui.laydate.render({
            elem: '#layDateMonth',
            type: 'month',
            // value:nowYear + '-' + nowMOunth,
            change: function(value, date, endDate) {
              // console.log(value); //得到日期生成的值，如：2017-08-18
              console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
              // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
              thisValue.nowTime = date
              if (date.month < 10) {
                date.month = '0' + date.month
              }
              thisValue.layuiData = date.year + '-' + date.month
              $('.layui-laydate').remove()
            }

          });
          layui.laydate.render({
            elem: '#layDateDate',
            type: 'date',
            // value:nowYear + '-' + nowMOunth,
            done: function(value, date) {
              // console.log(value); //得到日期生成的值，如：2017-08-18
              console.dir(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
              thisValue.nowDayTime = date
              // thisValue.layuiDate = date.year + '-' + date.month + '-' + date.date
              $('.layui-laydate').remove()
            }
          });
        });
      })
      this.selectFilterFn();
      this.selectDayFilterFn();
      if (localStorage.getItem('nickname')) {
        console.log(localStorage.getItem('nickname'))
        this.nicknameThis = localStorage.getItem('nickname')
        console.log(this.nicknameThis)
      }
      // 跳转上次最后一条数据
      if (this.query != JSON.stringify(this.$route.query)) {
        this.query = JSON.stringify(this.$route.query);
        $('#index .lastHis').unbind("click").click(function() {
          $.ajax({
            url: '/crm/cache/get',
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
                    thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id,
                      thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
                  }
                })

              }
            }
          })
        })
        //     $.ajax({
        // url: '/login-refresh',

        // type: 'POST',
        // async: true,
        // success: function(res) {
        // 	if (res.code == 0) {
        // 		localStorage.setItem('nickname',res.data.nickname)
        // 		$('#index .peoname').html(res.data.nickname)
        // 		$('#index #userName').val(res.data.nickname)
        // 		//         window.location.href='index.html'
        // 	} else {

        // 		setTimeout(function() {
        //                         thisValue.$router.push({path:'/login'})
        //                         // location.href='/#/login'
        //                         // location.href=location.pathname
        // 			// location.href = 'login.html'
        // 		}, 1000)
        // 	}
        // }
        //         })
        // thisValue.lastPageNo()
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
            url: '/crm/cache/set',
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, thisValue.nature, thisValue.area1Id,
                thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, thisValue.nature, thisValue.area1Id,
                thisValue.area2Id, thisValue.area3Id, thisValue.urgent, thisValue.level)
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id,
                thisValue.area3Id, thisValue.urgent, thisValue.level)
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id,
                thisValue.area3Id, thisValue.urgent, thisValue.level)
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id,
                thisValue.area3Id, thisValue.urgent, thisValue.level)
            }
          })
        })
        $('#index .town').change(function() {

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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id,
                thisValue.area3Id, thisValue.urgent, thisValue.level)
            }
          })
        })
        $('#index').on('click', '.tbody .xiugaiTimeFn', function(e) {

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
          thisValue.area3Id = ''
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
              thisValue.lastPage(page, thisValue.ps, thisValue.kw, nature, thisValue.area1Id, thisValue.area2Id,
                thisValue.area3Id, thisValue.urgent, thisValue.level)
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
        $('#index .loginout').unbind("click").click(function() {
          $.ajax({
            type: "post",
            url: "/crm/logout",

            data: "",
            success: function(data) {
              // location.href='/#/login'
              location.href = location.pathname
              // location.href='login.html'
            }
          })
        })
        $('#index table').on('click', 'tr td:nth-child(4)', function() {
          debugger
          if ($(this).attr('tel') == '' || $(this).attr('tel') == null || $(this).attr('tel') == undefined) {
          } else {
            $('#inp_send').val($(this).attr('tel')).attr('linkName', $(this).attr('linkName'))
            $('.phoneNumber').html($(this).html())
            $('#btn_conn').click()
          }
        })
      }
    },
    methods: {
      yuanzhang(e) {
        if (e == true) {
          this.show1 = true;
          this.show2 = false;
          this.paiBanCustomerWorkerHas = 1
          this.createTimeState = 'paiBanCustomerWorkerInserTime'
        } else {
          this.show1 = false;
          this.show2 = false;
          this.paiBanCustomerWorkerHas = ''
          this.PhoneHasyuanzhang = ''
          this.paiBanCustomerWorkerPhoneHas = ''
          this.paiBanCustomerWorkerUrgent = ''
          this.paiBanCustomerWorkerLevel = ''
          this.paiBanCustomerWorkerLevelname = ''
          this.checked3 = false
          this.urgentyuanzhang = ''
          if(this.createTimeState == 'paiBanCustomerWorkerInserTime' || this.createTimeState == 'paiBanCustomerWorkerPhoneInsertTime'
          || this.createTimeState == 'paiBanCustomerWorkerLevelTime'){
            this.createTimeState = ''
          }
        }
      },
      zhuren(e) {
        if (e == true) {
          this.show3 = true;
          this.show4 = false;
          this.zhuRenCustomerWorkerHas = 1
          this.createTimeState = 'zhuRenCustomerWorkerInserTime'
        } else {
          this.show3 = false;
          this.show4 = false;
          this.zhuRenCustomerWorkerHas = ''
          this.PhoneHaszhuren = ''
          this.zhuRenCustomerWorkerPhoneHas = ''
          this.zhuRenCustomerWorkerUrgent = ''
          this.zhuRenCustomerWorkerLevel = ''
          this.zhuRenCustomerWorkerLevelname = ''
          this.checked4 = false
          this.urgentzhuren = ''
          if(this.createTimeState == 'zhuRenCustomerWorkerInserTime' || this.createTimeState == 'zhuRenCustomerWorkerPhoneInsertTime'
          || this.createTimeState == 'zhuRenCustomerWorkerLevelTime'){
            this.createTimeState = ''
          }
        }
      },
      selectHos(event, i) {
        console.log(i)
        this.nature = i
      },
      selectPhoneyuanzhang(event) {
        this.phoneIfyuanzhang = event; //获取option对应的value值。
        if (event == 0) {
          this.show2 = true;
          this.paiBanCustomerWorkerPhoneHas = ''
          if(this.createTimeState == 'paiBanCustomerWorkerPhoneInsertTime'){
            this.createTimeState = ''
          }
        }
        if (event == 1) {
          this.show2 = true;
          this.paiBanCustomerWorkerPhoneHas = 1;
          this.createTimeState = 'paiBanCustomerWorkerPhoneInsertTime'
        }
      },
      selectPhonezhuren(event) {
        this.phoneIfzhuren = event; //获取option对应的value值。
        if (event == 0) {
          this.show4 = true;
          this.zhuRenCustomerWorkerPhoneHas = ''
          if(this.createTimeState == 'zhuRenCustomerWorkerPhoneInsertTime'){
            this.createTimeState = ''
          }
        }
        if (event == 1) {
          this.show4 = true;
          this.zhuRenCustomerWorkerPhoneHas = 1;
          this.createTimeState = 'zhuRenCustomerWorkerPhoneInsertTime'
        }
      },
      // 选择是否感兴趣
      yuanzhanglevel(e) {
        if (e == 0) {
          this.paiBanCustomerWorkerLevel = ''
          if(this.createTimeState == 'paiBanCustomerWorkerLevelTime'){
            this.createTimeState = ''
          }
        } else {
          this.paiBanCustomerWorkerLevel = e;
          this.createTimeState = 'paiBanCustomerWorkerLevelTime'
          if (e == 1) {
            this.paiBanCustomerWorkerLevelname = '暂不感兴趣'
          } else if (e == 2) {
            this.paiBanCustomerWorkerLevelname = '初步感兴趣'
          } else if (e == 3) {
            this.paiBanCustomerWorkerLevelname = '非常感兴趣'
          } else if (e == 4) {
            this.paiBanCustomerWorkerLevelname = '近期可考察'
          } else if (e == 5) {
            this.paiBanCustomerWorkerLevelname = '线上可签单'
          }
        }
      },
      zhurenlevel(e) {
        if (e == 0) {
          this.zhuRenCustomerWorkerLevel = ''
          if(this.createTimeState == 'zhuRenCustomerWorkerLevelTime'){
            this.createTimeState = ''
          }
        } else {
          this.zhuRenCustomerWorkerLevel = e;
          this.createTimeState = 'zhuRenCustomerWorkerLevelTime'
          if (e == 1) {
            this.zhuRenCustomerWorkerLevelname = '暂不感兴趣'
          } else if (e == 2) {
            this.zhuRenCustomerWorkerLevelname = '初步感兴趣'
          } else if (e == 3) {
            this.zhuRenCustomerWorkerLevelname = '非常感兴趣'
          } else if (e == 4) {
            this.zhuRenCustomerWorkerLevelname = '近期可考察'
          } else if (e == 5) {
            this.zhuRenCustomerWorkerLevelname = '线上可签单'
          }
        }
      },
      // 是否加急
      yuanzhangjj(e) {
        if (e == true) {
          this.paiBanCustomerWorkerUrgent = 1
        } else {
          this.paiBanCustomerWorkerUrgent = ''
        }
      },
      zhurenjj(e) {
        if (e == true) {
          this.zhuRenCustomerWorkerUrgent = 1
        } else {
          this.zhuRenCustomerWorkerUrgent = ''
        }

      },
      selectFilterFn() {
        this.echartsShowData = true
        this.statisticalAllFn()
      },
      selectDayFilterFn(){
        this.echartsDayShowData = true;
        this.statisticalAllDayFn()
      },
      selectHospiatlNumFilterFn() {
        this.getNumberHosSelect()
        this.lastPageNo()
        this.lastPage(1)
      },
      lookrecordlist(){
         // localStorage.setItem('id', id)
        //  localStorage.setItem('nickname', name)
        console.log(localStorage.getItem('nickname'))
         this.$router.push({
           path: '/record-list',
           query: {
             id: localStorage.getItem('id'),
             nickname: localStorage.getItem('nickname'),
             time: new Date().getTime()
           }
         });
      },
      getData() {
        this.$axios.get('/crm/ling-dao/user-list?' + qs.stringify({
            pn: this.customerPage,
            // ps: 10,
            order: 'asc',
            sort: 'updateTime',
            userId: localStorage.getItem('id'),
          }))
          .then(res => {
            console.log(res)
            if (res.data.codeMsg) {
              console.log(res.data.codeMsg)
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              if (res.data.data.itemList.length > 0) {
                for (let i in res.data.data.itemList) {
                  this.urgentLevel.push(res.data.data.itemList[i])
                }
              }
            }
          })
      },
      getDataNumber() {
        this.$axios.get('/crm/ling-dao/user-list-sum?' + qs.stringify({
            userId: localStorage.getItem('id'),
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              this.totalCount = res.data.data.itemCount
            }
          })
      },
      async getNumberHosSelect(_paiBanCustomerWorkerPhoneHas) {
        let thisValue = this;
        let _pai
        this.paiBanCustomerWorkerPhoneHas ? _pai = this.paiBanCustomerWorkerPhoneHas : _pai =
          _paiBanCustomerWorkerPhoneHas
        await thisValue.$axios.get('/crm/ling-dao/customer/customer-list-sum?' + qs.stringify({
            paiBanCustomerWorkerHas: thisValue.paiBanCustomerWorkerHas,
            paiBanCustomerWorkerPhoneHas: _pai,
            paiBanCustomerWorkerUrgent: thisValue.paiBanCustomerWorkerUrgent,
            paiBanCustomerWorkerLevel: thisValue.paiBanCustomerWorkerLevel,
            zhuRenCustomerWorkerHas: thisValue.zhuRenCustomerWorkerHas,
            zhuRenCustomerWorkerPhoneHas: thisValue.zhuRenCustomerWorkerPhoneHas,
            zhuRenCustomerWorkerUrgent: thisValue.zhuRenCustomerWorkerUrgent,
            zhuRenCustomerWorkerLevel: thisValue.zhuRenCustomerWorkerLevel,
            nature: thisValue.nature,
            userId: localStorage.getItem('id'),
            // paiBanCustomerWorkerPhoneHas:_paiBanCustomerWorkerPhoneHas
          }))
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              thisValue.totalCountHosSelect = res.data.data.itemCount
            }
          })
      },
      async getCustomerWorkerTrace(_time){
        await this.$axios.get('/crm/ling-dao/customer-worker-trace/customer-worker-trace-list-sum-by-month?' + qs.stringify({
          createTimeByMonth : _time,
          userId: localStorage.getItem('id'),
        }))
        .then(res => {
           if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code == 0) {
              for (let i in res.data.data.sum) {
                this.lineData.series[1].data.push(res.data.data.sum[i].sum.itemCount)
              }
              console.log(this.lineData.series[1].data)
            }
        })
      },
       async getDataNumberHosSelect(_time) {
         console.log()
        let thisValue = this;
        let _pai
        // this.paiBanCustomerWorkerPhoneHas ? _pai = this.paiBanCustomerWorkerPhoneHas : _pai =
          // _paiBanCustomerWorkerPhoneHas
        await thisValue.$axios.get('/crm/ling-dao/customer/customer-list-sum-by-month?' + qs.stringify({
            paiBanCustomerWorkerHas: thisValue.paiBanCustomerWorkerHas,
            paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
            paiBanCustomerWorkerUrgent: thisValue.paiBanCustomerWorkerUrgent,
            paiBanCustomerWorkerLevel: thisValue.paiBanCustomerWorkerLevel,
            zhuRenCustomerWorkerHas: thisValue.zhuRenCustomerWorkerHas,
            zhuRenCustomerWorkerPhoneHas: thisValue.zhuRenCustomerWorkerPhoneHas,
            zhuRenCustomerWorkerUrgent: thisValue.zhuRenCustomerWorkerUrgent,
            zhuRenCustomerWorkerLevel: thisValue.zhuRenCustomerWorkerLevel,
            nature: thisValue.nature,
            userId: localStorage.getItem('id'),
            whatTime: this.createTimeState,
            createTimeByMonth: _time,
            // createTimeFrom : _time,
            // createTimeTo : _nextTime? _nextTime-1:'',
            // paiBanCustomerWorkerPhoneHas:_paiBanCustomerWorkerPhoneHas
          }))
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {

              let nowYear = new Date().getFullYear();
              let nowMOunth = new Date().getMonth() + 1;
              let nowData = new Date().getDate();
              // console.log('传进来的日期'+resData)
              if (nowMOunth < 10) {
                nowMOunth = '0' + nowMOunth
              }
              if (nowData < 10) {
                nowData = '0' + nowData
              }
              let nowTime = nowYear.toString() + nowMOunth.toString() + nowData.toString()
              for (let i in res.data.data.sum) {
                let resData = res.data.data.sum[i].date.split('-')[0] + res.data.data.sum[i].date.split('-')[1] + res.data
                  .data.sum[i].date.split('-')[2].split(' ')[0]
                 if (res.data.data.sum[i].date.split('-')[2].split(' ')[0] < 10) {
                    this.lineData.xAxis.data.push(res.data.data.sum[i].date.split('-')[2].split(' ')[0].replace(0,''))
                } else {
                    this.lineData.xAxis.data.push(res.data.data.sum[i].date.split('-')[2].split(' ')[0])
                }
                if(resData <= nowTime){
                  this.lineData.series[0].data.push(res.data.data.sum[i].sum.itemCount)
                }
                // console.log(this.lineData.series[0].data)
                // console.log(res.data.data.sum[i].date.split('-')[2].split(' ')[0].replace(0, '') + '号' +
                    // '客户量当前值为' + res.data.data.sum[i].sum.itemCount)
              }
            }
          })
      },
      async getCustomerWorkerTrace(_time){
        await this.$axios.get('/crm/ling-dao/customer-worker-trace/customer-worker-trace-list-sum-by-month?' + qs.stringify({
          createTimeByMonth : _time,
          userId: localStorage.getItem('id'),
        }))
        .then(res => {
           if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code == 0) {
              let nowYear = new Date().getFullYear();
              let nowMOunth = new Date().getMonth() + 1;
              let nowData = new Date().getDate();
              if (nowMOunth < 10) {
                nowMOunth = '0' + nowMOunth
              }
              if (nowData < 10) {
                nowData = '0' + nowData
              }
              let nowTime = nowYear.toString() + nowMOunth.toString() + nowData.toString()
              for (let i in res.data.data.sum) {
                let resData = res.data.data.sum[i].date.split('-')[0] + res.data.data.sum[i].date.split('-')[1] + res.data
                  .data.sum[i].date.split('-')[2].split(' ')[0]
                  debugger
                if(resData <= nowTime){
                  this.lineData.series[1].data.push(res.data.data.sum[i].sum.itemCount)
                }
              }
              console.log(this.lineData.series[1].data)
            }
        })
      },
       async getInTheDayData(_time) {
        let thisValue = this;
        await thisValue.$axios.get('/crm/ling-dao/customer/customer-list-sum-by-day?' + qs.stringify({
            paiBanCustomerWorkerHas: thisValue.paiBanCustomerWorkerHas,
            paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
            paiBanCustomerWorkerUrgent: thisValue.paiBanCustomerWorkerUrgent,
            paiBanCustomerWorkerLevel: thisValue.paiBanCustomerWorkerLevel,
            zhuRenCustomerWorkerHas: thisValue.zhuRenCustomerWorkerHas,
            zhuRenCustomerWorkerPhoneHas: thisValue.zhuRenCustomerWorkerPhoneHas,
            zhuRenCustomerWorkerUrgent: thisValue.zhuRenCustomerWorkerUrgent,
            zhuRenCustomerWorkerLevel: thisValue.zhuRenCustomerWorkerLevel,
            nature: thisValue.nature,
            userId: localStorage.getItem('id'),
            whatTime: this.createTimeState,
            dayTime: _time,
          }))
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              let nowYear = new Date().getFullYear();
              let nowMOunth = new Date().getMonth() + 1;
              let nowData = new Date().getDate();
              let nowHours = new Date().getHours();
              if (nowMOunth < 10) {
                nowMOunth = '0' + nowMOunth
              }
              if (nowData < 10) {
                nowData = '0' + nowData
              }
              if (nowHours < 10) {
                nowHours = '0' + nowHours
              }
              let nowTime = nowYear.toString() + nowMOunth.toString() + nowData.toString() + nowHours.toString()
              for (let i in res.data.data.sum) {
                let resData = res.data.data.sum[i].date.split('-')[0] + res.data.data.sum[i].date.split('-')[1] + res.data.data.sum[i].date.split('-')[2].split(' ')[0] + 
                res.data.data.sum[i].date.split(' ')[1].split(':')[0]
                if (res.data.data.sum[i].date.split(' ')[1].split(':')[0] < 10) {
                    this.dayData.xAxis.data.push(res.data.data.sum[i].date.split(' ')[1].split(':')[0].replace(0,
                      ''))
                } else {
                    this.dayData.xAxis.data.push(res.data.data.sum[i].date.split(' ')[1].split(':')[0])
                }
                // debugger
                if(resData <= nowTime){
                  this.dayData.series[0].data.push(res.data.data.sum[i].sum.itemCount)
                }
                // console.log(res.data.data.sum[i].date.split('-')[2].split(' ')[0].replace(0, '') + '号' +
                //     '客户量当前值为' + res.data.data.sum[i].sum.itemCount)
              }
                console.log(this.dayData.series[0].data)
            }
          })
      },
      async getCustomerWorkerTraceDay(_time){
        await this.$axios.get('/crm/ling-dao/customer-worker-trace/customer-worker-trace-list-sum-by-day?' + qs.stringify({
          dayTime : _time,
          userId: localStorage.getItem('id'),
        }))
        .then(res => {
           if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code == 0) {
              let nowYear = new Date().getFullYear();
              let nowMOunth = new Date().getMonth() + 1;
              let nowData = new Date().getDate();
              let nowHours = new Date().getHours();
              if (nowMOunth < 10) {
                nowMOunth = '0' + nowMOunth
              }
              if (nowData < 10) {
                nowData = '0' + nowData
              }
              if (nowHours < 10) {
                nowHours = '0' + nowHours
              }
              let nowTime = nowYear.toString() + nowMOunth.toString() + nowData.toString() + nowHours.toString()
              for (let i in res.data.data.sum) {
                let resData = res.data.data.sum[i].date.split('-')[0] + res.data.data.sum[i].date.split('-')[1] + res.data.data.sum[i].date.split('-')[2].split(' ')[0] + 
                res.data.data.sum[i].date.split(' ')[1].split(':')[0]
                debugger
                if(resData <= nowTime){
                  this.dayData.series[1].data.push(res.data.data.sum[i].sum.itemCount)
                }
              }
              console.log(this.lineData.series[1].data)
            }
        })
      },
      
      async statisticalAllFn() {
        // this.getNumberHosSelect();
        let nowData = new Date().getDate();
        let nowMOunth = new Date().getMonth() + 1;
        let nowYear = new Date().getFullYear();
        // console.log(nowYear+'-'+nowMOunth+'-'+nowData+' '+'00:00:00')
        // this.barData.xAxis.data = [];
        if (this.lineData.xAxis.data.length != 0) {
          this.lineData.xAxis.data = [];
          this.chartsMounthFn()
        }
        if (this.nowTime) {
          // console.log(this.nowTime)
          nowYear = this.nowTime.year;
          nowMOunth = this.nowTime.month;
        }
        let _nowTime = new Date(nowYear + '-' + nowMOunth + '-' + 1 + ' ' + '00:00:00').getTime();
        console.dir(this.nowTime)
        await this.getDataNumberHosSelect(_nowTime)
        await this.getCustomerWorkerTrace(_nowTime)
        this.$echarts.init(document.getElementById('main2')).setOption(this.lineData, true);
        // await this.getDataNumberHosSelect(_nowTime, 1)
      },
      async statisticalAllDayFn(){
        let nowData = new Date().getDate();
        let nowMOunth = new Date().getMonth() + 1;
        let nowYear = new Date().getFullYear();
        if (this.dayData.xAxis.data.length != 0) {
          this.dayData.xAxis.data = [];
          this.chartsDayFn()
        }
        console.dir(this.nowDayTime)
        if (this.nowDayTime) {
          nowYear = this.nowDayTime.year;
          nowMOunth = this.nowDayTime.month;
          nowData = this.nowDayTime.date;
          // console.log('当前月份有：' + nowData)
        }
        let _nowTime = new Date(nowYear + '-' + nowMOunth + '-' + nowData + ' ' + '23:59:59').getTime();
        let _nowDayTime = this.moment(_nowTime).format('YYYY-MM-DD HH:mm:ss');
        console.log(_nowDayTime)
        await this.getInTheDayData(_nowTime)
        await this.getCustomerWorkerTraceDay(_nowTime)
        this.$echarts.init(document.getElementById('main')).setOption(this.dayData, true);
      },
      chartsDayFn(){
        this.dayData.series[0].data = [];
        this.dayData.series[1].data = [];
        this.$echarts.init(document.getElementById('main')).setOption(this.dayData, true);
        this.$echarts.init(document.getElementById('main')).clear();
      },
      chartsMounthFn() {
        this.lineData.series[0].data = []
        this.lineData.series[1].data = []
        this.$echarts.init(document.getElementById('main2')).setOption(this.lineData, true);
        this.$echarts.init(document.getElementById('main2')).clear()
        // this.$echarts.init(document.getElementById('main2')).clear()
        // console.log('s')
        // 清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // this.$echarts.init(document.getElementById('main')).clear()
        // 释放图表实例，释放后实例不再可用。
        // this.$echarts.init(document.getElementById('main2')).dispose()
        // 还原图表，各种状态均被清除，还原为最初展现时的状态。
        // this.$echarts.init(document.getElementById('main')).restore()
      },


      getDataNumberHos(nature) {
        this.$axios.get('/crm/ling-dao/customer/customer-list-sum?' + qs.stringify({
            nature: nature,
            userId: localStorage.getItem('id'),
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              if (nature == 1) {
                this.totalCountHos1 = res.data.data.itemCount
              } else if (nature == 2) {
                this.totalCountHos2 = res.data.data.itemCount
              } else {
                this.totalCountHos = res.data.data.itemCount
                this.totalCountHosSelect = res.data.data.itemCount
              }
            }
          })
      },
      traceNumber() {
        this.$axios.get('/crm/ling-dao/customer-worker-trace/customer-worker-trace-list-sum?' + qs.stringify({
            userId: localStorage.getItem('id'),
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if (res.data.code == 0) {
              this.traceTotalNumber = res.data.data.itemCount
            }
          })
      },


      lastPage(pn) {
        var param = qs.stringify({
          paiBanCustomerWorkerHas: this.paiBanCustomerWorkerHas,
          paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
          paiBanCustomerWorkerUrgent: this.paiBanCustomerWorkerUrgent,
          paiBanCustomerWorkerLevel: this.paiBanCustomerWorkerLevel,
          zhuRenCustomerWorkerHas: this.zhuRenCustomerWorkerHas,
          zhuRenCustomerWorkerPhoneHas: this.zhuRenCustomerWorkerPhoneHas,
          zhuRenCustomerWorkerUrgent: this.zhuRenCustomerWorkerUrgent,
          zhuRenCustomerWorkerLevel: this.zhuRenCustomerWorkerLevel,
          nature: this.nature,
          userId: localStorage.getItem('id'),
        })
        let thisValue = this
        $.ajax({
          url: '/crm/ling-dao/customer/customer-list',
          type: 'GET',

          data: param + '&toRevisitTimeFrom=' + thisValue.toRevisitTimeFrom + '&toRevisitTimeTo=' + thisValue.toRevisitTimeTo +
            '&ps=15&pn=' + pn,
          async: true,
          success: function(res) {
            console.dir(res)
            if (res.code == 0) {
              $('#index .tbody').html('')
              $('.tableBox').css('display', 'block')
              if (res.data.itemList && res.data.itemList.length > 0) {
                for (var i in res.data.itemList) {
                  var tel = ''
                  // if(res.data.itemList[i].tel){
                  // 	tel=res.data.itemList[i].tel.substring(0, 3) + "****"+res.data.itemList[i].tel.substring(8,res.data.itemList[i].tel.length)
                  // }
                  if(res.data.itemList[i].paiBanCustomerWorkerPhone1){
                  	tel=res.data.itemList[i].paiBanCustomerWorkerPhone1.substring(0, 3) + "****"+res.data.itemList[i].paiBanCustomerWorkerPhone1.substring(8,res.data.itemList[i].paiBanCustomerWorkerPhone1.length)
                  }
                  // tel = res.data.itemList[i].paiBanCustomerWorkerPhone1 // = res.data.itemList[i].tel
                  let toRevisitTime = '';
                  if (res.data.itemList[i].toRevisitTime) {
                    toRevisitTime = thisValue.moment(res.data.itemList[i].toRevisitTime).format('YYYY-MM-DD');
                  } else {
                    toRevisitTime = ''
                  }
                  $('#index .tbody').append('<tr id=' + res.data.itemList[i].customerId + '><td>' + (parseInt(i) +
                      1 + ((pn - 1) * 15)) +
                    '</td><td class="xiugaiTimeFn">' +res.data.itemList[i].userNickname + '</td><td class="enterHos"><a href="#/history-detail-lindao-eve?id=' + res.data.itemList[i]
                    .customerId + '">' +
                    (res.data.itemList[i].name || "") + '</a></td><td>' + (res.data.itemList[i].paiBanCustomerWorkerName ||
                      "") + '</td><td  linkName="' + (res.data.itemList[i].name || "") + '" tel="' + (res.data.itemList[
                      i].tel || "") + '">' + (tel || "") + '</td><td>' + (res.data.itemList[i].paiBanCustomerWorkerVerifyWay ||
                      "") + '</td><td>' + thisValue.getDateDiff(res.data.itemList[i].updateTime) +
                    '</td></tr>')

                }
              }
            }
          }
        })
      },
      lastPageNo(pn) {
        var param = qs.stringify({
          paiBanCustomerWorkerHas: this.paiBanCustomerWorkerHas,
          paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
          paiBanCustomerWorkerUrgent: this.paiBanCustomerWorkerUrgent,
          paiBanCustomerWorkerLevel: this.paiBanCustomerWorkerLevel,
          zhuRenCustomerWorkerHas: this.zhuRenCustomerWorkerHas,
          zhuRenCustomerWorkerPhoneHas: this.zhuRenCustomerWorkerPhoneHas,
          zhuRenCustomerWorkerUrgent: this.zhuRenCustomerWorkerUrgent,
          zhuRenCustomerWorkerLevel: this.zhuRenCustomerWorkerLevel,
          nature: this.nature,
          userId: localStorage.getItem('id'),
        })
        let thisValue = this
        $.ajax({
          url: '/crm/ling-dao/customer/customer-list-sum',
          type: 'GET',

          data: param + '&toRevisitTimeFrom=' + thisValue.toRevisitTimeFrom + '&toRevisitTimeTo=' + thisValue.toRevisitTimeTo +
            '&ps=15&pn=' + pn,
          async: true,
          success: function(res) {
            if (res.code == 0) {
              thisValue.totalNum = Math.ceil(res.data.itemCount / 15)
              console.log(thisValue.totalNum)
              $('#index .shuju').html('( 共' + res.data.itemCount + '条数据 )')
              $('#index #box').paging({
                initPageNo: 1, // 初始页码
                totalPages: thisValue.totalNum, //总页数
                //                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function(page) { // 回调函数
                  // memberList1(1,page);
                  // var nature = $('#index .nature').val()
                  thisValue.pn = page
                  thisValue.lastPage(page)
                }
              })

            }
          }
        })
      },
      // 时间转换
      getDateDiff(dateTimeStamp) {
        if (!dateTimeStamp)
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
  #index{
    width: 100%;
	  height: 100%;
    overflow: scroll;
  }
  .seccion {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 90px;
    color: #a9a0a0;

  }

  .introDetail {
    width: 100%;
    margin: 0 auto;
    text-align: left;
  }

  .introDetail p {
    display: inline-block;
  }

  .introDetail span {
    font-size: 20px;
    color: #666666;
    line-height: 60px;
    margin-right: 30px;
  }

  /* 新样式 */
  .leader_name {
    width: 100%;
    height: 80px;
    background: #fff;
  }

  /* .leader_name el-button{
    margin-left: 15px;
  } */
  .leader_name span:nth-child(1) {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 80px;
    /* margin-left: 36px; */
  }

  .leader_name span:nth-child(2),
  .leader_name span:nth-child(3) {
    margin-left: 20px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 80px;
  }



  .selectRoleAll {
    /* margin-left: 34px; */
    font-size: 18px;
    color: #666;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .selectRoleAll span {
    color: #999;
    /* margin-left: 10px; */
    display: inline-block;
  }

  .selectAllThis {
    width: 100%;
    /* padding: 0 34px; */
    box-sizing: border-box;
    font-size: 18px !important;
  }

  .selectAllThis .lineOneThis {
    width: 100%;
    display: block;
    line-height: 30px;
  }

  .lineOneThis span {
    display: inline-block;
    width: 160px;
  }

  .lineOneThis .el-checkbox-group {
    display: inline-block;
    width: 500px;
  }

  .time {
    /* width: 100%; */
    height: 64px;
    line-height: 40px;
    padding: 12px 24px 12px 0px;
    box-sizing: border-box;
    width: 80%;
    min-width: 1200px;
    margin: 0 auto;
  }

  .time span {
    float: left;
  }

  .timeYear {
    float: left;
  }

  .timeYear input,
  .timeMounth input {
    background-color: transparent;
    border: 1px solid #c3b3b3;
    cursor: pointer;
    padding: 0px 5px;
  }

  .timeMounth {
    float: left;
    margin-left: 12px
  }

  >>>.layui-input {
    width: 200px !important;
  }

  >>>.layui-input:hover {
    width: 200px !important;
  }
</style>
