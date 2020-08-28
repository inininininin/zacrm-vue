<template>
  <div id='addIndex'>
    <!-- <router-link :to="{path:'add-hos',query:{time:new Date().getTime()}}" style="padding: 10px 20px;" title="欢迎体验">旧版本页面</router-link> -->
    <div class="addIndexBox">
      <a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a>
      <a href="../assets/call/index.html" target="_blank">话机页面</a>
      <div>
        <div class="addIndexBoxTitle">
          <!-- <el-button v-show="show" @click='modify()' class="modify" type="primary">修改</el-button> -->
          <el-button @click='saveIs()' class="saveIs" type="primary">保存</el-button>
          <el-button @click='refuse()' class="refuse" plain>取消</el-button>
        </div>
        <!-- 医院信息主体 -->

        <div>
          <div class="addmainBox">
            <div class="detailLine detailLineModify">
              <div>
                <span>医院名：</span>
                <el-input class="hospitalName" v-model="hospitalDetail.name" type="text" placeholder='请输入'></el-input>
              </div>
              <div>
                <span>电话：</span>
                <el-input class="hospitalPhone" v-model="hospitalDetail.tel" type="text" placeholder='请输入'></el-input>
                <!-- <span>52281078</span>
                  <img src="../assets/img/zuoji.svg" alt="">
                  <img src="../assets/img/shouji.svg" alt=""> -->
              </div>
            </div>
            <!-- <div class="detailLine detailLineModify">
              <div>
                <span>其他号码：</span>
                <p class="modifyTel" v-for="(item, ids) in hospitalDetail.telList" :key=ids @click="modifyThisTel(item.telName,item.tel,item.name)">
                  <span>{{item.name}}：</span><span>{{item.tel}}</span>
                </p>
                <div class="addHospitalTel" @click="(e)=>{telName<9?dialogFormVisible = true:this.$message({type: 'info',message: '当前最多添加9个备用电话'})}"><img
                    src="../assets/img/jia.svg" alt=""><span>添加电话</span></div>
              </div>
            </div> -->

            <div class="detailLine detailLineModify">
              <div>
                <span>地址：</span>
                <el-cascader class="hospitalAddress" :options="options" v-model="hospitalDetail.dili" clearable @change="handleChange"></el-cascader>
              </div>
              <div>
                <span>性质：</span>
                <!-- hospitalNatureValue -->
                <el-select @change="selectChanged" class="hospitalNature" v-model="hospitalDetail.nature" placeholder="请选择">
                  <el-option v-for="item in hospitalNature" :key="item.hospitalNatureValue" :label="item.label" :value="item.hospitalNatureValue">
                  </el-option>
                </el-select>
                <!-- <span>民营医院</span> -->
              </div>
            </div>
          </div>
          <div class="addContent">
            <div>
              <span>简介：</span>
              <el-input disabled resize='none' :autosize="{ minRows: 6, maxRows: 6}" type="textarea" :rows="2"
                placeholder="暂时禁用编辑医院简介" v-model="hospitalDetail.brief">
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增修改号码 -->
    <el-dialog title="新增/修改号码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称备注:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="formLabelWidth">
          <el-input type="tel" onkeyup="value=value.replace(/[^\d\-\d]/g,'')" maxlength=20 v-model="form.tel"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="(e)=>{dialogFormVisible = false;form.name='';form.tel='';}">取 消</el-button>
        <el-button type="primary" @click="makesureAdd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // import axios from 'axios';
  import qs from 'qs';
  import area from '@/assets/area.json';
  export default {
    data () {
      return {

        detail: [],
        hospitalDetail: [{
          name: '',
          tel: '',
          nature: '',
          dili: [],
          diliNow: {
            shenfen: {
              name: '',
              id: ''
            },
            city: {
              name: '',
              id: ''
            },
            qu: {
              name: '',
              id: ''
            }
          }

        }],
        options: [],
        hospitalNature: [{
          hospitalNatureValue: 1,
          label: '民营医院'
        }, {
          hospitalNatureValue: 2,
          label: '公立医院'
        }],
        hospitalNatureValue: '1',
        hospitalLabel: '民营医院',
        form: {
          name: '',
          tel: ''
        },

        dialogFormVisible: false,
        formLabelWidth: '120px',
        linkmanList: [],
        modifyThisTelValue: '' // 是否修改医院的备注号码''否，其他是
      };
    },
    activated () {
      if (this.query != JSON.stringify(this.$route.query)) {
        Object.assign(this.$data, this.$options.data());
        this.options = area;
      }
    },
    mounted () {
      this.options = area;
    },

    methods: {

      handleChange (_value) {
        // //console.log(_value)
        let name1 = area.find(n => n.value == _value[0]);
        let name2 = name1.children.find(n => n.value == _value[1]);
        let name3 = name2.children.find(n => n.value == _value[2]);
        this.hospitalDetail.area1Id = name1.value;
        this.hospitalDetail.area2Id = name2.value;
        this.hospitalDetail.area3Id = name3.value;
        this.hospitalDetail.area1Name = name1.label;
        this.hospitalDetail.area2Name = name2.label;
        this.hospitalDetail.area3Name = name3.label;
        this.hospitalDetail.dili = [name1.value, name2.value, name3.value];
        this.hospitalDetail.diliNow = {
          shenfen: {
            name: name1.label,
            id: name1.value
          },
          city: {
            name: name2.label,
            id: name2.value
          },
          qu: {
            name: name3.label,
            id: name3.value
          }
        };
      },
      modify () {
        this.show = !this.show;
        this.detail.hospitalName = this.hospitalDetail.name;
        this.detail.hospitalPhone = this.hospitalDetail.tel;
        this.detail.dili = this.hospitalDetail.dili;
        this.detail.diliNow = this.hospitalDetail.diliNow;
        this.detail.telList = this.hospitalDetail.telList;
        this.detail.hospitalNatureValue = this.hospitalDetail.hospitalNatureValue;
        this.detail.hospitalLabel = this.hospitalDetail.hospitalLabel;
      },
      refuse () {
        this.modifyThisTelValue = '';
        this.show = !this.show;
        this.hospitalName = this.detail.hospitalName;
        this.hospitalPhone = this.detail.hospitalPhone;
        this.dili = this.detail.dili;
        this.diliNow = this.detail.diliNow;
        this.telList = this.detail.telList;
        this.hospitalNatureValue = this.detail.hospitalNatureValue;
        this.hospitalLabel = this.detail.hospitalLabel;
        this.$router.back()
      },
      // 保存
      saveIs () {
        if (!this.hospitalDetail.nature) {
          this.$message({
            type: 'info',
            message: '请选择医院性质'
          });
          return;
        }
        this.$axios.post('/my-customer/create-customer?' + qs.stringify({
            name: this.hospitalDetail.name,
            tel: this.hospitalDetail.tel,
            nature: this.hospitalDetail.nature,
            area1Id: this.hospitalDetail.area1Id,
            area2Id: this.hospitalDetail.area2Id,
            area3Id: this.hospitalDetail.area3Id,
            area1Name: this.hospitalDetail.area1Name,
            area2Name: this.hospitalDetail.area2Name,
            area3Name: this.hospitalDetail.area3Name,
            toRevisitTime: this.hospitalDetail.toRevisitTime,
            brief: this.hospitalDetail.brief,
            customerId: this.customerId
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              });
            }
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '新增成功！'
              });
              this.$router.push({
                path: '/modify-hosNew',
                query: {
                  id: res.data.data.customerId,
                  time: new Date().getTime()
                }
              });
              this.show = !this.show;
            }
          });
      },

      levelList (id, level) {
        this.modifyRealtion(id, 'level=' + level, '', '', '');
      }

    }
  };
</script>

<style scoped>
  #addIndex {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    min-width: 1440px;
    background: #f0f2f5;
    overflow: scroll;
    overflow-x: hidden;
  }

  .addIndexBox {
    width: 100%;
    min-width: 1440px;
    background: #fff;
    float: left;
  }

  .addIndexBox>div {
    width: 1440px;
    height: auto;
    margin: 0 auto;
  }

  .addIndexBoxTitle {
    height: 40px;
  }

  .addIndexBoxTitle .title {
    /* width: 127px; */
    height: 32px;
    font-size: 24px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 32px;
    float: left;
    margin: 26px 0 0 36px;
  }

  .addIndexBoxTitle .modify,
  .addIndexBoxTitle .saveIs {
    width: 98px;
    height: 40px;
    background: #1890ff;
    border-radius: 4px;
    float: right;
    margin: 0 24px 0 0;
  }

  .addIndexBoxTitle .refuse {
    width: 98px;
    height: 40px;
    background: #FFFFFF;
    color: #1890ff;
    border-radius: 4px;
    float: right;
    margin: 0 24px 0 0;
    /* border: 1px solid #1890ff; */
  }

  .addmainBox {
    width: 726px;
    float: left;
    /* display: inline-block; */
    box-sizing: border-box;
    padding: 0 36px;
  }

  .addContent {
    width: 680px;
    float: left;
    height: auto;
    /* display: inline-block; */
  }

  >>>.addContent .el-textarea.is-disabled .el-textarea__inner {
    padding: 0;
    background-color: #ffffff !important;
    border-color: #ffffff !important;
    color: #606266 !important;
  }

  .addContent>div:nth-child(1) {
    line-height: 51px;
    font-size: 16px;
    font-weight: 400;
  }

  .addContent>div:nth-child(1)>span {
    line-height: 22px !important;
    display: inline-block;
  }

  .addContent>div:nth-child(1)>span:nth-child(1) {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }

  .detailLine {
    display: block;
  }

  .detailLine>div {
    display: inline-block;
    margin-right: 115px;
    line-height: 51px;
  }

  .detailLine>div>p {
    display: inline-block;
    font-size: 16px;
    margin-right: 10px;
  }

  .detailLine>div {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    /* text-align: center; */
    color: rgba(0, 0, 0, 0.85);
  }

  .detailLine>div img {
    width: 24px;
    height: 24px;
    /* margin-left: 10px; */
    cursor: pointer;
  }

  .detailLine>div>span:nth-child(1) {
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }

  .detailBottom {
    width: 100%;
    /* padding: 0 10%; */
    width: 1440px;
    /* float: left; */
    margin: 0 auto;
  }

  .detailBottomlf {
    float: left;
    width: 746px;

  }

  .detailBottomrt {
    float: right;

    width: 694px;
  }

  .linkmanBox {
    width: 706px;
    height: auto;
    min-height: 98px;
    box-sizing: border-box;
    margin: 20px 20px 0 20px;
    background: #ffffff;
    /* padding-bottom: 10px; */
    float: left;
    position: relative;
  }

  .linkmanBox .linkmanBoxTitle span {
    line-height: 22px;
    -webkit-writing-mode: vertical-r;
    writing-mode: vertical-lr;
    padding-left: 10px;
    letter-spacing: 3px;
    text-align: center;
    display: inline-block;
    /* height: calc(100% - 4px); */
    min-height: 90px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    /* right: 0; */
    width: 40px;
  }

  .linkmanBox .linkmanBoxTitle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40px;
    min-height: 98px;
    background: #1890ff;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    display: table-cell;
    display: inline-block;
    float: left;
    height: inherit;
  }

  .linkmanBox .linkmanBoxRt {
    display: inline-block;
    border: 0;
    width: 666px;
    height: 100%;
    float: left;
    padding-left: 24px;
    box-sizing: border-box;
    margin-left: 40px;
  }

  .linkmanBoxRtLine {
    height: 34px;
    line-height: 34px;
    margin-top: 10px;
  }

  .linkmanBoxRtLine>div {
    float: left;
    margin-bottom: 10px;
  }

  .linkmanBoxRtLine p {
    display: inline-block;
    float: left;
  }

  .withBox {
    width: 200px;
    height: 34px;
    background: #ffffff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    float: left;
    margin-right: 10px;
  }

  >>>.withBox .el-input__inner {
    width: 198px;
    height: 30px !important;
    background: #ffffff;
    border: 0;
    outline: none;
    padding: 0 12px;
    cursor: pointer !important;
  }

  >>>.linkmanBoxRtLine .el-input.is-disabled .el-input__inner {
    background: #ffffff !important;
    border: 0;
    color: #C0C4CC !important;
    outline: none;
    cursor: pointer !important;
  }

  >>>.telinput .el-input {
    width: 130px;
  }

  >>>.telinput .el-input__inner {
    width: 130px;
    height: 30px !important;
    background: #ffffff;
    border: 0;
    outline: none;
    padding: 0 8px;
    cursor: pointer !important;
  }

  .withBox>img {
    float: right;
    margin-top: 5px;
  }

  .linkmanTitle {
    float: left;
  }

  .ifQuick {
    float: right !important;
    margin-right: 10px;
  }

  >>>.ifQuick .el-select {
    width: 200px;
    height: 34px;
  }

  >>>.ifQuick .el-select .el-input__inner {
    /* width: 200px; */
    height: 34px;
    line-height: 34px;
  }

  >>>.ifQuick .el-select .el-input__inner .el-input__icon {
    line-height: 34px;
  }

  .zuoji {
    margin: 0 4px 0 10px;
    /* float: right; */
  }

  .shouji {
    margin-right: 5px;
  }

  .addNewRelation {
    width: 706px;
    height: 98px;
    line-height: 98px;
    background: #ffffff;
    margin: 20px 20px 0 20px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #1890ff;
    cursor: pointer;
    float: left;
  }

  .addPhoneTel {
    height: 34px;
    line-height: 34px;
    vertical-align: middle;
    color: #1890FF;
    float: left;
    cursor: pointer;
  }

  .addHospitalTel {
    height: 34px;
    line-height: 34px;
    vertical-align: middle;
    color: #1890FF;
    cursor: pointer;
    display: inline-block;
  }

  .addPhoneTel img,
  .addHospitalTel img {
    width: 16px !important;
    height: 16px !important;
    /* background: #1890ff; */
    margin-right: 4px !important;
  }

  .detailBottomrt .trackAllDetail {
    width: 670px;
    height: 570px;
    background: #ffffff;
    margin-top: 20px;
  }

  .trackTop {
    width: 670px;
    height: 40px;
    background: #ff932e;
  }

  .trackTop .lookAllTrack {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    margin: 5px 15px;
    float: left;
    padding: 0;
  }

  .trackTop p {
    display: inline-block;
    width: 470px;
    float: left;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
  }

  .trackMid {
    width: 670px;
    height: 427px;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEE;
  }

  .trackMidEve {
    width: 610px;
    margin: 12px auto 0;
  }

  .trackMidEve>p:nth-child(1) {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 20px;
  }

  .trackMidEve>p:nth-child(1) span:nth-child(2) {
    color: #666666;
    margin-left: 10px;
  }

  .trackMidEve>p:nth-child(2) {
    width: 610px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: justify;
    color: #333333;
    line-height: 22px;
  }

  .trackBottom {}

  .trackBottomOne {
    height: 78px;
    width: 100%;
    border-bottom: 1px solid #EEEEEE;
    box-sizing: border-box;
    padding: 12px 0;
  }

  .trackBottomOne .trackOne {
    width: 108px;
    /* height: 78px; */
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #999999;
    line-height: 22px;
    float: left;

  }

  .trackBottomOne .trackTwo {
    float: left;
    width: 86px;
  }

  .trackBottomOne .trackThree {
    float: left;
    width: 476px;
    height: 54px;
    font-size: 16px;
    line-height: 27px !important;
  }

  >>>.el-radio-group .el-radio {
    /* margin-bottom: 10px !important; */
    line-height: 27px !important;
  }

  .trackText {
    width: 500px;
    height: 66px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: justify;
    color: #999999;
    line-height: 22px;
    margin: 12px 20px 12px 30px;
    outline: none;
    border: 0;
    float: left;
  }

  >>>.trackText .el-textarea__inner {
    padding: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .sendYes {
    width: 98px;
    height: 40px;
    background: #ff932e;
    border-radius: 4px;
    color: #ffffff;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    border: 0;
    float: right;
    margin: 25px 22px 25px 0;
  }

  .sendYes:hover {
    background: #f98a21;
    color: #FFFFFF;
    border: 0;
  }

  /* 修改页面 */
  .hospitalName,
  .hospitalPhone {
    display: inline-block;
    width: 190px;
    height: 32px;
  }

  .hospitalAddress {
    width: auto;
    min-width: 190px;
  }

  >>>.hospitalAddress input {
    width: auto;
    min-width: 190px;
    padding: 0 12px;
    height: 32px;
    line-height: 32px;
  }

  >>>.hospitalName input,
  >>>.hospitalPhone input,
  >>>.hospitalNature input {
    width: 190px;
    height: 32px;
    line-height: 32px;
  }

  .detailLineModify>div {
    margin-right: 20px !important;
  }

  .modifyTel {
    min-width: 190px;
    width: auto;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    line-height: 32px;
    margin-top: 10px;
    cursor: pointer;
    padding: 0 12px;
  }

  /* 弹窗 */
  .addNewTelBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: none;
  }

  .addNewTelBox>div:nth-child(1) {
    position: fixed;
    z-index: 2;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .addNewTelBox>div:nth-child(2)>div:nth-child(1) p {
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
  }

  .addNewTelBox>div:nth-child(2)>div:nth-child(1) .closeAddThis {
    float: right;
    margin-top: -35px;
    font-size: 20px;
    margin-right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .addNewTelBox>div:nth-child(2) {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 200px;
    background: #FFFFFF;
    margin-top: -100px;
    margin-left: -150px;
    z-index: 3;
    border-radius: 5px;
  }

  .addNewTelBox>div:nth-child(2) .divBox span {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    line-height: 40px;
    margin-left: 20px;
  }

  .addNewTelBox>div:nth-child(2) .divBox input {
    padding: 0 10px;
    box-sizing: border-box;
    display: inline-block;
    margin-left: 10px;
    width: 170px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e5e5e5;
    outline: none;
    border-radius: 4px;
  }

  .addNewTelBox button {
    background: #409eff;
    width: 90px;
    margin-left: 105px;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    border: 0;
    color: #FFFFFF;
    font-size: 14px;
    margin-top: 20px;
  }

  /* input框的placeholder样式 */
  >>>input::-webkit-input-placeholder {
    color: #c0c4cc !important;
  }

  >>>input::-moz-input-placeholder {
    color: #c0c4cc !important;
  }

  >>>input::-ms-input-placeholder {
    color: #c0c4cc !important;
  }
</style>
