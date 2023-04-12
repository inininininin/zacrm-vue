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
        <!-- <select class="nature">
          <option value="" selected>-通话时长-</option>
          <option value="1">0-30s</option>
          <option value="2">31-90s</option>
          <option value="3">90s以上</option>
        </select> -->
        <el-input
          v-model="tiaojian.kw"
          placeholder="关键字"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <!-- @click="screeningFn()" -->
        <el-input
          v-model="tiaojian.secondFrom"
          placeholder="通话时长From"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <!-- @click="screeningFn()" -->
        <el-input
          v-model="tiaojian.secondTo"
          placeholder="通话时长To"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <!-- @click="screeningFn()" -->
        <el-input
          v-model="tiaojian.telephoneFrom"
          placeholder="主叫号码"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <!-- @click="screeningFn()" -->
        <el-input
          v-model="tiaojian.telephoneTo"
          placeholder="被叫号码"
          style="display: inline-block;width: 150px;"
        ></el-input>
        <!-- @change="elmentDataStartFn" -->
        <el-date-picker
          v-model="tiaojian.callTimeFrom"
          default-time="00:00:00"
          type="datetime"
          placeholder="请选择通话时间from"
          align="right"
        >
        </el-date-picker>
        <!--  @change="elmentDataEndFn" -->
        <el-date-picker
          v-model="tiaojian.callTimeTo"
          default-time="23:59:59"
          type="datetime"
          placeholder="选择结束通话时间To"
          align="right"
        >
        </el-date-picker>
        <el-select v-model="tiaojian.deleted" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click="screeningFn()" type="primary">查询</el-button>
        <el-button @click="restart()">重置</el-button>
        <!-- <select class="lineEve">
          <option value="" selected>-是否接通-</option>
          <option value="1">接通</option>
          <option value="0">未接通</option>
        </select> -->
      </div>
      <p class="numberAll"></p>
      <div class="tableBox" style="display: none;padding-bottom: 50px;">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>所属人姓名</th>
              <th>主叫号码</th>
              <th>被叫号码</th>
              <th>通话时间</th>
              <th>通话时长</th>
              <th>录音地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody class="tbody" style="background: #ffffff;"></tbody>
        </table>
        <div class="box rt" id="box"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "index",
  data() {
    return {
      nature: "",
      dataValueStart: "",
      dataValueEnd: "",
      startTime: "",
      endTime: "",
      lineEve: "",
      tiaojian: {
        secondFrom: "",
        secondTo: "",
        telephoneFrom: "",
        telephoneTo: "",
        callTimeFrom: "",
        callTimeTo: "",
        kw: "",
        deleted: ""
      },
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
        }
      ],
      dataList: []
    };
  },
  activated() {
    Object.assign(this.$data, this.$options.data());
    $("#index .nature").val("");
    $("#index .lineEve").val("");
    // $('#index .nature').val('')
    // $('#index .province').val('')
    this.lastPage(1);
    this.lastPageNo(1);
    let thisValue = this;
    $("#index .nature").change(function() {
      thisValue.nature = $(this).val();
      thisValue.lastPageNo();
      $("#index #box").paging({
        initPageNo: 1, // 初始页码
        totalPages: thisValue.totalNum, //总页数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function(page) {
          // 回调函数
          // memberList1(1,page);
          // var nature = $('.nature').val()
          thisValue.pn = page;
          thisValue.lastPage(page);
        }
      });
    }),
      $("#index .lineEve").change(function() {
        thisValue.lineEve = $(this).val();
        thisValue.lastPageNo(thisValue.nature);
        $("#index #box").paging({
          initPageNo: 1, // 初始页码
          totalPages: thisValue.totalNum, //总页数
          //                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
          slideSpeed: 600, // 缓动速度。单位毫秒
          jump: true, //是否支持跳转
          callback: function(page) {
            // 回调函数
            // memberList1(1,page);

            thisValue.pn = page;
            thisValue.lastPage(page);
          }
        });
      });
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
          thisValue.$store.state.loginRefresh = res.data;
          //         window.location.href='index.html'
        } else {
          setTimeout(function() {
            thisValue.$router.push({ path: "/login" });
          }, 1000);
        }
      }
    });
  },


  methods: {
    exitFn() {
      $.ajax({
        type: "post",
        url: "/crm/logout",

        data: "",
        success: function(data) {
          // location.href='/#/login'
          location.href = location.pathname;
          // location.href='login.html'
        }
      });
    },
    restart() {
      this.tiaojian.secondFrom = "";
      this.tiaojian.secondTo = "";
      this.tiaojian.telephoneFrom = "";
      this.tiaojian.telephoneTo = "";
      this.tiaojian.callTimeFrom = "";
      this.tiaojian.callTimeTo = "";
      this.tiaojian.kw = "";
      this.tiaojian.deleted = "";
      this.screeningFn();
    },
    screeningFn() {
      // console.log("s");
      this.lastPageNo();
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
        this.lastPageNo();
      } else {
        this.$message({
          type: "info",
          message: "开始时间需小于结束时间!"
        });
      }
    },
    elmentDataEndFn(_value) {
      // console.log(_value,this.tiaojian.callTimeFrom, this.moment(_value).valueOf())
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
        this.lastPageNo();
      } else {
        this.$message({
          type: "info",
          message: "结束时间需大于开始时间!"
        });
      }
    },

    lastPage(pn) {
      // if (nature == 1) {
      //   var durationFrom = 0
      //   var durationTo = 30
      // } else if (nature == 2) {
      //   var durationFrom = 31
      //   var durationTo = 90
      // } else if (nature == 3) {
      //   var durationFrom = 90
      //   var durationTo = ''
      // }  else {
      //   var durationFrom = ''
      //   var durationTo = ''
      // }
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
          deleted: this.tiaojian.deleted
        });
      let thisValue = this;
      $.ajax({
        url: "/crm/statistician/phone-record/records",
        type: "GET",
        data: "ps=15&pn=" + pn + param,
        async: true,
        success: function(res) {
          thisValue.dataList = res.data.records;
          if (res.code == 0) {
            $("#index .tbody").html("");
            $(".tableBox").css("display", "block");
            if (res.data.records && res.data.records.length > 0) {
              // console.log(12321312);
              for (var i in res.data.records) {
                var tel = "";
                let _callTime = "";
                if (res.data.records[i].callTime) {
                  _callTime = thisValue
                    .moment(res.data.records[i].callTime)
                    .format("YYYY-MM-DD HH:mm:ss");
                } else {
                  _callTime = "";
                }
                $("#index .tbody").append(
                  "<tr id=" +
                    res.data.records[i].userId +
                    ">" +
                    "<td>" +
                    (parseInt(i) + 1 + (pn - 1) * 15) +
                    "</td>" +
                    '<td class="xiugaiTimeFn">' +
                    res.data.records[i].userNickname +
                    "</td>" +
                    // '<td>' + (res.data.records[i].calledid || "") + '</td>'+
                    // '<td  linkName="' + (res.data.records[i].name || "") + '" tel="' + (res .data.records[
                    // i].tel || "") + '">' + startTime + '</td><td>' + endTime + '</td>'+
                    // '<td>' + accessTime + '</td>'+
                    "<td>" +
                    res.data.records[i].telephoneFrom +
                    "</td>" +
                    "<td>" +
                    res.data.records[i].telephoneTo +
                    "</td>" +
                    "<td>" +
                    _callTime +
                    "</td>" +
                    "<td>" +
                    (res.data.records[i].second || "0") +
                    "s</td>" +
                    // '<td>' + recStatus + '</td>'+
                    '<td class="enterHos">' +
                    '<a href="' +
                    res.data.records[i].url +
                    '"  target=＂_blank＂>录音地址</a>' +
                    "</td>" +
                    "<td>" +
                    (res.data.records[i].deleted == 0
                      ? `<span data-id="${res.data.records[i].phoneRecordId}" style='background: red;padding: 3px 5px;border-radius: 5px;color: #fff;font-size: 14px;user-select: none;'>删除</span>`
                      : `<span data-id="${res.data.records[i].phoneRecordId}" style='background: #409EFF;padding: 3px 5px;border-radius: 5px;color: #fff;font-size: 14px;user-select: none;'>恢复</span>`) +
                    "</td>" +
                    "</tr>"
                );
              }
            }
          }
        }
      });
    },
    lastPageNo() {
      // if (nature == 1) {
      //   var durationFrom = 0
      //   var durationTo = 30
      // } else if (nature == 2) {
      //   var durationFrom = 31
      //   var durationTo = 90
      // } else if (nature == 3) {
      //   var durationFrom = 90
      //   var durationTo = ''
      // }  else {
      //   var durationFrom = ''
      //   var durationTo = ''
      // }+

      var param = qs.stringify({
        userId: localStorage.getItem("id") || "",
        secondFrom: this.tiaojian.secondFrom,
        secondTo: this.tiaojian.secondTo,
        telephoneFrom: this.tiaojian.telephoneFrom,
        telephoneTo: this.tiaojian.telephoneTo,
        callTimeFrom: this.tiaojian.callTimeFrom,
        callTimeTo: this.tiaojian.callTimeTo,
        kw: this.tiaojian.kw
      });
      let thisValue = this;
      $.ajax({
        url: "/crm/statistician/phone-record/records-sum",
        type: "GET",
        data: param,
        async: true,
        success: function(res) {
          if (res.code == 0) {
            thisValue.totalNum = Math.ceil(res.data.count / 15);
            // console.log(thisValue.totalNum);
            $("#index .numberAll").html(
              "( 共" + (res.data.count || "0") + "条数据 )"
            );
            $("#index #box").paging({
              initPageNo: 1, // 初始页码
              totalPages: thisValue.totalNum, //总页数
              //                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
              slideSpeed: 600, // 缓动速度。单位毫秒
              jump: true, //是否支持跳转
              callback: function(page) {
                // 回调函数
                // memberList1(1,page);
                // var nature = $('#index .nature').val()
                thisValue.pn = page;
                thisValue.lastPage(page);
              }
            });
          }
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
    }
  }
};
</script>

<style scoped>
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
