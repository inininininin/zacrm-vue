<template>
  <div id='recore-list'>
    <div id="index">
      <div class="selectOption" style="width: 100%;height: auto;padding: 0px 20px;">
        <span>筛选条件：</span>
        <!-- <select class="nature">
          <option value="" selected>-通话时长-</option>
          <option value="1">0-30s</option>
          <option value="2">31-90s</option>
          <option value="3">90s以上</option>
        </select> -->
        <el-input v-model="input" placeholder="通话时间长From" style="display: inline-block;width: 150px;"></el-input>
        <el-input v-model="input" placeholder="通话时间长to" style="display: inline-block;width: 150px;"></el-input>
        <el-input v-model="input" placeholder="主叫号码" style="display: inline-block;width: 150px;"></el-input>
        <el-input v-model="input" placeholder="被叫号码" style="display: inline-block;width: 150px;"></el-input>
        <el-input v-model="input" placeholder="通话时间From" style="display: inline-block;width: 150px;"></el-input>
        <el-input v-model="input" placeholder="通话时间to" style="display: inline-block;width: 150px;"></el-input>
        <el-date-picker v-model="dataValueStart" type="datetime" placeholder="选择开始时间" align="right" @change="elmentDataStartFn">
        
        </el-date-picker>
        <el-date-picker v-model="dataValueEnd"  default-time="23:59:59" type="datetime" placeholder="选择结束时间" align="right" @change="elmentDataEndFn">
        </el-date-picker>

        <select class="lineEve">
          <option value="" selected>-是否接通-</option>
          <option value="1">接通</option>
          <option value="0">未接通</option>
          <!-- <option value="4">90s以上</option> -->
        </select>
      </div>
      <p class="numberAll"></p>
      <div class="tableBox" style="display: none;padding-bottom: 50px;">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>所属人姓名</th>
              <th>电话号码</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>存取时间</th>
              <th>通话时间</th>
              <th>是否接通</th>
              <th>录音地址</th>
            </tr>
          </thead>
          <tbody class="tbody" style="background: #ffffff;">
          </tbody>
        </table>
        <div class="box rt" id="box"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    name: 'index',
    data() {
      return {
        nature: "",
        dataValueStart: '',
        dataValueEnd: '',
        startTime: '',
        endTime: '',
        lineEve:'',
        // tiaojian:{
        //   second:'',
        //   callTime:'',
          
        // }
      }
    },
    activated() {
       this.nature= "",
       this.dataValueStart= '',
       this.dataValueEnd= '',
       this.startTime= '',
       this.endTime= '',
       this.lineEve='',
       $('#index .nature').val('')
       $('#index .lineEve').val('')
       // $('#index .nature').val('')
       // $('#index .province').val('')
      this.lastPage(1)
      this.lastPageNo(1)
      let thisValue = this
      $('#index .nature').change(function() {
        thisValue.nature = $(this).val()
        thisValue.lastPageNo(thisValue.nature)
        // lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
        $('#index #box').paging({
          initPageNo: 1, // 初始页码
          totalPages: thisValue.totalNum, //总页数
          //                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
          slideSpeed: 600, // 缓动速度。单位毫秒
          jump: true, //是否支持跳转
          callback: function(page) { // 回调函数
            // memberList1(1,page);
            // var nature = $('.nature').val()
            thisValue.pn = page
            thisValue.lastPage(page, thisValue.nature)
          }
        })
      }),
      $('#index .lineEve').change(function() {
        // var nature = $('.nature').val()
      thisValue.lineEve = $(this).val()
      thisValue.lastPageNo(thisValue.nature)
      // lastPage(1,ps,kw,nature,area1Id,area2Id,area3Id)
      $('#index #box').paging({
      	initPageNo: 1, // 初始页码
      	totalPages: thisValue.totalNum, //总页数
      	//                totalCount: '合计' + setTotalCount + '条数据', // 条目总数
      	slideSpeed: 600, // 缓动速度。单位毫秒
      	jump: true, //是否支持跳转
      	callback: function(page) { // 回调函数
      		// memberList1(1,page);

      		thisValue.pn = page
      		thisValue.lastPage(page, thisValue.nature)
      	}
      })
          })
    },

    methods: {
      elmentDataStartFn(_value) {
        console.log(_value,this.endTime, this.moment(_value).valueOf())
        if (!this.endTime||this.moment(_value).valueOf() < this.endTime) {
          if (_value) {
            this.startTime = this.moment(_value).valueOf();
            // this.toRevisitTimeTo = this.toRevisitTimeFrom+(1*24*60*60-1)*1000;
          } else {
            this.startTime = '';
            // this.toRevisitTimeTo = '';
          }
          console.log(2,this.startTime)
          this.lastPageNo(this.nature)
        } else {
          this.$message({
            type: 'info',
            message: '开始时间需小于结束时间!'
          });
        }
      },
      elmentDataEndFn(_value) {
        console.log(_value,this.startTime, this.moment(_value).valueOf())
        if (!this.startTime || this.moment(_value).valueOf() > this.startTime) {
          console.log(this.moment(this.moment(_value).valueOf()).format('YYYY-MM-DD HH-mm-ss'))
          if (_value) {
            this.endTime = this.moment(_value).valueOf();
            // this.toRevisitTimeTo = this.toRevisitTimeFrom+(1*24*60*60-1)*1000;
          } else {
            this.endTime = '';
            // this.toRevisitTimeTo = '';
          }
          this.lastPageNo(this.nature)
        } else {
          this.$message({
            type: 'info',
            message: '结束时间需大于开始时间!'
          });
        }



      },

      lastPage(pn, nature) {
        if (nature == 1) {
          var durationFrom = 0
          var durationTo = 30
        } else if (nature == 2) {
          var durationFrom = 31
          var durationTo = 90
        } else if (nature == 3) {
          var durationFrom = 90
          var durationTo = ''
        }  else {
          var durationFrom = ''
          var durationTo = ''
        }
        var param = '&' + qs.stringify({
           recStatus:this.lineEve,
          startTime:this.startTime,
          endTime:this.endTime,
          durationFrom: durationFrom,
          durationTo: durationTo,
          userId: localStorage.getItem('id') || '',
        })
        let thisValue = this
        $.ajax({
          url: '/ling-dao/call-record-list',
          type: 'GET',
          data: 'ps=15&pn=' + pn + param,
          async: true,
          success: function(res) {
            console.dir(res)
            if (res.code == 0) {
              $('#index .tbody').html('')
              $('.tableBox').css('display', 'block')
              if (res.data.itemList && res.data.itemList.length > 0) {
                console.log(12321312)
                for (var i in res.data.itemList) {
                  var tel = ''
                  if (res.data.itemList[i].startTime) {
                    var startTime = thisValue.moment(res.data.itemList[i].startTime).format(
                      'YYYY-MM-DD HH:mm:ss');
                  } else {
                    var startTime = ''
                  }
                  if (res.data.itemList[i].endTime) {
                    var endTime = thisValue.moment(res.data.itemList[i].endTime).format(
                      'YYYY-MM-DD HH:mm:ss');
                  } else {
                    var endTime = ''
                  }
                  if (res.data.itemList[i].accessTime) {
                    var accessTime = thisValue.moment(res.data.itemList[i].accessTime).format(
                      'YYYY-MM-DD HH:mm:ss');
                  } else {
                    var accessTime = ''
                  }
                  if (res.data.itemList[i].recStatus == 1) {
                    var recStatus = '接通';
                  } else {
                    var recStatus = '未接通'
                  }
                  $('#index .tbody').append('<tr id=' + res.data.itemList[i].customerId + '><td>' + (
                      parseInt(i) +
                      1 + ((pn - 1) * 15)) +
                    '</td><td class="xiugaiTimeFn">' + res.data.itemList[i].userNickname +
                    '</td><td>' + (res.data.itemList[i].calledid ||
                      "") + '</td><td  linkName="' + (res.data.itemList[i].name || "") + '" tel="' + (res
                      .data.itemList[
                        i].tel || "") + '">' + startTime + '</td><td>' + endTime + '</td><td>' +
                    accessTime +
                    '</td><td>' + (res.data.itemList[i].duration || "0") +
                    's</td><td>' + recStatus +
                    '</td><td class="enterHos"><a href="' + res.data.itemList[i].recordUrl +
                    '"  target=＂_blank＂>录音地址</a></td></tr>')

                }
              }
            }
          }
        })
      },
      lastPageNo(nature) {
        if (nature == 1) {
          var durationFrom = 0
          var durationTo = 30
        } else if (nature == 2) {
          var durationFrom = 31
          var durationTo = 90
        } else if (nature == 3) {
          var durationFrom = 90
          var durationTo = ''
        }  else {
          var durationFrom = ''
          var durationTo = ''
        }
        var param = qs.stringify({
          recStatus:this.lineEve,
          startTime:this.startTime,
          endTime:this.endTime,
          durationFrom: durationFrom,
          durationTo: durationTo,
          userId: localStorage.getItem('id') || '',
        })
        let thisValue = this
        $.ajax({
          url: '/ling-dao/call-record-list-sum',
          type: 'GET',
          data: param,
          async: true,
          success: function(res) {
            if (res.code == 0) {
              thisValue.totalNum = Math.ceil(res.data.itemCount / 15)
              console.log(thisValue.totalNum)
              $('#index .numberAll').html('( 共' + res.data.itemCount + '条数据 )')
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
                  thisValue.lastPage(page, nature)
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
      },
    },
  }
</script>

<style scoped>
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
</style>
