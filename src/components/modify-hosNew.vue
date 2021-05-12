<template>
  <div id='addIndex'>

    <div class="addIndexBox">
      <!-- <a class="aClose" href="Webshell://hello" style="padding: 10px 20px;">重启话机</a> -->
      <!-- <a href="../assets/call/index.html" style="display:none" target="_blank">话机页面</a> -->
      <!-- <router-link :to="{path:'add-hos',query:{id:$route.query.id}}" style="padding: 10px 20px;" title="欢迎体验">旧版本页面</router-link> -->
      <div>
        <div class="addIndexBoxTitle" style="margin-top: 10px;">
          <el-button v-show="show" @click='modify()' class="modify" type="primary">修改</el-button>
          <el-button v-show="!show" @click='saveIs()' class="saveIs" type="primary">保存</el-button>
          <el-button v-show="!show" @click='refuse()' class="refuse" plain>取消</el-button>
        </div>
        <!-- 医院信息主体 -->
        <div v-show="show" style="margin-top: -20px;">
          <div class="addmainBox">
            <div class="detailLine">
              <div>
                <span>医院名：</span>
                <span>{{hospitalDetail.name}}</span>
              </div>
              <div>
                <span>电话：</span>
                <span style="margin-right:10px">{{hospitalDetail.tel}}</span>
                <!-- <img v-show="hospitalDetail.tel" @click="shoujiTel(hospitalDetail.name,hospitalDetail.tel)" src="../assets/img/shouji.svg" alt=""> -->
                <!-- <img v-show="hospitalDetail.tel" @click="zuojiTel(hospitalDetail.name,hospitalDetail.tel)"  src="../assets/img/zuoji.svg" alt=""> -->
                <span class="shoujiDiv" style="float: right;position: relative;">
                  <img title="座机" @click="zuojiTel(hospitalDetail.name,hospitalDetail.tel)" class="zuoji" src="../assets/img/zuoji.svg" alt="" />
                  <img title="手机" @click="$callService.mobilePhoneFn(hospitalDetail.name,hospitalDetail.tel)" class="shouji" src="../assets/img/shouji.svg" alt="" />
                </span>
              </div>
            </div>
            <div class="detailLine">
              <div style="margin-right: 0px;">
                <span style="float: left;width: 80px;">其他号码：</span>
                <div style="width: 850px;float: left;">
                  <p v-for="(item, i) in hospitalDetail.telList" :key=i style="width:385px">
                    <span>{{item.name}}：</span>
                    <span>{{item.tel}}</span>
                    <!-- <img @click="shoujiTel(item.name,item.tel)" src="../assets/img/shouji.svg" alt=""> -->
                    <!-- <img @click="zuojiTel(item.name,item.tel)" src="../assets/img/zuoji.svg" alt=""> -->
                    <span class="shoujiDiv" style="float: right;position: relative;">
                      <img title="座机" @click="zuojiTel(item.name,item.tel)" class="zuoji" src="../assets/img/zuoji.svg" alt="" />
                      <img title="手机" @click="$callService.mobilePhoneFn(item.name,item .tel)" class="shouji" src="../assets/img/shouji.svg" alt="" />
                      <!-- <span class="telCall">座机</span> -->
                    </span>
                  </p>
                </div>
                
              </div>
            </div>
            <!-- 回访时间 -->

            <div class=" detailLine">
              <div class="toRevisitTime">
                <span>回访时间：</span>
                <span>{{hospitalDetail.toRevisitTimeThis}}</span>
              </div>
              <!-- <el-date-picker
                    v-model="hospitalDetail.toRevisitTime"
                    type="date"
                    placeholder="">
                  </el-date-picker> -->
            </div>
            <div class="detailLine">
              <div>
                <span>地址：</span>
                <span>
                  <span>{{hospitalDetail.diliNow.shenfen.name? hospitalDetail.diliNow.shenfen.name+'-':''}}</span>
                  <span>{{hospitalDetail.diliNow.city.name? hospitalDetail.diliNow.city.name+'-':''}}</span>
                  <span>{{hospitalDetail.diliNow.qu.name}}</span>
                </span>
              </div>
              <div>
                <span>性质：</span>
                <span>{{hospitalDetail.nature==1?'民营医院':'公立医院'}}</span>
              </div>
              <div>
                <span>法人：</span>
                <span>{{hospitalDetail.faRen}}</span>
              </div>
              <div>
                <span>注册时间：</span>
                <span>{{hospitalDetail.zhuCeShiJian? moment(hospitalDetail.zhuCeShiJian).format('YYYY-MM-DD'):''}}</span>
              </div>
              <div>
                <span>注册资金：</span>
                <span>{{hospitalDetail.zhuCeZiJin||0}} 万元</span>
              </div>
            </div>
          </div>
          <div class="addContent" style="padding:0 36px">
            <div>
              <span>简介：</span>
              <!-- <el-input disabled resize='none' :autosize="{ minRows: 6, maxRows: 6}" type="textarea" :rows="2"
                placeholder="暂时禁用编辑医院简介" v-model="hospitalDetail.brief">
              </el-input> -->
              <el-input disabled resize='none' :autosize="{ minRows: 6, maxRows: 6}" type="textarea" :rows="2"
                placeholder="" v-model="hospitalDetail.brief">
              </el-input>
            </div>
          </div>

        </div>
        <div v-show="!show"  style="margin-top: -20px;">
          <div class="addmainBox">
            <div class="detailLine detailLineModify">
              <div>
                <span>医院名：</span>
                <el-input class="hospitalName" v-model="modifyhospitalDetail.name" type="text" placeholder='请输入'></el-input>
              </div>
              <div>
                <span>电话：</span>
                <el-input class="hospitalPhone" type="text" maxlength=20 @input="modifyhospitalDetail.tel=modifyhospitalDetail.tel.replace(/[^\d\-\d]/g,'')"
                  v-model="modifyhospitalDetail.tel " placeholder='请输入'></el-input>
                <!-- <span>52281078</span>
                  <img src="../assets/img/zuoji.svg" alt="">
                  <img src="../assets/img/shouji.svg" alt=""> -->
              </div>
            </div>
            <div class="detailLine detailLineModify">
              <div style="margin-right: 0px;">
                <span style="float: left;width: 80px;">其他号码：</span>
                <div style="width: 850px;float: left;">
                  <p class="modifyTel" style="width:350px" v-for="(item, ids) in modifyhospitalDetail.telList" :key=ids @click="modifyThisTel(item,ids)">
                    <span>{{item.name}}：</span><span>{{item.tel}}</span>
                    <!-- <img src="../assets/img/zuoji.svg" alt="">
                      <img src="../assets/img/shouji.svg" alt=""> -->
                  </p>
                  <div class="addHospitalTel" @click="addThisTel()"><img
                    src="../assets/img/jia.svg" alt=""><span>添加电话</span></div>
                </div>
              </div>
                <!-- @click="telName<9? dialogFormVisible = true:this.$message({type: 'info',message: '当前最多添加9个备用电话'})" -->            </div>
            <div class=" detailLine detailLineModify">
              <div class="toRevisitTime">
                <span>回访时间：</span>
                <!-- <span>{{hospitalDetail.toRevisitTime}}</span> -->
                <el-date-picker v-model="modifyhospitalDetail.toRevisitTime" type="date" placeholder="" format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp">
                </el-date-picker>
              </div>

            </div>
            <div class="detailLine detailLineModify">
              <div>
                <span>地址：</span>
                <el-cascader ref="cascader" class="hospitalAddress" :options="options" v-model="modifyhospitalDetail.dili" clearable @change="handleChange"></el-cascader>
              </div>
              <div>
                <span>性质：</span>
                <!-- hospitalNatureValue -->
                <el-select @change="selectChanged" class="hospitalNature" v-model="modifyhospitalDetail.nature" placeholder="请选择">
                  <el-option v-for="item in hospitalNature" :key="item.hospitalNatureValue" :label="item.label" :value="item.hospitalNatureValue">
                  </el-option>
                </el-select>
                <!-- <span>民营医院</span> -->
              </div>
              <div>
                <span>法人：</span>
                <el-input class="hospitalName" v-model="modifyhospitalDetail.faRen" type="text" placeholder='请输入'></el-input>
              </div>
              <!-- <div class=" detailLine detailLineModify"> -->
              <div class="toRevisitTime">
                <span>注册时间：</span>
                <!-- <span>{{hospitalDetail.toRevisitTime}}</span> -->
                <el-date-picker v-model="modifyhospitalDetail.zhuCeShiJian" size="small" type="date" placeholder="" format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp">
                </el-date-picker>
              </div>
              <div>
                <span>注册资金：</span>
                <el-input class="hospitalName inputclass" style="width:100px" v-model="modifyhospitalDetail.zhuCeZiJin" type="number" onkeypress="return (/[\.\d]/.test(String.fromCharCode(event.keyCode)))" placeholder='请输入' ></el-input>
                <span>万元</span>
              </div>
            <!-- </div> -->
            </div>
            <div class="addContent" style='margin-bottom:30px'>
            <div>
              <span>简介：</span>
              <!-- <el-input disabled resize='none' :autosize="{ minRows: 6, maxRows: 6}" type="textarea" :rows="2"
                placeholder="暂时禁用编辑医院简介" v-model="hospitalDetail.brief">
              </el-input> -->
              <el-input  resize='none' :autosize="{ minRows: 6, maxRows: 6}" type="textarea" :rows="2"
                placeholder="编辑医院简介" v-model="modifyhospitalDetail.brief">
              </el-input>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 医院信息下半部分 -->
    <div style="background: #f0f2f5;">
      <div class="detailBottom">
        <!-- style="float: left;margin: 0 auto;" -->
        <div class="detailBottomlf">

          <div class="linkmanBox">
            <div class="linkmanBoxTitle" @click="traceList(paibanrenDetail.customerWorkerId,1,paibanrenDetail.name.name)"><span>拍板人</span></div>
            <div class="linkmanBoxRt">
              <div class="linkmanBoxRtLine">
                <p @click="dblName(paibanrenDetail.customerWorkerId,paibanrenDetail.name.name,'key',$event)">
                  <span class="linkmanTitle">姓名：</span>
                  <el-input @blur="dblNameEnd(paibanrenDetail.customerWorkerId,paibanrenDetail.name.name,'key',$event)" class="withBox"
                     type="text" placeholder="单击填写姓名" v-model="paibanrenDetail.name.name"
                    maxlength="20"></el-input>
                </p>
                <div class="ifQuick">
                  <el-checkbox @change='urgentQuick(paibanrenDetail.customerWorkerId,paibanrenDetail.urgentQuick)'
                    v-model="paibanrenDetail.urgentQuick" style="margin-right: 10px;">加急</el-checkbox>
                  <el-select @change="levelList(paibanrenDetail.customerWorkerId,paibanrenDetail.level)" v-model="paibanrenDetail.level"
                    placeholder="请选择">
                    <el-option v-for="items in paibanrenDetail.levelList" :key="items.level" :label="items.label"
                      :value="items.level">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="linkmanBoxRtLine">
                <p @click="dblPost(paibanrenDetail.customerWorkerId,paibanrenDetail.post.name,'key',$event)">
                  <span class="linkmanTitle">职务：</span>
                  <el-input @blur="dblPostEnd(paibanrenDetail.customerWorkerId,paibanrenDetail.post.name,'key',$event)" class="withBox"
                     placeholder='单击填写职务' type="text" v-model="paibanrenDetail.post.name"
                    maxlength="20"></el-input>
                </p>
                <div> 
                  <span style="float: left;margin-right: 3px;">历史号码: </span>
                  <p @click="telShowFn(paibanrenDetail.phone1,paibanrenDetail.phone2,paibanrenDetail.phone3)" style="float:none;cursor: pointer;width: 300px;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;word-wrap: break-word;">
                    {{(paibanrenDetail.phone1? paibanrenDetail.phone1:"") + (paibanrenDetail.phone2? ','+paibanrenDetail.phone2:"")+(paibanrenDetail.phone3? ','+paibanrenDetail.phone3:"")}}
                  </p>
                </div>
              </div>
              <div class="linkmanBoxRtLine">
                <div class="telinput" v-for="( itemed, keysIf ) in paibanrenDetail.tels" :key=keysIf>
                  <span class="linkmanTitle">电话：</span>
                  <p class="withBox" @click="dblTel(paibanrenDetail.customerWorkerId,itemed.tel,'key',keysIf,paibanrenDetail.tels,$event)">
                    <el-input @blur="dblTelEnd(paibanrenDetail.customerWorkerId,itemed.tel,'key',keysIf,paibanrenDetail.tels,$event)"
                       placeholder='单击输入电话' type="text" @input="itemed.tel=itemed.tel.replace(/[^\d\-\d]/g,'')" v-model="itemed.tel" maxlength="20" autocomplete='off'></el-input>
                    <!-- <img @click="shoujiTel(paibanrenDetail.name.name,itemed.tel)" class="shouji" src="../assets/img/shouji.svg"
                      alt=""> -->
                    <span class="shoujiDiv" style="float: right;position: relative;">
                        <img title="座机" @click="zuojiTel(paibanrenDetail.name.name,itemed.tel)" class="zuoji" src="../assets/img/zuoji.svg" alt="" />
                        <img title="手机" @click="$callService.mobilePhoneFn(paibanrenDetail.name.name,itemed .tel)" class="shouji" src="../assets/img/shouji.svg" alt="" />
                        <!-- <span class="telCall">座机</span> -->
                    </span>
                  </p>
                </div>
                <div class="addPhoneTel" @click="addPhoneTel(paibanrenDetail.customerWorkerId,paibanrenDetail.tels,'key')"><img
                    src="../assets/img/jia.svg" alt=""><span>添加电话</span></div>
              </div>
            </div> 
          </div>
          <!-- 相关人 -->
          <div class="linkmanBox" v-for="( item, key ) in linkmanList " :key=key>
            <div class="linkmanBoxTitle" @click="traceList(item.customerWorkerId,1,item.name.name)"><span>相关人</span></div>
            <div class="linkmanBoxRt">
              <div class="linkmanBoxRtLine">
                <p @click="dblName(item.customerWorkerId,item.name.name,key,$event)">
                  <span class="linkmanTitle">姓名：</span>
                  <!-- <span v-show='item.name.show' class="withBox" @click="changeName()">{{item.name.name}}</span> -->
                  <el-input @blur="dblNameEnd(item.customerWorkerId,item.name.name,key,$event)" class="withBox" 
                    type="text" placeholder="单击填写姓名" v-model="item.name.name" maxlength="20"></el-input>
                </p>
                <div class="ifQuick">
                  <el-checkbox @change='urgentQuick(item.customerWorkerId,item.urgentQuick)' v-model="item.urgentQuick"
                    style="margin-right: 10px;">加急</el-checkbox>
                  <el-select @change="levelList(item.customerWorkerId,item.level)" v-model="item.level" placeholder="请选择">
                    <el-option v-for="items in item.levelList" :key="items.level" :label="items.label" :value="items.level">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="linkmanBoxRtLine">
                <p @click="dblPost(item.customerWorkerId,item.post.name,key,$event)">
                  <span class="linkmanTitle">职务：</span>
                  <el-input @blur="dblPostEnd(item.customerWorkerId,item.post.name,key,$event)" class="withBox" 
                    placeholder='单击填写职务' type="text" v-model="item.post.name" maxlength="20"></el-input>
                </p>
                <div> 
                  <span style="float: left;margin-right: 3px;">历史号码: </span>
                  <p @click="telShowFn(item.phone1,item.phone2,item.phone3)" style="float:none;cursor: pointer;width: 300px;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;word-break: break-all;word-wrap: break-word;">
                    {{(item.phone1? item.phone1:"") + (item.phone2? ','+item.phone2:"")+(item.phone3? ','+item.phone3:"")}}
                  </p>
                </div>
              </div>
              <div class="linkmanBoxRtLine">
                <div class="telinput" v-for="( itemed, keys ) in item.tels " :key=keys>
                  <span class="linkmanTitle">电话：</span>
                  <p class="withBox " @click="dblTel(item.customerWorkerId,itemed.tel,key,keys,item.tels,$event)">
                    <el-input   @blur="dblTelEnd(item.customerWorkerId,itemed.tel,key,keys,item.tels,$event)" 
                      placeholder='单击输入电话' type="text" @input="itemed.tel=itemed.tel.replace(/[^\d\-\d]/g,'')" v-model="itemed.tel" maxlength="20" autocomplete='off'></el-input>
                    <!-- <img @click="shoujiTel(item.name.name,itemed.tel)" class="shouji" src="../assets/img/shouji.svg"
                      alt=""> -->
                    <!-- <img @click="zuojiTel(item.name.name,itemed.tel)" class="zuoji" src="../assets/img/zuoji.svg" alt=""> -->
                    <span class="shoujiDiv" style="float: right;position: relative;">
                        <img title="座机" @click="zuojiTel(item.name.name,itemed.tel)" class="zuoji" src="../assets/img/zuoji.svg" alt="" />
                        <img title="手机" @click="$callService.mobilePhoneFn(item.name.name,itemed .tel)" class="shouji" src="../assets/img/shouji.svg" alt="" />
                        <!-- <span class="telCall">座机</span> -->
                    </span>
                  </p>
                </div>
                <div class="addPhoneTel" @click="addPhoneTel(item.customerWorkerId,item.tels,key)"><img src="../assets/img/jia.svg"
                    alt=""><span>添加电话</span></div>
              </div>

            </div>
          </div>

          <p class="addNewRelation" @click="addNewRelation">添加新的关系人</p>
        </div>
        <div class="detailBottomrt">
          <div class="trackAllDetail">
            <div class="trackTop">
              <el-button v-show="!showAll" class="lookAllTrack" @click="lookAllTrack" type="primary">查看全部</el-button>
              <p v-show="showAll" style="width: 100%;">{{hospitalDetail.name}}的跟踪记录</p>
              <p v-show="!showAll">{{linkmanTraceList}}的跟踪记录</p>
            </div>
            <div class="trackMid" ref="scrollRef">
              <div class="trackMidEve" v-for="(item,i) in traceDetailList" :key=i>
                <p><span>{{item.createTime}}</span><span>{{item.customerWorkerName}}</span></p>
                <p>{{item.content}}</p>
              </div>
            </div>
            <div class="trackBottom">
              <div class="trackBottomTwo">
                <el-input class="trackText" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="请输入"
                  resize='none' v-model="linkmanTracecontent">
                </el-input>
                <el-button class="sendYes" @click="sendYes">发送</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;width: 100%;height: 10px;"></div>
    </div>
    <!-- <div class="addNewTelBox">
      <div></div>
      <div id="addNewTelMid">
        <div>
          <p>新增/修改号码</p><i class="layui-icon closeAddThis">&#x1006;</i>
        </div>
        <div class='divBox'><span>名称备注:</span><input class="telName" type="text"></div>
        <div class='divBox'><span>电话号码:</span><input class="telValue" type="text"></div>
        <button type="button" id='submit_newTel' typeId=''>提交</button>
      </div>
    </div> -->
    <!-- 新增修改号码 -->
    <el-dialog title="新增/修改号码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称备注:" :label-width="formLabelWidth">
          <el-input v-model="form.name" maxlength="10" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="formLabelWidth">
          <!-- @input="kwReplaceFn()" -->
          <el-input type="text" @input="form.tel=form.tel.replace(/[^\d\-\d]/g,'')" maxlength=15  v-model="form.tel"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="makerefuseAdd">取 消</el-button>
        <el-button type="primary" @click="makesureAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增相关人 -->
    <el-dialog title="新增相关人" :visible.sync="dialogFormVisibleRea">     
      <el-form :model="relation">
        <el-form-item label="相关人姓名" :label-width="formLabelWidth">
          <el-input v-model="relation.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="(e)=>{dialogFormVisibleRea = false;relation.name=''} ">取 消</el-button>
        <el-button type="primary" @click='addRealtionSure'>确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增相关人号码 -->
    <el-dialog title="新增相关人号码" :visible.sync="dialogFormVisibleReaTel">
      <el-form :model="relationTel">
        <el-form-item label="号码" :label-width="formLabelWidth">
          <el-input type="text" @input="relationTel.tel=relationTel.tel.replace(/[^\d\-\d]/g,'')" maxlength=20 v-model="relationTel.tel"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="(e)=>{dialogFormVisibleReaTel = false;relationTel.tel=''}">取 消</el-button>
        <el-button type="primary" @click='addRealtionSureTel'>确 定</el-button>
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
        value1: '',
        customerId: '',
        show: true,
        detail: {},
        modifyhospitalDetail:{},
        hospitalDetail: {
          name: '',
          tel: '',
          nature: '',
          toRevisitTimeThis: '',
          toRevisitTime: '',
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
        },
        paibanrenDetail: {
          customerWorkerId: '',
          tels: [],
          post: {
            name: '',
            type: ''
          },
          name: {
            name: '',
            type: ''
          }
        },
        checked: true,
        radio: 3,
        linkmanTracecontent: '',
        hospitalContent: '医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介,医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介医院简介',
        hospitalName: '大厂医院',
        hospitalPhone: '15077822798',
        options: [],
        telList: [
          // {
          //   name: '儿科',
          //   tel: '13154212122'
          // },
          // {
          //   name: '疼痛科',
          //   tel: '17854552255'
          // }
        ],
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
          tel: '',
          inx:''
        },
        relation: {
          name: ''
        },
        relationTel: {
          tel: ''
        },
        addNewTelDetail: {
          id: '',
          key: '',
          keys: ''
        },
        dialogFormVisible: false,
        dialogFormVisibleRea: false,
        dialogFormVisibleReaTel: false,
        formLabelWidth: '120px',
        linkmanList: [],
        traceDetailList: [],
        modifyThisTelValue: '', // 是否修改医院的备注号码''否，其他是
        telName: 0,
        linkmanTraceList: '',
        showAll: true,
        linkmanTraceId: '',
        query:""
      };
    },
    activated () {
      if (this.query != JSON.stringify(this.$route.query)) {
        Object.assign(this.$data, this.$options.data());
        this.query = JSON.stringify(this.$route.query)
        // this.$common.loginRefresh();
        document.title = '忠安客户漏斗管理系统'
        this.$refs.cascader.$refs.panel.activePath = []
        this.$refs.cascader.$refs.panel.calculateCheckedNodePaths()
        this.options = area;
      }
      let thisValue = this;
      thisValue.customerId = thisValue.$route.query.id;

      this.customer();
      // this.customerList();
      // area1Id: this.diliNow.shenfen.id,
      // area2Id: this.diliNow.city.id,
      // area3Id: this.diliNow.qu.id,
      // area1Name: this.diliNow.shenfen.name,
      // area2Name: this.diliNow.city.name,
      // area3Name: this.diliNow.qu.name,
      // this.dili = [this.$store.state.wxVideoaccount.area1Id,this.$store.state.wxVideoaccount.area2Id,this.$store.state.wxVideoaccount.area3Id];
    },
    mounted () {
      this.options = area;
    },
    // watch: {

    //   list (val) {
    //     console.log(111);
    //     // 执行滚动到底部的逻辑
    //     this.$nextTick(() => { // 必须使用nextTick（在下次 DOM 更新循环结束之后执行延迟回调）
    //       var scrollRef = this.$refs.scrollRef;
    //       scrollRef.scrollTop = scrollRef.scrollHeight;
    //       console.log(scrollRef);
    //     });
    //   }
    // },
    methods: {
      telShowFn(tel1,tel2,tel3){
        console.log(tel1,','+tel2,','+tel3);
        this.$alert((tel1? tel1:'')+(tel2? ','+tel2:'')+(tel3? ','+tel3:''), '查看号码', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        })
      },
      // 医院信息
      async customer () {
        let thisValue = this;
        await thisValue.$axios.get('/crm/my-customer/customer?customerId=' + thisValue.customerId)
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  thisValue.$router.push({
                    path: '/login'
                  });
                }
              });
            } else if (res.data.code === 0) {
              document.title = this.$titleName
              document.title = res.data.data.name + " - " + document.title
              res.data.data.telList = [];
              res.data.data.dili = [res.data.data.area1Id, res.data.data.area2Id, res.data.data.area3Id];
              res.data.data.diliNow = {
                shenfen: {
                  name: res.data.data.area1Name,
                  id: res.data.data.area1Id
                },
                city: {
                  name: res.data.data.area2Name,
                  id: res.data.data.area2Id
                },
                qu: {
                  name: res.data.data.area3Name,
                  id: res.data.data.area3Id
                }
              };
              if (res.data.data.tel1) {
                res.data.data.telList.push({
                  name: res.data.data.tel1Remark,
                  tel: res.data.data.tel1,
                  telName: 'tel1'
                });
                thisValue.telName = 1;
              }
              if (res.data.data.tel2) {
                res.data.data.telList.push({
                  name: res.data.data.tel2Remark,
                  tel: res.data.data.tel2,
                  telName: 'tel2'
                });
                thisValue.telName = 2;
              }
              if (res.data.data.tel3) {
                res.data.data.telList.push({
                  name: res.data.data.tel3Remark,
                  tel: res.data.data.tel3,
                  telName: 'tel3'
                });
                thisValue.telName = 3;
              }
              if (res.data.data.tel4) {
                res.data.data.telList.push({
                  name: res.data.data.tel4Remark,
                  tel: res.data.data.tel4,
                  telName: 'tel4'
                });
                thisValue.telName = 4;
              }
              if (res.data.data.tel5) {
                res.data.data.telList.push({
                  name: res.data.data.tel5Remark,
                  tel: res.data.data.tel5,
                  telName: 'tel5'
                });
                thisValue.telName = 5;
              }
              if (res.data.data.tel6) {
                res.data.data.telList.push({
                  name: res.data.data.tel6Remark,
                  tel: res.data.data.tel6,
                  telName: 'tel6'
                });
                thisValue.telName = 6;
              }
              if (res.data.data.tel7) {
                res.data.data.telList.push({
                  name: res.data.data.tel7Remark,
                  tel: res.data.data.tel7,
                  telName: 'tel7'
                });
                thisValue.telName = 7;
              }
              if (res.data.data.tel8) {
                res.data.data.telList.push({
                  name: res.data.data.tel8Remark,
                  tel: res.data.data.tel8,
                  telName: 'tel8'
                });
                thisValue.telName = 8;
              }
              if (res.data.data.tel9) {
                res.data.data.telList.push({
                  name: res.data.data.tel9Remark,
                  tel: res.data.data.tel9,
                  telName: 'tel9'
                });
                thisValue.telName = 9;
              }
              if (res.data.data.toRevisitTime) {
                res.data.data.toRevisitTimeThis = this.moment(res.data.data.toRevisitTime).format('YYYY-MM-DD');
              } else {
                res.data.data.toRevisitTimeThis = '';
              }

              thisValue.hospitalDetail = res.data.data;
              this.customerList();
              this.traceList('', 1, '');
            }
          });
      },
      // 相关人等列表
      async customerList () {
        let thisValue = this;
        await thisValue.$axios.get('/crm/my-customer-worker/customer-worker-list?customerId=' + this.customerId +
            '&sort=createTime&order=asc')
          .then(res => {
            var number = '';
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  thisValue.$router.push({
                    path: '/login'
                  });
                }
              });
            } else if (res.data.code === 0) {
              var itemList = res.data.data.itemList;
              for (var i in itemList) {
                if (thisValue.hospitalDetail.paiBanCustomerWorkerId && thisValue.hospitalDetail.paiBanCustomerWorkerId ===
                  itemList[i].customerWorkerId) {
                  itemList[i].paiban = 1;
                  number = i;
                } else {
                  itemList[i].paiban = 2;
                }

                itemList[i].name = {
                  'type': 0,
                  name: itemList[i].name
                };
                itemList[i].post = {
                  'type': 0,
                  name: itemList[i].post
                };
                // 是否加急
                if (itemList[i].urgent === 1) {
                  itemList[i].urgentQuick = true;
                } else {
                  itemList[i].urgentQuick = false;
                }
                // 号码列表
                var tels = [];
                if (itemList[i].tel === '' || itemList[i].tel == null || itemList[i].tel === undefined) {} else {
                  tels.push({
                    'telName': 'tel',
                    'tel': itemList[i].tel,
                    type: 0
                  });
                }
                if (itemList[i].tel1 === '' || itemList[i].tel1 == null || itemList[i].tel1 === undefined) {

                } else {
                  tels.push({
                    'telName': 'tel1',
                    'tel': itemList[i].tel1,
                    type: 0
                  });
                }
                if (itemList[i].tel2 === '' || itemList[i].tel2 == null || itemList[i].tel2 === undefined) {

                } else {
                  tels.push({
                    'telName': 'tel2',
                    'tel': itemList[i].tel2,
                    type: 0
                  });
                }
                if (itemList[i].tel3 === '' || itemList[i].tel3 == null || itemList[i].tel3 === undefined) {

                } else {
                  tels.push({
                    'telName': 'tel3',
                    'tel': itemList[i].tel3,
                    type: 0
                  });
                }
                if (itemList[i].tel4 === '' || itemList[i].tel4 == null || itemList[i].tel4 === undefined) {

                } else {
                  tels.push({
                    'telName': 'tel4',
                    'tel': itemList[i].tel4,
                    type: 0
                  });
                }
                if (itemList[i].tel5 === '' || itemList[i].tel5 == null || itemList[i].tel5 === undefined) {

                } else {
                  tels.push({
                    'telName': 'tel5',
                    'tel': itemList[i].tel5,
                    type: 0
                  });
                }
                itemList[i].tels = tels;
                itemList[i].levelList = [{
                  level: 1,
                  label: '暂不感兴趣'
                }, {
                  level: 2,
                  label: '初步感兴趣'
                }, {

                  level: 3,
                  label: '非常感兴趣'
                }, {
                  level: 4,
                  label: '近期可考察'
                }, {
                  level: 5,
                  label: '线上可签单'
                }];
              }
              res.data.data.itemList = itemList;
              if (number !== '') {
                thisValue.paibanrenDetail = res.data.data.itemList[number];
                thisValue.paibanrenDetail.key = number;
                res.data.data.itemList.splice(number, 1);
              }
              // thisValue.dialogFormVisibleReaTel = false;
              thisValue.relationTel.tel = '';
              thisValue.linkmanList = res.data.data.itemList;
            }
          });
      },
      // 追踪列表
      async traceList (customerWorkerId, pageNo, name) {
        let thisValue = this;
        if (name) {
          thisValue.showAll = false;
          thisValue.linkmanTraceList = name;
          thisValue.linkmanTraceId = customerWorkerId;
        } else {
          thisValue.showAll = true;
          thisValue.linkmanTraceList = '';
          thisValue.linkmanTraceId = customerWorkerId;
        }
        await thisValue.$axios.get('/crm/my-customer-worker-trace/customer-worker-trace-list?' + // +'&customerWorkerId='+customerWorkerId+'&sort=createTime&order=asc'
            qs.stringify({
              customerId: this.customerId,
              customerWorkerId: customerWorkerId,
              sort: 'updateTime',
              order: 'asc',
              pn: pageNo,
              ps: 200
            }))
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  thisValue.$router.push({
                    path: '/login'
                  });
                }
              });
            } else if (res.data.code === 0) {
              for (var i in res.data.data.itemList) {
                console.log(thisValue.moment(res.data.data.itemList[i].createTime).format('YYYY-MM-DD HH:mm:ss'))
                res.data.data.itemList[i].createTime = thisValue.moment(res.data.data.itemList[i].createTime).format(
                  'YYYY-MM-DD HH:mm:ss');
              }

              thisValue.traceDetailList = res.data.data.itemList;
              
              var scrollRef = this.$refs.scrollRef;
              // dom节点加载后操作
              this.$nextTick()
                .then(function () {
                  scrollRef.scrollTop = scrollRef.scrollHeight;
                });
            }
          });
      },
      // 查看所有追踪
      lookAllTrack () {
        this.traceList('', 1, '');
      },
      sendYes () {
        if (!this.linkmanTraceId) {
          this.$message({
            type: 'info',
            message: '请点击左边蓝色区域选择追踪目标'
          });
          return;
        }
        this.$axios.post('/crm/my-customer-worker-trace/create-customer-worker-trace?' +
            qs.stringify({
              content: this.linkmanTracecontent,
              customerWorkerId: this.linkmanTraceId
            }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  this.$router.push({
                    path: '/login'
                  });
                }
              });
            } else if (res.data.code === 0) {
              // this.traceDetailList = this.traceDetailList.push({'customerWorkerName':this.linkmanTracecontent,'customerWorkerName':this.linkmanTracecontent,'customerWorkerName':this.linkmanTracecontent});
              this.linkmanTracecontent = '';
              this.traceList(this.linkmanTraceId, 1, this.linkmanTraceList);
            }
          });
      },
      async getPaiBanCustomerWorkerId () {
        let thisValue = this;
        await thisValue.$axios.get('/crm/my-customer/customer?customerId=' + thisValue.customerId)
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  thisValue.$router.push({
                    path: '/login'
                  });
                }
              });
            }
            if (res.data.code === 0) {
              thisValue.hospitalDetail.paiBanCustomerWorkerId = res.data.data.paiBanCustomerWorkerId;
              this.customerList();
              this.traceList('', 1, '');
            }
          });
      },
      // 修改拍板人等信息
      modifyRealtion (customerWorkerId, str, key, names, keys) {
        if (customerWorkerId === '') {
          this.$axios.post('/crm/my-customer-worker/create-customer-worker?' + str + '&' + qs.stringify({
              customerId: this.customerId
            }))
            .then(res => {
              if (res.data.codeMsg) {
                this.$message({
                  type: 'info',
                  message: res.data.codeMsg
                });
              }
              if (res.data.code === 0) {
                // debugger;
                this.$axios.post('/crm/my-customer/update-customer?' + qs.stringify({
                    customerId: this.customerId,
                    paiBanCustomerWorkerId: res.data.data.customerWorkerId
                  }))
                  .then(res => {
                    if (res.data.codeMsg) {
                      this.$message({
                        type: 'info',
                        message: res.data.codeMsg
                      });
                    }
                    if (res.data.code === 0) {
                      // this.customer();
                      // this.customerList();
                      this.getPaiBanCustomerWorkerId()
                    }
                  });
              }
            });
        } else {
          this.$axios.post('/crm/my-customer-worker/update-customer-worker?' + str + '&' + qs.stringify({
              customerWorkerId: customerWorkerId
            }))
            .then(res => {
              if (res.data.codeMsg) {
                this.$message({
                  type: 'info',
                  message: res.data.codeMsg
                });
              }
              if (res.data.code === 0) {
                 this.$message({
                type: 'success',
                message: '修改成功'
              })
                // if (key != 'key') {
                //   if (names == 'name') { this.linkmanList[key].name.type = 0; }
                //   if (names == 'post') { this.linkmanList[key].post.type = 0; }
                //   if (keys != '') { this.linkmanList[key].tels[keys].type = 0; }
                //   if (keys == 0) { this.linkmanList[key].tels[0].type = 0; }
                // }
                // if (key == 'key') {
                //   if (names == 'name') { this.paibanrenDetail.name.type = 0; }
                //   if (names == 'post') { this.paibanrenDetail.post.type = 0; }
                //   if (keys != '') { this.paibanrenDetail.tels[keys].type = 0; }
                //   if (keys == 0) { this.paibanrenDetail.tels[0].type = 0; }
                // }
                this.customerList();
              }
              //
              // this.customerList();
            });
        }
      },
      handleChange (_value) {
        // //console.log(_value)
        let name1 = area.find(n => n.value === _value[0]);
        let name2 = name1.children.find(n => n.value === _value[1]);
        let name3 = name2.children.find(n => n.value === _value[2]);
        this.modifyhospitalDetail.area1Id = name1.value;
        this.modifyhospitalDetail.area2Id = name2.value;
        this.modifyhospitalDetail.area3Id = name3.value;
        this.modifyhospitalDetail.area1Name = name1.label;
        this.modifyhospitalDetail.area2Name = name2.label;
        this.modifyhospitalDetail.area3Name = name3.label;
        this.modifyhospitalDetail.dili = [name1.value, name2.value, name3.value];
        this.modifyhospitalDetail.diliNow = {
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
        debugger
        this.modifyhospitalDetail = JSON.parse(JSON.stringify(this.hospitalDetail));
        console.dir(this.modifyhospitalDetail)
        // this.detail.hospitalName = this.hospitalDetail.name;
        // this.detail.hospitalPhone = this.hospitalDetail.tel;
        // this.detail.dili = this.hospitalDetail.dili;
        // this.detail.diliNow = this.hospitalDetail.diliNow;
        // this.detail.telList = this.hospitalDetail.telList;
        // this.detail.hospitalNatureValue = this.hospitalDetail.hospitalNatureValue;
        // this.detail.hospitalLabel = this.hospitalDetail.hospitalLabel;
      },
      refuse () {
        this.modifyThisTelValue = '';
        this.show = !this.show;
        // this.hospitalName = this.detail.hospitalName;
        // this.hospitalPhone = this.detail.hospitalPhone;
        // this.dili = this.detail.dili;
        // this.diliNow = this.detail.diliNow;
        // this.telList = this.detail.telList;
        // this.hospitalNatureValue = this.detail.hospitalNatureValue;
        // this.hospitalLabel = this.detail.hospitalLabel;
      },
      // 修改保存
      saveIs () {
        // var keshiList=modifyhospitalDetail.telList
        console.log('this.modifyhospitalDetail.tel' + this.modifyhospitalDetail.tel)
        var keshiList = '';
        for (var i in this.modifyhospitalDetail.telList) {
          keshiList = keshiList + '&tel' + (parseInt(i) + 1) + '=' + this.modifyhospitalDetail.telList[i].tel + '&tel' + (
            parseInt(i) + 1) + 'Remark=' + this.modifyhospitalDetail.telList[i].name;
        }
        keshiList = keshiList.slice(1, keshiList.length);
        debugger
        console.log(this.modifyhospitalDetail)
        this.$axios.post('/crm/my-customer/update-customer?' + keshiList + '&' + qs.stringify({
            name: this.modifyhospitalDetail.name,
            tel: this.modifyhospitalDetail.tel,
            nature: this.modifyhospitalDetail.nature,
            area1Id: this.modifyhospitalDetail.area1Id,
            area2Id: this.modifyhospitalDetail.area2Id,
            area3Id: this.modifyhospitalDetail.area3Id,
            area1Name: this.modifyhospitalDetail.area1Name,
            area2Name: this.modifyhospitalDetail.area2Name,
            area3Name: this.modifyhospitalDetail.area3Name,
            toRevisitTime: this.modifyhospitalDetail.toRevisitTime,
            brief: this.modifyhospitalDetail.brief,
            customerId: this.customerId,
            faRen : this.modifyhospitalDetail.faRen,
            zhuCeShiJian : this.modifyhospitalDetail.zhuCeShiJian,
            zhuCeZiJin : this.modifyhospitalDetail.zhuCeZiJin,
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              });
            }
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.hospitalDetail = JSON.parse(JSON.stringify(this.modifyhospitalDetail));
              this.customer();
              this.show = !this.show;
            }
          });
      },
      // 座机拨号
      zuojiTel (name, tel) {
        // this.$message(tel+'正在拨号中!')
        let thisValue = this;
        // thisValue.$common.loginRefresh();
        if(!thisValue.$store.state.loginRefresh){
          console.log(1)
           $.ajax({
        url: '/crm/login-refresh',
        type: 'POST',
        async: true,
        success: function(res) {
          if (res.code == 0) {
            thisValue.$store.state.loginRefresh = res.data
            $('#login .password').val('')
               thisValue.$callService.callFn(tel)
          } else {
            // layer.msg(res.codeMsg)
          }
        }
      })
        }else{
          console.log(2)
             thisValue.$callService.callFn(tel)
        }
        // $('#inp_send').val(tel);
        // $('.phoneNumber').html(name);
        // // console.log($('#inp_send').val())
        // let telNow = ''
        // if($('#inp_send').val().split('-').length>1){
        //   telNow = $('#inp_send').val().split('-')[0]+$('#inp_send').val().split('-')[1]
        // }else{
        //   telNow = $('#inp_send').val()
        // }
        // localStorage.setItem('tel', telNow);
        // $('#btn_conn').click();
        // this.$store.state.telTimeMIntenSeconds = 0;
        // $('.phoneEnd_num').html(this.$store.state.telTimeMIntenSeconds + ' s');

      },
      // shoujiTel (name, tel) {
      //   let telNow = ''
      //   if(tel.split('-').length>1){
      //     telNow = tel.split('-')[0]+tel.split('-')[1]
      //   }else{
      //     telNow = tel
      //   }
      //   this.$axios.post('/push-call', qs.stringify({
      //       tel: telNow,
      //       name: name
      //     }))
      //     .then(res => {
      //       if (res.data.codeMsg) {
      //         this.$message(res.data.codeMsg);
      //       }
      //       if (res.data.code === 0) {
      //         this.$message('已发推送到手机中');
      //       }
      //     });
      // },
      selectChanged (value) {
        for (var i in this.hospitalNature) {
          if (value === this.hospitalNature[i].hospitalNatureValue) {
            this.hospitalDetail.nature = this.hospitalNature[i].hospitalNatureValue;
          }
        }
      },

      makerefuseAdd () {
        // this.dialogFormVisible = tel;
        // this.form.tel = tel;
        // this.form.name = name;
        // this.modifyThisTelValue = telName.slice(3, 4);
        this.form.name = '';
        this.form.tel = '';
        this.telName = this.hospitalDetail.telList.length;
        this.modifyThisTelValue = '';
        this.dialogFormVisible = false;
      },
      // 新增电话
      makesureAdd () {
        console.log(this.form.name+'---'+this.form.tel)
        if (this.form.name === '' || this.form.tel === '') {
          this.$message({
            type: 'info',
            message: '请填写电话号码和备注',
            onClose: function () {
              // this.$router.push({path: '/login'});
            }
          });
        } else {
          if(this.form.state){
            this.modifyhospitalDetail.telList[--this.form.state] = {
              name : this.form.name,
              tel : this.form.tel
            }
            this.dialogFormVisible = false;
            return ''
          }
          this.modifyhospitalDetail.telList.push({
            name : this.form.name,
            tel : this.form.tel
          })
          this.dialogFormVisible = false;
          // var remark = '';
          // var tel = '';
          // if (this.modifyThisTelValue !== '') {
          //   remark = 'tel' + this.modifyThisTelValue + 'Remark';
          //   tel = 'tel' + this.modifyThisTelValue;
          // } else {
          //   this.telName = parseInt(this.telName) + 1;
          //   remark = 'tel' + parseInt(this.telName) + 'Remark';
          //   tel = 'tel' + parseInt(this.telName);
          // }
          // this.$axios.post('/my-customer/update-customer?customerId=' + this.customerId + '&' + remark + '=' +
          //     encodeURIComponent(this.form.name) + '&' + tel + '=' + this.form.tel)
          //   // ('/my-customer/update-customer?' + qs.stringify({
          //   //     remark: this.form.name,
          //   //     tel: this.form.tel,
          //   //     customerId: this.customerId
          //   //   }))
          //   .then(res => {
          //     if (res.data.codeMsg) {
          //       this.$message({
          //         type: 'info',
          //         message: res.data.codeMsg
          //       });
          //     }
          //     if (res.data.code === 0) {
          //       if (this.modifyThisTelValue !== '') {
          //         this.modifyhospitalDetail.telList[this.modifyThisTelValue - 1].name = this.form.name;
          //         this.modifyhospitalDetail.telList[this.modifyThisTelValue - 1].tel = this.form.tel;
          //       } else {
          //         this.modifyhospitalDetail.telList.push({
          //           name: this.form.name,
          //           tel: this.form.tel,
          //           telName: 'tel' + this.telName
          //         });
          //       }
          //       this.form.name = '';
          //       this.form.tel = '';
          //       this.telName = this.modifyhospitalDetail.telList.length;
          //       this.modifyThisTelValue = '';
          //       this.dialogFormVisible = false;
          //     }
          //   });
        }
      },
      // 修改电话
      addThisTel(telName){
        debugger
        if(this.modifyhospitalDetail.telList.length>8){
          this.$message({type: 'info',message: '当前最多添加9个备用电话'})
          return '';
        }
        this.dialogFormVisible = true;
        this.form.tel = '';
        this.form.name = '';
        this.form.state = ''
        // this.modifyThisTelValue = telName.slice(3, 4);
      },
      modifyThisTel(item,ids) { 
        console.log(ids)
        if(++ids){
          this.form.state = ids
        }
        this.dialogFormVisible = true;
        this.form.tel = item.tel;
        this.form.name = item.name;
      },
      // 修改是否加急
      urgentQuick (id, ifBule) {
        if (ifBule === false) {
          this.modifyRealtion(id, 'urgent=0', '', '', '');
        } else {
          this.modifyRealtion(id, 'urgent=1', '', '', '');
        }
      },
      levelList (id, level) {
        this.modifyRealtion(id, 'level=' + (level || ''), '', '', '');
      },
      // 单击修改名字
      dblName (id, name, key) {
        if (key === 'key') {
          this.paibanrenDetail.name.type = 1;
        } else {
          this.linkmanList[key].name.type = 1;
        }
      },
      dblNameEnd (id, name, key) {
        if (key === 'key') {
          this.modifyRealtion(id, 'name=' + (name || ''), key, 'name', '');
          this.paibanrenDetail.name.type = 0;
        } else {
          this.modifyRealtion(id, 'name=' + (name || ''), key, 'name', '');
          this.linkmanList[key].name.type = 0;
        }
      },
      dblPost (id, post, key) {
        if (key === 'key') {
          this.paibanrenDetail.post.type = 1;
        } else {
          this.linkmanList[key].post.type = 1;
        }
      },
      dblPostEnd (id, post, key) {
        if (key === 'key') {
          this.modifyRealtion(id, 'post=' + (post || ''), key, 'post', '');
          this.paibanrenDetail.post.type = 0;
        } else {
          this.modifyRealtion(id, 'post=' + (post || ''), key, 'post', '');
          this.linkmanList[key].post.type = 0;
        }
      },
      dblTel (id, tel, key, keys, keysAll,e) {
        console.log(e.currentTarget)
        console.log(e.target)
        if (key === 'key') {
          this.paibanrenDetail.tels[keys].type = 1;
        } else {
          this.linkmanList[key].tels[keys].type = 1;
        }
        //  this.$nextTick()
        //         .then(function () {
        //           e.target.focus()
        //         });
      },
      dblTelEnd (id, tel, key, keys, keysAll,e) {
        if (keysAll.length === 1 && keys === 0) {
          this.modifyRealtion(id, 'tel=' + (tel || ''), key, 'tel', keys);
        } else {
          let keyStr = '';
          keysAll[keys].tel = tel;
          keysAll[keys].telName = 'tel' + keys;
          keysAll[keys].type = 1;
          console.log(keysAll.length);
          // for (var i in keysAll) {
          //   keyStr = keyStr + '&' + keysAll[i].telName + '=' + keysAll[i].tel;
          // }
          for (var i in keysAll) {
            keyStr = keyStr + '&tel' + i + '=' + keysAll[i].tel;
          }
           if (keysAll.length == 1) {
             keyStr = keyStr + '&tel1=&tel=&tel3=&tel4=&tel5=';
           }
           if (keysAll.length == 2) {
             keyStr = keyStr + '&tel=&tel3=&tel4=&tel5=';
           }
           if (keysAll.length == 3) {
             keyStr = keyStr + '&tel3=&tel4=&tel5=';
           }
           if (keysAll.length == 4) {
             keyStr = keyStr + '&tel4=&tel5=';
           }
           if (keysAll.length == 5) {
             keyStr = keyStr + '&tel5=';
           }
          keyStr = keyStr.slice(1, keyStr.length);
          if (keyStr && keyStr.slice(3, 4) == 0) {
            keyStr = 'tel' + keyStr.split('tel0')[1];
          }
          this.modifyRealtion(id, keyStr, key, 'tel', keys);
        }
      },
      // 相关人新增电话
      addPhoneTel (id, keys, key) {
        if (keys.length === 6) {
          this.$message({
            type: 'info',
            message: '你好,当前最高添加6个号码'
          });
        } else {
          this.dialogFormVisibleReaTel = true;
          this.addNewTelDetail.id = id;
          this.addNewTelDetail.key = key;
          this.addNewTelDetail.keys = keys;
        }
      },
      // 确定新增号码
      addRealtionSureTel () {
        let str = '';
        if (!this.relationTel.tel) {
          this.$message({
            type: 'info',
            message: '请填写号码'
          });
          return;
        }
        if (this.addNewTelDetail.keys.length === 0) {
          str = 'tel=' + (this.relationTel.tel || '');
        } else {
          this.addNewTelDetail.keys.push({
            'tel': (this.relationTel.tel || ''),
            'telName': 'tel' + [this.addNewTelDetail.keys.length],
            'type': 0
          });
          for (var i in this.addNewTelDetail.keys) {
            if (i === 0) {
              str = str + 'tel=' + (this.addNewTelDetail.keys[i].tel || '');
            } else {
              str = str + '&tel' + (i || '') + '=' + (this.addNewTelDetail.keys[i].tel || '');
            }
          }
           if (str.split('tel0')) {
             str = 'tel' + str.split('tel0')[1];
           }
        }
        if (!this.addNewTelDetail.id) {
          this.$message({
            type: 'info',
            message: '请先填写拍板人或相关人姓名'
          });
          return;
        }
         this.$axios.post('/crm/my-customer-worker/update-customer-worker?' + str + '&' + qs.stringify({
            customerWorkerId: this.addNewTelDetail.id
          }))
          .then(res => {
            if (res.data.codeMsg) {
              this.$message({
                type: 'info',
                message: res.data.codeMsg
              });
            }
            if (res.data.code === 0) {
                this.$message({
                type: 'success',
                message: '修改成功'
              })
              // if (names == 'name')
              //   this.linkmanList[key].name.type = 0;
              // if (names == 'post')
              //   this.linkmanList[key].post.type = 0;
              // if (keys != '')
              //   this.linkmanList[key].tels[keys].type = 0;
              // if (keys == 0)
              //   this.linkmanList[key].tels[0].type = 0;
              this.customerList()
              this.dialogFormVisibleReaTel = false
            }
          });
      },
      // 新增相关人
      addNewRelation () {
        this.dialogFormVisibleRea = true;
      },
      addRealtionSure () {
        let thisValue = this;
        if (!thisValue.relation.name) {
          this.$message({
            type: 'info',
            message: '请填写相关人姓名'
          });
          return;
        }
        thisValue.$axios.post('/crm/my-customer-worker/create-customer-worker?name=' + thisValue.relation.name +
            '&customerId=' + this.customerId)
          .then(res => {
            if (res.data.codeMsg) {
              thisValue.$message({
                type: 'info',
                message: res.data.codeMsg,
                onClose: function () {
                  thisValue.$router.push({
                    path: '/login'
                  });
                }
              });
            } else if (res.data.code === 0) {
              thisValue.dialogFormVisibleRea = false;
              thisValue.linkmanList.push({
                name: {
                  name: thisValue.relation.name,
                  type: 0
                },
                post: {
                  name: '',
                  type: 0
                },
                level: ''
                // name: {name: '', type: 0}
                // type: 0
              });
              thisValue.relation.name = '';
              thisValue.customerList();
            }
          });
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
    height: 41px;
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
    width: 100%;
    /* float: left; */
    /* display: inline-block; */
    box-sizing: border-box;
    padding: 0 36px;
  }

  .addContent {
    width: 380px;
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
    margin-right: 100px;
    line-height: 40px;
  }

  .detailLine>div>div>p {
    display: inline-block;
    font-size: 16px;
    margin-right: 20px;
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
    /* float: right; */
    margin-top: 9px;
    margin-left: 3px;
    /* display: none; */
    
  }
    .detailLine>div img:last-child{
      margin-right: 5px;
    }

  .detailLine>div>span:nth-child(2) {
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
    cursor: pointer;
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
    width: 118px;
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
    /* display: none; */
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
    overflow-y: scroll;
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
    word-break: break-all;
    word-wrap: break-word;
  }

  .trackMidEve>p:nth-child(1) span:nth-child(2) {
    color: #666666;
    margin-left: 10px;
    word-break: break-all;
    word-wrap: break-word;
  }

  .trackMidEve>p:nth-child(2) {
    word-break: break-all;
    word-wrap: break-word;
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
    margin-right: 19px !important;
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
   >>>input{
    color: #999999 !important;
  }
  >>>input:focus {
            color: #000000 !important;
   }
  >>>input::-webkit-outer-spin-button,
  >>>input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
   margin: 0;
  }
  >>>input[type="number"]{-moz-appearance:textfield;}
  >>>.inputclass input{
    width: 100px!important;
  }
</style>
