<template>
  <div id='leader_index'>
    <div class="leader_top">
      <span class="leader_top_title">忠安客户漏斗管理系统</span>
      <span class="loginout" @click="loginout()">退出登录</span>
    </div>
    <div class="leader_name">
      <span>{{nickname}}</span><span>共{{totalCount}}个组员</span><span style="margin-right: 20px;">跟踪总量：{{traceTotalNumber}}</span>
      <el-button nature='0' @click='selectHos($event,"")'>所有医院：{{totalCountHos}}个</el-button>
      <el-button nature='1' @click='selectHos($event,1)'>民营医院：{{totalCountHos1}}个</el-button>
      <el-button nature='2' @click='selectHos($event,2)'>公立医院：{{totalCountHos2}}个</el-button>

    </div>
    <!-- <div class="selectOption" style="width: 100%;height: auto;margin-left: 34px;">
      <button class="searchThis">搜索</button>
      <select class="nature" v-model="peopleType" @change="selectNature($event)">
        <option v-for="(item,index) in peopleTypeList" :key="index" :value='item.id'>{{item.title}}</option>
      </select>
      <select class="nature" v-if='show1' @change="selectPhone($event)">
        <option v-for="(item,index) in phoneIfList" :key="index" :value='item.id'>{{item.title}}</option>
      </select>
      <select class="urgentLevel" @change="selecturgentLevel($event)" v-if='show2'>
        <option value="">-级别-</option>
        <option value="0">加急客户</option>
        <option value="1">暂不感兴趣</option>
        <option value="2">初步感兴趣</option>
        <option value="3">非常感兴趣</option>
        <option value="4">近期可考察</option>
        <option value="5">线上可签单</option>
      </select>
      <select class="nature" v-if='show2'>
        <option value="" selected>-是否加急-</option>
        <option value="1">加急</option>
        <option value="2">未加急</option>
      </select>
      <button class="searchThis refresh">重置</button>
    </div> -->
    <div class="selectRoleAll">
      <p>筛选条件：<span v-if='nature==0'>所有医院</span><span v-if='nature==1'>民营医院</span><span v-if='nature==2'>公立医院</span>
        <span v-if='paiBanCustomerWorkerHas==1' style="color: #333;">- 院长</span>
        <span v-if='paiBanCustomerWorkerPhoneHas==1'>- 有号码</span>
        <span v-if='paiBanCustomerWorkerLevelname'>- {{paiBanCustomerWorkerLevelname}}</span>
        <span v-if='paiBanCustomerWorkerUrgent==1'>- 加急 / </span>
        <span v-if='zhuRenCustomerWorkerHas==1' style="color: #333;">- 主任</span>
        <span v-if='zhuRenCustomerWorkerPhoneHas==1'>- 有号码</span>
        <span v-if='zhuRenCustomerWorkerLevelname'>- {{zhuRenCustomerWorkerLevelname}}</span>
        <span v-if='zhuRenCustomerWorkerUrgent==1'>- 加急</span>
        <el-button @click='selectHospiatlNumFilterFn()' style="margin-left:15px">确认筛选</el-button>
      </p>
    </div>
    <div class="selectAllThis">
      <div class="lineOneThis">
        <span>人员类型：</span>
        <el-checkbox v-model="checked1" @change='yuanzhang'>院长</el-checkbox>
      </div>
      <div class="lineOneThis"  v-if='show1'>
        <span>院长是否有号码：</span>
         <el-radio-group v-model="PhoneHasyuanzhang" @change="selectPhoneyuanzhang">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">有号码</el-radio>
            <!-- <el-radio :label="2">无号码</el-radio> -->
          </el-radio-group>
      </div>
      <div class="lineOneThis"  v-if='show2' >
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
      <div class="lineOneThis"  v-if='show2'>
        <span>院长是否加急：</span>
         <el-checkbox v-model="checked3" @change='yuanzhangjj'>加急</el-checkbox>
      </div>
      <div class="lineOneThis">
        <span>人员类型：</span>
        <el-checkbox v-model="checked2" @change='zhuren'>主任</el-checkbox>
      </div>
      <div class="lineOneThis"  v-if='show3'>
        <span>主任是否有号码：</span>
         <el-radio-group v-model="PhoneHaszhuren" @change="selectPhonezhuren">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">有号码</el-radio>
            <!-- <el-radio :label="2">无号码</el-radio> -->
          </el-radio-group>
      </div>
      <div class="lineOneThis"  v-if='show4'>
        <span>主任级别：</span>
         <el-radio-group v-model="urgentzhuren"  @change='zhurenlevel'>
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">暂不感兴趣</el-radio>
            <el-radio :label="2">初步感兴趣</el-radio>
            <el-radio :label="3">非常感兴趣</el-radio>
            <el-radio :label="4">近期可考察</el-radio>
            <el-radio :label="5">线上可签单</el-radio>
          </el-radio-group>
      </div>
      <div class="lineOneThis"  v-if='show4'>
        <span>主任是否加急：</span>
         <el-checkbox v-model="checked4" @change='zhurenjj'>加急</el-checkbox>
      </div>
    </div>
    <div>
      <p style="font-size: 20px;color: #333333;line-height: 40px;margin:0 0 0 34px;">搜索结果：{{totalCountHosSelect}} 家医院</p>
    </div>
    <div class="leader_peop">
      <div v-for="item in urgentLevel" @click="memberDetail(item.userId,item.nickname)" :key="item.value" class="leader_eve">
        <img src="../assets/img/PP.svg" alt="">
        <div class="leader_detail">
          <p>{{item.nickname}}</p>
          <ul>
            <li>医院数</li>
            <li>{{item.customerCount>9999?item.customerCount/10000+"万":item.customerCount}}</li>
          </ul>
          <ul>
            <li>追踪数</li>
            <li>{{item.customerTraceCount}}</li>
          </ul>
        </div>

      </div>

      <!-- <div class="leader_eveAdd">
        <div class="leader_eveAdd_span">
          + 添加新组员
        </div>
      </div> -->
    </div>
    <div class="leader_chart">

    </div>

    <div class="time">
      <span>时间选择：</span>
      <input type="text" id="layDateMonth" v-model="layuiData" class="layui-input" readonly style="cursor: pointer;">
      <el-button @click='selectFilterFn()' style="margin-left:15px">确认筛选</el-button>
      
    </div>
    <div style="width: 1230px;height:800px;margin:30px auto 0px">
      <div id="main" style="width: 1100px;height:400px;margin-left:0px auto"></div>
      <div id="main2" style="width: 1100px;height:400px;margin-left:0px auto"></div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  const cityOptions = ['院长', '主任'];
  export default {
    data() {
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
        urgentLevel: [],
        customerPage: 1,
        lineData:{
                title: {
                    text: ''
                },
                text: "数据正在载入...",
                tooltip: {},
                legend: {
                    data:['客户量','拍板人']
                },
                xAxis: {
                    data: []
                },
                yAxis: {
                },
                label: {
                    show: true,
                    // 标签的文字。
                    // formatter: ["1","2","3","4","5","6"]
                },
                toolbox:{
                  show   : true,
                  feature: {
                     dataView : {show: true, readOnly: false},
                      magicType  : {show: true, type: ['bar', 'line','pie']},
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
          barData:{
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data:['客户量','拍板人']
                },
                xAxis: {
                    data: []
                },
                yAxis: {
                },
                label: {
                    show: true,
                    // 标签的文字。
                    // formatter: ["1","2","3","4","5","6"]
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
                        type: 'bar',
                        color: ['#37A2DA'],
                        data: []
                    },
                    {
                        name: '拍板人',
                        type: 'bar',
                        color: ['red'],
                        data: []
                    }
                ]
            },
        totalCount: '',
        nickname: '',
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
        nowTime:'',
        layuiData:''
      }
    },
    activated() {
      let thisValue = this
      Object.assign(thisValue.$data, thisValue.$options.data());
      thisValue.$axios.post('/login-refresh')
        .then(res => {
          if (res.data.codeMsg) {
            thisValue.$message({
              type: 'info',
              message: res.data.codeMsg
            })
          }
          if (res.data.code == 0) {
            thisValue.nickname = res.data.data.nickname
          }
        })

      thisValue.getData()
      thisValue.getDataNumber()
      thisValue.statisticalAllFn()
      thisValue.getDataNumberHos()
      thisValue.getDataNumberHos(1)
      thisValue.getDataNumberHos(2)
      thisValue.traceNumber()
      debugger
      // thisValue.getDataNumberHosSelect('','','',1)
      let nowYear = new Date().getFullYear();
      let nowMOunth = new Date().getMonth()+1;
      if(nowMOunth < 10){
        nowMOunth = '0' + nowMOunth
      }
      thisValue.layuiData = nowYear + '-' + nowMOunth;
      thisValue.$nextTick(()=>{
        // let nowMOunth = new Date().getMonth();
        // let nowYear = new Date().getFullYear();
        layui.use('laydate', function(){
        // console.dir(layui.laydate)
          layui.laydate.render({
            elem: '#layDateMonth',
            type:'month',
            // value:nowYear + '-' + nowMOunth,
            change:function(value, date, endDate){
              // console.log(value); //得到日期生成的值，如：2017-08-18
              // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
              // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
              thisValue.nowTime = date
              thisValue.chartsFn()
              thisValue.statisticalAllFn()
              if(date.month<10){
                date.month = '0'+date.month
              }
              thisValue.layuiData = date.year + '-' + date.month
              $('.layui-laydate').remove()
            }

          });
        });
      })
    },

    methods: {
      yuanzhang(e){
        if(e==true){
          this.show1 = true;
          this.show2 = false;
          this.paiBanCustomerWorkerHas=1
        }else{
           this.show1 = false;
           this.show2 = false;
           this.paiBanCustomerWorkerHas=''
           this.PhoneHasyuanzhang=''
           this.paiBanCustomerWorkerPhoneHas= ''
           this.paiBanCustomerWorkerUrgent=''
           this.paiBanCustomerWorkerLevel= ''
           this.paiBanCustomerWorkerLevelname=''
           this.checked3=false
           this.urgentyuanzhang=''

        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      zhuren(e){
        if(e==true){
          this.show3 = true;
          this.show4 = false;
          this.zhuRenCustomerWorkerHas=1
        }else{
           this.show3 = false;
           this.show4 = false;
           this.zhuRenCustomerWorkerHas=''
           this.PhoneHaszhuren=''
           this.zhuRenCustomerWorkerPhoneHas= ''
           this.zhuRenCustomerWorkerUrgent= ''
           this.zhuRenCustomerWorkerLevel= ''
           this.zhuRenCustomerWorkerLevelname= ''
           this.checked4=false
           this.urgentzhuren=''
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      selectHos(event,i){
        console.log(i)
        this.nature=i
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      selectPhoneyuanzhang(event) {        
        this.phoneIfyuanzhang = event; //获取option对应的value值。
        if(event==0){
          this.show2 = true;
          this.paiBanCustomerWorkerPhoneHas=''
        }
        if (event == 1) {
          this.show2 = true;
          this.paiBanCustomerWorkerPhoneHas=1
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      selectPhonezhuren(event) {
        this.phoneIfzhuren = event; //获取option对应的value值。
        if(event==0){
          this.show4 = true;
          this.zhuRenCustomerWorkerPhoneHas=''
        }
        if (event == 1) {
          this.show4 = true;
          this.zhuRenCustomerWorkerPhoneHas=1
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
       // 选择是否感兴趣
      yuanzhanglevel(e){
        if(e==0){
          this.paiBanCustomerWorkerLevel=''
          this.paiBanCustomerWorkerLevelname=''
        }else{
          this.paiBanCustomerWorkerLevel=e
          if(e==1){
            this.paiBanCustomerWorkerLevelname='暂不感兴趣'
          }else if(e==2){
            this.paiBanCustomerWorkerLevelname='初步感兴趣'
          }else if(e==3){
            this.paiBanCustomerWorkerLevelname='非常感兴趣'
          }else if(e==4){
            this.paiBanCustomerWorkerLevelname='近期可考察'
          }else if(e==5){
            this.paiBanCustomerWorkerLevelname='线上可签单'
          }
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      zhurenlevel(e){
        if(e==0){
          this.zhuRenCustomerWorkerLevel=''
        }else{
          this.zhuRenCustomerWorkerLevel=e
          if(e==1){
            this.zhuRenCustomerWorkerLevelname='暂不感兴趣'
          }else if(e==2){
            this.zhuRenCustomerWorkerLevelname='初步感兴趣'
          }else if(e==3){
            this.zhuRenCustomerWorkerLevelname='非常感兴趣'
          }else if(e==4){
            this.zhuRenCustomerWorkerLevelname='近期可考察'
          }else if(e==5){
            this.zhuRenCustomerWorkerLevelname='线上可签单'
          }
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      // 是否加急
      yuanzhangjj(e){
        if(e==true){
          this.paiBanCustomerWorkerUrgent=1
        }else{
          this.paiBanCustomerWorkerUrgent=0
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      zhurenjj(e){
        if(e==true){
          this.zhuRenCustomerWorkerUrgent=1
        }else{
          this.zhuRenCustomerWorkerUrgent=0
        }
        // this.chartsFn()
        // this.statisticalAllFn()
      },
      selectFilterFn(){
        this.chartsFn()
        this.statisticalAllFn()
      },
      selectHospiatlNumFilterFn(){
        this.getNumberHosSelect()
      },

      // create() {
      //   this.$axios.post('/ling-dao/create-user', qs.stringify({
      //       name: 'xuxiukun',
      //       phone: 15077822798,
      //       nickname: 'xuxk',
      //       upperUserId: '10000000000000000000000000000000', //20200611182803879562472539181121
      //       upperUser1Id: '10000000000000000000000000000000',
      //       upperUser2Id: '10000000000000000000000000000000',
      //       upperUser3Id: '10000000000000000000000000000000',
      //       password: 123456,
      //       type: 0,
      //     }))
      //     .then(res => {
      //       if (res.data.codeMsg) {
      //         this.$message({
      //           type: 'info',
      //           message: res.data.codeMsg
      //         })
      //       }
      //     })
      // },

      loginout() {
        this.$confirm('请确认是否退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.$axios.post('/logout')
            .then(res => {
              if (res.data.codeMsg) {
                this.$message({
                  type: 'info',
                  message: res.data.codeMsg
                })
              }
              if (res.data.code == 0) {
                location.href = location.pathname
              }
            })
          // location.href=location.pathname
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      memberDetail(id, name) {
        localStorage.setItem('id', id)
        localStorage.setItem('nickname', name)
        this.$router.push({
          path: '/leader-lookIndex',
          query: {
            // name: encodeURIComponent(name),
            time: new Date().getTime()
          }
        });
      },

      getData() {
        this.$axios.get('/ling-dao/user-list?' + qs.stringify({
            pn: this.customerPage,
            // ps: 10,
            order: 'asc',
            sort: 'updateTime'
          }))
          .then(res => {
            // console.log(res)
            if (res.data.codeMsg) {
              // console.log(res.data.codeMsg)
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
        this.$axios.get('/ling-dao/user-list-sum')
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
      async getDataNumberHosSelect(_time,_nextTime,_paiBanCustomerWorkerPhoneHas) {
        let thisValue = this
        debugger
        await this.$axios.get('/ling-dao/customer/customer-list-sum?' + qs.stringify({
            paiBanCustomerWorkerHas: this.paiBanCustomerWorkerHas,
            paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
            paiBanCustomerWorkerUrgent: this.paiBanCustomerWorkerUrgent,
            paiBanCustomerWorkerLevel: this.paiBanCustomerWorkerLevel,
            zhuRenCustomerWorkerHas: this.zhuRenCustomerWorkerHas,
            zhuRenCustomerWorkerPhoneHas: this.zhuRenCustomerWorkerPhoneHas,
            zhuRenCustomerWorkerUrgent: this.zhuRenCustomerWorkerUrgent,
            zhuRenCustomerWorkerLevel: this.zhuRenCustomerWorkerLevel,
            nature:this.nature,
            createTimeFrom : _time,
            createTimeTo : _nextTime? _nextTime-1:'',
            paiBanCustomerWorkerPhoneHas:_paiBanCustomerWorkerPhoneHas
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code ==0){
              // this.$echarts.init(document.getElementById('main')).clear()
              // this.$echarts.init(document.getElementById('main2')).clear()
              debugger
              // if(_startValue == 1){
              //   debugger
              //   console.log(thisValue.moment(_time).format('YYYY-MM-DD'))
              //   console.log(thisValue.moment(_nextTime).format('YYYY-MM-DD')+res.data.data.itemCount)
              //   this.totalCountHosSelect = res.data.data.itemCount
              // }
              // console.dir(res.data.data.itemCount)
              if(_paiBanCustomerWorkerPhoneHas == 1){
                this.lineData.series[1].data.push(res.data.data.itemCount)
                this.barData.series[1].data.push(res.data.data.itemCount)
                // console.log(thisValue.moment(_time).format('YYYY-MM-DD')+'拍板量当前值为'+res.data.data.itemCount)
              }else{
                this.lineData.series[0].data.push(res.data.data.itemCount)
                this.barData.series[0].data.push(res.data.data.itemCount)
                // console.log(thisValue.moment(_time).format('YYYY-MM-DD')+'客户量当前值为'+res.data.data.itemCount)
              }
              // this.totalCount=res.data.data.itemCount
            }
          })

      },
      async getNumberHosSelect(_paiBanCustomerWorkerPhoneHas) {
        let thisValue = this
        debugger
        await this.$axios.get('/ling-dao/customer/customer-list-sum?' + qs.stringify({
            paiBanCustomerWorkerHas: this.paiBanCustomerWorkerHas,
            paiBanCustomerWorkerPhoneHas: this.paiBanCustomerWorkerPhoneHas,
            paiBanCustomerWorkerUrgent: this.paiBanCustomerWorkerUrgent,
            paiBanCustomerWorkerLevel: this.paiBanCustomerWorkerLevel,
            zhuRenCustomerWorkerHas: this.zhuRenCustomerWorkerHas,
            zhuRenCustomerWorkerPhoneHas: this.zhuRenCustomerWorkerPhoneHas,
            zhuRenCustomerWorkerUrgent: this.zhuRenCustomerWorkerUrgent,
            zhuRenCustomerWorkerLevel: this.zhuRenCustomerWorkerLevel,
            nature:this.nature,
            paiBanCustomerWorkerPhoneHas:_paiBanCustomerWorkerPhoneHas
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code ==0){
              this.totalCountHosSelect = res.data.data.itemCount
            }
          })
        
      },
      async statisticalAllFn(){
        this.getNumberHosSelect()
        let nowData = new Date().getDate();
        let nowMOunth = new Date().getMonth()+1;
        let nowYear = new Date().getFullYear();

        // console.log(nowYear+'-'+nowMOunth+'-'+nowData+' '+'00:00:00')
        this.lineData.xAxis.data = [];
        this.barData.xAxis.data = [];
        if(this.nowTime){
          console.log(this.nowTime)
          nowYear = this.nowTime.year;
          nowMOunth = this.nowTime.month;
          nowData = new Date(nowYear, nowMOunth, 0).getDate()
          // console.log('当前月份有：' + nowData)
        }
        for(let i=1;i<=nowData;i++){
          this.lineData.xAxis.data.push(i+'日')
          this.barData.xAxis.data.push(i+'日')
          // console.log(i+'日')
          let _nowTime = new Date(nowYear+'-'+nowMOunth+'-'+i+' '+'00:00:00').getTime();
          let _nextTime = new Date(nowYear+'-'+nowMOunth+'-'+(i+1)+' '+'00:00:00').getTime();
          // console.log(nowYear+'-'+nowMOunth+'-'+i+' '+'00:00:00')
          // console.log(i+'')
          await this.getDataNumberHosSelect(_nowTime,_nextTime,'')
          await this.getDataNumberHosSelect(_nowTime,_nextTime,1)
          if(i == nowData){
            // console.dir(this.lineData)
            //  console.dir(this.barData)
            // await this.getDataNumberHosSelect(nowYear+'-'+nowMOunth+'-'+1+' '+'00:00:00',nowYear+'-'+nowMOunth+'-'+i+' '+'00:00:00','',1)
            
            this.$echarts.init(document.getElementById('main')).setOption(this.lineData,true);
            this.$echarts.init(document.getElementById('main2')).setOption(this.barData,true);
          }
        }
        debugger
        
      },
      chartsFn(){
        this.lineData.series[0].data = []
        this.lineData.series[1].data = []
        this.barData.series[0].data = []
        this.barData.series[1].data = []
        this.$echarts.init(document.getElementById('main')).setOption(this.lineData,true);
        this.$echarts.init(document.getElementById('main2')).setOption(this.barData,true);
        this.$echarts.init(document.getElementById('main')).clear()
        this.$echarts.init(document.getElementById('main2')).clear()
        // console.log('s')
        // 清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
        // this.$echarts.init(document.getElementById('main')).clear()
        // 释放图表实例，释放后实例不再可用。
        // this.$echarts.init(document.getElementById('main2')).dispose()
        // 还原图表，各种状态均被清除，还原为最初展现时的状态。
        // this.$echarts.init(document.getElementById('main')).restore()
      },
      getDataNumberHos(nature) {
        this.$axios.get('/ling-dao/customer/customer-list-sum?' + qs.stringify({
            nature: nature
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
                this.totalCountHosSelect=res.data.data.itemCount
              }
            }
          })
      },
      traceNumber() {
        this.$axios.get('/ling-dao/customer-worker-trace/customer-worker-trace-list-sum')
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

    }
  }
</script>

<style scoped>
  #leader_index {
    width: 100%;
    min-width: 1200px;
    height: auto;
    min-height: 100%;
    background: rgba(240, 242, 245, 1);
  }

  .leader_top {
    width: 100%;
    height: 64px;
    background: rgba(0, 33, 64, 1);
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
  }

  .leader_top_title {
    width: 240px;
    height: 32px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 64px;
    margin-left: 36px;
    float: left;
  }

  .loginout {
    width: 80px;
    height: 32px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 64px;
    margin-right: 36px;
    float: right;
    cursor: pointer;
  }

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
    margin-left: 36px;
  }

  .leader_name span:nth-child(2),.leader_name span:nth-child(3) {
    margin-left: 20px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 80px;
  }

  .leader_peop {
    width: 100%;
  }

  .leader_eve {
    width: 259px;
    height: 133px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(232, 232, 232, 1);
    display: inline-block;
    margin-left: 24px;
    margin-top: 24px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .leader_eve img {
    font-size: 24px;
    color: #FFBF00;
    width: 24px;
    height: 24px;
    margin: 24px 16px auto 24px;
    /* display: inline-block; */
    float: left;
  }

  .leader_eve .leader_detail {
    float: left;
    width: 193px;
    border: 0;
    /* display: inline-block; */
  }

  .leader_detail p {
    margin-top: 24px;
    width: 185px;
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }

  .leader_detail ul {
    width: 45%;
    display: inline-block;
  }

  .leader_detail ul li:nth-child(1) {
    margin-top: 12px;
    margin-bottom: 9px;
    width: auto;
    height: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
  }

  .leader_detail ul:nth-child(3) {
    margin-left: 5%;
  }

  .leader_detail ul li:nth-child(2) {
    width: 70px;
    height: 32px;
    font-size: 22px;
    font-family: HelveticaNeue-Medium, HelveticaNeue;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    line-height: 32px;
  }

  .leader_eveAdd {
    width: 259px;
    height: 133px;
    background: transparent;
    border-radius: 2px;
    border: 1px solid rgba(24, 144, 255, 1);
    display: inline-block;
    margin-left: 24px;
    margin-top: 24px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(24, 144, 255, 1);
    position: relative;
    cursor: pointer;
  }

  .leader_eveAdd_span {
    color: rgba(24, 144, 255, 1);
    height: 25px;
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .time{
    width: 100%;
    height: 64px;
    line-height: 40px;
    padding: 12px 24px;
    box-sizing: border-box;
  }
  .time span{
    float: left;
  }
  .timeYear{
    float: left;
  }
  .timeYear input,.timeMounth input{
    background-color: transparent;
    border:1px solid #c3b3b3;
    cursor: pointer;
    padding: 0px 5px;
  }
  .timeMounth{
    float: left;
    margin-left: 12px
  }
  >>>.layui-input{
    width: 200px!important;
  }
  >>>.layui-input:hover{
    width: 200px!important;
  }
  #leader_index .selectOption {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 16px;
    color: #333333;
  }

  #leader_index .topselect h2 {
    display: inline-block;
    margin: 0;
    line-height: 80px;
    font-size: 30px;
  }

  /* #index #pageSelect{
  	width: auto!important;
  }
  #index .pageWrap{
  	width: auto!important;
  } */
  #leader_index .sel-page {
    margin-right: 0px !important;
  }

  #leader_index .addHos {
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

  #leader_index .lookBefore {
    float: right;
    line-height: 80px;
  }

  #leader_index .lastHis {
    float: right;
    font-size: 16px;
    cursor: pointer;
    color: #337ab7;
  }

  #leader_index .selectOption input {
    width: 150px;
    height: 38px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #e5e5e5;
    margin-right: 15px;
    padding: 0 10px;

  }

  #leader_index .selectOption button {
    width: 80px;
    height: 38px;
    border-radius: 4px;
    line-height: 38px;
    outline: none;
    border: 1px solid #e5e5e5;
    margin-right: 15px;
    background: #409eff;
    color: #FFFFFF;
    vertical-align: middle;
    margin-top: -3px;
  }

  #leader_index .selectOption select {
    width: 140px;
    height: 38px;
    border-radius: 4rpx;
    outline: none;
    margin-right: 15px;
    border: 1px solid #e5e5e5;
  }

  .searchThis input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin-top: 7px
  }

  #leader_index .tableBox {
    width: 100%;
    height: auto;
  }

  #leader_index .tableBox table {
    width: 100%;
    height: auto;

  }

  #leader_index .tableBox table thead tr th,
  #leader_index .tableBox table tbody tr td {
    height: 40px;
    line-height: 40px;
    width: auto;
    text-align: center;
  }

  #leader_index .tableBox table tbody tr td {
    padding: 0 10px;
    border: 1px solid #e5e5e5;

  }

  #leader_index .tableBox table tbody tr td:last-child {
    cursor: pointer;

  }

  #leader_index .tableBox table tbody tr td:nth-child(2) {
    cursor: pointer;
    text-align: left;
  }

  #leader_index .tableBox table tbody tr td:nth-child(4) {
    cursor: pointer;
  }

  #leader_index .selectOption .province,
  #leader_index .selectOption .city,
  #leader_index .selectOption .town {
    width: 100px;
    margin-right: 5px;
  }


  .selectRoleAll{
    margin-left: 34px;
    font-size: 18px;
    color: #666;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .selectRoleAll span{
    color: #999;
    /* margin-left: 10px; */
    display: inline-block;
  }
  .selectAllThis{
    width: 100%;
    padding: 0 34px;
    box-sizing: border-box;
    font-size: 18px !important;
  }
  .selectAllThis .lineOneThis{
    width: 100%;
    display: block;
    line-height: 30px;
  }
  .lineOneThis span{
    display: inline-block;
    width: 160px;
  }
  .lineOneThis .el-checkbox-group{
    display: inline-block;
    width: 500px;
  }
</style>
