<template>
  <div id='lead_index'>
    <el-row class="tac" style="min-width: 1200px;">
      <el-col :span="3" style="height: 100vh;">
        <h3>{{$titleName}}</h3>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>软件部</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="1-1">任新伟</el-menu-item>
              <el-menu-item index="1-2">xuxk</el-menu-item>
              <el-menu-item index="1-3">查凌峰</el-menu-item>
              <el-menu-item index="1-4">高爱娟</el-menu-item>
              <el-menu-item index="1-5">贾丹</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span='21'>
        <div class="index_title">
          <h2>nickname</h2>
          <span>（共45条数据）</span>

          <span class="rt">查看工作日记</span>
          <span class="rt">上次浏览记录</span>
          <!-- <el-button>新增客户</el-button> -->
        </div>
        <div class="index_searchBox">
          <el-button class="index_search" type="primary" icon="el-icon-search">搜索</el-button>
          <el-input class="index_kw" v-model="input" placeholder="请输入内容"></el-input>
          <el-select class="index_urgent" v-model="value" placeholder="请选择">
            <el-option v-for="item in urgentLevel" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <!-- 省市区 -->
          <el-select class="index_location index_province" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value2">
            </el-option>
          </el-select>
          <el-select class="index_location index_city" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value3">
            </el-option>
          </el-select>
          <el-select class="index_location index_town" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value4">
            </el-option>
          </el-select>
          <!-- 性质 -->
          <el-select class="index_nature" v-model="value1" placeholder="请选择">
            <el-option v-for="item in nature" :key="item.value1" :label="item.label" :value="item.value1">
            </el-option>
          </el-select>
          <el-button class="index_refresh" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>

        <template>
          <el-table id='index_table' :data="tableData" border style="width: 100%">
            <el-table-column type="index" :index="indexMethod" prop="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="hosname" label="客户名称" width="180">
            </el-table-column>
            <el-table-column prop="paibanren" label="拍板人">
            </el-table-column>
            <el-table-column prop="tel" label="固定电话">
            </el-table-column>
            <el-table-column prop="paibanrenYz" label="拍板人验证">
            </el-table-column>
            <el-table-column prop="updateTime" label="近期跟踪时间">
            </el-table-column>
          </el-table>
        </template>

      </el-col>
    </el-row>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        urgentLevel: [{
          value: '0',
          label: '加急客户'
        }, {
          value: '1',
          label: '暂不感兴趣'
        }, {
          value: '2',
          label: '初步感兴趣'
        }, {
          value: '3',
          label: '非常感兴趣'
        }, {
          value: '4',
          label: '近期可考察'
        }, {
          value: '5',
          label: '线上可签单'
        }],
        nature: [{
          value1: '',
          label: '-性质-'
        }, {
          value1: '1',
          label: '民营医院'
        }, {
          value1: '2',
          label: '公立医院'
        }, {
          value1: '3',
          label: '月子会所'
        }],
        tableData: [{
          hosname:'某某客户',
          paibanren:'xuxk',
          updateTime: '2016-05-02',
          tel:'025-84545254',
          paibanrenYz: '王小虎',
          // address: '上海市普陀区金沙江路 1518 弄'
        }, {
         hosname:'某某客户',
         paibanren:'xuxk',
         updateTime: '2016-05-02',
         tel:'025-84545254',
         paibanrenYz: '王小虎',
        }, {
         hosname:'某某客户',
         paibanren:'xuxk',
         updateTime: '2016-05-02',
         tel:'025-84545254',
         paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }, {
        hosname:'某某客户',
        paibanren:'xuxk',
        updateTime: '2016-05-02',
        tel:'025-84545254',
        paibanrenYz: '王小虎',
        }],
        value: '',
        value1: '',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      indexMethod(index) {
        return index + 1;
      }
    }
  }
</script>

<style scoped>
#lead_index{
  width: 100%;
	height: 100%;
  overflow: scroll;
}
  #lead_index h3 {
    line-height: 60px;
    font-size: 14px;
    text-align: center;
  }

  .index_title {
    width: 100%;
    line-height: 80px;
    font-size: 16px;
  }

  .index_title h2 {
    display: inline-block;
    margin-left: 20px;
    margin-right: 15px;
    font-size: 30px;
  }

  .index_title span {
    display: inline-block;
    margin-right: 20px;
  }

  .index_title span:last-child {
    color: #337ab7;
  }

  .index_title .rt {
    float: right;
  }

  .index_search {
    margin-left: 15px;
  }

  .index_searchBox el-input,
  .index_searchBox el-select {
    display: inline-block;
    margin-left: 10px;
  }

  .index_kw,
  .index_location,
  .index_nature,
  .index_urgent {
    width: 130px;
  }

  #index_table {
    margin-top: 20px;
    /* margin-left: 5px; */
  }
</style>
