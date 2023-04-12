<template>
  <div id="recore-list">
    <div style="padding: 0px 20px;height: auto;">
      <h2
        style="display: inline-block;margin: 0;line-height: 70px;font-size: 30px;"
      >
        {{ $store.state.loginRefresh.nickname }}
      </h2>
      <a
        @click="exitFn"
        class="loginout"
        style="float: right;line-height: 70px;margin-left: 20px;cursor: pointer;"
        >退出登录</a
      >
    </div>
    <div id="index">
      <div
        style="width: 100%;height: auto;padding: 0px 20px;"
        v-if="$route.query.nickname"
      >
        <h1
          style="font-size: 24px;font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400; color: rgba(0, 0, 0, 0.85); line-height: 60px;"
        >
          昵称：{{ $route.query.nickname }}
        </h1>
      </div>
      <div
        class="selectOption"
        style="width: 100%;height: auto;padding: 0px 20px;"
      >
        <span>筛选条件：</span>
        <el-input
          v-model="tiaojian.kw"
          placeholder="关键字"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <el-input
          v-model="tiaojian.secondFrom"
          placeholder="通话时长From"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <el-input
          v-model="tiaojian.secondTo"
          placeholder="通话时长To"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <el-input
          v-model="tiaojian.telephoneFrom"
          placeholder="主叫号码"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <el-input
          v-model="tiaojian.telephoneTo"
          placeholder="被叫号码"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <el-date-picker
          v-model="tiaojian.callTimeFrom"
          default-time="00:00:00"
          type="datetime"
          placeholder="请选择通话时间from"
          align="right"
          @change="elmentDataStartFn"
        >
        </el-date-picker>
        <el-date-picker
          v-model="tiaojian.callTimeTo"
          default-time="23:59:59"
          type="datetime"
          placeholder="选择结束通话时间To"
          align="right"
          @change="elmentDataEndFn"
        >
        </el-date-picker>
        <el-select v-model="tiaojian.deleted" placeholder="请选择">
          <el-option
            v-for="item in optionsDeleted"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="tiaojian.invalidTelephone" placeholder="请选择">
          <el-option
            v-for="item in optionsInvalidTelephone"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click="handleQuery()" type="primary">查询</el-button>
        <el-button @click="handleReset()">重置</el-button>
      </div>

      <p class="numberAll">{{ `( 共   ${totalNum || 0}  条数据 )` }}</p>
      <el-table :data="tableData" stripe style="width: 98%;margin: 0 auto;">
        <el-table-column
          type="index"
          :index="tableIndex"
          label="序号"
          width="50"
        />
        <el-table-column
          prop="userNickname"
          align="center"
          label="所属人姓名"
          width="180"
        />
        <el-table-column
          prop="telephoneFrom"
          label="主叫号码"
          width="180"
          align="center"
        />
        <el-table-column prop="telephoneTo" label="被叫号码" align="center" />

        <el-table-column prop="callTime" label="通话时间" align="center">
          <template #default="scope">
            <span>{{
              moment(scope.row.callTime).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="second"
          :formatter="res => res.second + 's'"
          label="通话时长"
          align="center"
        />
        <el-table-column prop="url" label="录音地址" align="center">
          <template #default="scope">
            <a v-if="scope.row.url" :href="scope.row.url" target="＂_blank＂"
              >录音地址</a
            >
          </template>
        </el-table-column>
        <!-- deleted -->
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.deleted == 0"
              type="danger"
              size="small"
              @click="handleDel(scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.deleted == 1"
              type="primary"
              size="small"
              @click="handlerRestore(scope.row)"
              >恢复</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="page-style"
        background
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { Message } from "element-ui";
export default {
  name: "index",
  data() {
    return {
      tiaojian: {
        secondFrom: "",
        secondTo: "",
        telephoneFrom: "",
        telephoneTo: "",
        callTimeFrom: "",
        callTimeTo: "",
        kw: "",
        deleted: 0,
        invalidTelephone: 0
      },
      optionsDeleted: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "未删除"
        },
        {
          value: 1,
          label: "已删除"
        }
      ],
      optionsInvalidTelephone: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "有效"
        },
        {
          value: 1,
          label: "无效"
        }
      ],
      tableData: [], // 总数据
      totalNum: 0, // 总条数
      tableIndexNum: 1, // 下标
      // 临时数据
      templateDataList: [],
      tempTableIndexNum: 1,
      tempTableIndexNumArr: [1]
    };
  },
  activated() {
    let that = this;
    $.ajax({
      url: "/crm/login-refresh",
      type: "POST",
      async: true,
      success: function(res) {
        if (res.code == 0) {
          localStorage.setItem("nickname", res.data.nickname);
          $("#index .peoname").html(res.data.nickname);
          $("#index #userName").val(res.data.nickname);
          // debugger;
          that.$store.state.loginRefresh = res.data;
          //         window.location.href='index.html'
        } else {
          setTimeout(function() {
            that.$router.push({ path: "/login" });
          }, 1000);
        }
      }
    });
  },
  created() {
    this.initDataList(1);
    this.initDataListToTal();
  },

  methods: {
    // 退出
    exitFn() {
      $.ajax({
        type: "post",
        url: "/crm/logout",
        data: "",
        success: function(data) {
          location.href = location.pathname;
        }
      });
    },
    // 重置
    handleReset() {
      this.tiaojian.secondFrom = "";
      this.tiaojian.secondTo = "";
      this.tiaojian.telephoneFrom = "";
      this.tiaojian.telephoneTo = "";
      this.tiaojian.callTimeFrom = "";
      this.tiaojian.callTimeTo = "";
      this.tiaojian.kw = "";
      this.tiaojian.deleted = 0;
      this.tiaojian.invalidTelephone = 0;
      this.handleQuery();
    },
    // 查询
    handleQuery() {
      this.initDataList(1);
      this.initDataListToTal();
    },
    elmentDataStartFn(_value) {
      // console.log(_value,this.tiaojian.callTimeTo, this.moment(_value).valueOf())
      if (
        !this.tiaojian.callTimeTo ||
        this.moment(_value).valueOf() < this.tiaojian.callTimeTo
      ) {
        if (_value) {
          this.tiaojian.callTimeFrom = this.moment(_value).valueOf();
          // this.toRevisitTimeTo = this.toRevisitTimeFrom+(1*24*60*60-1)*1000;
        } else {
          this.tiaojian.callTimeFrom = "";
          // this.toRevisitTimeTo = '';
        }
        // console.log(2,this.tiaojian.callTimeFrom)
        this.initDataListToTal();
      } else {
        this.$message({
          type: "info",
          message: "开始时间需小于结束时间!"
        });
      }
    },
    elmentDataEndFn(_value) {
      // // console.log(_value,this.tiaojian.callTimeFrom, this.moment(_value).valueOf())
      if (
        !this.tiaojian.callTimeFrom ||
        this.moment(_value).valueOf() > this.tiaojian.callTimeFrom
      ) {
        // console.log(
        //   this.moment(this.moment(_value).valueOf()).format(
        //     "YYYY-MM-DD HH-mm-ss"
        //   )
        // );
        if (_value) {
          this.tiaojian.callTimeTo = this.moment(_value).valueOf();
          // this.toRevisitTimeTo = this.toRevisitTimeFrom+(1*24*60*60-1)*1000;
        } else {
          this.tiaojian.callTimeTo = "";
          // this.toRevisitTimeTo = '';
        }
        this.initDataListToTal();
      } else {
        this.$message({
          type: "info",
          message: "结束时间需大于开始时间!"
        });
      }
    },

    // 初始化数据
    initDataList(pn) {
      let that = this;
      var param =
        "&" +
        qs.stringify({
          userId: localStorage.getItem("id") || "",
          secondFrom: this.tiaojian.secondFrom,
          secondTo: this.tiaojian.secondTo,
          telephoneFrom: this.tiaojian.telephoneFrom,
          telephoneTo: this.tiaojian.telephoneTo,
          callTimeFrom: this.tiaojian.callTimeFrom,
          callTimeTo: this.tiaojian.callTimeTo,
          kw: this.tiaojian.kw,
          deleted: this.tiaojian.deleted,
          invalidTelephone: this.tiaojian.invalidTelephone
        });

      $.ajax({
        url: "/crm/statistician/phone-record/records",
        type: "GET",
        data: "ps=20&pn=" + pn + param,
        async: true,
        success: function(res) {
          if (res.code == 0) that.tableData = res.data.records;
          that.templateDataList.push({
            id: that.tableIndexNum,
            data: res.data.records
          })
        }
      });
    },
    // 初始化总条数
    initDataListToTal() {
      let that = this;
      var param = qs.stringify({
        userId: localStorage.getItem("id") || "",
        secondFrom: this.tiaojian.secondFrom,
        secondTo: this.tiaojian.secondTo,
        telephoneFrom: this.tiaojian.telephoneFrom,
        telephoneTo: this.tiaojian.telephoneTo,
        callTimeFrom: this.tiaojian.callTimeFrom,
        callTimeTo: this.tiaojian.callTimeTo,
        kw: this.tiaojian.kw,
        deleted: this.tiaojian.deleted,
        invalidTelephone: this.tiaojian.invalidTelephone
      });

      $.ajax({
        url: "/crm/statistician/phone-record/records-sum",
        type: "GET",
        data: param,
        async: true,
        success: function(res) {
          if (res.code == 0) that.totalNum = res.data.count;
        }
      });
    },
    // 时间转换
    getDateDiff(dateTimeStamp) {
      if (!dateTimeStamp) return "";
      let thisValue = this;
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
        if (monthC <= 12) result = "" + parseInt(monthC) + "月前";
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
    // --------------------------------------
    // 删除
    handleDel(item) {
      let that = this;
      $.ajax({
        type: "post",
        url:
          "/crm/statistician/phone-record/delete-record?id=" +
          item.phoneRecordId,
        data: "",
        success: function(res) {
          // 恢复恢复按钮
          // 添加背景颜色
          if (res.code == 0) {
            that.tableData.map(listItem => {
              if (listItem.phoneRecordId == item.phoneRecordId) {
                that.$set(listItem, "deleted", 1);
              }
            });
            Message.success("操作成功");
          }
        }
      });
    },
    // 恢复
    handlerRestore(item) {
      let that = this;
      $.ajax({
        type: "post",
        url:
          "/crm/statistician/phone-record/undo-delete-record?id=" +
          item.phoneRecordId,
        data: "",
        success: function(res) {
          if (res.code == 0) {
            that.tableData.map(listItem => {
              if (listItem.phoneRecordId == item.phoneRecordId) {
                that.$set(listItem, "deleted", 0);
              }
            });
            Message.success("操作成功");
          }
        }
      });
    },
    // ------------------------------------
    // 当前页
    handleCurrentChange(num) {
      this.tableIndexNum = num;
      this.flag = false;
      this.data = [];
      this.templateDataList.some(item => {
        if (item.id == num) {
          this.data = item.data;
          return (this.flag = true);
        } else {
          this.flag = false;
        }
      });
      if (!this.flag) return this.initDataList(num);
      this.tableData = this.data;
    },
    // 上一页
    handlePrevClick(num) {
      this.tableIndexNum = num;
      this.initDataList(num);
    },
    // 下一页
    handleNextClick(num) {
      this.tableIndexNum = num;
      this.initDataList(num);
    },
    tableIndex(index) {
      if (this.tableIndexNum == 1) return index + 1;
      this.tempTableIndexNum = index + (this.tableIndexNum - 1) * 20;
      return index + 1 + (this.tableIndexNum - 1) * 20;
    }
  },

  watch: {}
};
</script>

<style scoped>
/* 分页样式 */
.page-style {
  text-align: right;
  margin: 10px 0 50px;
}

#recore-list {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
#index {
  min-width: 1200px;
}

.numberAll {
  font-size: 16px;
  line-height: 35px;
  box-sizing: border-box;
  padding-left: 20px;
  margin: 0;
  height: 35px;
  width: 100%;
}
>>> #index .selectOption > button {
  line-height: 0 !important;
}
</style>
