<template>
  <div id="login" class="login">
    <div class="logo smargin">
      <img src="../assets/img/logo.png" alt="" />
      <h2>忠安客户漏斗管理系统</h2>
    </div>


    <div class="number phone">
      <input class="name" type="text" @keyup.enter="submitFn" />
      <div>
        <img src="../assets/img/zhanghu.png" alt="" />
        <span>用户名</span>
      </div>
    </div>
    <div class="number pwd" style="margin-top: 24px">
      <input class="password" autocomplete="off" @keyup.enter="submitFn" type="text" onfocus="this.type='password'" />
      <div>
        <img src="../assets/img/mima.png" alt="" />
        <span>密码</span>
      </div>
    </div>
    <div class="zdlogin">
      <!-- <div class="lf"><input class="lf" type="checkbox" name="vehicle" value="Car" checked="checked" /><span class="lf">自动登录</span></div> -->
      <div class="rt forgetpwd" @click="forgetpwdFn">修改密码</div>
    </div>
    <div class="loginbtn">
      <button @click="submitFn">登录</button>
    </div>

    <!-- <div id='dlgAdd' style="display: none;">
            <div>
                <div class="number phone" style="margin-top: 50px;">
                    <input class="names" type="text"/>
                    <div>
                        <img src="image/zhanghu.png" alt=""/>
                        <span>手机号</span>
                    </div>
                </div>
                <div class="number oldpwd" style="margin-top: 24px">
                    <input class="passwords" type="password"/>
                    <div>
                        <img src="image/mima.png" alt=""/>
                        <span>旧密码</span>
                    </div>
                </div>
                <div class="number newpwd" style="margin-top: 24px">
                    <input class="passwords" type="password"/>
                    <div>
                        <img src="image/mima.png" alt=""/>
                        <span>新密码</span>
                    </div>
                </div>
                <div class="pwdbtn" style="margin-top: 50px;">
                    <button onclick="changepwd()">登录</button>
                </div>
            </div>
        </div> -->

    <div class="zdlogin">
      <!--<div class="registernow rt">注册账户</div>-->
    </div>

    <div id="updatePwdPad" style="display:none;">
      <!-- <div> -->
      <div class="number phone" style="margin-top: 50px;">
        <input class="names" type="text" />
        <div>
          <img src="image/zhanghu.png" alt="" />
          <span>用户名</span>
        </div>
      </div>
      <div class="number oldpwd" style="margin-top: 24px">
        <input class="passwords" autocomplete="off" type="password" />
        <div><img src="../assets/img/mima.png" alt="" /> <span>旧密码</span></div>
      </div>
      <div class="number newpwd" style="margin-top: 24px"><input autocomplete="off" class="passwords1" type="password" />
        <div><img src="image/mima.png" alt="" /><span>新密码</span></div>
      </div>
      <div class="pwdbtn" style="margin-top: 50px;"><button @click="changepwd()">确认</button></div>

      <!-- </div> -->
    </div>
    <el-dialog title="端口选择" :visible.sync="dialogTableVisible" width='500px' top="20%">
      <div style="height: 50px;box-sizing: border-box;width: 100%;">
          <router-link :to="{path:'/index',query:'time: new Date().getTime()'}" replace>
        <div class="typeDialogClass" @click="dialogTableVisible= false"> 
            用户端
        </div>
          </router-link>
          <router-link :to="{path:'/leader-index',query:'time: new Date().getTime()'}" replace>
        <div class="typeDialogClass" @click="dialogTableVisible= false">
            管理端
          </div>
        </router-link>
      </div>
    </el-dialog>
    <div class="seccion">ver : {{$version}}  ser : {{$store.state.serVersion}}</div>
  </div>
</template>
<script>
  // import layui from '../assets/layui/layui.js'
  export default {
    name: 'login',
    data() {
      return {
        // name:'',
        // password:'',
        // password:'',
        // newPassword:''
        dialogTableVisible:false,
      }
    },
    activated() {
      // setTimeout(()=>{
      //     alert('layer.open '+window.layer.open)
      // },2000)
      Object.assign(this.$data, this.$options.data());
      let _this = this
      $.ajax({
        url: _this.$Interface+'/login-refresh',
        type: 'POST',
        async: true,
        success: function(res) {
          if (res.code == 0) {
            _this.$store.state.loginRefresh = res.data
            $('#login .password').val('')
            if (res.data.branchIs == 1) {
              _this.dialogTableVisible = true
              // _this.$router.replace({
              //   path: '/leader-index',
              //   query: {
              //     time: new Date().getTime()
              //   }
              // })
            } else {
              _this.$router.replace({
                path: '/index-new',
                query: {
                  time: new Date().getTime()
                }
              })
            }
          } else {
            // layer.msg(res.codeMsg)
          }
        }
      })
    },
    methods: {
      changepwd() {
        var name = $('#login .names').val()
        var oldPassword = $('#login .passwords').val()
        var newPassword = $('#login .passwords1').val()
        $.ajax({
          url: this.$Interface+'/alter-password-by-name-old-password',
          type: 'post',
          data: {
            name: name,
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          async: true,
          success: function(res) {
            if (res.code == 0) {
              window.location.reload()
              // this.$router.push({path:'/index'})
            } else {
              layer.msg(res.codeMsg)
            }
          }
        })
      },
      forgetpwdFn() {
        console.dir(window)
        layer.open({
          title: '修改密码',
          type: 1,
          area: ['700px', '530px'],
          fix: false, //不固定
          maxmin: true,
          content: $('#login #updatePwdPad'),
          success: function(layero, index) {
            $('#login .login').append(layero);

          },
          end: function() {
            var handle_status = $("#handle_status").val();
            if (handle_status == '1') {
              layer.msg('添加成功！', {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
              }, function() {
                history.go(0);
              });
            } else if (handle_status == '2') {
              layer.msg('添加失败！', {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
              }, function() {
                history.go(0);
              });
            }
          }
        });
        // this.$layui.use("layer",function(){
        //     var layer = layui.layer

        // layer.open({
        // 	title: '修改密码',
        // 	type: 1,
        // 	area: ['700px', '530px'],
        // 	fix: false, //不固定
        // 	maxmin: true,
        // 	content: '<div><div class="number phone" style="margin-top: 50px;"><input class="names" type="text"/><div><img src="image/zhanghu.png" alt=""/><span>用户名</span> </div></div><div class="number oldpwd" style="margin-top: 24px"><input class="passwords" autocomplete="off"  type="password"/><div><img src="image/mima.png" alt=""/> <span>旧密码</span></div></div><div class="number newpwd" style="margin-top: 24px"><input autocomplete="off"  class="passwords1" type="password"/><div><img src="image/mima.png" alt=""/><span>新密码</span></div></div><div class="pwdbtn" style="margin-top: 50px;"><button onclick="changepwd()">确认</button></div>',
        // 	success: function(layero, index) {},
        // 	end: function() {
        // 		var handle_status = $("#handle_status").val();
        // 		if (handle_status == '1') {
        // 			layer.msg('添加成功！', {
        // 				icon: 1,
        // 				time: 2000 //2秒关闭（如果不配置，默认是3秒）
        // 			}, function() {
        // 				history.go(0);
        // 			});
        // 		} else if (handle_status == '2') {
        // 			layer.msg('添加失败！', {
        // 				icon: 2,
        // 				time: 2000 //2秒关闭（如果不配置，默认是3秒）
        // 			}, function() {
        // 				history.go(0);
        // 			});
        // 		}
        // 	}
        // });
        // })


      },
      submitFn() {
       
        var _this = this
        var name = $('#login .name').val()
        var password = $('#login .password').val()
        if (password == '' || name == '') {
          layer.msg('请先填写用户名和密码')
        } else {
          $.ajax({
            url: _this.$Interface+'/login',
            type: 'post',
            data: {
              name: name,
              password: password
            },
            async: true,
            success: function(res) {
              if (res.code == 0) {
                $.ajax({
                  url: _this.$Interface+'/login-refresh',
                  type: 'POST',
                  async: true,
                  success: function(res) {
                    if (res.code == 0) {
                      $('#login .password').val('')
                      debugger
                      _this.$store.state.loginRefresh = res.data
                        console.log(res.data.branchIs)
                      if (res.data.branchIs) {
                        _this.dialogTableVisible = true
                        // _this.$router.replace({
                        //   path: '/leader-index',
                        //   query: {
                        //     time: new Date().getTime()
                        //   }
                        // })
                      } else {
                        _this.$router.replace({
                          path: '/index-new',
                          query: {
                            time: new Date().getTime()
                          }
                        })
                      }
                    } else {
                      layer.msg(res.codeMsg)
                    }
                  }
                })
              } else {
                layer.msg(res.codeMsg)
              }
            }
          })

        }
      },
    }
  }
</script>

<style scoped>
  #login{
    width: 100%;
	  height: 100%;
    overflow: scroll;
  }
  .login {
    width: 100%;
    height: 100%;
    background: url("../assets/img/background.png");
    background-size: cover;
    box-sizing: border-box;
  }

  .logo {
    width: 380px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    padding-top: 1.67rem;
    margin-bottom: 0.91rem;
  }

  .logo img {
    /*width: 0.41rem;*/
    /*height: 0.33rem;*/
    width: 41px;
    height: 33px;
    display: inline-block;
    float: left;
  }

  .logo h2 {
    line-height: 33px;
    /*font-size: 0.33rem;*/
    font-size: 33px;
    font-family: PingFangSC-Regular;
    color: rgba(0, 0, 0, 0.85);
    display: inline-block;
    margin: 0;
    float: right;
  }

  .number {
    margin: 0 auto;
    /*width: 3.68rem;*/
    /*height: 0.4rem;*/
    width: 368px;
    height: 40px;
    border: 1px solid #d9d9d9;
    position: relative;
    overflow: hidden;
  }

  .number input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    padding-left: 100px;
    padding-right: 10px;
    color: #000;
    box-sizing: border-box;
  }

  .number>div {
    width: 90px;
    height: 100%;
    position: absolute;
    top: 0;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.25);
    text-align: center
  }

  .number>div img {
    width: 16px;
    height: 16px;
    float: left;
    margin-top: 12px;
    margin-left: 12px;
    margin-right: 10px;
  }

  .zdlogin {
    width: 368px;
    height: 16px;
    margin: 27px auto;

    color: rgba(0, 0, 0, 0.65);
    line-height: 16px;
  }

  .zdlogin div input {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    margin-top: 0;
    border-radius: 2px;
    cursor: pointer;
  }

  .zdlogin span {
    display: inline-block;
    font-size: 14px;
  }

  .forgetpwd {
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
  }

  .loginbtn,
  .pwdbtn {
    width: 368px;
    height: 40px;
    margin: 0 auto;

    border-radius: 4px;
  }

  .loginbtn button,
  .pwdbtn button {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: #1890ff;
    color: #fff;
    border: 0;
    cursor: pointer;
  }

  .registernow {
    color: #1890ff;
    cursor: pointer;
  }
  >>>.el-dialog__header{
    text-align: center
  }
  >>>.el-dialog__title{
    font-weight: 500;
    font-size: 26px
  }
  >>>.el-dialog__body{
    padding: 0px;
  }
  .typeDialogClass{
    float:left;
    width:50%;
    height:50px;
    line-height:50px;
    text-align:center;
    cursor: pointer;
    background:linear-gradient( #e4e3e3 50%,white 50%);
    background-size: 100% 200%;
    background-position: 0 100%;
  }
  .typeDialogClass:hover{
    background-position: 0 0%;
    color:#000;
    transition: background .3s ease;
  }
  .seccion{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 90px;
    color: #a9a0a0;
  }
</style>
