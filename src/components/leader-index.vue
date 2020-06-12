<template>
  <div id='leader_index'>
    <div class="leader_top">
      <span class="leader_top_title">忠安客户漏斗管理系统</span>
      <span class="loginout" @click="loginout()">退出登录</span>
    </div>
    <div class="leader_name">
      <span>任欣伟(业务员)</span><span>共{{totalCount}}条数据</span>
    </div>
    <div class="leader_peop">
      <div v-for="item in urgentLevel" @click="memberDetail(item.userId)" :key="item.value" class="leader_eve">
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
  </div>
</template>

<script>
import qs from 'qs';
  export default {
    data() {
      return {
        urgentLevel: [],
        customerPage: 1,
        totalCount:'',
      }
    },
    activated() {
      Object.assign(this.$data, this.$options.data());
      this.getData()
      this.getDataNumber()
    },

    methods: {
      create() {
        this.$axios.post('/zong-jing-li/create-user', qs.stringify({
            name: 'xuxiukun',
            phone: 15077822798,
            nickname: 'xuxk',
            upperUserId: '10000000000000000000000000000000',//20200611182803879562472539181121
            upperUser1Id: '10000000000000000000000000000000',
            upperUser2Id: '10000000000000000000000000000000',
            upperUser3Id: '10000000000000000000000000000000',
            password: 123456,
            type: 0,
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
          })
      },

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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      memberDetail(id){
        localStorage.setItem('id',id)
        this.$router.push({ path : '/leader-lookIndex',query : {time: new Date().getTime()}});
      },

      getData() {
        this.$axios.get('/zong-jing-li/user-list?' + qs.stringify({
            pn: this.customerPage,
            // ps: 10,
            order:'asc',
            sort:'updateTime'
          }))
          .then(res => {
            console.log(res)
            if(res.data.codeMsg){
              console.log(res.data.codeMsg)
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code ==0){
              if(res.data.data.itemList.length >0){
                for(let i in res.data.data.itemList){
                  this.urgentLevel.push(res.data.data.itemList[i])
                }


              }

            }

          })
      },
      getDataNumber() {
        this.$axios.get('/zong-jing-li/user-list-sum')
          .then(res => {
            if(res.data.codeMsg){
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              })
            }
            if(res.data.code ==0){
              this.totalCount=res.data.data.itemCount
            }
          })
      }
    }
  }
</script>

<style scoped>
  #leader_index{
    width: 100%;
    min-width: 1200px;
    height: auto;
    min-height: 100%;
    background:rgba(240,242,245,1);
  }
  .leader_top{
    width: 100%;
    height: 64px;
    background:rgba(0,33,64,1);
    box-shadow:2px 0px 6px 0px rgba(0,21,41,0.35);
  }
  .leader_top_title{
    width:240px;
    height:32px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:64px;
    margin-left: 36px;
    float: left;
  }
  .loginout{
    width:80px;
    height:32px;
    font-size:20px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:64px;
    margin-right: 36px;
    float: right;
    cursor: pointer;
  }
  .leader_name{
    width: 100%;
    height: 80px;
    background: #fff;
  }
  .leader_name span:nth-child(1){
    font-size:24px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:80px;
    margin-left: 36px;
  }
  .leader_name span:nth-child(2){
    margin-left: 20px;
    font-size:20px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:80px;
  }
  .leader_peop{
    width: 100%;
  }
  .leader_eve{
    width:259px;
    height:133px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(232,232,232,1);
    display: inline-block;
    margin-left: 24px;
    margin-top: 24px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .leader_eve img{
    font-size: 24px;
    color: #FFBF00;
    width: 24px;
    height: 24px;
    margin: 24px 16px auto 24px;
    /* display: inline-block; */
    float: left;
  }
  .leader_eve .leader_detail{
    float: left;
    width: 193px;
    border: 0;
    /* display: inline-block; */
  }
  .leader_detail p{
    margin-top: 24px;
    width:185px;
    height:24px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:24px;
  }
  .leader_detail ul{
    width: 45%;
    display: inline-block;
  }
  .leader_detail ul li:nth-child(1){
    margin-top: 12px;
    margin-bottom: 9px;
    width:auto;
    height:20px;
    font-size:12px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height:20px;
  }
  .leader_detail ul:nth-child(3){
    margin-left: 5%;
  }
  .leader_detail ul li:nth-child(2){
    width:70px;
    height:32px;
    font-size:22px;
    font-family:HelveticaNeue-Medium,HelveticaNeue;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height:32px;
  }
  .leader_eveAdd{
    width:259px;
    height:133px;
    background:transparent;
    border-radius:2px;
    border:1px solid rgba(24,144,255,1);
    display: inline-block;
    margin-left: 24px;
    margin-top: 24px;
    box-sizing: border-box;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(24,144,255,1);
    position: relative;
    cursor: pointer;
  }
  .leader_eveAdd_span{
    color: rgba(24,144,255,1);
    height: 25px;
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
